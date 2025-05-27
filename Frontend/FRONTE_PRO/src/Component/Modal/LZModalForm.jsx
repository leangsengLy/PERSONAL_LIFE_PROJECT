
import React, { useEffect, useRef, useState } from 'react'
import { Modal,ModalContent,ModalFooter,ModalHeader,ModalBody, Button, Input, Textarea, DatePicker, SelectItem, Select, DateRangePicker, input } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsShow as SetIsShowConfirm, setModalConfirm } from '../../Store/Confirm/Confirm';
import LZInput from '../FormInput/LZInput';
import LZDateRangePicker from '../FormInput/LZDateRangePicker';
import { setIframe, setIsShow as setIsShowIframe } from '../../Store/PreviewIFrame/PreviewIFrame';
import LZSelect from '../FormInput/LZSelect';
import LZDatePicker from '../FormInput/LZDatePicker';
import LZTextArea from '../FormInput/LZTextArea';
import LZGlobal from '../../Util/LZGlobal';
import LZIcon from '../Icon/LZIcon';
import { GetBase64ByImage } from '../../Util/GetBase64ByImage';
import { use } from 'react';
import { HttpRequest } from '../../Global/API_HTTP/http';
import { ShowSnackbar } from '../../Util/globalUtils';
const LZModalForm = ({isShowModal,content,forms,ui,reload,label,onClose,columns,isNewCreate,dataEdit,isUploadImage,HideClickSide,drawerInput,onSave}) => {
  const dispatch = useDispatch()
  const refActionImage = useRef(null);
  const [isShow,setIsShow] = useState(isShowModal);
  const refIframe = useRef(null);
  const [drawInput,setDrawInput] = useState(drawerInput||[]);
  const [SomeFieldError,setSomeFieldError] = useState([]);
  const [isSubmit,setIsSubmit] = useState(false);
  const [IsHideClickSide,setIsHideClickSide] = useState(HideClickSide||false);
  const [UploadImage,setUploadImage] = useState({});
  const [InputForm,setInputForm] = useState(dataEdit||{});
  const [isAnimeButton,setIsAnimeButton] = useState(false);
  const tr = useSelector(state=>state.Language.translate);
  const refFileUpload = useRef(null);
  const refImage = useRef(null);
  const closeModal=()=>{
    setIsShow(false);
    onClose();
  }

  useEffect(()=>{
    setDrawInput(drawerInput)
     if(isShowModal){
          if (refIframe.current) {
            refIframe.current.src = ""; // Clears the iframe source
          }
      }

  },[drawerInput]);
  const onClickCancel=()=>{
    onClose();
  }
  const onChangeInput=(e)=>{
    setIsSubmit(false)
      setInputForm((val)=>{
          return {...val,[e.target.name]:e.target.value}
        })
  
  }
 
  const onClickSave=()=>{
    setIsSubmit(true)
     if(SomeFieldError.length>0){
      console.log("No need to sumbit api")
    }else onSave(InputForm)
  }
  const onSelect=(key)=>{
    console.log(key)
  }
  const onSelecting=(name,item)=>{
    console.log(name,item.Id!=="")
    if(item.Id!==""){
      setIsSubmit(false)
      setInputForm((val)=>{
        return {...val,[name]:item.Id}
      })
    }
       
  }
  const onCheckError=(error)=>{
    console.log("onCheckError",error)
    setSomeFieldError(val=>[...val,error])
  }
  const onClickActionImage=(e)=>{
     setIsAnimeButton(true);
      setTimeout(()=>{
          setIsAnimeButton(false);
      },100)
    if(UploadImage!=""){
         if(!isNewCreate){
        dispatch(
          setModalConfirm({
                    type:"delete",
                    message:"Are you sure! do you want to delete this image?",
                    onOk: ()=>{
                        DeleteImage();
                        if(reload )
                        reload();
                        setUploadImage("");
                        dispatch(SetIsShowConfirm(false))
                    },
                    onClose:()=>{
                        dispatch(SetIsShowConfirm(false))
                    }
            }))
        dispatch(SetIsShowConfirm(true))
      }
    }else{
      refFileUpload.current.click();
    }
    
  }
  const DeleteImage=async()=>{
     await  HttpRequest({
                url:`api/movie/remove_image?Id=${InputForm.Id}`,
                method:'get',
                success:(result)=>{
                  console.log(result)
                    // ShowSnackbar({})
                },
                error:(error)=>{
                    console.log(error)
                }
            })
  }
  const onChangeImage=async(e)=>{
    var file = e.target.files[0];
    setUploadImage(URL.createObjectURL(file))
    var image = await GetBase64ByImage(file)
    setIsSubmit(false)
    setInputForm((val)=>{
      return {...val,Files:image}
    })
  }
  const onClickPreviewIframe=(url)=>{
        dispatch(setIframe({path:url}))
        dispatch(setIsShowIframe(true))
  }
  const onFocusInput=(e,typeFocus)=>{
    console.log(typeFocus)
    if(typeFocus=="selectAll") e.target.select();
  }
  const onChangeDate=(name,date)=>{
       setIsSubmit(false)
     setInputForm((val)=>{
      return {...val,[name]:date}
    })
   
  }
  useEffect(()=>{
    setInputForm(dataEdit)
  },[dataEdit])
  useEffect(()=>{
   console.log("isSubmit",isSubmit)
  },[isSubmit])

  useEffect(()=>{
    if(!isNewCreate && InputForm?.ImagePath!=null) {
      setUploadImage("http://localhost:8080"+InputForm?.ImagePath)
    }
  },[InputForm])
   useEffect(()=>{
        setIsSubmit(false) 
         setIsShow(isShowModal);
         setUploadImage("");
         setDrawInput(drawerInput);
     },[isShowModal]);
  return (
    <div>
        <Modal isOpen={isShowModal} backdrop='blur'
         className='max-w-[800px]' onClose={closeModal} 
         isDismissable={IsHideClickSide}
         classNames={{
          closeButton:'!color-3 mt-3 mr-3 text-[17px] ',
          base:'!bg-popup',
          wrapper:"!z-[1770]",
          header:'pb-0',
          footer:"pt-1",
          backdrop:"!z-[1400]"
          }}>
            <ModalContent>
                <ModalHeader>
                <h1 className='justify-center text-[15px]'>{label||""}</h1> 
                </ModalHeader>
                <ModalBody>
                  {isUploadImage?(<><div className='flex gap-x-2 justify-center mb-3'>
                      <div className='w-[100px] h-[130px] rounded-md relative'>
                         <img className={`preview-image w-full h-full  rounded-md  object-cover ${UploadImage==""?'opacity-30':'cursor-pointer'}` } ref={refImage} src={UploadImage==""?LZGlobal.DefaultImage:UploadImage} alt="" />
                         <div ref={refActionImage} onClick={onClickActionImage} className={` ${isAnimeButton?'scale-50':''} transition-all cursor-pointer ease-linear absolute bottom-[-10px] flex justify-center items-center right-[-5px] w-[30px] h-[30px] rounded-full bg-white border border-[#cfcfcf]`}>
                              {UploadImage==""? <i class="ri-camera-line color-primary text-[13px]"></i>:<i class="ri-delete-bin-line text-red-600 text-[13px] "></i>}
                         </div>
                         <Input type='file'  ref={refFileUpload}  onChange={onChangeImage}  classNames={{base:"!hidden"}}/>
                      </div>
                  </div></>):(<></>)}
                  
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
                    {
                      drawInput.map((val,index)=>{
                        return (
                          <>
                            {val.type=="input"? <LZInput  isSubmit={isSubmit} onCheckError={onCheckError} isValid={InputForm[val.name]=="" && val.required} value={InputForm[val.name]} label={val.label} onFocus={(e)=>{onFocusInput(e,val.focus)}} 
                            name={val.name}
                             onChange={(e)=>{
                              setIsSubmit(false)
                              if(val.onChange!=undefined){
                                val.onChange(e.target.value);
                              }else onChangeInput(e)
                            }
                            } isRequired={val.required||false}/>: val.type=="select"?
                            <LZSelect 
                                  name={val.name}
                                 label={val.label||"label"}
                                startContent={(item)=>{return val.options.startContent(item)}}
                                renderValue={(item,list)=>{return val.options.renderValue(item,list)}}
                                isRequired={val.required||false}
                                selectItem={InputForm[val.name]}
                                isMulti={val.options.isMulti}
                                onSelecting={onSelecting}
                              
                                api={
                                  {
                                    url:val.options.api.url,
                                    method:val.options.api.method,
                                    data:val.options.api.data,
                                    key:val.options.api.key,
                                    value:val.options.api.value,
                                    }
                                  }/>:val.type=="date"?<LZDatePicker valueDate={InputForm[val.name]} onChange={(name,date)=>{
                                    onChangeDate(name,date)
                                  }} label={val.label||"label"} name={val.name} isRequired={val.required||false}/>:val.type=="number"?<LZInput 
                                  value={InputForm[val.name]}
                                  onChange={(e)=>{
                                      if(val.onChange!=undefined) val.onChange(e.target.value);
                                        onChangeInput(e)
                                    }}  
                                    name={val.name}
                                    label={val.label||"label"} type="number"/>:val.type=="iframe"?<>
                                  <div className='h-[74px] flex gap-x-3 items-center'>
                                    <div  className='w-[170px] overflow-hidden rounded-lg h-full flex justify-center items-center border border-dashed border-black'>
                                      {console.log("test",InputForm)}
                                    {
                                      
                                      val.URL!=""?
                                      <iframe className='w-full h-full' ref={refIframe}  src={LZGlobal.GetURLPreviewIframe(val.URL)} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                                    </iframe>:InputForm?.UrlYT!=""?<iframe className='w-full h-full' ref={refIframe}  src={LZGlobal.GetURLPreviewIframe(InputForm?.UrlYT)} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                                    </iframe>: <p className='text-[12px]'>Link URL</p>
                                    }
                                  </div>
                                    {val.URL!=""?<LZIcon bgColor="success"  typeIcon="view" onClickIcon={()=>{onClickPreviewIframe(val.URL)}}/>:<></>}
                                </div></>:<></>}
                          </>
                        )
                      })
                    }
                      {/* <LZInput isRequired={true}/> */}
                  </div>
                  {
                    drawInput.filter(v=>v.type=="textarea").length!=0?(<>
                    {
                      drawInput.filter(v=>v.type=="textarea").map((val,index)=>{
                        return (
                          <>
                            <LZTextArea 
                            name={val.name}
                            value={InputForm[val.name]} 
                            onChange={(e)=>{
                              console.log(e.target.value)
                              if(val.onChange!=undefined){
                                val.onChange(e.target.value);
                              }
                              onChangeInput(e)
                            }}  isRequired={val.required} label={val.label}/>
                          </>
                        )
                      })
                    }
                    </>):(<></>)
                  }
                </ModalBody>
                <ModalFooter>
                    <Button size='md' color='default' onClick={onClickCancel}>{tr.cancel}</Button>
                    <Button size='md' color='primary' onClick={onClickSave}>{tr.save}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </div>
  )
}

export default LZModalForm