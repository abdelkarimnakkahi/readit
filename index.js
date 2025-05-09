const text = document.querySelector("#text");
const select = document.querySelector("#voiceList");
const button = document.querySelector("button");
const synth = window.speechSynthesis;

document.addEventListener("DOMContentLoaded", init);

function init(){
    button.addEventListener("click", textToSpeech);
    synth.addEventListener("voiceschanged", loadVoices)
}

// Load Voices
function loadVoices(){
    // console.log(synth.getVoices());
    select.innerHTML = "";
    for(let voice of synth.getVoices()){
        let option= `<option value='${voice.name}'>${voice.name} (${voice.lang}) </option>`;
        select.insertAdjacentHTML("beforeend", option);
        // console.log(option);
    }
}

function textToSpeech(e){
    e.preventDefault();
    // Check textaria
    if(!text.value.trim()){
        alert("Please fill data");
        return 0;
    }

    const utterance = new SpeechSynthesisUtterance(text.value);

    // All voices
    for(let voice of synth.getVoices()){
        if(voice.name == select.value){
            utterance.voice = voice;
            // console.log(utterance.voice);
        }
    }
    
    if(!synth.speaking){
        synth.speak(utterance);
    }
}
