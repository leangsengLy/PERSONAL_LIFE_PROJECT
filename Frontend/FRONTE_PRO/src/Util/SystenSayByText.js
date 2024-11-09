export const SystemSpeakByText = (text, IsFemale)=>{
    const  utterance  = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    if(!IsFemale){
        utterance.voice = voices[0];
    }else{
        const femaleVoice = voices.filter(voice => voice.name =="Google UK English Female");
        if (femaleVoice) utterance.voice = femaleVoice[0];
    }
    speechSynthesis.speak(utterance);
}