import { Tooltip } from '@nextui-org/react'
import React from 'react'

const LZCircleAction = ({img,onClick,content,IsClickOnSetting,isLoginOrisHomePage}) => {
    window.addEventListener("click",(e)=>{
        IsClickOnSetting(e.target.className.split(" ").includes("setting"))
    })
  return (
    <div>
        <Tooltip content="setting" showArrow={true} >
                  <div onClick={onClick} className={`${isLoginOrisHomePage?`w-[40px] h-[40px]`:`w-[30px] h-[30px]`}  cursor-pointer items-center justify-center p-2 rounded-full relative border-primary`} >
                    <img src={img} alt="" className='w-full scale-[1.5] setting h-full rounded-full'/>
                    {content}
                  </div>
          </Tooltip>
    </div>
  )
}

export default LZCircleAction