import React, { useEffect, useRef, useState } from 'react'
import ActionTopRight from '../../Component/BlogContent/ActionTopRight'
import Language from './Language.jsx';
import Theme from './Theme.jsx';
import ColorSystem from './ColorSystem.jsx';
import Profile from './Profile.jsx';
import { useSelector } from 'react-redux';
import { translateBy } from '../../Util/globalUtils.js';
import { useNavigate } from 'react-router-dom';

function ProfileIndex() {
 const tr = useSelector(state=>state.Language.translate)
  const [MenuTab,SetMenuTab] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    SetMenuTab([
    {code:'Profile',label:tr.profile},
    {code:'Theme',label:tr.theme},
    {code:'Color System',label:tr.color_system},
    {code:'Language',label:tr.language},
  ])
  },[tr])
  const [SelectTab,SetSelectTab] = useState({code:'Profile',label:tr.profile},);
    const currentBranch = useSelector(s=>s.branch.branch);
  const [renderHtml , setRenderHtml] = useState(<Profile/>)
  const ClickTab=(val)=>{
    SetSelectTab(val)
     if(val.code=="Theme") setRenderHtml(<Theme/>);
    else if(val.code=="Language") setRenderHtml(<Language/>);
    else if(val.code=="Color System") setRenderHtml(<ColorSystem/>);
    else if(val.code=="Profile") setRenderHtml(<Profile/>);
  }
  const BackToHome=()=>{
    navigate('/')
  }
  return (
    <div className='w-screen relative h-screen px-10 lz-animation bg-box-wrapper flex justify-center items-center flex-wrap color-2'>
        <div>
          <div className='absolute top-5 left-4'>
             <div  onClick={BackToHome}  className='px-4 py-2 border-slate opacity-70 cursor-pointer transition-all ease-linear text-[15px] hover:opacity-100 rounded-xl'>
                      <i class="ri-database-2-fill color-primary text-[18px]"></i> {translateBy({en:currentBranch?.EnglishName,km:currentBranch?.Name})} 
              </div>
          </div>
          <ActionTopRight isLoginOrisHomePage={true} />
        </div>
        <div className='grid grid-cols-[250px_1fr] gap-x-5 h-[600px] w-[900px] rounded-[24px]'>
            <div className='w-full bg-slate rounded-[18px] px-5 py-6 flex flex-col gap-y-2'>
              <div className='font-bold color-1 text-[18px] color-primary mb-1'><i class="ri-settings-2-line mr-1"></i> {tr.setting}</div>
              <div className='grid gap-y-[15px]'>
                {
                  MenuTab.map((val)=>{
                    return (<><div cl onClick={()=>{ClickTab(val)}} className={`${SelectTab.code==val.code?`color-primary`:``} cursor-pointer`}>{val.label}</div></>)
                  })
                }
              </div>
            </div>
            <div className={`${SelectTab.code=="Profile"?``:`px-5 py-6`} overflow-hidden w-full bg-slate rounded-[18px] `}>
              {renderHtml}
            </div>
        </div>
        <p className='absolute bottom-4  color-1 right-6'>Develop by: Ly Zee Vlogger</p>
    </div>
  )
}

export default ProfileIndex