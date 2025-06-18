import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import LabelHeader from '../../../Component/Header/LabelHeader';
import { useSelector } from 'react-redux';

function District() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
const tr = useSelector(state=>state.Language.translate);
  const decode = JSON.parse(atob(params.get('Info')))
  useEffect(()=>{
    console.log('encode data =>',decode)
  },[])
  return (
    <div className='h-full'>
       <LabelHeader label={tr.district}/>
    </div>
  )
}

export default District