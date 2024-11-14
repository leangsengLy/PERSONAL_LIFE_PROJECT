import { Drawer } from '@mui/material'
import { Input, Radio, RadioGroup, Textarea } from '@nextui-org/react'
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
    const SelectRadio = (value)=>{
        console.log(value)
    }
    const CheckboxData = (type,text)=>{
        if(type=="Gender"){
            let newData = data.filter(val=>val.type=="checkbox");
            console.log(newData)
        }
        
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
                            {val.type=="text"?(<>
                                <Input 
                                    type={val.type}
                                    isRequired={val.isRequired}
                                    errorMessage={val.isRequired?`Error input data!`:``} 
                                    isInvalid={val.isRequired?true:``} 
                                    onChange={EventInputForm} 
                                    labelPlacement="inside" 
                                    className='!rounded-full' 
                                    name={val.name}  
                                    label={val.label} 
                                    />
                            </>):(<></>)}
                            {
                                val.type=="checkbox"?(<>
                                    <div className='flex gap-x-4 flex-wrap'>
                                        <RadioGroup color='warning' onChange={SelectRadio} name={val.name} defaultValue={0}>
                                            {
                                                val.child.map((v)=>{
                                                    return (<>
                                                        <Radio value={v.value}>{v.text}</Radio>
                                                    </>)
                                                })
                                            }
                                         </RadioGroup>
                                    </div>
                                    
                                </>):(<></>)
                            }    
                            {val.type=="textArea"?(<>
                                <Textarea 
                                label={val.label} 
                                isRequired={val.isRequired??false}
                                isInvalid={val.isRequired?true:``} 
                                errorMessage={val.isRequired?`Error input data!`:``} 
                                />
                            </>):(<></>)}
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