import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import LZButton from '../Button/LZButton';
import { useSelector } from 'react-redux';
import LZInput from '../FormInput/LZInput';
import LZSelect from '../FormInput/LZSelect';
import LZGlobal from '../../Util/LZGlobal';

function LZPopover({items}) {
    const tr = useSelector((state) => state.Language.translate);
    const [isOpen, setIsOpen] = useState(false);
    const [SelectItem, SetSelectItem] = useState(false);
    const [FilterValue, SetFilterValue] = useState({});
    const ClosePopover=()=>{
        setIsOpen(!isOpen);
    }
    const onSaveFilter=()=>{
      console.log("save")
      console.log(FilterValue)
      setIsOpen(!isOpen);
    }
    const onResetFilter=()=>{
        setIsOpen(!isOpen);
        console.log("are saving the filter here")
    }
    const onSelecting=(name,item)=>{ 
      console.log("onSelecting",name,item)
      SetSelectItem([`${item.Id}`])
     SetFilterValue((val)=>{return {...val,[name]:item}})
    }
    useEffect(()=>{
      console.log("FilterValue",FilterValue)
    },[FilterValue])
  return (
    <Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(!isOpen)} placement="bottom-start" classNames={{trigger:"bg-navleft",content:"w-[350px] bg-navleft"}}>
      <PopoverTrigger>
        <Button isIconOnly={true} className="sound" variant="solid">
           <i class="ri-equalizer-2-line"></i>
        </Button>
       
      </PopoverTrigger>
      <PopoverContent>
        <div className="w-full flex flex-col h-full p-2 gap-y-3" > 
            <div className="flex items-center justify-between">
                <p>{tr.filter}</p>
                <i onClick={ClosePopover} class="ri-close-line text-gray-300 text-[18px] cursor-pointer"></i>
            </div>
            <div>
              {
                items.map((val,index)=>{
                    if(val.type=="select"){
                        return <LZSelect 
                                name={val.name}
                                label={val.label||"label"}
                                startContent={(item)=>{return val.options.startContent(item)}}
                                renderValue={(item,list)=>{return val.options.renderValue(item,list)}}
                                isRequired={val.required||false}
                                selectItem={SelectItem}
                                isMulti={val.options.isMulti}
                                onSelecting={onSelecting}
                                api={
                                  {
                                    url:val.options.api.url,
                                    method:val.options.api.method,
                                    data:val.options.api.data,
                                    key:val.options.api.key,
                                    value:val.options.api.value,
                                    }
                                  }/>
                    }
                })
              }
                
            </div>
            <div className="flex flex-end items-center justify-end gap-x-2">
                <LZButton size={"sm"} typeButton={"cancel"} click={()=>{setIsOpen(!isOpen)}} label={tr.cancel}/>
                <LZButton size={"sm"} typeButton={"reset"} click={onResetFilter} label={tr.reset}/>
                <LZButton size={"sm"}  click={onSaveFilter} label={tr.save} />
            </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default LZPopover