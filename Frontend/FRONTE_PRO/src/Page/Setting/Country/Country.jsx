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
    const EditCountry=()=>{
        console.log("Edit")
        setIsShowModal(true)
    }
    const DeleteCountry=()=>{
        console.log("delete")
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
            renderTag:<div className='text-red-400 flex gap-x-2'>
                    <LZIcon  typeIcon="edit" onClickIcon={EditCountry}/>
                    <LZIcon  typeIcon="delete" onClickIcon={DeleteCountry}/>
            </div>
        },
       
    ]
   
    const dataList = useSelector((state)=>state.Country.dataList)
    const dispatch = useDispatch();
    const [isShowModal,setIsShowModal]=useState(false)
    const [DataCountry,setDataCountry]=useState([])
    const [data,SetData] = useState([])
    // const DeleteCountry= async()=>{
    //         await HttpRequest({
    //             url:"/api/country/delete",
    //             method:"get",
    //             success:(result)=>{
                    
    //             },
    //             error:(result)=>{

    //             }
    //         })
    // }
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
                        console.log("Code")
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
        <div className='flex justify-end mb-5'>
            <LZButton typeButton="add" click={OnclickAdd} isIcon={true} label="Add Country"/>
        </div>
        {/* <LzDataTable data={data} columns={columnData}/> */}
        <LZTableDefault column={columnData} data={data}/>
        <LZDrawerForm ui={{}} data={dataInForm} propDrawer={{open:isShowModal,label:"Add Country"}} fn={{onClose:CloseModal,onSave:SaveData,onCancel:CanceModal}}/>
    </div>
  )
}

export default Country