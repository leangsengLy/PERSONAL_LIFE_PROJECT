import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import LabelHeader from '../../../Component/Header/LabelHeader';
import { useSelector } from 'react-redux';

function District() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tr = useSelector(state=>state.Language.translate);
  useEffect(()=>{
    //Decode by queryString
      const jsonStringDecoded = decodeURIComponent(escape(atob(params.get('Info'))));
    const jsonObjectDecoded = JSON.parse(jsonStringDecoded);
    console.log('encode data =>',jsonObjectDecoded)
  },[])
  return (
    <div className='h-full'>
       <LabelHeader label={tr.district}/>
    </div>
  )
}

export default District