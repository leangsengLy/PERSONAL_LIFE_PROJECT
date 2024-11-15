import React, { useEffect, useRef, useState } from 'react'
import LzDataTable from '../../../Global/Component/DataTable/LzDataTable'
import LZButton from '../../../Global/Component/Button/LZButton'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Drawer } from '@mui/material';
import { useSelector } from 'react-redux';
import LZDrawerForm from '../../../Global/Component/DrawerForm/LZDrawerForm';
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
            data:"CreateDate",
            width: "100px" ,
            sortable:false,
           
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
            width: "100px" ,
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
    const [isShowModal,setIsShowModal]=useState(false)
    useEffect(()=>{
        window.addEventListener("click",(e)=>{
            if(e.target.className.includes("edit")) console.log("edit")
            else if(e.target.className.includes("view")) console.log("view")
            else if(e.target.className.includes("delete")) console.log("delete")
        })
    },[])
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
        // {
        //     label:"Description",
        //     name:"Description",
        //     type:"textArea",
        // },
        // {
        //     type:"checkbox",
        //     label:"Gender",
        //     name:"Gender",
        //     isRequired:true,
        //     child:[
        //         {
        //             text:"Female",
        //             isSelectDafault:true,
        //             value:0
        //         },
        //         {
        //             text:"Male",
        //             value:1
        //         }
        //     ]
        // }
        

    ]
    const CanceModal=(title)=>{
        console.log(title)
        setIsShowModal(false)
    }
    const SaveData=(title)=>{
        setIsShowModal(false)
    }
  return (
    <div >
        <h1 className='text-[17px] font-bold'>Country</h1>
        <div className='flex justify-end'>
            <LZButton typeButton="add" click={OnclickAdd} isIcon={true} label="Add Country"/>
        </div>
        <LzDataTable data={dataList} columns={columnData}/>
        <LZDrawerForm ui={{}} data={dataInForm} propDrawer={{open:isShowModal,label:"Add Country"}} fn={{onClose:CloseModal,onSave:SaveData,onCancel:CanceModal}}/>
    </div>
  )
}

export default Country