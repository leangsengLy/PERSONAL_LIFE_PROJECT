import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import React, { useState } from 'react'
import LZButton from '../Button/LZButton';
import { useSelector } from 'react-redux';
import LZInput from '../FormInput/LZInput';

function LZPopover() {
    const tr = useSelector((state) => state.Language.translate);
    const [isOpen, setIsOpen] = useState(false);
    const ClosePopover=()=>{
        setIsOpen(!isOpen);
    }
    const onSaveFilter=()=>{
        console.log("are saving the filter here")
    }
    const onResetFilter=()=>{
        console.log("are saving the filter here")
    }
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
                <LZInput label={"Select"} />
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