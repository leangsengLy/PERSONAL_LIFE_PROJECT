import React, { useEffect, useRef, useState } from 'react'
import LZButton from '../../../Global/Component/Button/LZButton'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useDispatch, useSelector } from 'react-redux';
import LZDrawerForm from '../../../Global/Component/DrawerForm/LZDrawerForm';
import { HttpRequest } from '../../../Global/API_HTTP/http';
import { decryptObject, EncriptObject, ShowSnackbar } from '../../../Util/globalUtils';
import { setIsShow, setModalConfirm } from '../../../Store/Confirm/Confirm';
import LZTableDefault from '../../../Global/Component/LZTableDefault/LZTableDefault';
import LZIcon from '../../../Global/Component/Icon/LZIcon';
import {useNavigate} from 'react-router-dom';
import { Button } from 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Country() {
    const dataList = useSelector((state)=>state.Country.dataList)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const [isShowModal,setIsShowModal]=useState(false)
    const [isCreate,setIsCreate]=useState(false)
    const [DataCountry,setDataCountry]=useState([])
    const [DrawData,setDrawData]=useState({})
    const [data,SetData] = useState([])
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
            message:"Do you want to delete this country?",
            onClose:()=>{
                dispatch(setIsShow(false))
            },
            onOk:async()=>{
                 dispatch(setIsShow(false))
                await HttpRequest({
                    url:`/api/movie_type/delete?Id=${data.Id}`,
                    method:"get",
                    success:(result)=>{
                        console.log(result)
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
    const columnData=[
        // {
        //     title:"Code",
        //     data:"Code",
        //     isDraw:true,
        //     width: "100px" ,
        //     className:"min-width",
        //     renderTag:(data)=>{
        //         return (
        //             <>
        //                 <div className=' flex gap-x-2 items-center'>
        //                     <p>{data.Code}</p>
        //                 </div>
        //             </>
        //         )
        //     }
        // },
        {
            title:"Name",
            data:"Name",
            width: "100px" ,
            className:"all ",
        },
        {
            title:"EnglishName",
            data:"EnglishName",
            className:"all ",
        },
        {
            title:"CreateBy",
            data:"CreateBy",
            width: "100px" ,
        },
        {
            title:"CreateDate",
            data:"DateCreated",
            isDateTime:true,
            width: "180px" ,
        },
        {
            title:"UpdateBy",
            data:"UpdateBy",
            width: "100px" ,
          
        },
        {
            title:"UpdateDate",
            data:"UpdateDate",
            isDateTime:true,
            width: "180px" ,
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
                console.log(data)
            }
        },
       
    ]
   
  
    const ErrorImage=(e)=>{
        e.target.src='https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg'
    }
    const FilterData=(filter)=>{
        console.log(filter)
    }
    useEffect( ()=>{
        window.addEventListener("click",(e)=>{
            if(e.target.className.includes("edit")) console.log("edit")
            else if(e.target.className.includes("view")) console.log("view")
            else if(e.target.className.includes("delete")){
                console.log(e.target)
                let Id = e.target.attributes
                dispatch(setModalConfirm({
                    type:"delete",
                    message:"Do you want to delete this country?",
                    onClose:()=>{
                        dispatch(setIsShow(false))
                    },
                    onOk:()=>{
                        console.log("Ok")
                        DeleteCountry()
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
    
     const getList=()=>{
        HttpRequest({
            url:"/api/movie_type/list",
            method:'post',
            data:{
                    search:"",
                    pages:0,
                    records:0
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
    const UpdateData=(data)=>{
        console.log(data)
        HttpRequest({
            url:'api/movie_type/update',
            data:{
                id:data.Id,
                name:data.Name,
                englishName:data.EnglishName,
            },
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
        // {
        //     label:"Code",
        //     name:"Code",
        //     isRequired:true,
        //     type:"text",
        // },
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
        // {
        //     label:"Country Image",
        //     name:"File",
        //     type:"file",
        // },
    ]
    const CanceModal=(title)=>{
        setIsShowModal(false)
    }
    const SaveData=async (data)=>{
       await HttpRequest({
            url:"api/movie_type/create",
            method:"Post",
            data:{
                name:data.Name,
                englishName:data.EnglishName,
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
        <h1 className='text-[17px] font-bold'>Country</h1>
            {/* <div className='flex justify-end mb-5'>
                <LZButton typeButton="add" click={OnclickAdd} isIcon={true} label="Add Country"/>
            </div> */}
            <LZTableDefault column={columnData} data={data} OnChangeFilter={FilterData} Btns={btns}/>
            <LZDrawerForm 
                ui={{}} 
                data={dataInForm} 
                reDrawData={DrawData} 
                isCreate={isCreate} 
                propDrawer={{open:isShowModal,label:"Add Country"}} 
                fn={{onClose:CloseModal,onSave:SaveData,onSaveEdit:UpdateData,onCancel:CanceModal}}
            />
        
    </div>
  )
}

export default Country