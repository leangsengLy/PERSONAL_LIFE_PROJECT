import React, { useEffect } from 'react';
import LZRoutes from './Routes/LZRoutes.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import LZComfirm from './Component/ConfirmAction/LZComfirm.jsx';
import { useNavigate } from 'react-router-dom';
import { ShowSnackbar } from './Util/globalUtils.js';
import PreviewImage from './Component/PreviewImage/PreviewImage.jsx';
import LZModal from './Component/Modal/LZModal.jsx';
import LZIframe from './Component/PreviewIframe/LZIframe.jsx';
import { SoundAudio } from './Util/Sound.js';
import { setColorSystem } from './Store/Profile/ColorSystem/ColorSystem.js';
import { setInforUser } from './Store/UserLogin/UserLogin.js';
const App = () => {
    const isDark = useSelector(state=>state.Theme.isDark)
    const language = useSelector(state=>state.Language.language)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedColorSystem = useSelector(state=>state.ColorSystem.selectColor);
    useEffect(()=>{
        let getUserInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if(getUserInfo==null) navigate('/login')
        var getColor = localStorage.getItem("colorSystem");
        var UserInfo = localStorage.getItem("userInfo");
        dispatch(setInforUser(JSON.parse(UserInfo)))
         if(getColor!="") dispatch(setColorSystem({color:getColor,isDark:isDark}));
    },[])
    window.addEventListener('click',()=>{
        let getUserInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if(getUserInfo!==null){
            let currentTime = Math.floor(new Date().getTime()/1000)
            if(currentTime>getUserInfo.exp){
                ShowSnackbar({message:"This system will be logout for 10second!",type:"warning"})
                setTimeout(() => {
                    navigate('/login')
                }, 6000);
                sessionStorage.clear();
            }
        }else{
            if(window.location.pathname!=='/login'){
                ShowSnackbar({message:"This system doesn't have the token we will logout soon!",type:"warning"})
                setTimeout(() => {
                    navigate('/login')
                }, 6000);
            }
        }
    })
    document.addEventListener("click",(e)=>{
        if(e.target.classList[1]=="sound"){
            const click = SoundAudio('click')
            click.play();
        }
        })
    return (
        <div className={`transition-all ease-linear  color_primary_${selectedColorSystem.color} ${isDark? `dark` : ""} ${language.code??'kh'}`}>
            <LZRoutes/>
            <PreviewImage/>
            <LZModal/>
            <LZComfirm/>
            <LZIframe/>
            <ToastContainer position="bottom-right" autoClose={5000}/>
        </div>
    );
};

export default App;