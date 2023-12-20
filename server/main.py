from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import jwt
import threading
from dotenv import load_dotenv
from emailSender import send_for_each
from dataManagement import get_events, get_participants, validate_registration_data, add_participant
import datetime


load_dotenv()
sender_adress = os.getenv("SENDER_ADDRESS")
sender_password = os.getenv("SENDER_PASSWORD")


secret_key = os.getenv("SECRET_KEY")

app = Flask(__name__)
CORS(app)

app.config["SECRET_KEY"] = secret_key


################# JWT authentication ######################
@app.route("/get_token", methods=["POST"])
def get_token():
    username = request.json.get("username")
    password = request.json.get("password")

    if username == "dash123" and password == "cooldash23":
        expiration_date = datetime.datetime.utcnow() + datetime.timedelta(hours=6)
        token = jwt.encode(
            {"username": username, "exp": expiration_date}, app.config["SECRET_KEY"]
        )
        return jsonify({"token": token})
    else:
        return jsonify({"error": "Invalid username or password"}), 401


################# check if token valid ######################
def isTokenValid(token: str):
    if not token:
        return False

    try:
        jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        return True
    except Exception as e:
        print(e)
        return False


@app.route("/validate_token", methods=["POST"])
def validate_token():
    token = request.json.get("token")
    result = isTokenValid(token)

    if result:
        return "", 200
    else:
        return "", 401


############################### handle data fetch request ################################
@app.route("/events", methods=["GET"])
def send_events():
    try:
        data = get_events()

        return jsonify(data)
    except FileNotFoundError as e:
        print(e)
        return jsonify({'error': 'File not found'}), 404
    except Exception as e:
        print(e)
        return jsonify({'error': 'Unexpected error'}), 400
    
@app.route("/participants", methods=["GET"])
def send_participants():
    authorization_header = request.headers.get('Authorization')

    if not authorization_header or not authorization_header.startswith('Bearer '):
        return jsonify({'message': 'Unauthorized'}), 401
    
    _, token = authorization_header.split(' ', 1)
    
    if not isTokenValid(token):
        return jsonify({'message': 'Unauthorized'}), 401

    try:
        data = get_participants()

        return jsonify(data)
    except FileNotFoundError as e:
        print(e)
        return jsonify({'error': 'File not found'}), 404
    except Exception as e:
        print(e)
        return jsonify({'error': 'Unexpected error'}), 400


############################### handle registration request ################################
@app.route("/register", methods=["POST"])
def register():
    received_data = request.get_json()

    if not validate_registration_data(received_data):
        return jsonify({"error": "Invalid JSON format or data types."}), 400
    
    try:
        add_participant(received_data)

        return "", 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'Unexpected error'}), 400


############################### handle send emails request ################################
############ check validity of data ############
def validate_email_data(data):
    if all(key in data for key in ("eventId", "body", "options")):
        if not isinstance(data["eventId"], int) or not isinstance(
            data["body"], str
        ):
            return False

        options = data["options"]
        if all(
            key in options
            for key in ("subject", "salutation", "useReceiverName", "signature")
        ):
            if (
                not isinstance(options["subject"], str)
                or not isinstance(options["salutation"], str)
                or not isinstance(options["useReceiverName"], bool)
                or not isinstance(options["signature"], str)
            ):
                return False
            return True

    return False


############ filter the participants based on the event id #############
def filter_participants(data, event_id):
    return list(filter(lambda item: item.get("eventId") == event_id, data))


############ send emails route ############
@app.route("/send_emails", methods=["POST"])
def receive_json():
    authorization_header = request.headers.get('Authorization')

    if not authorization_header or not authorization_header.startswith('Bearer '):
        return jsonify({'message': 'Unauthorized'}), 401
    
    _, token = authorization_header.split(' ', 1)
    
    if not isTokenValid(token):
        return jsonify({'message': 'Unauthorized'}), 401

    received_data = request.get_json()

    if not validate_email_data(received_data):
        return jsonify({"error": "Invalid JSON format or data types."}), 400

    eventId: int = received_data["eventId"]
    body: str = received_data["body"]
    options = received_data["options"]
    subject: str = options["subject"]
    salutation: str = options["salutation"]
    useReceiverName: str = options["useReceiverName"]
    signature: str = options["signature"]

    email_thread = threading.Thread(
        target=send_for_each,
        args=(
            filter_participants(example_participants, eventId),
            sender_password,
            sender_adress,
            subject,
            salutation,
            useReceiverName,
            body,
            signature,
        ),
    )

    email_thread.start()
    return jsonify({"message": "Emails send started"}), 200


if __name__ == "__main__":
    app.run(debug=True)
