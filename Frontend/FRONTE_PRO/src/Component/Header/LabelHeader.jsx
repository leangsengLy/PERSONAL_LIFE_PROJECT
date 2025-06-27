import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LabelHeader({label="No label",BreadcrumbItems=[]}) {
    const navigate = useNavigate();
    const [breadcrumb,setBreadcrumb] =useState([])
    const onBackHistory=()=>{
        navigate(-1)
    }
   
    const onPress=(val)=>{
      console.log("key1",val)
    }
    useEffect(()=>{
        setBreadcrumb(BreadcrumbItems)
        console.log("BreadcrumbItems",BreadcrumbItems)
    },[BreadcrumbItems])
  return (
     <div className=''>
      <div className='flex items-center gap-x-5'>
          <i onClick={onBackHistory} class="ri-arrow-left-line text-[20px] cursor-pointer"></i>
          <p className='text-[18px] font-bold p-0'>{label}</p>
      </div>
      {
        breadcrumb.length>0?
        <div className='mb-3'>
            <Breadcrumbs color='success' classNames={{base:"!h-[20px]"}}>
                {
                  [...breadcrumb].map((val,index)=>(
                    <BreadcrumbItem onPress={()=>onPress(index)} key={val}>{val}</BreadcrumbItem>
                  ))
                }
              </Breadcrumbs>
        </div>:<></>
      }
      
            
        </div>
  )
}

export default LabelHeader