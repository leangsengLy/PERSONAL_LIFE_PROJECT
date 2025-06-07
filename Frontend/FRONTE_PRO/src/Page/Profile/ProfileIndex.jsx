import React, { useEffect, useRef, useState } from 'react'
import ActionTopRight from '../../Component/BlogContent/ActionTopRight'
import SecurityProfile from './SecurityProfile.jsx';
import Language from './Language.jsx';
import Theme from './Theme.jsx';
import ColorSystem from './ColorSystem.jsx';
import Profile from './Profile.jsx';

function ProfileIndex() {
  const [MenuTab,SetMenuTab] = useState([
    'Profile',
    'Security',
    'Theme',
    'Color System',
    'Language',
  ])
  const [SelectTab,SetSelectTab] = useState('Profile');
  const [renderHtml , setRenderHtml] = useState(<Profile/>)
  const ClickTab=(val)=>{
    SetSelectTab(val)
    if(val=="Security") setRenderHtml(<SecurityProfile/>);
    else if(val=="Theme") setRenderHtml(<Theme/>);
    else if(val=="Language") setRenderHtml(<Language/>);
    else if(val=="Color System") setRenderHtml(<ColorSystem/>);
    else if(val=="Profile") setRenderHtml(<Profile/>);
  }
  
  return (
    <div className='w-screen relative h-screen px-10 lz-animation bg-box-wrapper flex justify-center items-center flex-wrap color-2'>
        <ActionTopRight isLoginOrisHomePage={true} />
        <div className='grid grid-cols-[250px_1fr] gap-x-5 h-[600px] w-[900px] rounded-[24px]'>
            <div className='w-full bg-slate rounded-[18px] px-5 py-6 flex flex-col gap-y-2'>
              <div className='font-bold color-1 text-[18px] color-primary'>Setting</div>
              <div className='grid gap-y-[15px]'>
                {
                  MenuTab.map((val)=>{
                    return (<><div cl onClick={()=>{ClickTab(val)}} className={`${SelectTab==val?`color-primary`:``} cursor-pointer`}>{val}</div></>)
                  })
                }
              </div>
            </div>
            <div className='w-full bg-slate rounded-[18px] px-5 py-6'>
              {renderHtml}
            </div>
        </div>
        <p className='absolute bottom-4  color-1 right-6'>Develop by: Ly Zee Vlogger</p>
    </div>
  )
}

export default ProfileIndex