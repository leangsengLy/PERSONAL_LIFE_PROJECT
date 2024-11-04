import React from 'react'
import ActionTopRight from './BlogContent/ActionTopRight'
import { StoreMenu } from '../MenuStore/menuData'
import { Tooltip } from '@nextui-org/react'
import { translateBy } from '../Util/globalUtils'
const HomeMenu = () => {

  return (
    <div className='w-screen h-screen px-10 bg-box-wrapper flex justify-center items-center flex-wrap color-2'>
        <ActionTopRight/>
        <div className='max-w-[705px] lzscroll   max-h-[550px] flex flex-col justify-center items-center'>
          <div className='wrapper-menu  w-full h-full flex justify-center items-center flex-wrap gap-[21px]'>
              {
                StoreMenu.map((val)=>{
                  return (
                    <>
                    <Tooltip placement='top' showArrow={true} content={translateBy({en:val.EnglishName,km:val.Name})}>
                        <div className='w-[100px] h-[100px] rounded-3xl border-primary flex justify-center items-center'>
                            <img src={val.iconImage} alt="" className='w-[66px] h-[66px] cursor-pointer'/>
                      </div>
                    </Tooltip>
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