import { Tooltip } from '@nextui-org/react'
import React from 'react'

const LZCircleAction = ({img,onClick,content,IsClickOnSetting,isLoginOrisHomePage}) => {
    window.addEventListener("click",(e)=>{
        IsClickOnSetting(e.target.className.split(" ").includes("setting"))
    })
  return (
    <div>
        <Tooltip content="setting" showArrow={true} >
                  <div onClick={onClick} className={`${isLoginOrisHomePage?`w-[33px] h-[33px]`:`w-[30px] h-[30px]`}  cursor-pointer  flex justify-center items-center rounded-full relative border-primary`} >
                    {/* <img src={img} alt="" className='w-full scale-[1] setting h-full rounded-full'/> */}
                    <i className={`ri-settings-5-line text-[20px] color-primary`} />
                    {content}
                  </div>
          </Tooltip>
    </div>
  )
}

export default LZCircleAction