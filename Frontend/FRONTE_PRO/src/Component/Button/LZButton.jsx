import { Button } from '@nextui-org/react'
import React from 'react'

function LZButton({isDisabled,typeButton,click,cl,label,size,Variant,isLoading,isIcon=false,isFullWith}) {
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
    else if(typeButton=="save"){
        color='success';
        icon ="ri-save-fill !text-white";
    }
    else if(typeButton=="cancel"){
        color='default';
        icon ="ri-close-line !text-[#505050]";
    }
    else if(typeButton=="reset") color='warning';
    else {
        color = cl;
    }

    if(Variant=="ghost") VarianBtn="ghost";
    else if(Variant=="light") VarianBtn="light";
  return (
    <div>
        <Button isDisabled={isDisabled} color={color} className={`${isFullWith?'w-full h-[50px]':''} ${typeButton!=="cancel"?`text-white`:`text-[#989898]`}`} onClick={click} Variants={VarianBtn} size={sizeBtn} isLoading={isLoading}>{isIcon?(<><i className={icon}></i></>):(<></>)}<p className={`${isFullWith?'text-[16px]':''}`}>{label??"No Label"}</p> </Button>
    </div>
  )
}

export default LZButton