import soundNotification from '../assets/Sound/noti.mp3'
import soundClick from '../assets/Sound/click.mp3'
import soundFail from '../assets/Sound/fail.mp3'
export const SoundAudio = (TypeSound)=>{
    let audioplay="";
    if(TypeSound=="click") audioplay = new Audio(soundClick);
    else if(TypeSound=="noti") audioplay = new Audio(soundNotification);
    else if(TypeSound=="fail") audioplay = new Audio(soundFail);
    const LZplaySound = ()=>{
        audioplay.play();
    }
    const LZPuaseSound = ()=>{
        audioplay.pause();
    }
    return {play:LZplaySound,pause:LZPuaseSound};
}