import { DatePicker } from '@nextui-org/react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import {today, isWeekend, getLocalTimeZone, parseDate, now} from "@internationalized/date";

function LZDatePicker({label,isRequired,isDisabled,valueDate,onChange,name}) {
  const [isDisabledDate,setIsDisabledDate]=useState(isDisabled || false)
  const [isRequiredDate,setisRequiredDate]=useState(isRequired || false)
  const [isInvalid,setIsInvalid]=useState(false)
  const [value,setValue]=useState(parseDate(moment(valueDate).format("YYYY-MM-DD")))
  const onChangeDate=(date)=>{
    console.log(date)
    console.log(parseDate(moment(date).format("YYYY-MM-DD")))
    setValue(parseDate(moment(date).format("YYYY-MM-DD")))
    console.log(date.toDate(getLocalTimeZone()))
    // onChange(name,moment(date).format("YYYY-MM-DD"))
    // setValue(parseDate(moment(date).format("YYYY-MM-DD")))
  }
  useEffect(()=>{
    console.log("Value date",valueDate)
    setValue(parseDate(moment(valueDate).format("YYYY-MM-DD")))
    console.log("Yes")
  },[valueDate])
  return (
    <DatePicker 
            className="max-w-[284px] !min-h-[50px]"
                size='md'
                label={label||"Select date"}
                name={name}
                isRequired={isRequiredDate}
                isDisabled={isDisabledDate}
                // value={value}
                defaultValue={value}
                isInvalid={isInvalid}
                onChange={onChangeDate}
                errorMessage={isInvalid?"Please select a valid date":""}
                radius='sm' 
                variant='bordered' 
                labelPlacement='outside' />
  )
}

export default LZDatePicker