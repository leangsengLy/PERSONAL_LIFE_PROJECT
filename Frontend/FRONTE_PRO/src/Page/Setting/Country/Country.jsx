import React from 'react'
import LzDataTable from '../../../Global/Component/DataTable/LzDataTable'
import LZButton from '../../../Global/Component/Button/LZButton'
import { Button } from '@nextui-org/react'
import LZIcon from '../../../Global/Component/Icon/LZIcon'
function Country() {
    const columnData=[
        {
            title:"Code",
            data:"Code",
            width: "0px" ,
        },
        {
            title:"Name",
            data:"Name"
        },
        {
            title:"CreateBy",
            data:"CreateBy",
            width: "0px" ,
            sortable:false,
        },
        {
            title:"CreateDate",
            data:"CreateDate",
            width: "0px" ,
            sortable:false,
           
        },
        {
            title:"UpdateBy",
            data:"UpdateBy",
            width: "0px" ,
            sortable:false,
            render:(data)=>{
             return 'Hello'
            } 
        },
        {
            title:"UpdateDate",
            data:"UpdateDate",
            width: "0px" ,
        },
        {
            title:"Action",
            data:null,
            sortable:false,
            width: "0px" ,
            render:(data)=>{
                
                return 'Hello'
            } 
        },
    ]
    const data=[
        {
            Name:"Lyleangseng1",
            Code:"Me",
            CreateBy:"Lyzee",
            CreateDate:"10-2-2022",
            UpdateBy:"",
            UpdateDate:"",
        },
        {
            Name:"Lyleangseng1",
            Code:"Me",
            CreateBy:"Lyzee",
            CreateDate:"10-2-2022",
            UpdateBy:"Saeave",
            UpdateDate:"10-2-2022",
        },
        {
            Name:"Lyleangseng1",
            Code:"Me",
            CreateBy:"Lyzee",
            CreateDate:"10-2-2022",
            UpdateBy:"",
            UpdateDate:"",
        },
    ]
    // useEffect(()=>{
    //     $(".dt-input").attr("placeholder","Searching...")
    // })
  return (
    <div>
        <h1 className='text-[17px] font-bold'>Country <Button isIconOnly={true}><LZIcon typeIcon="edit"/></Button></h1>
        <div className='flex justify-end'>
            <LZButton typeButton="add" isIcon={true} label="Add New Country"/>
        </div>
        <LzDataTable data={data} columns={columnData}/>
    </div>
  )
}

export default Country