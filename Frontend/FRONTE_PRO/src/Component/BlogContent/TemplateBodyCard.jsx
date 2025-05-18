import React, { useEffect, useState } from 'react'
import LZButton from '../Button/LZButton'
import { useDispatch, useSelector } from 'react-redux'
import '../../Css/Setting/Movie.css';
import LZSearch from '../LZTableDefault/LZSearch';
import LZPagination from '../LZTableDefault/LZPagination';
import LZSelectRecord from '../LZTableDefault/LZSelectRecord';
function TemplateBodyCard({body,btns,title,onfilter,recordCount}) {
    const [Search,setSearch]  = useState("");
    const [Page,setPage]  = useState(1);
    const [Record,setRecord]  = useState(10);
    useEffect(()=>{
        if(onfilter!=undefined){
            onfilter({Search:Search,Record:Record,Page:Page})
        }
    },[Search,Record,Page])
    
    const onSearching=(search)=>{
        setSearch(search)
    }
    const onSelectRecord=(record)=>{
        setRecord(record)
    }
    const onSelectPage=(page)=>{
        setPage(page)
    }
  return (
    <>
    <div className='flex justify-between mb-4'>
        <b>{title||""}</b>
        {
            btns?.length>0?(<><div className='flex gap-x-2'>{btns.map((val)=>{
            return (
                <>
                    <LZButton label={val.label}  isDisabled={val.isDisabled??false} isIcon={val.isIcon??false}  typeButton={val.type} click={val.onClick}/>
                </>
            )
        })}</div></>):(<></>)
        }
     
    </div>
    <div className='flex mb-4'>
        <LZSelectRecord SelectRecord={onSelectRecord}/>
        <LZSearch onSearching={onSearching}/>
    </div>
    <div className={`grid grid-rows-[calc(100vh-246px)_1fr]`}>
        {body}
        <LZPagination SelectPage={onSelectPage} totalRecord={recordCount||0}/>
    </div>
    </>
  )
}

export default TemplateBodyCard