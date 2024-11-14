import { Drawer } from '@mui/material'
import { Button, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import LZIcon from '../Icon/LZIcon'
import LZButton from '../Button/LZButton'

function LZDrawerForm({ui,fn,propDrawer,data}) {
    console.log(ui)
    console.log(fn)
    console.log(data)
    console.log(propDrawer)
    const [GetData,setGetData]=useState([]);
    const SaveData=()=>{
        console.log(GetData)
        fn.onSave("click save")
    }
    const EventInputForm=(e)=>{
        setGetData(val=>{
            return {...val,[e.target.name]:e.target.value}
        })
    }
    const checkValidatioForm = ()=>{
        // SaveData()
    }
  return (
    <Drawer anchor={ui.placement??'right'}  open={propDrawer.open??true} onClose={fn.onClose}>
        <div className={`${ui.width??`w-[340px]`} px-4 py-3`}>
                <div className='flex justify-between items-center mb-3'>
                    <h1 className='text-[16px] font-bold'>{propDrawer.label??'No label'}</h1>
                    <LZIcon typeIcon="cancel" onClickIcon={fn.onClose} isRounded={true}/>
                </div>
                <div className='flex flex-col gap-y-5'>
                    {data.map((val)=>{
                        return (<>
                            <Input type={val.type} isRequired={val.isRequired} errorMessage={val.isRequired?`Error input data!`:``} isInvalid={val.isRequired?true:``} onChange={EventInputForm} labelPlacement="inside" className='!rounded-full' name={val.label} placeholder={`Enter ${val.label}`} label={val.label} />
                        </>)
                    })}
                </div>
                <div className='flex justify-end gap-x-2 mt-4'>
                    <LZButton label="Save" click={()=>{checkValidatioForm}} typeButton="save"/>
                    <LZButton label="Cancel" click={()=>{fn.onCancel("close")}} typeButton="cancel"/>
                </div>
        </div>
    </Drawer>
  )
}

export default LZDrawerForm