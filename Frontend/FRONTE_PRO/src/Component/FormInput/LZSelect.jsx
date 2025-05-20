import { Select, SelectItem } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { use } from 'react';
import { HttpRequest } from '../../Global/API_HTTP/http';

function LZSelect({items,isMulti,isRequired,api,localData,startContent,renderValue}) {
    const [selectedValue, setSelectedValue] = useState([{key:"clear1",value:"---Clear data---"},{key:"clear2",value:"---Clear data---"},{key:"clear3",value:"---Clear data---"}]);
    const [IsMultiSelect, setIsMultiSelect] = useState(isMulti || false)
    const [isRequiredSelect, setIsRequiredSelect] = useState(isRequired || false)
    const [list, setList] = useState([])
    const onSelect=(key)=>{
        console.log(key)
    }
    const getListApi=async()=>{
         await  HttpRequest({
                    url:api?.url,
                    method:api?.method,
                    data:api?.data,
                    success:(result)=>{
                        setList(result.map((val)=>({...val,key:val[api?.key],label:val[api?.value]})))
                        console.log(result)
                    },
                    error:(error)=>{
                        console.log(error)
                    }
                })
    }
    useEffect(()=>{
        if(api?.url!="") getListApi();
        else setList(localData);
    },[])
    useEffect(()=>{
        console.log("List",list)
    },[list])

  return (
    <Select  
                        className="max-w-xs" 
                        label="Select" 
                        placeholder='Please select' 
                        labelPlacement='outside' 
                        radius='sm' 
                        variant='bordered' 
                        items={list}
                        isRequired={isRequiredSelect}
                        classNames={{base:'mb-[10px]'}}
                        size='md' 
                        renderValue={(items)=>{return renderValue(items,list)}}
                        selectionMode={IsMultiSelect?"multiple":"single"}
                        onValueChange={onSelect} >
                                    {list.map((item,index) => {
                                        return (
                                            <SelectItem key={item.key} className="text-[12px]" startContent={startContent(item)}>
                                                 {item[api.value]}
                                            </SelectItem>
                                        
                                    )
                                    })}
                            </Select>
  )
}

export default LZSelect