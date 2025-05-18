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

function Drink() {
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
                    url:`/api/food/delete?Id=${data.Id}`,
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
            title:"Picture",
            data:"Label",
            width: "50px" ,
            className:"all",
                 isDraw:true,
            renderTag:(data)=>{
                return (
                    <>
                        <div className='w-[35px] h-[35px] rounded-md bg-black overflow-hidden'>
                            <img src={`http://localhost:8080`+data.PathImage} alt="" onError={OnerrorImage}  className='preview-image w-full h-full object-cover'/>
                        </div>
                    </>
                )
            }
        },
        {
            title:"Name",
            data:"Label",
            width: "100px" ,
            className:"all max-w-[200px]",
                 isDraw:true,
            renderTag:(data)=>{
                return (
                    <>
                        <div className='w-[300px] text-ellipsis overflow-hidden'>{data.Name}</div>
                    </>
                )
            }
        },
        {
            title:"EnglishName",
            data:"Detail",
            className:"all max-w-[200px]",
            isDraw:true,
            renderTag:(data)=>{
                return (
                    <>
                        <div className='w-[500px] text-ellipsis overflow-hidden'>{data.EnglishName}</div>
                    </>
                )
            }
        },
         {
            title:"Price",
            data:"Detail",
            className:"all max-w-[200px]",
            isDraw:true,
            renderTag:(data)=>{
                return (
                    <>
                        <div className='text-ellipsis overflow-hidden'>{data.Price}</div>
                    </>
                )
            }
        },
         {
            title:"Qty",
            data:"Detail",
            className:"all max-w-[200px]",
            isDraw:true,
            renderTag:(data)=>{
                return (
                    <>
                        <div className='text-ellipsis overflow-hidden'>{data.Qty}</div>
                    </>
                )
            }
        },
        {
            title:"CreateBy",
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
            title:"UpdateBy",
            data:"DateCreated",
            isDateTime:true,
            width: "180px" ,
            isDraw:true,
            renderTag:(data)=>{
                return (
                    <>
                        <div>
                            <p className='text-[14px]'>{data.UpdateBy}</p>
                            <p className='text-[13px]'>{format(new Date(data.UpdateDate), 'MMMM dd,yyyy')}</p>
                        </div>
                    </>
                )
            }
        },
      
        {
            title:"Action",
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
            url:"/api/food/list",
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
          console.log(data.File)
          const dataSend = {
                id:data.Id,
                name:data.Name,
                qty:data.Qty,
                cinemaId:23,
                price:data.Price,
                englishName:data.EnglishName,
                
          }
          if(data.File!==undefined){
                 var image = await GetBase64ByImage(data.File)
                data.uploadFileDataModel={
                    fileName: "ImageOffer.jpg",
                    fileType: image.ImageType,
                    base64Data:image.Base64,
                };
          }
   
        HttpRequest({
            url:'api/food/update',
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
            label:"Code",
            name:"Code",
            isRequired:true,
            type:"select",
            data:  Cinemas.map((val)=>({...val,key:val.EnglishName,label:val.EnglishName})),
            onSelect:(data)=>{
                console.log(data);
                setCinemaId(data);
            }

        },
        {
            label:"Name",
            name:"Name",
            isRequired:true,
            type:"text",
        },
        {
            label:"EnglishName",
            name:"EnglishName",
            type:"text",
        },
        {
            label:"Price",
            name:"Price",
            type:"number",
        },
        {
            label:"Qty",
            name:"Qty",
            type:"number",
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
      
        var image = await GetBase64ByImage(data.File)
       await HttpRequest({
            url:"api/food/create",
            method:"Post",
            data:{
                cinemaId:CinemaId,
                name:data.Name,
                qty:data.Qty,
                price:data.Price,
                englishName:data.EnglishName,
                uploadFileDataModel:{
                    fileName: "ImageDrink.jpg",
                    fileType: image.ImageType,
                    base64Data:image.Base64,
                }
            },
            success:(result)=>{
                getList();
                setIsShowModal(false)
            },
            error:(error)=>{
                ShowSnackbar({message:error.message,type:"error"})
            }
        })
    }
    const btns = [{type:"Create",OnCreate:OnclickAdd}];
  return (
    <div className='h-full grid grid-rows-[30px_1fr]'>
        <h1 className='text-[17px] font-bold'>{t.drink}</h1>
            {/* <div className='flex justify-end mb-5'>
                <LZButton typeButton="add" click={OnclickAdd} isIcon={true} label="Add Country"/>
            </div> */}
            <LZTableDefault column={columnData} data={data} OnChangeFilter={FilterData} Btns={btns} totalRecord={data[0]?.RecordCount||0}/>
            <LZDrawerForm 
                ui={{}} 
                data={dataInForm} 
                reDrawData={DrawData} 
                isCreate={isCreate} 
                propDrawer={{open:isShowModal,label:`${isCreate?"Add Drink":"Update Drink"}`}} 
                fn={{onClose:CloseModal,onSave:SaveData,onSaveEdit:UpdateData,onCancel:CanceModal}}
            />
        
    </div>
  )
}

export default Drink