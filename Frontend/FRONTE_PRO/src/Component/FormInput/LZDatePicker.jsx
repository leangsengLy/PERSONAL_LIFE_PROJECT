import moment from 'moment'
import React, { useEffect, useState } from 'react'
import {today, isWeekend, getLocalTimeZone, parseDate, now} from "@internationalized/date";
import { DatePicker } from '@nextui-org/react';

function LZDatePicker({label,isRequired,isDisabled,valueDate,onChange,name}) {
  const [isDisabledDate,setIsDisabledDate]=useState(isDisabled || false)
  const [isRequiredDate,setisRequiredDate]=useState(isRequired || false)
  const [isInvalid,setIsInvalid]=useState(false)
  const [value,setValue]=useState(parseDate(moment(valueDate).format("YYYY-MM-DD")))
  useEffect(()=>{
    setValue(parseDate(moment(valueDate).format("YYYY-MM-DD")))
  },[valueDate])
  return (
    <DatePicker 
            className="max-w-[284px] !min-h-[50px]"
                size='md'
                label={label||"Select date"}
                name={name}
                isRequired={isRequiredDate}
                isDisabled={isDisabledDate}
                value={value}
                defaultValue={value}
                isInvalid={isInvalid}
                onChange={(newValue) => {
                  setValue(newValue)
                  onChange(name,moment(newValue.toDate(getLocalTimeZone())).format("YYYY-MM-DD"))
                }}
                errorMessage={isInvalid?"Please select a valid date":""}
                radius='sm' 
                variant='bordered' 
                labelPlacement='outside' />
  )
}

export default LZDatePicker