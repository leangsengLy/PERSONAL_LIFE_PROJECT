import React, { useEffect, useRef, useState } from 'react'
import LzDataTable from '../../../Global/Component/DataTable/LzDataTable'
import LZButton from '../../../Global/Component/Button/LZButton'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Drawer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import LZDrawerForm from '../../../Global/Component/DrawerForm/LZDrawerForm';
import { HttpRequest } from '../../../Global/API_HTTP/http';
import moment from 'moment/moment';
import { ShowSnackbar } from '../../../Util/globalUtils';
import { SystemSpeakByText } from '../../../Util/SystenSayByText';
import { setIsShow, setModalConfirm } from '../../../Store/Confirm/Confirm';
import LZTableDefault from '../../../Global/Component/LZTableDefault/LZTableDefault';
import LZIcon from '../../../Global/Component/Icon/LZIcon';
function Country() {
    const dataList = useSelector((state)=>state.Country.dataList)
    const dispatch = useDispatch();
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
    const DeleteCountry=(data)=>{
        console.log(data)
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
                    url:`/api/country/delete/${data.Id}`,
                    method:"get",
                    success:(result)=>{
                        getList();
                    },
                    error:(err)=>{
                        SystemSpeakByText(err.message,false);
                        ShowSnackbar({message:err.message,type:'error'})
                    }
                })
            }
        }))
        
    }
    const columnData=[
        {
            title:"Code",
            data:"Code",
            width: "100px" ,
            className:"min-width",
           
        },
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
            width: "250px" ,
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
            width: "250px" ,
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
    },[DataCountry])

    const getList=()=>{
        HttpRequest({
            url:"/api/country/list",
            method:'get',
            success:(result)=>{
                console.log(result.data)
                SetData(result.data)
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
        HttpRequest({
            url:'/api/country/update',
            data:data,
            method:"post",
            success:(success)=>{
                setIsShowModal(false)
                getList();
                SystemSpeakByText(success.message,false)
                ShowSnackbar({message:success.message,type:'success'})
            },
            error:(error)=>{
                SystemSpeakByText(error.message,false)
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
            type:"text",
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
            label:"Country Image",
            name:"CountryImage",
            type:"file",
        },
    ]
    const CanceModal=(title)=>{
        setIsShowModal(false)
    }
    const SaveData=async (data)=>{
       await HttpRequest({
            url:"/api/country/create",
            method:"Post",
            data:data,
            success:(result)=>{
                getList();
                setIsShowModal(false)
            },
            error:(error)=>{
                SystemSpeakByText(error.message,false)
                ShowSnackbar({message:error.message,type:"error"})
            }
        })
    }
  return (
    <div >
        <h1 className='text-[17px] font-bold'>Country</h1>
        <div className='flex justify-end mb-5'>
            <LZButton typeButton="add" click={OnclickAdd} isIcon={true} label="Add Country"/>
        </div>
        <LZTableDefault column={columnData} data={data}/>
        <LZDrawerForm ui={{}} data={dataInForm} reDrawData={DrawData} isCreate={isCreate} propDrawer={{open:isShowModal,label:"Add Country"}} fn={{onClose:CloseModal,onSave:SaveData,onSaveEdit:UpdateData,onCancel:CanceModal}}/>
    </div>
  )
}

export default Country