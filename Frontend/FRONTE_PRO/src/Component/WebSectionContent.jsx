import React, { useEffect, useState } from 'react'
import {Outlet, useNavigate, useParams } from 'react-router-dom'
import {StoreMenu} from '../MenuStore/menuData.js'
import img from './../../public/Gif/Gears.gif'
import ActionTopRight from './BlogContent/ActionTopRight.jsx'
function WebSectionContent() {
    const param = useParams()
    const navigate = useNavigate();
    const [Menus,SetMenus]=useState([])
    const [collapse,SetCollapse]=useState(false)
    const [duration,setDuration]=useState(false)
    const [SubMenuCode,SetSubMenuCode]=useState('')
    useEffect(()=>{
        let data = StoreMenu.filter(val=>val.code==param.type);
        if(data.length>0) {
          SetMenus(data[0].SubMenu)
          if(data[0].SubMenu.length>0){
            SetSubMenuCode(data[0].SubMenu[0].Code)
          }
        }
        
    },[])
    useEffect(()=>{
      if(SubMenuCode!==''){
        navigate(`/web/${param.type}/${SubMenuCode}`)
      }
    },[SubMenuCode])
    
    const ClickHome=()=>{
      navigate('/')
    }
    
    window.addEventListener('resize',(e)=>{
      if(e.currentTarget.innerWidth<675){
        SetCollapse(true)
        setTimeout(()=>{
          setDuration(true)
        },200)
      }else{
        SetCollapse(false)
        setTimeout(()=>{
          setDuration(false)
        },200)
      }
      
    })
    const onSubMenu=(Code)=>{
      navigate(`${Code}`)
      SetSubMenuCode(Code)
    }
    const onSwitchCollapse=()=>{
      SetCollapse(!collapse)
      setTimeout(()=>{
        setDuration(!collapse)
      },200)
    }
  return (
    <div className={`wrapper-all-section lz-animation bg-box-wrapper w-screen h-screen color-default grid ${collapse?`grid-cols-[80px_1fr]`:`grid-cols-[240px_1fr]`}`}>
            <div className={`left relative bg-navleft lz-animation px-4 py-6 flex flex-col gap-y-[10px] ${collapse?`overflow-hidden`:``}`}>
                  <div className={`flex gap-x-2 items-center   mb-2 font-bold  `}>
                    <div onClick={onSwitchCollapse} className='w-[9px] h-[45px] animate-pulse absolute top-1/2 right-[10px] cursor-pointer -translate-y-1/2 -translate-x-1/2  rounded-full bg-primary'></div>
                    <div className=' flex gap-x-2'>
                        <img src={img} alt="" className='max-w-[40px] max-h-[40px]' />
                    </div>
                    {
                      !duration?(<><div className='flex w-[80%] justify-between items-center whitespace-nowrap'><h4>V/are System</h4></div></>):(<></>)
                    }
                    
                </div>  
              
                <div className='flex flex-col gap-y-[3px] color-default'>
                <div onClick={ClickHome} className='hover:bg-[#ffffff0d] hover:rounded-md cursor-pointer py-1  flex items-center'>
                  <div className='flex gap-x-3 pl-3 items-center whitespace-nowrap'>
                    <i className="ri-function-fill text-[22px]"></i> 
                    {
                          !duration?(<>
                            <div className='text-[16px]'>Menu</div>
                          </>):(<></>)
                        } 
                   
                  </div>
                </div>
                {
                Menus.map((val)=>{
                  return (
                    <>
                      <div onClick={()=>{onSubMenu(val.Code)}} className={`hover:bg-[#ffffff0d] ${SubMenuCode==val.Code?`color-primary`:``} hover:rounded-md cursor-pointer py-1 flex items-center`}>
                        <div className='flex gap-x-3 pl-3 items-center whitespace-nowrap'>
                        <i className={`${val.icon} text-[22px]`}></i>
                        {
                          !duration?(<>
                           <div className='text-[15px]'>{val.EnglishName}</div>
                          </>):(<></>)
                        }
                       
                        </div>
                      </div>
                    </>
                  )
                })
               }
                </div>
            </div>
            <div className='lz-animation grid grid-rows-[50px_1fr]' >
              <div className='w-full h-[50px] lz-animation relative bg-navleft flex items-center pl-3'>
                <ActionTopRight isLoginOrisHomePage={false}/>
              </div>
              <div className='py-3 px-5 blog-submenu lzscroll'>
                <Outlet/>
              </div>
            </div>
    </div>
  )
}

export default WebSectionContent