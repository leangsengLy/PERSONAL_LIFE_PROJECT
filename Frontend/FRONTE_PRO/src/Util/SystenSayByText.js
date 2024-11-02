export const SystemSpeakByText = (text, IsFemale)=>{
    const  utterance  = new SpeechSynthesisUtterance(text);
    console.log(text)
    const voices = speechSynthesis.getVoices();
    if(!IsFemale){
        utterance.voice = voices[0];
    }else{
        speechSynthesis.onvoiceschanged=()=>{
            // Find a female voice, or fall back to default if none found
            const femaleVoice = voices.find(voice => 
                voice.name.toLowerCase().includes("female") || 
                voice.name.toLowerCase().includes("woman") || 
                voice.lang.toLowerCase().includes("en")  // Optional: Filter by language
              );
            console.log(femaleVoice)
            if (femaleVoice) {
                utterance.voice = femaleVoice;
              }
        }
    }
    speechSynthesis.speak(utterance);
}