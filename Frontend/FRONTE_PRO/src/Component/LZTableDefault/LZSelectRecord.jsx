import { Select, SelectItem } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { SoundAudio } from '../../Util/Sound'

function LZSelectRecord({SelectRecord}) {
       const click = SoundAudio('click')
    const [Record,SetRecord] =useState("10")
    const Records = [
        {key: "10",label: "10"},
        {key: "20",label: "20"},
        {key: "50",label: "50"},
        {key: "100",label: "100"}
    ]
    const SelectRecordItem=(re)=>{
        click.play()
        SetRecord(re.currentKey)
    }
    useEffect(()=>{
        SelectRecord(Record)
    },[Record])
  return (
        <div className='min-w-[80px] flex items-center gap-x-3'>
                <Select className="max-w-[70px]" defaultSelectedKeys={[Record]} onSelectionChange={SelectRecordItem} classNames={{trigger:'bg-navleft'}} items={Record} size='sm' variant='flat'> 
                {
                    Records.map((val)=>(
                        <SelectItem key={val.key} de>{val.label}</SelectItem>
                    ))
                }
            </Select>
        </div>
  )
}

export default LZSelectRecord