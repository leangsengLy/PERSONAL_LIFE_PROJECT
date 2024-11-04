import React from 'react'
import money from '../../public/Menu/money.svg'
import ActionTopRight from './BlogContent/ActionTopRight'
const HomeMenu = () => {
  return (
    <div className='w-screen h-screen px-10 bg-box-wrapper flex justify-center items-center flex-wrap color-2'>
        <ActionTopRight/>
        <div className='max-w-[705px] lzscroll   max-h-[550px] flex flex-col justify-center items-center'>
          <div className='wrapper-menu  w-full h-full flex justify-center items-center flex-wrap gap-[21px]'>
              {
                [1,2,3,4,5,6,7,8,9,1,2,3].map((val)=>{
                  return (
                    <>
                    <div className='w-[100px] h-[100px] rounded-3xl border-primary flex justify-center items-center'>
                        <img src={money} alt="" className='w-[66px] h-[66px] cursor-pointer'/>
                  </div>
                  </>
                  )
                })
              }
          </div>
        </div>
    </div>
  )
}

export default HomeMenu