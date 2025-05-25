import { Input } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

function LZInput({isDisabled,isRequired,isValid,label,type,onChange,value,onFocus,name}) {
    const [isDisabledInput,setIsDisabledInput]=useState(isDisabled || false)
    const [isRequiredInput,setIsRequiredInput]=useState(isRequired || false)
    const [messageRequired,setMessageRequired]=useState(isRequired?`Please enter ${name}.`:"");
    const onChangeValue=(e)=>{
        onChange(e);
    }

   
  return (
    <Input
    onChange={onChangeValue}
                        label={label||"Label"}
                        radius="sm"
                        className="text-[12px]"
                        type={type||"text"}
                        labelPlacement = "outside"
                        isRequired={isRequiredInput}
                        isDisabled={isDisabledInput}
                        errorMessage={messageRequired}
                        size='md'
                        onFocus={onFocus}
                        name={name}
                        value={value}
                        isInvalid={isValid}
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