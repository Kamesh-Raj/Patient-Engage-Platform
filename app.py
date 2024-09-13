from flask import Flask, request, jsonify, render_template
import csv
import os

app = Flask(__name__)

# Load data from CSV files
def load_csv(filename):
    with open(filename, mode='r') as file:
        csv_reader = csv.DictReader(file)
        return list(csv_reader)

# File paths
DATA_PATH = 'data'
doctors = load_csv(os.path.join(DATA_PATH, 'doctors.csv'))
appointments = load_csv(os.path.join(DATA_PATH, 'appointments.csv'))
messages = load_csv(os.path.join(DATA_PATH, 'messages.csv'))
reminders = load_csv(os.path.join(DATA_PATH, 'reminders.csv'))
health_records = load_csv(os.path.join(DATA_PATH, 'health_records.csv'))
profiles = load_csv(os.path.join(DATA_PATH, 'profiles.csv'))

@app.route('/')
def index():
    return render_template('index.html', doctors=doctors, profiles=profiles)

@app.route('/create-appointment', methods=['POST'])
def create_appointment():
    data = request.json
    new_appointment = {
        'appointment_id': str(len(appointments) + 1),
        'patient_name': data['patient_name'],
        'doctor_id': data['doctor'],
        'appointment_date': data['date'],
        'appointment_time': data['time']
    }
    appointments.append(new_appointment)
    return jsonify({'message': 'Appointment created successfully', 'appointments': appointments})

@app.route('/create-reminder', methods=['POST'])
def create_reminder():
    data = request.json
    new_reminder = {
        'reminder_id': str(len(reminders) + 1),
        'patient_name': data['patient_name'],
        'medication_name': data['medication'],
        'dosage': data['dosage'],
        'frequency': data['frequency'],
        'start_date': data['start_date'],
        'end_date': data['end_date']
    }
    reminders.append(new_reminder)
    return jsonify({'message': 'Reminder created successfully', 'reminders': reminders})

@app.route('/send-message', methods=['POST'])
def send_message():
    data = request.json
    new_message = {
        'message_id': str(len(messages) + 1),
        'patient_name': data['patient_name'],
        'doctor_id': data['doctor_id'],
        'timestamp': data['timestamp'],
        'content': data['content']
    }
    messages.append(new_message)
    return jsonify({'message': 'Message sent successfully', 'messages': messages})

@app.route('/profile', methods=['POST'])
def update_profile():
    data = request.json
    for profile in profiles:
        if profile['user_id'] == data['user_id']:
            profile['name'] = data['name']
            profile['contact'] = data['contact']
            break
    return jsonify({'message': 'Profile updated successfully', 'profile': profile})

if __name__ == '__main__':
    app.run(debug=True)
