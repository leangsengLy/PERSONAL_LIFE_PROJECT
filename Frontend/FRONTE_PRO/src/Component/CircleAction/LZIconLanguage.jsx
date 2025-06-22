import { Tooltip } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SoundAudio } from '../../Util/Sound';
import { getLanguage } from '../../Store/Language/Langauge';

const LZIconLanguage = ({isLoginOrisHomePage}) => {
    const [isShowSelectLanguage,SetIsSelectLanguage]=useState(false)
    const languages = useSelector(state=>state.Language.Languages);
    const langauge = useSelector(state=>state.Language.language);
    const click  = SoundAudio('click')
    const dispatch = useDispatch();
    const OnclickFlag=()=>{
        SetIsSelectLanguage(!isShowSelectLanguage)
    }
    window.addEventListener('click',(e)=>{
        if(!e.target.className.includes('image-language')){
          SetIsSelectLanguage(false)
        }
      })
      useEffect(()=>{
        var lang = localStorage.getItem("language")
        dispatch(getLanguage(lang))
      },[])
    const OnclickCountry=(code)=>{
        click.play();
        dispatch(getLanguage(code))
      }
  return (
    <div className={` ${isLoginOrisHomePage?`w-[33px] h-[33px]`:`w-[30px] h-[30px]`} cursor-pointer relative p-1 rounded-full border-primary`} onClick={OnclickFlag}>
            <Tooltip content="Language" showArrow={true} placement='left'><img src={langauge.Image} alt="" className='w-full object-cover image-language h-full rounded-full'/></Tooltip>
            <div style={{zIndex:`${isShowSelectLanguage?``:`-1`}`}} className={`min-w-[170px] h-auto grid px-5 gap-y-4 bg-popup shadow py-5 rounded-2xl absolute transition-all  ease-in-out duration-200 opacity-0  right-1 top-11 ${isShowSelectLanguage?`opacity-100 z-10  -translate-x-2 translate-y-1`:``} `}>
                {
                    languages.map((val,index)=>{
                    return (
                        < >
                        <div key={index} className='flex items-center justify-start gap-x-3' onClick={()=>{OnclickCountry(val.code)}}>
                            <div className={`w-[30px] h-[30px] rounded-full p-1 border ${langauge.code==val.code?`border-primary`:`border-slate`}`}>
                                <img src={val.Image} alt="" className='w-full h-full rounded-full' />
                            </div>
                            <div className={`color-2 ${langauge.code==val.code?`color-primary`:``}`}>{val.EnglishName}</div>
                        </div>
                        </>
                    )
                    })
                }
            </div>
    </div>
  )
}

export default LZIconLanguage