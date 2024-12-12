import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getLanguage } from '../../Store/Language/Langauge';

function Language() {
  const languages = useSelector(state=>state.Language.Languages);
  const Selectlanguages = useSelector(state=>state.Language.language);

  const dispatch = useDispatch()
  const OnSelectLanguage =(code)=>{
    dispatch(getLanguage(code))
  }
  console.log(languages)
  return (
    <div className='w-full'>
        <h2>Language</h2>
        <p>In the below you can choose your language in our system </p>
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