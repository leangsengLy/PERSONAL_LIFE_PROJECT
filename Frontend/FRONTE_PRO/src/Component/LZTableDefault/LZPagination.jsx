import { Pagination } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { SoundAudio } from '../../Util/Sound'

function LZPagination({SelectPage,totalRecord=0,page=1,record=10}) {
     const click = SoundAudio('click')
  const [Page,SetPage] = useState(page)
  const [ActivePage,setActivePage] = useState(1)
    const ChangePagination=(page)=>{
      click.play()
      SetPage(page)
    }
   
    useEffect(()=>{
      SelectPage(Page)
      setActivePage(1)
    },[Page])
  return (
    <div className='mt-5 flex justify-between items-center'>
        <p>Total Record: {totalRecord}</p>
        <Pagination total={(totalRecord/record)+1} classNames={{item:'bg-navleft'}}  onChange={ChangePagination} page={ActivePage} initialPage={10} variant='flat'/>
    </div>
  )
}

export default LZPagination