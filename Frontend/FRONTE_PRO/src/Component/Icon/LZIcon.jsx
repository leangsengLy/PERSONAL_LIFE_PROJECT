import { Button } from '@nextui-org/react'
import React from 'react'

function LZIcon({typeIcon,onClickIcon,isRounded,bgColor}) {
    let icon = "";
    let color = bgColor;

    if(typeIcon=="add") {
        icon=<i className="pi pi-check text-white"></i>;
        color=bgColor==undefined?"primary":bgColor;
    }
    else if(typeIcon=="delete") {
        icon=<i className="pi pi-trash text-white"></i>;
       
        color=bgColor==undefined?"danger":bgColor;
    }
    else if(typeIcon=="edit") {
        console.log("bgColor",bgColor)
        icon=<i className=" pi pi-pencil text-white"></i>;
         color=bgColor==undefined?"success":bgColor;
    }
    else if(typeIcon=="view") {
        icon=<i className=" pi pi-eye text-white"></i>;
        color=bgColor==undefined?"warning":bgColor;
    }
    else if(typeIcon=="cancel") {
        icon=<i className=" pi pi-times text-[#616161]"></i>;
        color="default"
        color=bgColor==undefined?"default":bgColor;
    }
  return (
    <Button isIconOnly={true}  color={color} className={`${isRounded?`rounded-full transition-all ease-linear`:``}`} size="sm"  onClick={onClickIcon}  variant={isRounded?`light`:`solid`}>{icon}</Button>
  )
}

export default LZIcon