import React from 'react'
import NotfoundImage from '../../public/Image/PageNotFound/pagenotfound.jpg'
function PageNotFound() {
  return (
    <div className='w-screen h-screen bg-white flex justify-center items-center'>
        <img src={NotfoundImage} alt="" className='!max-w-[1000px] w-full'/>
    </div>
  )
}

export default PageNotFound