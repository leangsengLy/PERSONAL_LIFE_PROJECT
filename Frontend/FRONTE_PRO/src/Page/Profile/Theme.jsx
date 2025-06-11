import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../Store/ThemeBackground/Theme';
import { SoundAudio } from '../../Util/Sound';

function Theme() {
    const click = SoundAudio('click')
  const dispatch = useDispatch();
   const isDark = useSelector(state=>state.Theme.isDark);
     const tr = useSelector(state=>state.Language.translate)
  const onClickTheme=()=>{
    click.play();
    localStorage.setItem("isDark",!isDark)
    dispatch(changeTheme(!isDark))
  }
  return (
    <div className='w-full'>
        <h2>{tr.theme}</h2>
        <div className='wrapper-color flex gap-2 flex-wrap mt-3 w-full justify-center items-center h=[300px]'>
                {!isDark ?<i class="ri-sun-fill text-[200px] color-1"></i>: <i class="ri-moon-fill text-[200px] color-1"></i>}
        </div>
        <div className='w-full flex h-auto justify-center items-center flex-col gap-y-5 mt-8'>
            <div onClick={onClickTheme} className='w-[70px] cursor-pointer shadow-2xl transition-all ease-linear hover:shadow-cyan-500/50 h-[70px] rounded-full bg-white p-2 flex justify-center items-center'>
                <div className='w-full h-full rounded-full bg-navleft flex justify-center items-center'>
                    {isDark ?<i class="ri-sun-fill text-[30px] color-1"></i>: <i class="ri-moon-fill text-[30px] color-1"></i>}
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Theme