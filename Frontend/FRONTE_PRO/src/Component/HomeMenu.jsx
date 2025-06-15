import React, { useEffect, useRef, useState } from 'react'
import ActionTopRight from './BlogContent/ActionTopRight'
import { StoreMenu } from '../MenuStore/menuData'
import { Tooltip } from '@nextui-org/react'
import { translateBy } from '../Util/globalUtils'
import { SoundAudio } from '../Util/Sound'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const HomeMenu = () => {
  const navigate = useNavigate()
 
  const submenu = useRef([]);
  const [drawSubMenu,setDrawSubMenu]  = useState(StoreMenu);
  const currentBranch = useSelector(s=>s.branch.branch);
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
  const BackToBranch=()=>{
    navigate('/branch')
  }
  return (
    <div className='w-screen h-screen relative px-10 lz-animation bg-box-wrapper flex justify-center items-center flex-wrap color-2'>
        
        <ActionTopRight isLoginOrisHomePage={true} />
        <div className='w-full'>
          <div  className=' flex   flex-col justify-center gap-y-5 items-center text-[30px] font-bold color-primary cursor-pointer'>
            <div>V/Are-System </div>
            <div onClick={BackToBranch} className='px-4 py-2 border-slate mb-6 opacity-70 transition-all ease-linear text-[15px] hover:opacity-100 rounded-xl'>
             <i class="ri-database-2-fill color-primary text-[18px]"></i> {translateBy({en:currentBranch?.EnglishName,km:currentBranch?.Name})} 
          </div>
          <div className='max-w-[705px] lzscroll w-full  max-h-[550px] flex flex-col justify-center items-center'>
            <div className='wrapper-menu select-none  w-full h-full flex justify-center items-center flex-wrap gap-[26px]'>
                {
                  drawSubMenu.map((val)=>{
                    return (
                      <>
                      <Tooltip placement='top' showArrow={true} onClick={()=>{onClickMenu(val.code)}} content={translateBy({en:val.EnglishName,km:val.Name})}>
                          <div  onClick={()=>{onClickMenu(val.code)}} className='w-[100px] cursor-pointer h-[100px] rounded-3xl border-primary flex justify-center items-center'>
                            <i className={`${val.iconImage} text-[32px] color-primary`} />
                        </div>
                      </Tooltip>
                    </>
                    )
                  })
                }
            </div>
        </div>
        </div>
          
        </div>
    </div>
  )
}

export default HomeMenu