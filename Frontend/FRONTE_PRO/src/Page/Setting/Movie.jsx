import React, { useEffect, useState } from 'react'
import LZButton from '../../Global/Component/Button/LZButton'
import {setIsShowModal,setBody,setModal} from '../../Store/Modal/ModalStore';
import { useDispatch, useSelector } from 'react-redux'
import { HttpRequest } from '../../Global/API_HTTP/http';
import '../../Css/Setting/Movie.css';
import LZGlobal from '../../Util/LZGlobal';
function Movie() {
    const tr = useSelector(state=>state.Language.translate)
    const [movies,setMovies]  = useState([]);
    const [dataMovie,setDataMovie]  = useState([]);
    const dispatch = useDispatch()
   

  
    const onClickCreate=()=>{
        console.log("click the button create")
    }
    const onClosePreviewMore=()=>{
             dispatch(setIsShowModal(false))
    }
    const onClickMore=(data)=>{
        setDataMovie(data);
        dispatch(setIsShowModal(true))
        console.log("click the button create")
    }
    useEffect(()=>{
        getMovieList();
    },[])
    const getMovieList = async()=>{
         await HttpRequest({
                     url:"api/movie/list",
                     method:"Post",
                     data:{
                            id:"",
                            fromDate:"",
                            toDate:"",
                            search:"",
                            duration:"",
                            release:""
                     },
                     success:(result)=>{
                        setMovies(result);
                     },
                     error:(error)=>{
                         ShowSnackbar({message:error.message,type:"error"})
                     }
                 })
    }
    
     const body = <div className='w-full h-full'>
            <div className='w-full h-[160px] bg-red-600 relative'>
                <div onClick={onClosePreviewMore} className='absolute opacity-40 hover:opacity-100 transition-all ease-linear flex top-4 right-4 w-[30px] h-[30px]  justify-center items-center rounded-full bg-red-50'><i class="ri-close-line  rounded-full text-[23px]  cursor-pointer" ></i></div>
                <div className='absolute displayMiddle cursor-pointer w-[50px] flex justify-center items-center h-[50px] rounded-full bg-red-600' >
                    <i class="ri-play-fill scale-100 text-white"></i>
                </div>
                <img src={`http://localhost:8080${dataMovie.ImagePath}`} className='object-cover w-full h-full' alt="" />
            </div>
            <div className='p-3 grid gap-y-3 '>
                <div className=''>
                    <div className=' flex justify-between'>
                            <div className='flex gap-x-2 items-center' >
                                <b className='text-[18px]'>{LZGlobal.translate({en:dataMovie.EnglishName,km:dataMovie.Name})}</b>
                                 <span className='text-medium'>• {dataMovie.Duration}mn</span>
                            </div>
                            <div className='px-3 bg-[#7070702f] text-[12px] py-1 rounded-md'>
                                Action
                            </div>
                    </div>
                    <p className='color-1 text-[13px]'>Cremation, The</p>
                    <p className='color-1 text-[13px]' >January 20,2025 - January 25-2025</p>
                </div>
                <div>
                    {
                        dataMovie.Description!=""?(<>
                         <p className='text-[14px]'>Description</p>
                    <p className='text-[13px]'>{dataMovie.Description}</p></>):(<></>)
                    }
                   
                </div>
                <div className='w-full text-white cursor-pointer transition-all ease-in h-[55px] bg-red-400 hover:bg-red-600 flex justify-center items-center rounded-xl'>
                        Delete
                </div>
            </div>
    </div>
        dispatch(setBody(body))
  return (
    <>
    <div className='flex justify-between mb-4'>
        <b>{tr.movie}</b>
        <LZButton label={tr.add} click={onClickCreate}/>
    </div>
    <div className='grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4'>
        {
            movies.map((val)=>{
                return (<><div className='flex flex-col gap-y-2'>
                    <div className='w-full h-[150px] overflow-hidden rounded-lg'>
                        <img src={`http://localhost:8080${val.ImagePath}`} alt=""  className='preview-image cursor-pointer object-cover w-full h-full'/>
                    </div>
                    <div className='flex flex-col gap-y-[2px'>
                        <p className='text-[13px]'>{LZGlobal.translate({en:val.EnglishName,km:val.Name})}</p>
                        <p className='text-[12px] cursor-pointer' onClick={()=>{onClickMore(val)}}>{tr.more}...</p>
                    </div>
                </div></>)
            })
        }
    </div>
    </>
  )
}

export default Movie