const text = document.querySelector("#text");
const select = document.querySelector("#voiceList");
const button = document.querySelector("button");
const synth = window.speechSynthesis;

let isSpeaking = false; // Tracks speaking state
let currentUtterance = null;

document.addEventListener("DOMContentLoaded", init);

function init() {
    button.addEventListener("click", handleSpeech);
    synth.addEventListener("voiceschanged", loadVoices);
}

// Load voices into the dropdown
function loadVoices() {
    select.innerHTML = "";
    const voices = synth.getVoices().filter(v => v.lang.startsWith("en")); // optional filter

    voices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;
        if (index === 0) option.selected = true; // default to first voice
        select.appendChild(option);
    });
}

// Main speech function
function handleSpeech(e) {
    e.preventDefault();

    const inputText = text.value.trim();
    if (!inputText) {
        alert("Please fill data");
        return;
    }

    // Start speech if not currently speaking
    if (!synth.speaking && !isSpeaking) {
        currentUtterance = new SpeechSynthesisUtterance(inputText);

        // Set selected voice
        const selectedVoiceName = select.value;
        const voice = synth.getVoices().find(v => v.name === selectedVoiceName);
        if (voice) {
            currentUtterance.voice = voice;
        }

        // When speech ends
        currentUtterance.onend = () => {
            isSpeaking = false;
            button.textContent = "Play";
        };

        synth.speak(currentUtterance);
        isSpeaking = true;
        button.textContent = "Pause";

    } else if (synth.speaking && !synth.paused) {
        // Pause speech
        synth.pause();
        button.textContent = "Resume";
    } else if (synth.paused) {
        // Resume speech
        synth.resume();
        button.textContent = "Pause";
    }
}
