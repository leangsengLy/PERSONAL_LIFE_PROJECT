import React, { useEffect, useState } from 'react'
import { ShowSnackbar } from '../../Util/globalUtils'
import { Input } from '@nextui-org/react';
import { use } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HttpRequest } from '../../Global/API_HTTP/http';
import { setInforUser } from '../../Store/UserLogin/UserLogin';

function Profile() {
  const userInfo = useSelector(state=>state.User.dataUser);
  const dispatch = useDispatch()
  const [isEditName,setIsEditName] = useState(false);
  const [isEditDesc,setIsEditDesc] = useState(false);
  const [isEditCareer,setIsEditCareer] = useState(false);
  const [isEditCodeProgram,setIsEditCodeProgram] = useState(false);
  const [isEditAddress,setIsEditAddress] = useState(false);
  const [isEditPhone,setIsEditPhone] = useState(false);
  const [profileInfo,setProfileInfo] = useState({
    Address:"",
    Career:"",
    Username:"",
    Description:"",
    Phone:"",
    Program:"",
  });
  useEffect(()=>{
    dispatch(setInforUser(JSON.parse(localStorage.getItem("userInfo"))))
  },[])
  useEffect(()=>{
      GetInforUser()
  },[userInfo])
  const GetInforUser=async()=>{
    HttpRequest({
                url:'api/user_profile/info',
                data:{
                  loginId:userInfo.Id
                },
                method:"post",
                success:(success)=>{
                  console.log("Result",success)
                    setProfileInfo(val=>(
                      {
                        ...val,
                        Address:success.Address==null?"Address default tek tla.":success?.Address,
                        Career:success.Major==null?"IT developer or doctor teacher":success?.Major,
                        Username:success.Name==null?"Your Name":success.Name,
                        Id: success.Id,
                        Description:success.Description==null?"Description default I need to make a something to you.":success?.Description,
                        Phone:success.Phone1==null?"099 855 645":success?.Phone1,
                        Program:success.ExperienceDescription==null?"language that you have learn or study...":success?.ExperienceDescription,
                      }))
                },
                error:(error)=>{
                    ShowSnackbar({message:error.message,type:'error'})
                }
            })
  }
  const onCopyPhoneNumber=()=>{
    ShowSnackbar({message:`Copied ${profileInfo?.Phone}`,type:"success"});
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
  const onActionEditPhone=(type)=>{
   setIsEditPhone(type=="edit");
  }
  const onActionEditCodePro=(type)=>{
   setIsEditCodeProgram(type=="edit");
  }
  const onActionEditAddres=(type)=>{
   setIsEditAddress(type=="edit");
  }
  const onChangeValue=(event)=>{
    setProfileInfo((prev)=>({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }
  const ClearInput=()=>{
    setIsEditName(false);
    setIsEditDesc(false);
    setIsEditCareer(false);
    setIsEditCodeProgram(false);
    setIsEditAddress(false);
    setIsEditPhone(false);
  }
  const onKeyEnter=(event,type)=>{
    if(event.key=="Enter") {
      ClearInput()
      saveData(type);
    }
    
  }
  const saveData=(type)=>{
    var URL= "";
      if(type=="Username") URL=`api/user_profile/update_name?name=${profileInfo?.Username}&Id=${profileInfo.Id}`;
      else if(type=="Description") URL=`api/user_profile/update_description?Description=${profileInfo?.Description}&Id=${profileInfo.Id}`;
      else if(type=="Address") URL=`api/user_profile/update_address?address=${profileInfo?.Address}&Id=${profileInfo.Id}`;
      else if(type=="Program") URL=`api/user_profile/update_code_program?codeProgram=${profileInfo?.Program}&Id=${profileInfo.Id}`;
      else if(type=="Career") URL=`api/user_profile/update_career?major=${profileInfo?.Career}&Id=${profileInfo.Id}`;
      else if(type=="Phone") URL=`api/user_profile/update_phone?phone=${profileInfo?.Phone}&Id=${profileInfo.Id}`;
      HttpRequest({
                url:URL,
                method:"get",
                success:(success)=>{
                  GetInforUser()
                },
                error:(error)=>{
                  console.log(error)
                    ShowSnackbar({message:error.detail,type:'error'})
                }
            })
  }
  const onBlurChange=(type)=>{
    saveData(type)
    ClearInput()
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
                  isEditName?<Input onBlur={()=>{onBlurChange("Username")}} onKeyDown={(e)=>{onKeyEnter(e,"Username")}} value={profileInfo?.Username} onChange={onChangeValue} name="Username" classNames={{base:"w-[300px] h-[40px]"}} size='sm' label="Username" type="text" variant="underlined" />:<p className='text-[16px] font-medium color-3'>{profileInfo?.Username}</p>
                }
                {
                  isEditName?<i onClick={()=>{onActionEditName("check")}} className='ri-check-line text-green-400 text-[16px]  cursor-pointer'></i>:<i onClick={()=>{onActionEditName("edit")}} className='ri-pencil-fill   text-[13px]  cursor-pointer'></i>
                }
              </div>
              <div className='flex items-center gap-x-2'>
                {
                  isEditDesc?<Input onBlur={()=>{onBlurChange("Description")}} onKeyDown={(e)=>{onKeyEnter(e,"Description")}} value={profileInfo?.Description} onChange={onChangeValue} name="Description" classNames={{base:"w-[400px] h-[40px]"}} size='sm' label="Description" type="text" variant="underlined" />:<p className='text-[13px]'>{profileInfo?.Description}</p>
                }
                {
                  isEditDesc?<i onClick={()=>{onActionEditDesc("check")}} className='ri-check-line text-[16px] text-green-400 cursor-pointer'></i>:<i onClick={()=>{onActionEditDesc("edit")}} className='ri-pencil-fill   text-[13px]  cursor-pointer'></i>
                }
              </div>
               
            </div>
            <div className='flex flex-col pt-4 pr-6'>
              <p className='text-[13px] color-3 mb-2'>Phone number</p>
              <div className='w-full h-[50px] flex justify-center items-center relative rounded-lg border mr-[20px]'>
                <div className='absolute right-4 cursor-pointer text-[12px] hover:text-white' onClick={()=>{
                  onCopyPhoneNumber();
                }}>Copy</div>
                <div className='flex items-center gap-x-2'>
                {
                  isEditPhone?<Input value={profileInfo?.Phone} onBlur={()=>{onBlurChange("Phone")}} onKeyDown={(e)=>{onKeyEnter(e,"Phone")}} onChange={onChangeValue} name="Phone" classNames={{base:"w-[120px] h-[40px]",inputWrapper:"border-none",input:"text-center"}} size='sm' type="text" variant="underlined" />:<p className='text-[18px] color-3'>{profileInfo?.Phone}</p>
                }
                {
                  isEditPhone?<i onClick={()=>{onActionEditPhone("check")}} className='ri-check-line text-[16px] text-green-400 cursor-pointer'></i>:<i onClick={()=>{onActionEditPhone("edit")}} className='ri-pencil-fill   text-[13px]  cursor-pointer'></i>
                }
              </div>
               
              </div>
              <div className='flex flex-col pt-4 gap-y-1'>
                <p className='text-[14px] font-medium color-3'>Career</p>
                <div className='flex items-center gap-x-2'>
                  {
                    isEditCareer?<Input value={profileInfo?.Career} onBlur={()=>{onBlurChange("Career")}} onKeyDown={(e)=>{onKeyEnter(e,"Career")}} onChange={onChangeValue} name="Career" classNames={{base:"w-[250px] h-[40px]"}} size='sm' label="Your career" type="text" variant="underlined" />:<p className='text-[13px]'>{profileInfo?.Career}</p>
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
                    isEditCodeProgram?<Input value={profileInfo?.Program} onBlur={()=>{onBlurChange("Program")}}  onKeyDown={(e)=>{onKeyEnter(e,"Program")}} onChange={onChangeValue} name="Program" classNames={{base:"w-[400px] h-[40px]"}} size='sm' label="language program" type="text" variant="underlined" />:<p className='text-[13px]'>{profileInfo?.Program}</p>
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
                    isEditAddress?<Input value={profileInfo?.Address} onBlur={()=>{onBlurChange("Address")}} onKeyDown={(e)=>{onKeyEnter(e,"Address")}} onChange={onChangeValue} name="Address"  classNames={{base:"w-[400px] h-[40px]"}} size='sm' label="language program" type="text" variant="underlined" />:<p className='text-[13px]'>{profileInfo?.Address}</p>
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