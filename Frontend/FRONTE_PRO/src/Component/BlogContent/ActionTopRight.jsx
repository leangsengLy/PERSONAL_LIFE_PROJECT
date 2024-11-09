import React, { useRef, useState } from 'react'
import LZIconTheme from '../CircleAction/LZIconTheme'
import LZIconLanguage from '../CircleAction/LZIconLanguage'
import LZCircleAction from '../CircleAction/LZCircleAction'
import setting from './../../../public/Gif/Setting.gif';
import user from '../../../public/Icon/Infomation_User/user.svg';
import Lyzee from '../../../public/Image/Lyzee/lyzee.jpg';
import { useDispatch } from 'react-redux'
import { setIsShow, setModalConfirm } from '../../Store/Confirm/Confirm'
import { SoundAudio } from '../../Util/Sound'
function ActionTopRight({isLoginOrisHomePage}) {
  const [isClickSetting,setIsClickSetting] = useState(false)
  const dispatch = useDispatch()
  const click = SoundAudio("click")
  const onClose=()=>{
    dispatch(setIsShow(false))
  }
  const onOk=()=>{
    dispatch(setIsShow(false))
    sessionStorage.clear();
    window.location.href="/logout"
  }
  const onClickLogout=()=>{
      click.play();
      dispatch(setModalConfirm({
            type:"comfirm",
            message:"Are you sure? do you want to logout?",
            onClose:onClose,
            onOk:onOk
      }))
      dispatch(setIsShow(true))
    // 
  }
  const DropDownSetting=<div style={{zIndex:`${isClickSetting?``:`-1`}`}} className={`min-w-[210px] pb-7 flex flex-col  gap-y-2 opacity-0  lz-animation  rounded-3xl  ${isClickSetting?`opacity-100 z-10  -translate-x-2 translate-y-1`:``}  absolute right-2 top-12 bg-popup`}>
    <div className='w-full h-[150px]  flex flex-col justify-center items-center bg-primary rounded-t-3xl'>
          <div className='w-[60px] h-[60px]  rounded-full p-1 bg-white  border border-white'>
              <img src={Lyzee} alt="" className='w-full h-full rounded-full' />
          </div>     
          <h5 className='mt-2 text-white'>Ly Zee vlogger</h5>
          <div className='text-[14px]  text-white '>Admin</div>
    </div>
    <div className='w-full px-4 flex flex-col mt-[9px] gap-y-2'>
      <div className='flex gap-x-2 color-1 hover-text lz-animation'>
        <i className="ri-user-fill"></i>
        <p>Profile</p>
      </div>
      <div className='flex gap-x-2 color-1 hover-text lz-animation' onClick={onClickLogout}>
        <i className="ri-logout-circle-r-line"></i>
        <div>Logout</div>
      </div>
    </div>
  </div>

  const onClickSetting=(e)=>{
    setTimeout(()=>{setIsClickSetting(!isClickSetting)},100)
  }
  const checkIsClickOnSetting=(isCLick)=>{
      setIsClickSetting(isCLick)
  }
  return (
    <div className={`flex absolute  gap-x-3  ${isLoginOrisHomePage?`right-10 top-7`:`right-5 top-2`}`}>
        <LZIconLanguage isLoginOrisHomePage={isLoginOrisHomePage}/>
        <LZIconTheme  isLoginOrisHomePage={isLoginOrisHomePage}/>
        <LZCircleAction isLoginOrisHomePage={isLoginOrisHomePage} img={user} onClick={onClickSetting} IsClickOnSetting={checkIsClickOnSetting} content={DropDownSetting}/>
        
    </div>
  )
}

export default ActionTopRight