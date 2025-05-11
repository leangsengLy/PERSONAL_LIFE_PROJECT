import React, { useEffect, useRef, useState } from 'react'
import ActionTopRight from './BlogContent/ActionTopRight'
import { StoreMenu } from '../MenuStore/menuData'
import { Tooltip } from '@nextui-org/react'
import { translateBy } from '../Util/globalUtils'
import { SoundAudio } from '../Util/Sound'
import { useLocation, useNavigate } from 'react-router-dom'
const HomeMenu = () => {
  const navigate = useNavigate()
 
  const submenu = useRef([]);
  const [drawSubMenu,setDrawSubMenu]  = useState(StoreMenu);
  const click = SoundAudio("click")
  const SelectMenu=(Id)=>{
    let find = StoreMenu.filter((val)=>val.Id==Id);
    if(find.length>0){
      submenu.current =find[0].SubMenu;
      if(submenu.current.length!==0){
        setDrawSubMenu(submenu.current)
      }  
    }
    else {
      console.log(StoreMenu)
      setDrawSubMenu(StoreMenu)
    }
    click.play();
  }
  const onClickMenu=(TitleName)=>{
      var list = StoreMenu.filter(va=>va.code==TitleName);
      console.log(list)
      if(list[0].SubMenu.length>0){
        navigate(`/web/${TitleName}/${list[0].SubMenu[0].Code}`);
      }else navigate(`/web/${TitleName}`)
  }
  
  return (
    <div className='w-screen h-screen px-10 lz-animation bg-box-wrapper flex justify-center items-center flex-wrap color-2'>
        <ActionTopRight isLoginOrisHomePage={true} />
        <div className='max-w-[705px] lzscroll   max-h-[550px] flex flex-col justify-center items-center'>
          <div className='wrapper-menu select-none  w-full h-full flex justify-center items-center flex-wrap gap-[21px]'>
              {
                drawSubMenu.map((val)=>{
                  return (
                    <>
                    <Tooltip placement='top' showArrow={true} onClick={()=>{onClickMenu(val.code)}} content={translateBy({en:val.EnglishName,km:val.Name})}>
                        <div  onClick={()=>{onClickMenu(val.code)}} className='w-[100px] h-[100px] rounded-3xl border-primary flex justify-center items-center'>
                            <img src={val.iconImage} alt="" className='w-[66px] h-[66px] cursor-pointer'/>
                      </div>
                    </Tooltip>
                  </>
                  )
                })
              }
          </div>
        </div>
    </div>
  )
}

export default HomeMenu