import { Select, SelectItem } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { use } from 'react';
import { HttpRequest } from '../../Global/API_HTTP/http';

function LZSelect({items,isMulti,isRequired,api,label,localData,startContent,selectItem,renderValue,onSelecting,name}) {
    const [IsMultiSelect, setIsMultiSelect] = useState(isMulti || false)
    const [isRequiredSelect, setIsRequiredSelect] = useState(isRequired || false)
    const [list, setList] = useState([])
    const [selectedValue, setSelectedValue] = useState([selectItem]);
    const [selectedKeys, setSelectedKeys] = useState(IsMultiSelect ? new Set([]) : "17");
    const getListApi=async()=>{
         await  HttpRequest({
                    url:api?.url,
                    method:api?.method,
                    data:api?.data,
                    success:(result)=>{
                        
                        setList(result.map((val)=>({...val,key:val[api?.key],label:val[api?.value]})))
                    },
                    error:(error)=>{
                    }
                })
    }
    useEffect(()=>{
        if(api?.url!="" && api?.url!=undefined)  getListApi();
        else setList(
            localData.map((val)=>({key:val,value:val}))
        );
    },[])
    useEffect(()=>{
        setSelectedValue([`${selectItem}`])
    },[selectItem])
    const onSelectionChange=(item)=>{
        if(api?.url!="") {
            if(!isMulti){
                var find = list.find((val)=>val.key==item.target.value);
                onSelecting(name||'label',find)
                setSelectedValue([`${find.key}`])
                return; 
            }else{
                var keys = item.target.value.split(",").map((val)=>parseInt(val));
                var filterList = list.filter((val)=>keys.includes(val.key));
                onSelecting(name||'label',filterList)
                  setSelectedValue([`${find.key}`])
                return; 
            }
        }else{
            var find = list.find((val)=>val.key==item.anchorKey);
             onSelecting(name||'label',find)
               setSelectedValue([`${find.key}`])
             return ; 
        }
        
    }
  return (
    <div>
        <Select  
                        className="max-w-xs" 
                        label={api?.url=="" || api?.url==undefined ? "Select":label}
                        placeholder='Please select' 
                        labelPlacement='outside' 
                        radius='sm' 
                        variant='bordered' 
                        name={name}
                        isRequired={isRequiredSelect}
                        classNames={{base:'mb-[10px]'}}
                        size='md' 
                        selectedKeys={selectedValue}   	
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
                        >
                                    {list.map((item,index) => {
                                        return (
                                            <SelectItem key={item.key} value={item.key} className="text-[12px]" startContent={()=>{
                                                if(startContent){startContent(item)}
                                            }}>
                                                {api?.url=="" || api?.url==undefined ?(<>{item.value}</>):(<>{item[api.value]}</>)}
                                            </SelectItem>
                                        
                                    )
                                    })}
                            </Select>
    </div>
  )
}

export default LZSelect