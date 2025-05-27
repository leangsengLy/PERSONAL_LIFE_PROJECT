import { Input } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { use } from 'react';

function LZInput({isDisabled,isRequired,isValid,label,type,isSubmit,onChange,values,onFocus,name,onCheckError}) {
    const [isDisabledInput,setIsDisabledInput]=useState(isDisabled || false)
    const [isRequiredInput,setIsRequiredInput]=useState(isRequired || false)
    const [isValidData,setIsValidData]=useState(isValid || false)
    const [messageRequired,setMessageRequired]=useState(isRequired?`Please enter ${name}.`:"");
    const [value,setValue] = useState(values || "");
    const onChangeValue=(e)=>{
        setIsValidData(isRequiredInput && e.target.value == "")
        setValue(e.target.value)
        onChange(e);
    }
    useEffect(()=>{
        if(isRequiredInput && (!value || value.trim() === "") && isSubmit){
            setMessageRequired(`Please enter ${name}.`);
            setIsValidData(true)
            if(onCheckError) onCheckError("error");
        }else{
            console.log("")
        }
    },[isSubmit])
    useEffect(()=>{
        // setIsDisabledInput(isDisabled);
        // setIsRequiredInput(isRequired);
        // setMessageRequired(isRequired?`Please enter ${name}.`:"");
        setValue(values);
    },[values])
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
                        isInvalid={isValidData}
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