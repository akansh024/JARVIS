// Initialize speech recognition and synthesis
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
const synth = window.speechSynthesis;

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Handle command processing
recognition.onresult = function(event) {
    const command = event.results[0][0].transcript.toLowerCase();
    document.getElementById('commandText').innerText = command;
    processCommand(command);
};

recognition.onerror = function(event) {
    document.getElementById('responseText').innerText = "Error: " + event.error;
    console.error('Error occurred in recognition:', event.error);
};

// Start listening for voice commands
function startListening() {
    document.getElementById('commandText').innerText = 'Listening...';
    recognition.start();
}

// Process the voice commands
function processCommand(command) {
    let response = '';

    if (command.includes('time')) {
        const currentTime = new Date().toLocaleTimeString();
        response = `The current time is ${currentTime}.`;
    } else if (command.includes('open youtube')) {
        response = 'Opening YouTube';
        window.open('https://www.youtube.com', '_blank');
    } else if (command.includes('open google')) {
        response = 'Opening Google';
        window.open('https://www.google.com', '_blank');
    } else if (command.includes('how are you')) {
        response = 'I am just a program, but thanks for asking!';
    } else if (command.includes('hello')) {
        response = 'Hello! How can I assist you today?';
    } else {
        response = "Sorry, I didn't understand that command.";
    }

    speakResponse(response);
}

// Speak the response using speech synthesis
function speakResponse(response) {
    const utterance = new SpeechSynthesisUtterance(response);
    synth.speak(utterance);
    document.getElementById('responseText').innerText = response;
}
