import json


def validate_registration_data(data):
    if (
        isinstance(data.get("eventId"), int)
        and isinstance(data.get("firstName"), str)
        and isinstance(data.get("lastName"), str)
        and isinstance(data.get("email"), str)
        and isinstance(data.get("phone"), str)
        and isinstance(data.get("isStudent"), bool)
    ):
        if 'university' in data:
            if not isinstance(data['university'], str):
                return False
            
        return True
    return False


def add_participant(new_participant):
    participants = get_participants()
    participants.append(new_participant)

    with open("./data/participants.json", "w") as file:
        json.dump(participants, file, indent=4)


def get_events():
    with open("./data/events.json", "r") as file:
        data = json.load(file)

    return data


def get_participants():
    with open("./data/participants.json", "r") as file:
        data = json.load(file)

    return data
