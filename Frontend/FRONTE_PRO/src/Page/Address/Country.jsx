import React, { useEffect, useRef, useState } from 'react'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useDispatch, useSelector } from 'react-redux';
import LZDrawerForm from '../../Component/DrawerForm/LZDrawerForm';
import { HttpRequest } from '../../Global/API_HTTP/http';
import { decryptObject, EncriptObject, ShowSnackbar } from '../../Util/globalUtils';
import { setIsShow, setModalConfirm } from '../../Store/Confirm/Confirm';
import LZTableDefault from '../../Component/LZTableDefault/LZTableDefault';
import LZIcon from '../../Component/Icon/LZIcon';
import {useNavigate} from 'react-router-dom';
import {format} from 'date-fns';
import { GetBase64ByImage } from '../../Util/GetBase64ByImage';

function Country() {
    const dataList = useSelector((state)=>state.Country.dataList)
    const t = useSelector(state=>state.Language.translate)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const [isShowModal,setIsShowModal]=useState(false)
    const [isCreate,setIsCreate]=useState(false)
    const [DataCountry,setDataCountry]=useState([])
    const [Filter,setFilter]=useState({})
    const [DrawData,setDrawData]=useState({})
    const [data,SetData] = useState([])
    const [Cinemas,SetCinema] = useState([])
    const [CinemaId,setCinemaId] = useState(0)
    const EditCountry=(data)=>{
        setIsCreate(false)
        setDrawData(data)
        setIsShowModal(true)
    }
    const ViewDetail=(data)=>{
        navigate(`/web/setting/country/province?Country=${btoa(EncriptObject(data))}`)
    }
    const DeleteCountry=(data)=>{
        dispatch(setIsShow(true))
        dispatch(setModalConfirm({
            type:"delete",
            message:"Do you want to delete?",
            onClose:()=>{
                dispatch(setIsShow(false))
            },
            onOk:async()=>{
                 dispatch(setIsShow(false))
                await HttpRequest({
                    url:`/api/country/delete?id=${data.Id}`,
                    method:"get",
                    success:(result)=>{
                        // SystemSpeakByText(result.data.message,false);
                        getList();
                       
                        ShowSnackbar({message:result.data.message,type:'success'})
                    },
                    error:(err)=>{
                        // SystemSpeakByText(err.message,false);
                        ShowSnackbar({message:err.message,type:'error'})
                    }
                })
            }
        }))
        
    }
    const OnerrorImage=(e)=>{
        e.target.src= "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500";
    }
    const columnData=[
          
         {
            title:t.photo,
            data:"Label",
            width: "50px" ,
            className:"all",
                 isDraw:true,
            renderTag:(data)=>{
                return (
                    <>
                        <div className='w-[35px] h-[35px] rounded-md bg-black overflow-hidden'>
                            <img src={`http://localhost:8080`+data.ImagePath} alt="" onError={OnerrorImage}  className='preview-image w-full h-full object-cover'/>
                        </div>
                    </>
                )
            }
        },
        {
            title:t.code,
            data:"Label",
            width: "100px" ,
            className:"all max-w-[100px]",
                 isDraw:true,
            renderTag:(data)=>{
                return (
                    <>
                        <div className='w-[100px] text-ellipsis overflow-hidden'>{data.Code}</div>
                    </>
                )
            }
        },
        {
            title:t.name,
            data:"Label",
            width: "100px" ,
            className:"all max-w-[200px]",
                 isDraw:true,
            renderTag:(data)=>{
                return (
                    <>
                        <div className='w-[170px] text-ellipsis overflow-hidden'>{data.Name}</div>
                    </>
                )
            }
        },
        {
            title:t.english_name,
            data:"Detail",
            className:"all max-w-[200px]",
            isDraw:true,
            renderTag:(data)=>{
                return (
                    <>
                        <div className='w-[200px] text-ellipsis overflow-hidden'>{data.EnglishName}</div>
                    </>
                )
            }
        },
        {
            title:t.created_by,
            data:"CreateBy",
            width: "100px" ,
            isDraw:true,
            renderTag:(data)=>{
                return (
                   <>
                        <div>
                            <p className='text-[14px]'>{data.CreateBy}</p>
                            <p className='text-[13px]'>{format(new Date(data.CreateDate), 'MMMM dd,yyyy')}</p>
                        </div>
                    </>
                )
            }
        },
        {
            title:t.updated_by,
            data:"DateCreated",
            isDateTime:true,
            width: "180px" ,
            isDraw:true,
            renderTag:(data)=>{
                return (
                    <>
                        {
                            data.UpdateBy!=null?<div>
                            <p className='text-[14px]'>{data.UpdateBy}</p>
                            <p className='text-[13px]'>{format(new Date(data.UpdateDate), 'MMMM dd,yyyy')}</p>
                        </div>:<></>
                        }
                    </>
                )
            }
        },
      
        {
            title:t.action,
            data:null,
            width: "100px" ,
            className:"all",
            isDraw:true,
            renderTag:(data)=>{
                return (
                    <>
                        <div className='text-red-400 flex gap-x-2'>
                            <LZIcon  typeIcon="edit" onClickIcon={()=>{EditCountry(data)}}/>
                            <LZIcon  typeIcon="delete" onClickIcon={()=>{DeleteCountry(data)}}/>
                        </div>
                    </>
                )
            }
        },
       
    ]
   
  
    const ErrorImage=(e)=>{
        e.target.src='https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg'
    }
    const FilterData=(filter)=>{
        setFilter(filter);
       
    }
    useEffect(()=>{
         getList();
    },[Filter])

    useEffect( ()=>{
        window.addEventListener("click",(e)=>{
            if(e.target.className.includes("edit")) console.log("edit")
            else if(e.target.className.includes("view")) console.log("view")
            else if(e.target.className.includes("delete")){
                let Id = e.target.attributes
                dispatch(setModalConfirm({
                    type:"delete",
                    message:"Do you want to delete this country?",
                    onClose:()=>{
                        dispatch(setIsShow(false))
                    },
                    onOk:()=>{
                        DeleteCountry()
                        dispatch(setIsShow(false))
                    }
                }))
                dispatch(setIsShow(true))
            }
        })
    },[])
    useEffect(()=>{
        getListCinema();
         getList();
    },[])
    const getListCinema = async ()=>{
        await  HttpRequest({
            url:"/api/cinema/list",
            method:'post',
            data:{
                 id:0,
                 search:""
            },
            success:(result)=>{
                SetCinema(result)
                console.log(Cinemas)
            },
            error:(error)=>{
                console.log(error)
            }
        })
    }
     const getList=async()=>{
       await  HttpRequest({
            url:"/api/country/list",
            method:'post',
            data:{
                search:Filter.Search,
                pages:Filter.Page,
                records:Filter.Record,
            },
            success:(result)=>{
                SetData(result)
            },
            error:(error)=>{
                console.log(error)
            }
        })
    }
    const CloseModal=()=>{
        setIsShowModal(false)
    }
    const UpdateData=async(data)=>{
          const dataSend = {
                id:data.Id,
                name:data.Name,
                code:data.Code,
                englishName:data.EnglishName,
                createBy:"Lyzee",
                database:"LZ",  
                
          }
          if(data.File!==undefined && data.File!==""){
                 var image = await GetBase64ByImage(data.File)
                 console.log("image",image)
                dataSend.uploadFileDataModel={
                    fileName: image.FileName,
                    fileType: image.FileType,
                    base64Data:image.Base64,
                };
          }
   
        HttpRequest({
            url:'api/country/update',
            data:dataSend,
            method:"post",
            success:(success)=>{
                setIsShowModal(false)
                getList();
                ShowSnackbar({message:success.message,type:'success'})
            },
            error:(error)=>{
                ShowSnackbar({message:error.message,type:'error'})
            }
        })
    }
    const OnclickAdd=()=>{
        setIsCreate(true)   
        setIsShowModal(true)
    }
    const dataInForm = [
        {
            label:t.code,
            name:"Code",
            isRequired:true,
            isDisabled:true,
            type:"text",
            isCheckCode:true,
            checkCode:{
                url:"api/country/check_code",
                param:{
                    field:"id",
                    db:"LZ",
                }
            }
        },
        {
            label:t.name,
            name:"Name",
            isRequired:true,
            type:"text",
        },
        {
            label:t.english_name,
            name:"EnglishName",
            type:"text",
        },
        {
            label:"Image",
            name:"File",
            type:"file",
        },
    ]
    const CanceModal=(title)=>{
        setIsShowModal(false)
    }
    
    const SaveData=async (data)=>{
        console.log(data.File)
        var fileUpload = {};
        if(data.File!==undefined){
            var image = await GetBase64ByImage(data.File)
            fileUpload ={
                    fileName: image.FileName,
                    fileType: image.FileType,
                    base64Data:image.Base64,
                }
        }
        // if(data.File)
        
       await HttpRequest({
            url:"api/country/create",
            method:"Post",
            data:{
                name:data.Name,
                code:data.Code,
                englishName:data.EnglishName,
                createBy:"Lyzee",
                database:"LZ",  
                uploadFileDataModel:fileUpload
            },
            success:(result)=>{
                setTimeout(() => {
                    getList();
                }, 500);
                setIsShowModal(false)
            },
            error:(error)=>{
                ShowSnackbar({message:error.data.detail,type:"error"})
            }
        })
    }
    const btns = [{type:"Create",label:t.create,OnCreate:OnclickAdd}];
  return (
    <div className='h-full grid grid-rows-[30px_1fr]'>
        <h1 className='text-[17px] font-bold'>{t.country}</h1>
            <LZTableDefault column={columnData} data={data} OnChangeFilter={FilterData} Btns={btns} totalRecord={data[0]?.RecordCount||0}/>
            <LZDrawerForm 
                ui={{}} 
                data={dataInForm} 
                reDrawData={{...DrawData,PathImage:DrawData.ImagePath}} 
                isCreate={isCreate} 
                propDrawer={{open:isShowModal,label:`${isCreate?t.add_country:t.edit_country}`}} 
                fn={{onClose:CloseModal,onSave:SaveData,onSaveEdit:UpdateData,onCancel:CanceModal}}
            />
        
    </div>
  )
}

export default Country