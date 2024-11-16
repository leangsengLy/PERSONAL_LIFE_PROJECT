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
function Country() {
    const columnData=[
        {
            title:"Code",
            data:"Code",
            width: "100px" ,
            className:"min-width",
            selector:row=>row.Code,
            sortable:true,
        },
        {
            title:"Name",
            data:"Name",
            width: "100px" ,
            className:"all ",
            selector:row=>row.Name
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
            sortable:false,
            selector:row=>row.CreateBy

        },
        {
            title:"CreateDate",
            data:"DateCreated",
            width: "200px" ,
            sortable:false,
            render:(data)=>{
                return moment(data).format("MMMM DD,YYYY");
            }
           
        },
        {
            title:"UpdateBy",
            data:"UpdateBy",
            width: "100px" ,
            sortable:false,
          
        },
        {
            title:"UpdateDate",
            data:"UpdateDate",
            width: "200px" ,
            sortable:false,
        },
        {
            title:"Action",
            data:null,
            sortable:false,
            width: "0px" ,
            className:"all",
            render:(data)=>(
                `<div class="flex gap-x-2">
                    <button  class="w-[26px] h-[26px] rounded-md flex justify-center items-center bg-blue-500 "><i class="ri-eye-fill view text-white"></i></button>
                    <button class="w-[26px] h-[26px] rounded-md flex justify-center items-center bg-green-500 "><i class="ri-pencil-fill edit text-white"></i></button>
                    <button class="w-[26px] h-[26px] rounded-md flex justify-center items-center bg-red-500 "><i class="ri-delete-bin-line delete text-white"></i></button>
                </div>`
            ),
            
        },
       
    ]
    const dataList = useSelector((state)=>state.Country.dataList)
    const dispatch = useDispatch();
    const [isShowModal,setIsShowModal]=useState(false)
    const [DataCountry,setDataCountry]=useState([])
    const [data,SetData] = useState([])
    dispatch(setModalConfirm({
        type:"delete",
        message:"Do you want to delete this country",
        onClose:()=>{
            console.log("Code")
            dispatch(setIsShow(false))
        },
        onOk:()=>{
            console.log("Ok")
            dispatch(setIsShow(false))
        }
    }))
    useEffect( ()=>{
        window.addEventListener("click",(e)=>{
            if(e.target.className.includes("edit")) console.log("edit")
            else if(e.target.className.includes("view")) console.log("view")
            else if(e.target.className.includes("delete")){
                console.log("delete")
                dispatch(setIsShow(true))
            }
        })
    },[])
    useEffect(()=>{
        HttpRequest({
            url:"/api/country/list",
            method:'get',
            success:(result)=>{
                SetData(result.data)
            },
            error:(error)=>{
                console.log(error)
            }
        })
    },[DataCountry])
    const CloseModal=()=>{
        setIsShowModal(false)
    }
    const OnclickAdd=()=>{
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
                setDataCountry(result.data)
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
        <div className='flex justify-end'>
            <LZButton typeButton="add" click={OnclickAdd} isIcon={true} label="Add Country"/>
        </div>
        <LzDataTable data={data} columns={columnData}/>
        <LZDrawerForm ui={{}} data={dataInForm} propDrawer={{open:isShowModal,label:"Add Country"}} fn={{onClose:CloseModal,onSave:SaveData,onCancel:CanceModal}}/>
    </div>
  )
}

export default Country