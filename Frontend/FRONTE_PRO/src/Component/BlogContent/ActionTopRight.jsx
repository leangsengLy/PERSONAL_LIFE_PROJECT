import React, { useRef, useState } from 'react'
import LZIconTheme from '../CircleAction/LZIconTheme'
import LZIconLanguage from '../CircleAction/LZIconLanguage'
import LZCircleAction from '../CircleAction/LZCircleAction'
import setting from './../../../public/Gif/Setting.gif'
import { useDispatch } from 'react-redux'
import { setIsShow, setModalConfirm } from '../../Store/Confirm/Confirm'
import { SoundAudio } from '../../Util/Sound'
import { SystemSpeakByText } from '../../Util/SystenSayByText'
function ActionTopRight() {
  const [isClickSetting,setIsClickSetting] = useState(false)
  const dispatch = useDispatch()
  const click = SoundAudio("click")
  const onClose=()=>{
    dispatch(setIsShow(false))
  }
  const onOk=()=>{
    SystemSpeakByText("Yes! Here we go!")
    dispatch(setIsShow(false))
    setTimeout(()=>{
      window.location.href="/logout"
    },2500)
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

  const DropDownSetting=<div style={{zIndex:`${isClickSetting?``:`-1`}`}} className={`min-w-[140px] flex flex-col p-[15px] gap-y-2 opacity-0  lz-animation  rounded-2xl  ${isClickSetting?`opacity-100 z-10  -translate-x-2 translate-y-1`:``}  absolute right-2 top-12 bg-popup`}>
    <div className='flex gap-x-2 color-1 hover-text lz-animation'>
      <i className="ri-user-fill"></i>
      <p>Profile</p>
    </div>
    <div className='flex gap-x-2 color-1 hover-text lz-animation' onClick={onClickLogout}>
      <i className="ri-logout-circle-r-line"></i>
      <div>Logout</div>
    </div>
  </div>

  const onClickSetting=(e)=>{
    setTimeout(()=>{setIsClickSetting(!isClickSetting)},100)
  }
  const checkIsClickOnSetting=(isCLick)=>{
      setIsClickSetting(isCLick)
  }
  return (
    <div className='flex absolute top-7 right-10 gap-x-3'>
        <LZIconLanguage/>
        <LZIconTheme/>
        <LZCircleAction img={setting} onClick={onClickSetting} IsClickOnSetting={checkIsClickOnSetting} content={DropDownSetting}/>
    </div>
  )
}

export default ActionTopRight