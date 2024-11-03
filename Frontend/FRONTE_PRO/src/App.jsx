import React from 'react';
import LZRoutes from './Routes/LZRoutes.jsx';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import LZComfirm from './Global/View/ConfirmAction/LZComfirm.jsx';
const App = () => {
    const isDark = useSelector(state=>state.Theme.isDark)
    const language = useSelector(state=>state.Language.language)
    return (
        <div className={`${isDark? "dark" : ""} ${language.code??'kh'}`}>
            <LZRoutes/>
            <LZComfirm/>
            <ToastContainer position="bottom-right" autoClose={5000}/>
        </div>
    );
};

export default App;