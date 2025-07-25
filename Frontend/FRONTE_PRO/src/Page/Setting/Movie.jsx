import LZButton from '../../Component/Button/LZButton'
import React, { lazy, useEffect, useState } from 'react'
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
import { ShowSnackbar } from '../../Util/globalUtils';
import { SoundAudio } from '../../Util/Sound';
import LZPopover from '../../Component/Popover/LZPopover';
import LZChip from '../../Component/Chip/LZChip';
function Movie() {
    const tr = useSelector(state=>state.Language.translate)
    const [movies,setMovies]  = useState([]);
    const [dataMovie,setDataMovie]  = useState([]);
    const [Chips,setChips]  = useState([]);
    const [ListMovieType,setListMovieType]  = useState([]);
     const [Id,setId] = useState(false);
    const [isLoading,setIsLoading]  = useState(false);
    const [isClearChip,setIsClearChip]  = useState(false);
    const [isShowModalForm,setIsShowModalForm]  = useState(false);
    const [Search,setSearch]  = useState("");
    const [URLYoutube,setURlYoutube]  = useState("");
    const [Page,setPage]  = useState(1);
    const [Record,setRecord]  = useState(40);
    const [MovieTypeId,setMovieTypeId]  = useState(0);
    const [from,setForm]  = useState([]);
    const [dataEdit,setDataEdit]  = useState({});
    const [newCreated,setNewCreated]  = useState("");
    const dispatch = useDispatch()
     const onClosePreviewMore=()=>{
        dispatch(setIsShowModal(false))
    }
      const click = SoundAudio('click')
      const noti = SoundAudio('noti')
      const fail = SoundAudio('fail')
    useEffect(()=>{
        setURlYoutube("")
    //    setNewCreated("")
       if(!isShowModalForm){
           setDataEdit({})
        //    getMovieList();
       }
    },[isShowModalForm])
    const getListMovieType = async()=>{
        await HttpRequest({
            url:"/api/movie_type/list",
            method:"post",
            data:{
                search:"",
                pages:1,
                records:100
            },
            success:(result)=>{
                setListMovieType(result.map((val)=>({...val,key:val.Id,value:LZGlobal.translate({en:val.EnglishName,km:val.Name})})))
            },
            error:(error)=>{
                ShowSnackbar({message:error.message,type:"error"})
            }
        })
    }
    useEffect(()=>{
        setForm([
            {type:"input",label:tr.name,required:true,name:"Name"},
            {type:"input",label:tr.english_name,name:"EnglishName"},
            {type:"number",label:tr.duration,required:true,name:"Duration"},
            {type:"date",label:tr.release_date,required:true,name:"Release"},
            {type:"date",label:tr.from_date,required:true,name:"FromDate"},
            {type:"date",label:tr.to_date,required:true,name:"ToDate"},
            {type:"select",
                required:true,
                name:"MovieTypeId",
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
    },[tr,URLYoutube])
    const onChangeLinkYoutube=(value)=>{
        console.log("value",value)
        setURlYoutube(value)
    }
    const OnPreviewIframe=(data)=>{
         dispatch(setIsShow(true))
         dispatch(setIframe({path:dataMovie?.UrlYT}))
    }
      const onClickButtonDelete=()=>{
        dispatch(setModalConfirm({
            type:"delete",
            message:"",
            onOk: ()=>{
                DeleteMovie();
                dispatch(SetIsShowConfirm(false))
            },
            onClose:()=>{
                dispatch(SetIsShowConfirm(false))
            }
        }))
        dispatch(SetIsShowConfirm(true))
    }
    const itemsFilter = [
        {type:"select",
                required:true,
                name:"MovieTypeId",
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
    ]
      const body = <div className='w-full h-full'>
            <div className='w-full h-[160px] relative'>
                <div onClick={onClosePreviewMore} className='absolute opacity-40 hover:opacity-100 transition-all ease-linear flex top-4 right-4 w-[30px] h-[30px]  justify-center items-center rounded-full bg-red-50'><i class="ri-close-line  rounded-full text-[23px]  cursor-pointer" ></i></div>
                <div onClick={OnPreviewIframe}  className='absolute displayMiddle cursor-pointer w-[50px] flex justify-center items-center h-[50px] rounded-full bg-red-600' >
                    <i class="ri-play-fill scale-100 text-white"></i>
                </div>
                <div className='absolute bottom-3 right-3'>
                      <div className='px-3 bg-[#1d1d1dc5] text-[12px] text-white py-1 rounded-md'>
                        {console.log("listMovieType",ListMovieType)}
                            {dataMovie.MovieTypeId!=0?LZGlobal.translate({en:ListMovieType.find((val)=>val.key==dataMovie.MovieTypeId)?.EnglishName,km:ListMovieType.find((val)=>val.key==dataMovie.MovieTypeId)?.Name}):""}
                        </div>
                </div>
                <img src={dataMovie.ImagePath==null?LZGlobal.ComingSoon: `http://localhost:8080${dataMovie.ImagePath}`} className='object-cover w-full h-full' alt="" />
            </div>
            <div className='p-3 grid gap-y-3 '>
                <div className=''>
                    <div className=' flex justify-between'>
                            <div className='flex gap-x-2 items-center' >
                                <b className='text-[16px]'>{LZGlobal.translate({en:dataMovie.EnglishName,km:dataMovie.Name})}</b>
                                 <span className='text-medium'>• {LZGlobal.convertTime(dataMovie.Duration).hour}h{LZGlobal.convertTime(dataMovie.Duration).minute}mn</span>
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
    useEffect(()=>{
       getListMovieType()
    },[])
    // const modalCreate=<div>
    //     <div>

    //     </div>
    //     <div className='flex justify-end gap-x-2'>
    //         <LZButton Variant="light" typeButton="cancel" label={tr.cancel} click={onClickCancel}/>
    //         <LZButton typeButton="save" label={tr.ok} click={onClickOk}/>
    //     </div>
    // </div>
    const onClickCreate=()=>{
        setNewCreated(true)
        setIsShowModalForm(true)
    }
    // useEffect(()=>{
    //     console.log("isCreate MOvie",isCreate)
    // },[isCreate])

    useEffect(()=>{
       dispatch(setBody(body))
    },[dataMovie])
    const DeleteMovie=async ()=>{
        console.log("dataMovie",dataMovie)
            await HttpRequest({
                url:`/api/movie/delete?Id=${dataMovie.Id}`,
                method:"get",
                success:(result)=>{
                    dispatch(setIsShowModal(false))
                    getMovieList();
                },
                error:(err)=>{
                    ShowSnackbar({message:err.message,type:'error'})
                }
            })
    }
    const onClickActionImage=(data)=>{
        click.play();
        setDataEdit(data);
        setId(data.Id)
        setIsShowModalForm(true)
        setNewCreated(false)
        setTimeout(()=>{
            setId(0)
        },100)
    }
    const onClickMore=(data)=>{
        console.log(data)
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
  
    const getMovieList = async ()=>{
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
                            movieTypeId:MovieTypeId,
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
          click.play();
        setIsShowModalForm(false)
    }
    // const onSelectRecord=(record)=>{
    //     setRecord(record)
    // }
    const relaodList=()=>{
        getMovieList();
    }
    const onSelectPage=(page)=>{
        setPage(page)
    }
    const onSaveForm=(data)=>{
        console.log("data",data)
        console.log("newCreated",newCreated)
        click.play();
        if(newCreated) saveUpdate(data);
        else{
            dispatch(setModalConfirm({
                type:"Comfirm",
                message:"Do you want to update this movie?",
                onOk: ()=>{
                    saveUpdate(data);
                    dispatch(SetIsShowConfirm(false))
                },
                onClose:()=>{
                    dispatch(SetIsShowConfirm(false))
                }
            }))
            dispatch(SetIsShowConfirm(true))
        }
    }
  const saveUpdate=async(data)=>{
    await HttpRequest({
                    url:newCreated?"api/movie/create":"api/movie/update",
                    method:"Post",
                    data:{
                        id:newCreated?0:data.Id,
                        movieTypeId:data?.MovieTypeId,
                        name:data?.Name,
                        englishName:data?.EnglishName,
                        duration:data?.Duration,
                        release:data?.Release,
                        fromDate:data?.FromDate,
                        toDate:data?.ToDate,
                        urlYT:data?.UrlYT||'',
                        description:data?.Description||'',
                        uploadFileDataModel:{
                            fileName: data?.Files?.FileName,
                            fileType: data?.Files?.FileType,
                            base64Data:data?.Files?.Base64
                        }
                    },
                    success:(result)=>{
                        noti.play()
                        onCloseForm();
                        setTimeout(() => {
                            getMovieList();
                        }, 500);
                        setIsShowModal(false)
                    },
                    error:(error)=>{
                        fail.play();
                        ShowSnackbar({message:error.data.detail,type:"error"})
                    }
                })
  }
     const onApply=(data)=>{
        setIsClearChip(false)
        setMovieTypeId(data.MovieTypeId.Id)
        setChips(val=>{
            return [{label:LZGlobal.translate({en:data.MovieTypeId.EnglishName,km:data.MovieTypeId.Name}),value:data.MovieTypeId.Id}]
        })
       
     }
     useEffect(()=>{
        console.log("Chips",Chips)
         getMovieList();
     },[Chips])
     const onCloseChip=(item)=>{
        setIsClearChip(true)
        setMovieTypeId(0)
        setChips([])
     }
  return (
    <>
    <div className='flex justify-between mb-4'>
        <b>{tr.movie}</b>
        <LZButton label={tr.add} typeButton="add" click={onClickCreate}/>
    </div>
    <div className='flex mb-4 gap-x-2'>
        {/* <LZSelectRecord SelectRecord={onSelectRecord}/> */}
        <LZPopover items={itemsFilter} isClearChip={isClearChip} onApply={onApply}/>
        <LZSearch onSearching={onSearching}/>
        <LZChip items={Chips}  onClose = {onCloseChip}/>
    </div>
    <div className={`grid grid-rows-[calc(100vh-246px)_1fr]`}>
        <div className='h-full overflow-y-auto lzscroll'>
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
                                <div className='w-full h-[150px] overflow-hidden relative rounded-lg'>
                                    <div onClick={()=>{onClickActionImage(val)}} className={`${val.Id==Id?'scale-50':''} transition-all box ease-linear w-[27px] cursor-pointer absolute h-[27px] top-2 right-2 rounded-full flex justify-center items-center bg-[#00000078]`}>
                                        <i class="ri-pencil-fill text-green-500 text-[13px]"></i>
                                    </div>
                                    <img src={val.ImagePath==null || val.ImagePath==""?LZGlobal.ComingSoon:`http://localhost:8080${val.ImagePath}`} alt=""  className='preview-image  cursor-pointer object-cover w-full h-full'/>
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
        <LZPagination SelectPage={onSelectPage} totalRecord={movies[0]?.RecordCount??0} record={Record}/>
    </div>
    <LZModalForm isShowModal={isShowModalForm} isNewCreate={newCreated} dataEdit={dataEdit} reload={relaodList} isUploadImage={true} drawerInput={from} onClose={onCloseForm} onSave={onSaveForm} columns={3} label={tr.add_movie}/>
    </>
  )
}

export default Movie