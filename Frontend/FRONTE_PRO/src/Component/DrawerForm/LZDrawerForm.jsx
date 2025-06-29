import { Drawer } from '@mui/material'
import { Input, Radio, RadioGroup, Select, Textarea,SelectItem } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'
import LZIcon from '../Icon/LZIcon'
import LZButton from '../Button/LZButton'
import { useDispatch, useSelector } from 'react-redux'
import { setIsShow, setModalConfirm } from '../../Store/Confirm/Confirm'
import { isExists, set } from 'date-fns'
import { HttpRequest } from '../../Global/API_HTTP/http'
import { ShowSnackbar } from '../../Util/globalUtils'

function LZDrawerForm({ui,fn,propDrawer,data,reDrawData,isCreate}) {
    const dispatch = useDispatch()
    const UploadFile = useRef(null);
    const [isCreateNew,isSetCreateNew] = useState(false);
    const [isExistedCode,setIsExistedCode] = useState(false);
    const [GetData,setGetData]=useState([]);
    const [selectKey,setSelectKey]=useState([]);
    const [Image,setImage] = useState(null)
    const [SourseImage,setSourseImage] = useState(null)
    const [IsFirstInput,SetIsFirstInput] = useState({})
    const [HasReqired,setHasRequired] = useState([]);
    const tr = useSelector(state=>state.Language.translate)
    useEffect(()=>{
        setHasRequired(data.filter(v=>v.isRequired))
        let dataObject = data.filter(v=>v.isRequired).map((val)=>({[val.name]:false})).reduce((acc, item) => {
            return { ...acc, ...item };
        }, {});
        SetIsFirstInput(dataObject)
        isSetCreateNew(isCreate)
      
        if(isCreate){
            setGetData([]);
            setImage(null);
            setSourseImage(null);
            setSelectKey([`0`]);
        }
        else {
            setGetData(reDrawData);
            setSourseImage(reDrawData);
            setImage(reDrawData);
            setSelectKey([`${reDrawData.Id}`]);
        }
      
    },[propDrawer.open])
    let NameCheckBox = "";
    const EventInputForm=(e)=>{
        setGetData(val=>{
            return {...val,[e.target.name]:e.target.value}
        })
        SetIsFirstInput(val=>{
            return {...val,[e.target.name]:true}
        })
    }
    const selectTheRadio = (name)=>{
        NameCheckBox =name;
    }
 
    const checkValidatioForm = ()=>{
        if(HasReqired.length>0){
            if(GetData.length==0){
                Object.keys(IsFirstInput).map((val)=>{
                    SetIsFirstInput(v=>{
                        return {...v,[val]:true}
                    })
                })  
            }else{
                HasReqired.map((val)=>{
                    if(!Object.keys(GetData).includes(val.name)){
                        SetIsFirstInput(v=>{
                            return {...v,[val.name]:true}
                        })
                        return '';
                    }else{
                        SetIsFirstInput(v=>{
                            return {...v,[val.name]:false}
                        })
                    }
                })
                if(isCreate){
                    if(fn.onSave){
                        fn.onSave(GetData)
                    }
                }
                else {
                    if(fn.onSaveEdit){
                        fn.onSaveEdit(GetData)
                    }
                }
                
            }
        }else{
            if(isCreate){
                if(fn.onSave){
                    fn.onSave(GetData)
                }
            }
            else {
                if(fn.onSaveEdit){
                    fn.onSaveEdit(GetData)
                }
            }
        }
       
    }
    const SelectRadio = (value)=>{
        setTimeout(()=>{
            setGetData(val=>{
                return {...val,[NameCheckBox]:value}
            })
        },20)
        
    }
   
    const HandleUploadFileChange=(e)=>{
        setGetData(val=>{
            return {...val,File:e.target.files[0]}
        })
        setSourseImage(e.target.files[0])
        setImage(URL.createObjectURL(e.target.files[0]))
    }
    const onUploadFile=()=>{
        isSetCreateNew(true)
        UploadFile.current.click();
    }
  
    useEffect(()=>{
        if(!propDrawer.open){
            setTimeout(()=>{
                setGetData([])
            },100)
        }
        
    },[propDrawer.open])
    const clickCancelImage=()=>{
        dispatch(setModalConfirm({
            onClose:()=>{
                dispatch(setIsShow(false))
            },
            onOk:()=>{
                setImage(null);
                setSourseImage(null);
                dispatch(setIsShow(false))
            },
            message:"Do you want delele this Image!",
            type:"delete"
        }))
        dispatch(setIsShow(true))
    }
    const CloseModal=()=>{
        if(fn.onCancel)
        fn.onCancel("close")
        setTimeout(()=>{
            setGetData([])
        },100)
    }
    useEffect(()=>{
        console.log(Image)
    })
    const onCloseModalByIcon=()=>{
        if(fn.onClose){
            fn.onClose();
        }
    }
    const checkExistedCode=async(value,url,param)=>{
        console.log(url)
        console.log(param)
        if(value!=""){
            await HttpRequest({
                    url:`${url}?code=${value}&id=0&database=LZ`,
                    method:"get",
                    success:(result)=>{
                        setIsExistedCode(result)
                    },
                    error:(error)=>{
                        ShowSnackbar({message:error.message,type:"error"})
                    }
                })
        }
        
    }
    useEffect(()=>{
        if(propDrawer.open)setIsExistedCode(false)
    },[propDrawer.open])
  return (
    <Drawer  anchor={ui?.placement??'right'}  open={propDrawer.open??false}>
        <div className={`${ui.width??`w-[370px]`} px-4 py-3`}>
                <div className='flex justify-between items-center mb-3'>
                    <h1 className='text-[16px] font-bold'>{propDrawer.label??'No label'} </h1>
                    <LZIcon typeIcon="cancel" onClickIcon={onCloseModalByIcon} isRounded={true}/>
                </div>
                <div className='flex flex-col gap-y-3'>
                    {data.map((val)=>{
                        return (<>
                            {val.type=="text"?(<>
                                <Input 
                                    type={val.type}
                                    isRequired={val.isRequired}
                                    value={GetData[val.name]}
                                    
                                    isDisabled={!isCreate?val.isDisabled:false}
                                    errorMessage={(isExistedCode && val.isCheckCode) || val.isRequired && IsFirstInput[val.name] && (GetData[val.name]=='' || GetData[val.name] == undefined)?`${isExistedCode?`Code already existed!`:`Error input ${val.name}!`}`:``} 
                                    isInvalid={(isExistedCode && val.isCheckCode ) ||  val.isRequired && IsFirstInput[val.name] && (GetData[val.name]=='' || GetData[val.name] == undefined)} 
                                    onChange={(e)=>{
                                        EventInputForm(e)
                                        if(val.checkCode.url!==""){
                                            checkExistedCode(e.target.value,val.checkCode.url,val.checkCode.param)
                                        }
                                    }} 
                                    labelPlacement="inside" 
                                    className='!rounded-full' 
                                    name={val.name}  
                                    label={val.label} 
                                    />
                            </>):(<></>)}
                            {
                                val.type=="checkbox"?(<>
                                    <RadioGroup orientation="horizontal" 
                                    isRequired={val.isRequired} 
                                    errorMessage={val.isRequired?`Please choose one only`:``} 
                                    isInvalid={val.isRequired} label="Gender" 
                                    color='warning' 
                                    onChange={()=>{selectTheRadio(val.name)}} 
                                    onValueChange={SelectRadio} 
                                    name={val.name} 
                                    defaultValue={0}>
                                        {
                                            val.child.map((v)=>{
                                                return (<>
                                                    <Radio value={v.value}>{v.text}</Radio>
                                                </>)
                                            })
                                        }
                                        </RadioGroup>
                                </>):(<></>)
                            }    
                            {
                                val.type=="file"?(<>
                                    <div>
                                        <p className='text-[13px] mb-2'>Country image</p>
                                        <div onClick={onUploadFile} className='w-full cursor-pointer select-none h-[120px] rounded-xl border border-slate-400 border-dashed flex justify-center items-center'>
                                                <div className='flex flex-col justify-center items-center'>
                                                    <i className='pi pi-upload mb-3'></i>
                                                   <p className='text-[12px]'>Drag and Drop file here or Choose file</p>
                                                </div>
                                        </div>
                                        {/* <input  type="file" className='hidden' ref={UploadFile} onChange={HandleUploadFileChange}/> */}
                                        <input 
                                            type="file"
                                            ref={UploadFile}
                                            onChange={HandleUploadFileChange}
                                            className='hidden'
                                        />
                                        {
                                            Image!==null?(<>
                                                    <div className='mt-4 relative w-full border flex justify-start gap-x-2 items-center border-slate-200 rounded-xl p-2'>
                                                        <div className='min-w-[100px] w-[100px] min-h-[60px] h-[60px] rounded-xl overflow-hidden '>
                                                            {Image?.PathImage!==""?(<><img src={isCreateNew?Image:"http://localhost:8080"+Image?.PathImage} alt="" className='preview-image cursor-pointer w-full rounded-xl h-full object-cover' /></>):(<></>)}
                                                        </div>
                                                        <div className='!pr-9'>
                                                            {console.log("check Image",isCreateNew,Image.ImagePath)}
                                                                {
                                                                    Image?.PathImage!==""?(<><p className='lz-line text-[14px]'>{isCreateNew?SourseImage?.name:Image?.PathImage?.split("/")[Image?.PathImage?.split("/").length-1]}</p> </>):(<> </>)
                                                                }
                                                                {
                                                                    Image.ImagePath!==""?(<><p className='lz-line text-[14px]'>{isCreateNew?SourseImage?.name:Image?.ImagePath?.split("/")[Image?.ImagePath?.split("/").length-1]}</p></>):(<></>)
                                                                }
                                                                <p className='text-[13px]'>{isCreateNew?SourseImage?.size:SourseImage?.SizeImage}</p>
                                                        </div>
                                                        <div className='absolute right-3'>
                                                            <LZIcon isRounded={true} onClickIcon={clickCancelImage} typeIcon="cancel"/>
                                                        </div>
                                                </div>
                                            </>):(<></>)
                                        }
                                        
                                    </div>
                                </>):(<></>)
                            }
                            {val.type=="textArea"?(<>
                                <Textarea 
                                label={val.label} 
                                value={GetData[val.name]}
                                name={val.name}
                                onChange={EventInputForm} 
                                isRequired={val.isRequired??false}
                                isInvalid={val.isRequired?true:``} 
                                errorMessage={val.isRequired?`Error input data!`:``} 
                                />
                            </>):val.type=="number"?(<>
                                <Input 
                                label={val.label} 
                                value={GetData[val.name]}
                                name={val.name}
                                type={val.type}
                                onChange={EventInputForm} 
                                isRequired={val.isRequired??false}
                                // isInvalid={val.isRequired?true:``} 
                                errorMessage={val.isRequired && IsFirstInput[val.name] && (GetData[val.name]=='' || GetData[val.name] == undefined)?`Error input ${val.name}!`:``} 
                                isInvalid={val.isRequired && IsFirstInput[val.name] && (GetData[val.name]=='' || GetData[val.name] == undefined)} 
                                // errorMessage={val.isRequired?`Error input data!`:``} 
                                />
                            </>):val.type=="select"?(<><Select selectedKeys={selectKey} 
                            onSelectionChange={
                                (event)=>{
                                    val.onSelect(event.currentKey);
                                    setSelectKey([`${event.currentKey}`]);
                                }}
                             isRequired className="max-w-xs" label={val.label}>
                                    {val.data.map((item,index) => {
                                        return (
                                            <SelectItem  value={item} startContent={<div className='w-[40px] h-[40px] bd-primary rounded-full p-[2px] '>
                                                <img className='w-full rounded-full  h-full' src={`http://localhost:8080${item.PathImage}`} alt="" />
                                                </div>} key={item.Id}>
                                                {item.label}
                                            </SelectItem>
                                        
                                    )
                                    })}
                                </Select></>):(<></>)}
                        </>)
                    })}
                </div>
                <div className='flex justify-end gap-x-2 mt-4'>
                    <LZButton label={tr.save} click={()=>{checkValidatioForm()}} typeButton="save"/>
                    <LZButton label={tr.cancel} click={CloseModal} typeButton="cancel"/>
                </div>
        </div>
    </Drawer>
  )
}

export default LZDrawerForm