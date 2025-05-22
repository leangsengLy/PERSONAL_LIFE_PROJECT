import { Button } from '@nextui-org/react'
import React from 'react'

function LZIcon({typeIcon,onClickIcon,isRounded,bgColor}) {
    let icon = "";
    let color = bgColor;
    if(typeIcon=="add") {
        icon=<i className="pi pi-check text-white"></i>;
        color=bgColor==""?"primary":bgColor;
    }
    else if(typeIcon=="delete") {
        icon=<i className="pi pi-trash text-white"></i>;
       
        color=bgColor==""?"danger":bgColor;
    }
    else if(typeIcon=="edit") {
        icon=<i className=" pi pi-pencil text-white"></i>;
         color=bgColor==""?"success":bgColor;
    }
    else if(typeIcon=="view") {
        icon=<i className=" pi pi-eye text-white"></i>;
        color=bgColor==""?"warning":bgColor;
    }
    else if(typeIcon=="cancel") {
        icon=<i className=" pi pi-times text-[#616161]"></i>;
        color="default"
        color=bgColor==""?"default":bgColor;
    }
  return (
    <Button isIconOnly={true}  color={color} className={`${isRounded?`rounded-full transition-all ease-linear`:``}`} size="sm"  onClick={onClickIcon}  variant={isRounded?`light`:`solid`}>{icon}</Button>
  )
}

export default LZIcon