import React, { useEffect, useRef, useState } from 'react'
import {setShowPreview,setImagePath} from '../../Store/PreviewImage/PreviewImage'
import { useDispatch, useSelector } from 'react-redux';
import { SoundAudio } from '../../Util/Sound';
function PreviewImage() {
    const isShowImage = useSelector(state=>state.PreviewImage.isShow);
    const ImagePath = useSelector(state=>state.PreviewImage.imagePath);
    const dispatch = useDispatch();
       const click = SoundAudio('click')
    const onCloseImage=()=>{
        click.play()
        dispatch(setShowPreview(false));
    }
    document.addEventListener("click",(e)=>{
        dispatch(setShowPreview(e.target.classList[0]=="preview-image"));
        dispatch(setImagePath(e.target.src));
    })
    // useEffect(()=>{
    //     SetIsShowImage(false)
    // })
  return (
    <>
     {isShowImage?(<>
     <div className='w-screen h-screen fixed top-0 px-10 left-0 z-[10000000] bg-[#0000006b]'>
        <div className='w-full h-full relative  flex justify-center items-center'>
            <div  onClick={onCloseImage} className='text-white absolute top-4 right-5 cursor-pointer hover:opacity-100 opacity-70 transition-all ease-linear'>
                <i class="ri-close-line text-[30px]"></i>
            </div>
            <img src={ImagePath} alt="" className='max-h-[calc(100vh-200px)]' />
        </div>
    </div>
    </>):(<></>)}
    </>
    
  )
}

export default PreviewImage