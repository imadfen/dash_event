import json
import uuid

def find_item_by_property(dictionary, property_name, property_value):
    for key, item in dictionary.items():
        if item.get(property_name) == property_value:
            return key, item


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


def validate_event(event_data):
    if not isinstance(event_data, dict):
        return False
    
    required_keys = {'name', 'description', 'date', 'time', 'location', 'image'}
    
    if not all(key in event_data for key in required_keys):
        return False
    
    expected_types = {
        'name': str,
        'description': str,
        'date': str,
        'time': str,
        'location': str,
        'image': str
    }
    
    for key, value in event_data.items():
        if not isinstance(value, expected_types.get(key)):
            return False
    
    return True


def add_participant(new_participant):
    participants = get_participants()
    participants.append(new_participant)

    with open("./data/participants.json", "w") as file:
        json.dump(participants, file, indent=4)


def add_event(new_event):
    events = get_events()
    
    id = uuid.uuid4().hex[:32]
    event = {"id": id}
    event.update(new_event)
    
    events.append(event)

    with open("./data/events.json", "w") as file:
        json.dump(events, file, indent=4)


def delete_event(event_id):
    events = get_events()
    
    keys_to_delete = []
    for key, item in events.items():
        if 'id' in item and item['id'] == event_id:
            keys_to_delete.append(key)

    for key in keys_to_delete:
        del events[key]

    with open("./data/events.json", "w") as file:
        json.dump(events, file, indent=4)


def get_events():
    with open("./data/events.json", "r") as file:
        data = json.load(file)

    return data


def get_participants():
    with open("./data/participants.json", "r") as file:
        data = json.load(file)

    return data
