import React from 'react';
import LZRoutes from './Routes/LZRoutes.jsx';
import { useSelector } from 'react-redux';
const App = () => {
    const isDark = useSelector(state=>state.Theme.isDark)
    return (
        <div className={ isDark ? `DarkTheme` : `white` }>
            <LZRoutes/>
        </div>
    );
};

export default App;