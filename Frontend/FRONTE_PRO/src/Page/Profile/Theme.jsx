import React from 'react'

function Theme() {
  return (
    <div className='w-full'>
        <h2>Theme</h2>
        <p>In the below for switch the theme between mode white and dark</p>
        <div className='wrapper-color flex gap-2 flex-wrap mt-3'>
          {
            [1,2,3,42,3,4,5,6,6,6,1,2,2,5,2,3,4,5,6,1,2,3,3,2,3,3,3,3,3,3,3,3,3,4,1,2,2].map((val)=>{
              return (<><div className='w-[40px] cursor-pointer h-[40px] rounded-md bg-white'>
                </div></>)
            })
          }
        </div>
        <div className='w-full flex h-auto justify-center items-center flex-col gap-y-5 mt-8'>
            <p>Pick up your color sysyem</p>
            <div className='w-[70px] h-[70px] rounded-full bg-red-500'></div>
        </div>
    </div>
  )
}

export default Theme