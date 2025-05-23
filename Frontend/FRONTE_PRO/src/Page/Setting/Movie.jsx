import React, { lazy, useEffect, useState } from 'react'
import LZButton from '../../Component/Button/LZButton'
import {setIsShowModal,setBody,setModal,setLabel} from '../../Store/Modal/ModalStore';
import { useDispatch, useSelector } from 'react-redux'
import { HttpRequest } from '../../Global/API_HTTP/http';
import '../../Css/Setting/Movie.css';
import LZGlobal from '../../Util/LZGlobal';
import { setIframe, setIsShow } from '../../Store/PreviewIFrame/PreviewIFrame';
import {setIsShow as SetIsShowConfirm,setModalConfirm} from '../../Store/Confirm/Confirm' 
import moment from 'moment';
import LZSearch from '../../Component/LZTableDefault/LZSearch';
import LZPagination from '../../Component/LZTableDefault/LZPagination';
import LZSelectRecord from '../../Component/LZTableDefault/LZSelectRecord';
import LZModalForm from '../../Component/Modal/LZModalForm';
import LZNoData from '../../Component/BlogContent/LZNoData';
import { use } from 'react';
import { getLanguage } from '../../Store/Language/Langauge';
function Movie() {
    const tr = useSelector(state=>state.Language.translate)
    const [movies,setMovies]  = useState([]);
    const [dataMovie,setDataMovie]  = useState([]);
    const [isLoading,setIsLoading]  = useState(false);
    const [isShowModalForm,setIsShowModalForm]  = useState(false);
    const [Search,setSearch]  = useState("");
    const [URLYoutube,setURlYoutube]  = useState("");
    const [Page,setPage]  = useState(1);
    const [Record,setRecord]  = useState(10);
    const [from,setForm]  = useState([]);
    const dispatch = useDispatch()
     const onClosePreviewMore=()=>{
        dispatch(setIsShowModal(false))
    }
    useEffect(()=>{
        setURlYoutube("")
    },[isShowModalForm])
    useEffect(()=>{
        setForm([
            {type:"input",label:tr.name,required:true,name:"Name"},
            {type:"input",label:tr.english_name,name:"EnglishName"},
            {type:"number",label:tr.duration,required:true,name:"Duration"},
            {type:"date",label:tr.release_date,required:true,name:"Release"},
            {type:"date",label:tr.from_date,required:true,name:"FromDate"},
            {type:"date",label:tr.to_date,required:true,name:"ToDate"},
            {type:"select",
                name:"MovieType",
                required:true,
                label:tr.movie_type,
                options:{
                    isMulti:false,
                    api:{
                        url:"/api/movie_type/list",
                        method:"post",
                        data:{  
                                search:"",
                                pages:1,
                                records:100
                        },
                        key:"Id",
                        value:LZGlobal.translate({en:"EnglishName",km:"Name"})
                    },
                    startContent:(item)=>{
                        return (<>
                                </>)
                    },
                    renderValue:(items,list)=>{
                            var item = list.find((val)=>val.key==items[0].key)
                            return (
                                <>
                                    <div className='flex gap-x-2 items-center' >
                                        <span className='text-[13px] text-black'>{item[LZGlobal.translate({en:"EnglishName",km:"Name"})]}</span>
                                    </div>
                                </>
                            );
                        }
                }
            },
            {type:"input",label:tr.link_youtube,onChange:onChangeLinkYoutube,focus:"selectAll",name:"UrlYT"},
            {type:"iframe",URL:URLYoutube},
            {type:"textarea",label:tr.description,name:"Description"},
        ]);
        console.log("from",from)
    },[tr,URLYoutube])
    const onChangeLinkYoutube=(value)=>{
        console.log("value",value)
        setURlYoutube(value)
    }
    const onClickButton=()=>{}
       const OnPreviewIframe=(data)=>{
         dispatch(setIsShow(true))
         dispatch(setIframe({path:dataMovie?.UrlYT}))
    }
      const onClickButtonDelete=()=>{
        console.log("HOng")
        dispatch(SetIsShowConfirm(true))
    }

      const body = <div className='w-full h-full'>
            <div className='w-full h-[160px] relative'>
                <div onClick={onClosePreviewMore} className='absolute opacity-40 hover:opacity-100 transition-all ease-linear flex top-4 right-4 w-[30px] h-[30px]  justify-center items-center rounded-full bg-red-50'><i class="ri-close-line  rounded-full text-[23px]  cursor-pointer" ></i></div>
                <div onClick={OnPreviewIframe}  className='absolute displayMiddle cursor-pointer w-[50px] flex justify-center items-center h-[50px] rounded-full bg-red-600' >
                    <i class="ri-play-fill scale-100 text-white"></i>
                </div>
                <img src={`http://localhost:8080${dataMovie.ImagePath}`} className='object-cover w-full h-full' alt="" />
            </div>
            <div className='p-3 grid gap-y-3 '>
                <div className=''>
                    <div className=' flex justify-between'>
                            <div className='flex gap-x-2 items-center' >
                                <b className='text-[18px]'>{LZGlobal.translate({en:dataMovie.EnglishName,km:dataMovie.Name})}</b>
                                 <span className='text-medium'>• {LZGlobal.convertTime(dataMovie.Duration).hour}h{LZGlobal.convertTime(dataMovie.Duration).minute}mn</span>
                            </div>
                            <div className='px-3 bg-[#7070702f] text-[12px] py-1 rounded-md'>
                                Action
                            </div>
                    </div>
                    <p className='color-1 text-[13px]' >{moment(dataMovie.FromDate).format("MMM DD,YYYY")} - {moment(dataMovie.ToDate).format("MMM DD,YYYY")}</p>
                </div>
                <div>
                    {
                        dataMovie.Description!=""?(<>
                         <p className='text-[14px] mb-1'>{tr.description}</p>
                    <p className='text-[13px] color-2'>{dataMovie.Description}</p></>):(<></>)
                    }
                   
                </div>
                <LZButton isFullWith={true} click={onClickButtonDelete} cl="danger" label={tr.delete}/>
            </div>
    </div>
    // const onClickOk=()=>{
    //     console.log("OK")
    //             dispatch(setIsShowModal(false))
    // }
    // const onClickCancel=()=>{
    //         dispatch(setIsShowModal(false))
    // }
    // useEffect(()=>{
    //     console.log("dataMovie",dataMovie)
    // },[dataMovie])
    // const modalCreate=<div>
    //     <div>

    //     </div>
    //     <div className='flex justify-end gap-x-2'>
    //         <LZButton Variant="light" typeButton="cancel" label={tr.cancel} click={onClickCancel}/>
    //         <LZButton typeButton="save" label={tr.ok} click={onClickOk}/>
    //     </div>
    // </div>
    const onClickCreate=()=>{
        setIsShowModalForm(true)
    }
    useEffect(()=>{
        dispatch(setModalConfirm({
        type:"delete",
        message:"",
        onOk:()=>{
              dispatch(SetIsShowConfirm(false))
        },
        onClose:()=>{
             dispatch(SetIsShowConfirm(false))
        }
    }))
       dispatch(setBody(body))
    },[])
    const onClickMore=(data)=>{
        dispatch(setModal({isPadding:true,w:"w-[440px]"}))
        dispatch(setLabel(""))
        setDataMovie(data);
        dispatch(setIsShowModal(true))
    }
    useEffect(()=>{
        dispatch(setBody(body))
    },[dataMovie])
    
    useEffect(()=>{
        getMovieList();
    },[Search,Record,Page])
  
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
                            Search:Search,
                            Pages:Page,
                            Records:Record,
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
    const onSearching=(search)=>{
        setSearch(search)
    }
    const onCloseForm=()=>{
        setIsShowModalForm(false)
    }
    const onSelectRecord=(record)=>{
        setRecord(record)
    }
    const onSelectPage=(page)=>{
        setPage(page)
    }
    const onSaveForm=(data)=>{
        console.log(data)
    }
  
     
  return (
    <>
    <div className='flex justify-between mb-4'>
        <b>{tr.movie}</b>
        <LZButton label={tr.add} typeButton="add" click={onClickCreate}/>
    </div>
    <div className='flex mb-4'>
        <LZSelectRecord SelectRecord={onSelectRecord}/>
        <LZSearch onSearching={onSearching}/>
    </div>
    <div className={`grid grid-rows-[calc(100vh-246px)_1fr]`}>
        <div>
            {
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
                    <LZNoData/>
            </>):(<></>)
        }
        </div>
        <LZPagination SelectPage={onSelectPage} totalRecord={movies.length}/>
    </div>
    <LZModalForm isShowModal={isShowModalForm} isUploadImage={true} drawerInput={from} onClose={onCloseForm} onSave={onSaveForm} columns={3} label={tr.add_movie}/>
    </>
  )
}

export default Movie