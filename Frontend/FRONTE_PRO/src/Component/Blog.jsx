import React from 'react';
import { useSelector } from 'react-redux';
const App = () => {
    const countTotal = useSelector(state=>state.counterTest.value)
    return (
        <div>
            <h1 className='text-red-500 text-[30px]'>Blog {countTotal}</h1>
        </div>
    );
};

export default App;