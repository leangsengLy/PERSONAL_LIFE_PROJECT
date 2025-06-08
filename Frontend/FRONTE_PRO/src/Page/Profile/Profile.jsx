import React, { useState } from 'react'
import { ShowSnackbar } from '../../Util/globalUtils'
import { Input } from '@nextui-org/react';

function Profile() {
  const [isEditName,setIsEditName] = useState(false);
  const [isEditDesc,setIsEditDesc] = useState(false);
  const [isEditCareer,setIsEditCareer] = useState(false);
  const [isEditCodeProgram,setIsEditCodeProgram] = useState(false);
  const [isEditAddress,setIsEditAddress] = useState(false);
  const onCopyPhoneNumber=()=>{
    ShowSnackbar({message:"Copied Phone Number",type:"success"});
  }
  const onActionEditName=(type)=>{
   setIsEditName(type=="edit");
  }
  const onActionEditDesc=(type)=>{
   setIsEditDesc(type=="edit");
  }
  const onActionEditCareer=(type)=>{
   setIsEditCareer(type=="edit");
  }
  const onActionEditCodePro=(type)=>{
   setIsEditCodeProgram(type=="edit");
  }
  const onActionEditAddres=(type)=>{
   setIsEditAddress(type=="edit");
  }
  return (
    <div className='w-full h-full '>
      <div className='w-full h-[200px] bg-red-500 relative'>
        <img src="http://localhost:8080/Image/offer/20250525083217_ImageOffer.jpg" className='w-full h-full object-cover' alt="" />
        <div className='absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-[#0202026e] text-white text-[12px] cursor-pointer'>Add Cover</div>
        <div className='w-[30px] h-[30px] flex justify-center items-center rounded-full absolute bg-white cursor-pointer left-[100px] top-[234px] z-10'>
          <i class="ri-camera-line"></i>
        </div>
        <div className='w-[100px] h-[100px]  rounded-full bg-white absolute left-9 bottom-[-60px] border-4 border-white'>
          <img src="http://localhost:8080/Image/offer/20250525083217_ImageOffer.jpg" className='w-full h-full object-cover rounded-full' alt="" />
        </div>
      </div>
      <div className='grid grid-flow-col grid-cols-[170px_1fr]'>
        <div></div>
        <div className='flex flex-col gap-y-2'>
            <div className='flex flex-col pt-4 gap-y-1'>
              <div className='flex items-center gap-x-2'>
                {
                  isEditName?<Input classNames={{base:"w-[300px] h-[40px]"}} size='sm' label="Username" type="text" variant="underlined" />:<p className='text-[16px] font-medium color-3'>Ly Leangseng</p>
                }
                {
                  isEditName?<i onClick={()=>{onActionEditName("check")}} className='ri-check-line text-green-400 text-[16px]  cursor-pointer'></i>:<i onClick={()=>{onActionEditName("edit")}} className='ri-pencil-fill   text-[13px]  cursor-pointer'></i>
                }
              </div>
              <div className='flex items-center gap-x-2'>
                {
                  isEditDesc?<Input classNames={{base:"w-[400px] h-[40px]"}} size='sm' label="Description" type="text" variant="underlined" />:<p className='text-[13px]'>I am developer and sale anything you want</p>
                }
                {
                  isEditDesc?<i onClick={()=>{onActionEditDesc("check")}} className='ri-check-line text-[16px] text-green-400 cursor-pointer'></i>:<i onClick={()=>{onActionEditDesc("edit")}} className='ri-pencil-fill   text-[13px]  cursor-pointer'></i>
                }
              </div>
               
            </div>
            <div className='flex flex-col pt-4 pr-6'>
              <p className='text-[13px] color-3 mb-2'>Phone number</p>
              <div className='w-full h-[50px] flex justify-center items-center relative rounded-lg border mr-[20px]'>
                <div className='absolute right-4 cursor-pointer text-[12px] hover:text-white' onClick={onCopyPhoneNumber}>Copy</div>
                015 844712
              </div>
              <div className='flex flex-col pt-4 gap-y-1'>
                <p className='text-[14px] font-medium color-3'>Career</p>
                <div className='flex items-center gap-x-2'>
                  {
                    isEditCareer?<Input classNames={{base:"w-[250px] h-[40px]"}} size='sm' label="Your career" type="text" variant="underlined" />:<p className='text-[13px]'>IT Web Deverloper</p>
                  }
                  {
                    isEditCareer?<i onClick={()=>{onActionEditCareer("check")}} className='ri-check-line text-[16px] text-green-400 cursor-pointer'></i>:<i onClick={()=>{onActionEditCareer("edit")}} className='ri-pencil-fill   text-[13px]  cursor-pointer'></i>
                  }
                </div>
              </div>
              <div className='flex flex-col pt-4 gap-y-1'>
                <p className='text-[14px] font-medium color-3'>Code Program</p>
                 <div className='flex items-center gap-x-2'>
                  {
                    isEditCodeProgram?<Input classNames={{base:"w-[400px] h-[40px]"}} size='sm' label="language program" type="text" variant="underlined" />:<p className='text-[13px]'>HTML , CSS , JAVASCRIPTION, VUE JS, REACT JS EXPRESSJS</p>
                  }
                  {
                    isEditCodeProgram?<i onClick={()=>{onActionEditCodePro("check")}} className='ri-check-line text-[16px] text-green-400 cursor-pointer'></i>:<i onClick={()=>{onActionEditCodePro("edit")}} className='ri-pencil-fill   text-[13px]  cursor-pointer'></i>
                  }
                </div>
              </div>
              <div className='flex flex-col pt-4 gap-y-1'>
                <p className='text-[14px] font-medium color-3'>Adress</p>
                <div className='flex items-center gap-x-2'>
                  {
                    isEditAddress?<Input classNames={{base:"w-[400px] h-[40px]"}} size='sm' label="language program" type="text" variant="underlined" />:<p className='text-[13px]'>Sleng rolerng khan OrBekOum Sensok Phnom Penh</p>
                  }
                  {
                    isEditAddress?<i onClick={()=>{onActionEditAddres("check")}} className='ri-check-line text-[16px] text-green-400 cursor-pointer'></i>:<i onClick={()=>{onActionEditAddres("edit")}} className='ri-pencil-fill   text-[13px]  cursor-pointer'></i>
                  }
                </div>
              </div>
            </div>
            {/* //Carerr */}
           
        </div>
      
      </div>

    </div>
  )
}

export default Profile