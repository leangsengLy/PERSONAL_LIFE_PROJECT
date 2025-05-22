import { Select, SelectItem } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { use } from 'react';
import { HttpRequest } from '../../Global/API_HTTP/http';

function LZSelect({items,isMulti,isRequired,api,label,localData,startContent,renderValue,onSelecting}) {
    const [selectedValue, setSelectedValue] = useState([{key:"clear1",value:"---Clear data---"},{key:"clear2",value:"---Clear data---"},{key:"clear3",value:"---Clear data---"}]);
    const [IsMultiSelect, setIsMultiSelect] = useState(isMulti || false)
    const [isRequiredSelect, setIsRequiredSelect] = useState(isRequired || false)
    const [list, setList] = useState([])
    const onSelect=(key)=>{
        console.log("Selected",key)
      
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
        if(api?.url!="" && api?.url!=undefined){
             getListApi();
        }
        else setList(
            localData.map((val)=>({key:val,value:val})));
    },[])
    const onSelectionChange=(item)=>{
        console.log("onSelectionChange",item.target.value.split(","))
        if(api?.url!="") {
            if(!isMulti){
                var find = list.find((val)=>val.key==item.anchorKey);
                onSelecting(find)
            }else{
                var keys = item.target.value.split(",").map((val)=>parseInt(val));
                var filterList = list.filter((val)=>keys.includes(val.key));
                onSelecting(filterList)
            }
            
        }else{
            var find = list.find((val)=>val.key==item.anchorKey);
             onSelecting(find)
        }
        onSelecting(item)
    }
    useEffect(()=>{
        console.log("List",list)
    },[list])

  return (
    <Select  
                        className="max-w-xs" 
                        label={api?.url=="" || api?.url==undefined ? "Select":label}
                        placeholder='Please select' 
                        labelPlacement='outside' 
                        radius='sm' 
                        variant='bordered' 
                        items={list}
                        isRequired={isRequiredSelect}
                        classNames={{base:'mb-[10px]'}}
                        size='md' 
                        // onSelectionChange ={onSelectionChange}
                        onChange ={onSelectionChange}
                        renderValue={(items)=>{
                            if(api?.url=="" || api?.url==undefined){
                                   var keys = items.map((val)=>val.key);
                                   if(keys.length>0){
                                        var find = list.find((val)=>keys.includes(val.key));
                                        if(find) return <span className='text-[12px]'>{find.value}</span>
                                   }else{
                                   }
                            }else return renderValue(items,list)
                        }}
                        selectionMode={IsMultiSelect?"multiple":"single"}
                        onValueChange={onSelect} >
                                    {list.map((item,index) => {
                                        return (
                                            <SelectItem key={item.key} className="text-[12px]" startContent={startContent(item)}>
                                                {api?.url=="" || api?.url==undefined ?(<>{item.value}</>):(<>{item[api.value]}</>)}
                                            </SelectItem>
                                        
                                    )
                                    })}
                            </Select>
  )
}

export default LZSelect