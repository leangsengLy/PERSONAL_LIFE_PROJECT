import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getLanguage } from '../../Store/Language/Langauge';

function Language() {
  const languages = useSelector(state=>state.Language.Languages);
    const tr = useSelector(state=>state.Language.translate)
  const Selectlanguages = useSelector(state=>state.Language.language);

  const dispatch = useDispatch()
  const OnSelectLanguage =(code)=>{
    dispatch(getLanguage(code))
  }
  return (
    <div className='w-full'>
        <h2>{tr.language}</h2>
        <p className="text-[13px]">{tr.select_your_country_for_easy_to_use_our_system}</p>
        <div className='wrapper-color flex gap-2 flex-wrap mt-3'>
          {
            languages.map((val)=>{
              return (<><div className='cursor-pointer w-[80px] h-[50px] rounded-md ' onClick={()=>{OnSelectLanguage(val.code)}}>
                <img className='w-full h-full object-cover  rounded-md ' src={val.Image}/>
              </div></>)
            })
          }
        </div>
        <div className='w-full flex h-auto justify-center items-center flex-col gap-y-5 mt-8'>
            <p>Pick up your color sysyem</p>
            <div className='w-[130px] h-[80px] rounded-md '>
              <img className='w-full h-full object-cover  rounded-md ' src={Selectlanguages.Image}/>
            </div>
        </div>
    </div>
  )
}

export default Language