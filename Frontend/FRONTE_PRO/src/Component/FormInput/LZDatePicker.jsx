import { DatePicker } from '@nextui-org/react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import {today, isWeekend, getLocalTimeZone} from "@internationalized/date";

function LZDatePicker({label,isRequired,isDisabled,onChange,name}) {
  const [isDisabledDate,setIsDisabledDate]=useState(isDisabled || false)
  const [isRequiredDate,setisRequiredDate]=useState(isRequired || false)
  const [isInvalid,setIsInvalid]=useState(false)
  const [value,setValue]=useState()
  const onChangeDate=(date)=>{
    onChange(name,moment(date).format("YYYY-MM-DD"))
  }
  
  return (
    <DatePicker 
            className="max-w-[284px] !min-h-[50px]"
                size='md'
                label={label||"Select date"}
                name={name}
                isRequired={isRequiredDate}
                isDisabled={isDisabledDate}
                isInvalid={isInvalid}
                onChange={onChangeDate}
                value={value}
                errorMessage={isInvalid?"Please select a valid date":""}
                radius='sm' 
                variant='bordered' 
                labelPlacement='outside' />
  )
}

export default LZDatePicker