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
import { code } from '@nextui-org/react';
import LZGlobal from '../../Util/LZGlobal';

function Hall() {
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
    const EditHall=(data)=>{
        setIsCreate(false)
        setDrawData(data)
        setIsShowModal(true)
    }
   
    const DeleteHall=(data)=>{
        console.log("data",data)
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
                    url:`/api/hall/delete?id=${data.Id}`,
                    method:"get",
                    success:(result)=>{
                        ShowSnackbar({message:"Delete successfully!",type:'success'})
                        getList();
                    },
                    error:(err)=>{
                        // SystemSpeakByText(err.message,false);
                        ShowSnackbar({message:err.message,type:'error'})
                    }
                })
            }
        }))
        
    }
  
    const columnData=[
         {
            title:t.code,
            data:"Label",
            width: "50px" ,
            className:"all",
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
                        <div className='w-[200px] text-ellipsis overflow-hidden'>{data.Name}</div>
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
                        <div className='w-[500px] text-ellipsis overflow-hidden'>{data.EnglishName}</div>
                    </>
                )
            }
        },
         {
            title:t.total_chair,
            data:"Detail",
            className:"all max-w-[30px]",
            isDraw:true,
            renderTag:(data)=>{
                return (
                    <>
                        <div className='w-[30px] text-ellipsis overflow-hidden'>{data.TotalChairs}</div>
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
                        <div>
                            <p className='text-[14px]'>{data.UpdateBy}</p>
                            <p className='text-[13px]'>{format(new Date(data.UpdateDate), 'MMMM dd,yyyy')}</p>
                        </div>
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
                            <LZIcon  typeIcon="edit" onClickIcon={()=>{EditHall(data)}}/>
                            <LZIcon  typeIcon="delete" onClickIcon={()=>{DeleteHall(data)}}/>
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
                        DeleteHall()
                        dispatch(setIsShow(false))
                    }
                }))
                dispatch(setIsShow(true))
            }
        })
    },[])
    useEffect(()=>{
         getList();
    },[])
    
     const getList=async()=>{
       await  HttpRequest({
            url:"/api/hall/list",
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
                code:data.Code,
                totalChairs:data.TotalChairs,
                name:data.Name,
                englishName:data.EnglishName,
                
          }
        HttpRequest({
            url:'api/hall/update',
            data:dataSend,
            method:"post",
            success:(success)=>{
                setIsShowModal(false)
                getList();
                ShowSnackbar({message:"Update successfully!",type:'success'})
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
            isDisabled:true,
            isRequired:true,
            type:"text",
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
            label:t.total_chair,
            name:"TotalChairs",
            isRequired:true,
            type:"number",
        },
    ]
    const CanceModal=(title)=>{
        setIsShowModal(false)
    }
    
    const SaveData=async (data)=>{
        console.log("data",data)
       await HttpRequest({
            url:"api/hall/create",
            method:"Post",
            data:{
                code:data.Code,
                totalChairs:data.TotalChairs,
                name:data.Name,
                englishName:data.EnglishName,
               
            },
            success:(result)=>{
                  ShowSnackbar({message:"Create successfuly!",type:"success"})
                getList();
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
        <h1 className='text-[17px] font-bold'>{t.hall}</h1>
            {/* <div className='flex justify-end mb-5'>
                <LZButton typeButton="add" click={OnclickAdd} isIcon={true} label="Add Country"/>
            </div> */}
            <LZTableDefault column={columnData} data={data} OnChangeFilter={FilterData} Btns={btns} totalRecord={data[0]?.RecordCount||0}/>
            <LZDrawerForm 
                ui={{}} 
                data={dataInForm} 
                reDrawData={DrawData} 
                isCreate={isCreate} 
                propDrawer={{open:isShowModal,label:`${isCreate?t.add_hall:t.edit_hall}`}} 
                fn={{onClose:CloseModal,onSave:SaveData,onSaveEdit:UpdateData,onCancel:CanceModal}}
            />
        
    </div>
  )
}

export default Hall