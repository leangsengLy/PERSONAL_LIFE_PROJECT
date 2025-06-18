import React from 'react'
import { useNavigate } from 'react-router-dom'

function LabelHeader({label="No label"}) {
    const navigate = useNavigate();
    const onBackHistory=()=>{
        navigate(-1)
    }
  return (
     <div className='flex items-center gap-x-5'>
            <i onClick={onBackHistory} class="ri-arrow-left-line text-[20px] cursor-pointer"></i>
            <p className='text-[18px] font-bold p-0'>{label}</p>
        </div>
  )
}

export default LabelHeader