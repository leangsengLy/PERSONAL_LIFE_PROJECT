import React from 'react'
import LZGlobal from '../../Util/LZGlobal'
import { useSelector } from 'react-redux'

function LZNoData() {
    const tr = useSelector(state=>state.Language.translate)
  return (
    <div className='flex justify-center items-center h-full flex-col'>
        <img src={LZGlobal.NodataImage} alt="" className='w-[120px]'/>    
        <p>{tr.no_available_data}</p>
    </div>
  )
}

export default LZNoData