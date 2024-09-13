function navigateTo(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

function createAppointment() {
    const doctor = document.getElementById('doctor').value;
    const date = document.getElementById('appointment-date').value;
    const time = document.getElementById('appointment-time').value;

    fetch('/create-appointment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ patient_name: 'Jane Doe', doctor, date, time }) // Example patient_name
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        console.log(data.appointments);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function createReminder() {
    const medication = document.getElementById('medication-name').value;
    const time = document.getElementById('reminder-time').value;

    fetch('/create-reminder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ patient_name: 'Jane Doe', medication, dosage: '10mg', frequency: 'Daily', start_date: '2024-09-10', end_date: '2024-12-10' }) // Example values
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        console.log(data.reminders);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function sendMessage() {
    const content = document.getElementById('message-content').value;
    const timestamp = new Date().toISOString();

    fetch('/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ patient_name: 'Jane Doe', doctor_id: '1', timestamp, content }) // Example values
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        displayMessages(data.messages);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayMessages(messages) {
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = '';
    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.textContent = `${message.timestamp}: ${message.content}`;
        messageList.appendChild(messageDiv);
    });
}

function updateProfile() {
    const name = document.getElementById('profile-name').value;
    const contact = document.getElementById('profile-contact').value;
    const user_id = '1'; // Example user_id

    fetch('/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id, name, contact })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        displayProfile(data.profile);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayProfile(profile) {
    const profileInfo = document.getElementById('profile-info');
    profileInfo.innerHTML = `
        <p>Name: ${profile.name}</p>
        <p>Contact: ${profile.contact}</p>
    `;
}

