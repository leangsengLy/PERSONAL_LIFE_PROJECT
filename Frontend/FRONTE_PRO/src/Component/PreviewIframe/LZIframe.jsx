import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsShow } from '../../Store/PreviewIFrame/PreviewIFrame'
function LZIframe() {
    const isShowIframe = useSelector(state=>state.Iframe.isShow)
    const iframe = useSelector(state=>state.Iframe.iframe.path)
    const dispatch = useDispatch();
    const onCloseIframe=()=>{
        dispatch(setIsShow(false))
    }
  return (
    <>
    {
        isShowIframe?(<><div className='w-screen h-screen fixed top-0 left-0 z-[10000000] bg-[#0000006b]'>
        <div className='w-full h-full relative flex justify-center px-10 items-center'>
            <div  onClick={onCloseIframe} className='text-white absolute top-4 right-5 cursor-pointer hover:opacity-100 opacity-70 transition-all ease-linear'>
                <i class="ri-close-line text-[30px]"></i>
            </div>
            {console.log("==",iframe)}
            <iframe src={iframe} className='w-[1000px] h-[500px] max-[600px]:h-[200px]  max-[800px]:h-[400px] transition-all ease-linear' ></iframe>
        </div>
    </div></>):(<></>)
    }
    
    </>
    
  )
}

export default LZIframe