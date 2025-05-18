import React, { useEffect, useState } from 'react'
import TemplateContent from '../../Component/BlogContent/TemplateBodyCard'
import { useSelector } from 'react-redux'
import LZGlobal from '../../Util/LZGlobal';
import { HttpRequest } from '../../Global/API_HTTP/http';

function Test() {
    const tr = useSelector(state=>state.Language.translate)
     const [movies,setMovies]  = useState([]);
    const [dataMovie,setDataMovie]  = useState([]);
     const [filter,SetFilter]=useState({
        Search:"",
        Record:10,
        Page:1,
     })
    const [isLoading,setIsLoading]  = useState(false);
    const body1 = (<>{
                movies.length!==0?(<><div className='lzscroll grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4'>
                {
                    isLoading?(<>{[1,2,3,4,5,6,7,5,6,7,5].map((val)=>{
                    return (<><div className='flex flex-col gap-y-2'>
                        <div className='w-full h-[150px] overflow-hidden rounded-lg'>
                            <div className='w-full h-full bg-loading animate-pulse'></div>
                        </div>
                        <div className='flex flex-col gap-y-[2px'>
                            <div className='text-[13px] w-[100px] h-[20px] bg-loading rounded-md animate-pulse'></div>
                            <div className='text-[13px] w-[50px] mt-2 h-[20px] bg-loading rounded-md animate-pulse'></div>
                        </div>
                    </div></>)
                        })}</>):(<>{
                        movies.length!=0?(<>{
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
                        }</>):(<></>)
                }</>)
            }</div></>):(<></>)
            }
            {
                movies.length==0?(<>
                    <div className='flex justify-center items-center flex-col'>
                        <img src={LZGlobal.NodataImage} alt="" className='w-[120px]'/>    
                        <p>{tr.no_available_data}</p></div>
                </>):(<></>)
            }</>)
    const btns = [{
                label:tr.add,
                type:"add",
                isIcon:true,
                onClick:()=>{
                    console.log("click")
                }
            },
        {
                label:tr.delete,
                isIcon:true,
                type:"delete",
                onClick:()=>{
                    console.log("click")
                }
            }       
    ]
    const OnFilter=(filter)=>{
        SetFilter({Page:filter.Page,Record:filter.Record,Search:filter.Search})
    }
    useEffect(()=>{
        getMovieList();
    },[filter])

    const getMovieList = async()=>{
        setIsLoading(true)
         await HttpRequest({
                     url:"api/movie/list",
                     method:"Post",
                     data:{
                            id:"",
                            fromDate:"",
                            toDate:"",
                            search:"",
                            duration:"",
                            release:"",
                            Search:filter.Search,
                            Pages:filter.Page,
                            Records:filter.Record,
                     },
                     success:(result)=>{
                         setIsLoading(false)
                        setMovies(result);
                     },
                     error:(error)=>{
                         ShowSnackbar({message:error.message,type:"error"})
                     }
                 })
    }
  return (
    <TemplateContent body={body1} title={tr.movie} btns={btns} onfilter={OnFilter} recordCount={movies.length}/>
  )
}

export default Test