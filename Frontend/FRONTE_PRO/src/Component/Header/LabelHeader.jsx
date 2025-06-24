import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import React from 'react'
import { useNavigate } from 'react-router-dom'

function LabelHeader({label="No label"}) {
    const navigate = useNavigate();
    const onBackHistory=()=>{
        navigate(-1)
    }
  return (
     <div className=''>
      <div className='flex items-center gap-x-5'>
          <i onClick={onBackHistory} class="ri-arrow-left-line text-[20px] cursor-pointer"></i>
          <p className='text-[18px] font-bold p-0'>{label}</p>
      </div>
      <div className='mb-3'>
        <Breadcrumbs classNames={{base:"!h-[20px]"}}>
                <BreadcrumbItem >Home</BreadcrumbItem>
                <BreadcrumbItem >Music</BreadcrumbItem>
                <BreadcrumbItem >Artist</BreadcrumbItem>
                <BreadcrumbItem >Album</BreadcrumbItem>
                <BreadcrumbItem >Song</BreadcrumbItem>
            </Breadcrumbs>
      </div>
            
        </div>
  )
}

export default LabelHeader