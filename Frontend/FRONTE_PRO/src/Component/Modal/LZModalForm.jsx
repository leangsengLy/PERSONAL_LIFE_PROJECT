
import React, { useEffect, useRef, useState } from 'react'
import { Modal,ModalContent,ModalFooter,ModalHeader,ModalBody, Button, Input, Textarea, DatePicker, SelectItem, Select, DateRangePicker } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { SystemSpeakByText } from '../../Util/SystenSayByText';
import { setIsShow } from '../../Store/Confirm/Confirm';
import LZInput from '../FormInput/LZInput';
import LZDateRangePicker from '../FormInput/LZDateRangePicker';
import LZSelect from '../FormInput/LZSelect';
import LZDatePicker from '../FormInput/LZDatePicker';
import LZTextArea from '../FormInput/LZTextArea';
import LZGlobal from '../../Util/LZGlobal';
const LZModalForm = ({isShowModal,content,forms,ui,label,onClose,columns,isUploadImage,HideClickSide,drawerInput}) => {
  const dispatch = useDispatch()
  const refActionImage = useRef(null);
  const [isShow,setIsShow] = useState(isShowModal);
  const [drawInput,setDrawInput] = useState(drawerInput||[]);
  const [IsHideClickSide,setIsHideClickSide] = useState(HideClickSide||false);
  const [UploadImage,setUploadImage] = useState({});
  const [isAnimeButton,setIsAnimeButton] = useState(false);
  const refFileUpload = useRef(null);
  const refImage = useRef(null);
  const closeModal=()=>{
    setIsShow(false);
    onClose();
  }
  
  const onClickCancel=()=>{
    onClose();
  }
  const onClickSave=()=>{
    onClose();
  }
  const onSelect=(key)=>{
    console.log(key)
  }
  
  // const renderValue=(items,list)=>{
  //    var item = list.find((val)=>val.key==items[0].key)
  //     return (
  //         <>
  //             <div className='flex gap-x-2 items-center' >
  //                 <div className='min-w-[30px] w-[30px] min-h-[30px] h-[30px] bd-primary rounded-full p-[2px] '>
  //                 <img className='w-full rounded-full  h-full' src={`http://localhost:8080${item.PathImage}`} alt="" />
  //                 </div>
  //                 <span className='text-[13px] text-black'>{item[LZGlobal.translate({en:"EnglishName",km:"Name"})]}</span>
  //             </div>
  //         </>
  //     );
  // }
  const onSelecting=(item)=>{
    console.log("onSelecting",item)
  }
  const onClickActionImage=(e)=>{
    if(UploadImage!=""){
        setUploadImage("");
    }
    refFileUpload.current.click();
    setIsAnimeButton(true);
    setTimeout(()=>{
        setIsAnimeButton(false);
    },100)
  }
  const onChangeImage=(e)=>{
    var file = e.target.files[0];
    setUploadImage(URL.createObjectURL(file));
    console.log(URL.createObjectURL(file))
    console.log("File",file)
    var reader = new FileReader();
  }
   useEffect(()=>{
         setIsShow(isShowModal);
         setUploadImage("");
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
                <h1 className='justify-center'>{label||""}</h1> 
                </ModalHeader>
                <ModalBody>
                  
                  {isUploadImage?(<><div className='flex gap-x-2 justify-center mb-3'>
                      <div className='w-[100px] h-[130px] rounded-md relative'>
                         <img className={`preview-image w-full h-full  rounded-md  object-cover ${UploadImage==""?'opacity-30':'cursor-pointer'}` } ref={refImage} src={UploadImage==""?LZGlobal.DefaultImage:UploadImage} alt="" />
                         <div ref={refActionImage} onClick={onClickActionImage} className={` ${isAnimeButton?'scale-50':''} transition-all cursor-pointer ease-linear absolute bottom-[-10px] flex justify-center items-center right-[-5px] w-[30px] h-[30px] rounded-full bg-white border border-[#cfcfcf]`}>
                              {UploadImage==""? <i class="ri-camera-line color-primary text-[13px]"></i>:<i class="ri-delete-bin-line text-red-600 text-[13px] "></i>}
                         </div>
                         <Input type='file' ref={refFileUpload} onChange={onChangeImage}  classNames={{base:"!hidden"}}/>
                      </div>
                  </div></>):(<></>)}
                  
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
                    {
                      drawInput.map((val,index)=>{
                        return (
                          <>
                            {val.type=="input"? <LZInput isRequired={true}/>: val.type=="select"?
                            <LZSelect 
                                startContent={(item)=>{return val.options.startContent(item)}}
                                renderValue={(item,list)=>{return val.options.renderValue(item,list)}}
                                isRequired={true}
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
                                  }/>:val.type=="date"?<LZDatePicker isRequired={true}/>:val.type=="number"?<LZInput  type="number"/>:<></>}
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
                            <LZTextArea isRequired={true} label={val.label}/>
                          </>
                        )
                      })
                    }
                    </>):(<></>)
                  }
                </ModalBody>
                <ModalFooter>
                    <Button size='md' color='default' onClick={onClickCancel}>Cancel</Button>
                    <Button size='md' color='primary' onClick={onClickSave}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </div>
  )
}

export default LZModalForm