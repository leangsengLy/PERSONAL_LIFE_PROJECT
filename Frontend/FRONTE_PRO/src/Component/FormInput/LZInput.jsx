import { Input } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

function LZInput({isDisabled,isRequired,label,type}) {
    const [isDisabledInput,setIsDisabledInput]=useState(isDisabled || false)
    const [isRequiredInput,setIsRequiredInput]=useState(isRequired || false)
    const [isInvalid,setIsInvalid]=useState(false)
    const [messageRequired,setMessageRequired]=useState(isRequired?`Please enter a valid.`:"");
    const onChangeValue=(e)=>{
        console.log(e.target.value)
        setIsInvalid(e.target.value.length===0);
    }
   
  return (
    <Input
    onChange={onChangeValue}
                        label={label||"Label"}
                        radius="sm"
                        className="text-[12px]"
                        type="text"
                        labelPlacement = "outside"
                        isRequired={isRequiredInput}
                        isDisabled={isDisabledInput}
                        errorMessage={messageRequired}
                        size='md'
                        isInvalid={isInvalid}
                        variant="bordered"
                        placeholder={`Enter ${label||'....'}`}
                        classNames={
                            {
                                label:'text-[12px]',
                                base:'text-[12px] text-black ',
                                input:'text-[12px] bg-red-50 ',
                                inputWrapper:'text-[12px] bg-white border border-black-150' ,
                            }
                            } 
                        />
  )
}

export default LZInput