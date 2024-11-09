import React, { useEffect } from 'react';
import LZRoutes from './Routes/LZRoutes.jsx';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import LZComfirm from './Global/View/ConfirmAction/LZComfirm.jsx';
import { useNavigate } from 'react-router-dom';
import { ShowSnackbar } from './Util/globalUtils.js';
const App = () => {
    const isDark = useSelector(state=>state.Theme.isDark)
    const language = useSelector(state=>state.Language.language)
    const navigate = useNavigate();
    useEffect(()=>{
        let getUserInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if(getUserInfo==null) navigate('/login')
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

    return (
        <div className={`transition-all ease-linear ${isDark? "dark" : ""} ${language.code??'kh'}`}>
            <LZRoutes/>
            <LZComfirm/>
            <ToastContainer position="bottom-right" autoClose={5000}/>
        </div>
    );
};

export default App;