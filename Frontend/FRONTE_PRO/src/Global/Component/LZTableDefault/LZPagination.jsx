import { Pagination } from '@nextui-org/react'
import React from 'react'

function LZPagination({SelectPage,totalRecord=0}) {
    const ChangePagination=(page)=>{
        SelectPage(page)
    }
  return (
    <div className='mt-5 flex justify-between items-center'>
        <p>Total Record: {totalRecord}</p>
        <Pagination total={10} classNames={{item:'bg-navleft'}}  onChange={ChangePagination} page={1} initialPage={10} variant='flat'/>
    </div>
  )
}

export default LZPagination