import { Pagination } from '@nextui-org/react'
import React from 'react'

function LZPagination({SelectPage}) {
    const ChangePagination=(page)=>{
        SelectPage(page)
    }
  return (
    <div className='mt-5 flex justify-end'>
        <Pagination total={10} classNames={{item:'bg-navleft'}}  onChange={ChangePagination} page={4} initialPage={10} variant='flat'/>
    </div>
  )
}

export default LZPagination