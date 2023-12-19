from flask import Flask, jsonify, request
from flask_cors import CORS
import jwt
import datetime
from emailSender import send_email
from dotenv import load_dotenv
import os

load_dotenv()
sender_adress = os.getenv("SENDER_ADDRESS")
sender_password = os.getenv("SENDER_PASSWORD")


secret_key = os.getenv("SECRET_KEY")

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = secret_key


################# JWT authentication ######################
@app.route('/get_token', methods=['POST'])
def get_token():
    username = request.json.get('username')
    password = request.json.get('password')

    if username == 'dash123' and password == 'cooldash23':
        expiration_date = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        token = jwt.encode({'username': username, 'exp': expiration_date}, app.config['SECRET_KEY'])
        return jsonify({'token': token.decode('UTF-8')})
    else:
        return jsonify({'error': 'Invalid username or password'}), 401


@app.route('/')
def index():
    response = sender_adress + " " + sender_password
    return response

if __name__ == '__main__':
    app.run(debug=True)
