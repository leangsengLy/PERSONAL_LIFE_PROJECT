import React from 'react'
import LZButton from '../../Global/Component/Button/LZButton'
import {setIsShowModal} from '../../Store/Modal/ModalStore';
import { useDispatch, useSelector } from 'react-redux'

function Movie() {
    const tr = useSelector(state=>state.Language.translate)
    const dispatch = useDispatch()
    const onClickCreate=()=>{
        console.log("click the button create")
    }
    const onClickMore=()=>{
        dispatch(setIsShowModal(true))
        console.log("click the button create")
    }
  return (
    <>
    <div className='flex justify-between mb-4'>
        <b>{tr.movie}</b>
        <LZButton label={tr.add} click={onClickCreate}/>
    </div>
    <div className='grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4'>
        {
            [2,3,4,3,4,5,6,4,2,3,4,3,4,5].map((val)=>{
                return (<><div className='flex flex-col gap-y-2'>
                    <div className='w-full h-[150px] overflow-hidden rounded-lg'>
                        <img src="http://localhost:8080/Image/movie/20250509071945_Ghost.jpg" alt=""  className='preview-image cursor-pointer object-cover w-full h-full'/>
                    </div>
                    <div className='flex flex-col gap-y-[2px'>
                        <p className='text-[13px]'>រឿងនិនចា</p>
                        <p className='text-[12px] cursor-pointer' onClick={onClickMore}>{tr.more}...</p>
                    </div>
                </div></>)
            })
        }
    </div>
    </>
  )
}

export default Movie