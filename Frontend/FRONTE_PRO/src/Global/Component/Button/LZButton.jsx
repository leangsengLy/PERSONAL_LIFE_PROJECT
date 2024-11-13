import { Button } from '@nextui-org/react'
import React from 'react'

function LZButton({isDisabled,typeButton,label,size,Variant,isLoading,isIcon=false}) {
    let color="primary";
    let VarianBtn = "solid";
    let icon ="";
    let sizeBtn = size??"md";
    if(typeButton=="add"){
        color='primary';
        icon ="ri-add-line";
    }
    else if(typeButton=="delete"){
        color='danger';
        icon ="ri-delete-bin-line";
    }
    else if(typeButton=="update")color='success';
    else if(typeButton=="cancel"){
        color='default';
        icon ="ri-close-line";
    }
    else if(typeButton=="reset")color='warning';

    if(Variant=="ghost") VarianBtn="ghost";
    else if(Variant=="light") VarianBtn="light";
  return (
    <div>
        <Button isDisabled={isDisabled} color={color} Variants={VarianBtn} size={sizeBtn} isLoading={isLoading}>{isIcon?(<><i className={icon}></i></>):(<></>)}{label??"No Label"} </Button>
    </div>
  )
}

export default LZButton