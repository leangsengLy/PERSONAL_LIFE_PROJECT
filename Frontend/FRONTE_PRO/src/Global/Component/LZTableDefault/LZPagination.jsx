import { Pagination } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

function LZPagination({SelectPage,totalRecord=0}) {
  const [Page,SetPage] = useState(1)
    const ChangePagination=(page)=>{
      SetPage(page)
    }
    useEffect(()=>{
      SelectPage(Page)
    },[Page])
  return (
    <div className='mt-5 flex justify-between items-center'>
        <p>Total Record: {totalRecord}</p>
        <Pagination total={10} classNames={{item:'bg-navleft'}}  onChange={ChangePagination} page={1} initialPage={10} variant='flat'/>
    </div>
  )
}

export default LZPagination