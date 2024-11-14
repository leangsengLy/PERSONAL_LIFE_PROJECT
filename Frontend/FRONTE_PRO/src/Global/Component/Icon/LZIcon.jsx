import { Button } from '@nextui-org/react'
import React from 'react'

function LZIcon({typeIcon,onClickIcon,isRounded}) {
    let icon = "";
    let color = "";
    if(typeIcon=="add") {
        icon=<i className="pi pi-check text-white"></i>;
        color="primary"
    }
    else if(typeIcon=="delete") {
        icon=<i className="pi pi-trash text-white"></i>;
        color="danger"
    }
    else if(typeIcon=="edit") {
        icon=<i className=" pi pi-pencil text-white"></i>;
        color="success"
    }
    else if(typeIcon=="view") {
        icon=<i className=" pi pi-eye text-white"></i>;
        color="warning"
    }
    else if(typeIcon=="cancel") {
        icon=<i className=" pi pi-times text-[#616161]"></i>;
        color="default"
    }
  return (
    <Button isIconOnly={true}  color={color} className={`${isRounded?`rounded-full transition-all ease-linear`:``}`}   onClick={onClickIcon} variant={isRounded?`light`:``}>{icon}</Button>
  )
}

export default LZIcon