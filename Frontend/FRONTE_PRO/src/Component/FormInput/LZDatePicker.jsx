import { getLocalTimeZone, now } from '@internationalized/date'
import { DatePicker } from '@nextui-org/react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

function LZDatePicker({label,isRequired,isDisabled}) {
  const [isDisabledDate,setIsDisabledDate]=useState(isDisabled || false)
  const [isRequiredDate,setisRequiredDate]=useState(isRequired || false)
  const [isInvalid,setIsInvalid]=useState(false)
  const onChangeDate=(e)=>{
    console.log(moment(e).format("YYYY-MM-DD"))
  }
  return (
    <DatePicker 
            className="max-w-[284px] !min-h-[50px]"
                size='md'
                label={label||"Select date"}
                isRequired={isRequiredDate}
                isDisabled={isDisabledDate}
                isInvalid={isInvalid}
                onChange={onChangeDate}
                hideTimeZone
                showMonthAndYearPickers
                defaultValue={now(getLocalTimeZone())}
                errorMessage={isInvalid?"Please select a valid date":""}
                radius='sm' 
                variant='bordered' 
                labelPlacement='outside' />
  )
}

export default LZDatePicker