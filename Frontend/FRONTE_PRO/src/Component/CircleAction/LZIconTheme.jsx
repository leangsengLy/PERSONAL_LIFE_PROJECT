import { Tooltip } from '@nextui-org/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from '../../Store/ThemeBackground/Theme'
import bright from '../../../public/Icon/bright.svg'
import night from '../../../public/Icon/night.svg'
import { SoundAudio } from '../../Util/Sound'
const LZIconTheme = ({isLoginOrisHomePage}) => {  
  const dispatch = useDispatch()
  const click = SoundAudio('click')
  const isDark = useSelector(state=>state.Theme.isDark);
  const onChangeTheme=()=>{
    click.play();
    localStorage.setItem("isDark",!isDark)
    dispatch(changeTheme(!isDark))
  }
  return (
    <Tooltip content="Light" showArrow={true} >
                <div className={`${isLoginOrisHomePage?`w-[40px] h-[40px]`:`w-[30px] h-[30px]`} cursor-pointer p-2 rounded-full border-primary`} onClick={onChangeTheme}>
                  <img src={isDark?bright:night} alt="" className='w-full h-full rounded-full'/>
                </div>
        </Tooltip>
  )
}

export default LZIconTheme