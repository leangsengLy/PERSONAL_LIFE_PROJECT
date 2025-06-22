import React, { useEffect, useRef, useState } from 'react'
import ActionTopRight from '../BlogContent/ActionTopRight'
import {  Tooltip } from '@nextui-org/react'
import { translateBy } from '../../Util/globalUtils'
import { HttpRequest } from '../../Global/API_HTTP/http'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setBranch } from '../../Store/ChooseBranch/ChooseBranch'
function LegendBranches() {
      const navigate= useNavigate();
      const dispatch = useDispatch()
    const [data,setData] = useState([])
    const [selected,setSelected] = useState({})
    const [isAnimation,setIsAnimation] = useState(false)
    const [Filter,setFilter] = useState({
        Search:"",
        Page:1,
        Record:100,
    })
    const getList=async()=>{
           await  HttpRequest({
                url:"/api/cinema/list",
                method:'post',
                data:{
                    search:Filter.Search,
                    pages:Filter.Page,
                    records:Filter.Record,
                },
                success:(result)=>{
                    setData(result)
                },
                error:(error)=>{
                }
            })
        }
        const OnSelectBranch=(data)=>{
            setIsAnimation(true)
            setSelected(data)
            dispatch(setBranch(data))
            localStorage.setItem('branch',JSON.stringify(data))
            setTimeout(() => {
              setIsAnimation(false)
               setTimeout(()=>{
                navigate("/")
               },90)
            }, 90);
           
        }
        useEffect(()=>{
            getList();
        },[])
       
  return (
      <div className='w-screen h-screen relative px-10 lz-animation bg-box-wrapper flex justify-center items-center flex-wrap color-2'>
        <ActionTopRight isLoginOrisHomePage={true} isChooseBranch={true}/>
        
        <div className='w-full'>
          <div className='mb-6 gap-y-1 flex flex-col items-center'>
            <p className='text-[25px]'>Branch of Legend</p>
            <p>Please select your current branch.</p>
          </div>
          <div className='w-full lzscroll  max-h-[550px] flex flex-col justify-center items-center'>
            <div className='wrapper-menu select-none grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] w-full h-full justify-center items-center flex-wrap gap-[21px]'>
                {
                  data.map((val)=>{
                    return (
                      <>
                      {/* <Tooltip placement='top' showArrow={true} content={translateBy({en:val.EnglishName,km:val.Name})}>
                        
                      </Tooltip> */}
                      <div onClick={()=>{OnSelectBranch(val)}} className={`${isAnimation && val.Id==selected.Id?`scale-75`:``} cursor-pointer hover-bd-primary  opacity-90 transition-all ease-linear px-3 gap-y-3 py-4 rounded-3xl border-slate flex flex-col justify-center items-center`}>
                            <div className='w-[56px] h-[56px] rounded-full bg-slate flex justify-center items-center'>
                              <i class="ri-database-2-fill color-primary text-[25px]"></i>
                            </div>
                            <div className='text-center grid gap-y-1'>
                              <p className='text-[14px]'>{translateBy({en:val.EnglishName,km:val.Name})}</p>
                              <p className='text-[12px]'>{val?.Code}</p>
                            </div>
                      </div>
                    </>
                    )
                  })
                }
            </div>
          </div>
        </div>
    </div>
  )
}

export default LegendBranches