import { Input } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import LZToolTip from '../ToolTip/LZToolTip'

function LZSearch({onSearching}) {
    const [isHasSearch,SetisHasSearch]= useState(false)
    const [search,SetSearch] = useState('')
    const [SetTimeOut,setsetTimeOut] = useState(null)
    const onInputSearch=(e)=>{
        SetisHasSearch(e.target.value.length>0)
        SetSearch(e.target.value)
       
    }
    const ClearSearch=()=>{
        SetSearch('')
        SetisHasSearch(false)
    }
    useEffect(()=>{
      clearTimeout(SetTimeOut)
      setsetTimeOut(setTimeout(()=>{
          onSearching(search)
        },600))
    },[search])
    const ClearButton = <i className="ri-close-circle-line cursor-pointer" onClick={ClearSearch}></i>;
  return (
    <div>
        <Input placeholder='Search' classNames={{innerWrapper:'bg-navleft',inputWrapper:'bg-navleft'}} value={search} className='focus:outline-none' onChange={onInputSearch} variant='flat' 
        startContent={<><i className="ri-search-2-line"></i></>} 
        endContent={<>
        {
            isHasSearch?<><LZToolTip title="Clear search" content={ClearButton}/></>
            :<></>
        }</>}/>
    </div>
  )
}

export default LZSearch