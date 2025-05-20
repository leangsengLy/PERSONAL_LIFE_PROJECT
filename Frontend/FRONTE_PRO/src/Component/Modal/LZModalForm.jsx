// import { Input, Textarea } from "@nextui-org/react";
// import { useEffect, useState } from "react";
// import LZButton from "../Button/LZButton";
// import { useSelector } from "react-redux";

// function LZModalForm({isShowModal,content,forms,ui,label,onClose,columns}) {
//     const tr = useSelector(state=>state.Language.translate);
//     const [isShow,setIsShow] = useState(isShowModal);
//     const onClickCloseModal=()=>{
//         onClose()
//         setIsShow(false);
//     }
//     const onClickCancel=()=>{
//         onClose()
//         console.log("Cancel")
//     }
//     const onClickSave=()=>{
//         onClose()
//         console.log("Save")
//     }
//     useEffect(()=>{
//         setIsShow(isShowModal);
//     },[isShowModal]);
//   return (
//     <>
    
//      {isShow?(<>
//      <div className='w-screen h-screen fixed top-0 left-0 z-[200] bg-[#0000006b]'>
//         <div className='w-full h-full relative flex justify-center items-center'>
//            <div className={`${columns>=3?'w-[750px]':'w-[560px]'} overflow-hidden h-auto  bg-white  p-5 py-3 rounded-2xl`}
//            >
//                 {
//                     label!==""?(<>
//                      <div className="flex justify-between color-1 items-center">
//                         <b>{label}</b>
//                        <i onClick={onClickCloseModal} class="ri-close-line text-[22px] cursor-pointer opacity-50 hover:opacity-100 transition-all ease-linear"></i>
//                     </div>
//                     </>):(<></>)
//                 }
//                 <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
//                     <Input 
//                     label="Email" 
//                     radius="sm"
//                     className="text-[12px]"
//                     type="text"
//                     labelPlacement = "outside"
//                     isRequired={true}
//                     isInvalid={false}
//                     errorMessage="Please enter your email"
//                     variant="faded"
//                     placeholder="Enter your email"
//                     classNames={
//                         {
//                             label:'text-[12px] !text-black',
//                             base:'text-[12px] text-black ',
//                             input:'text-[12px] bg-red-50 ',
//                             inputWrapper:'text-[12px] bg-white border border-black-150' ,
//                         }
//                         } />
                   
//                 </div>
//                 <div className="flex justify-end gap-x-2 mt-3">
//                     <LZButton typeButton="cancel" label={tr.cancel} click={onClickCancel}/>
//                     <LZButton typeButton="save" label={tr.save} click={onClickSave}/>
//                 </div>
//            </div>
//         </div>
//     </div>
//     </>):(<></>)}
//     </>
    
//   )
// }

// export default LZModalForm

import React, { useEffect, useState } from 'react'
import { Modal,ModalContent,ModalFooter,ModalHeader,ModalBody, Button, Input, Textarea, DatePicker, SelectItem, Select } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { SystemSpeakByText } from '../../Util/SystenSayByText';
import { setIsShow } from '../../Store/Confirm/Confirm';
const LZModalForm = ({isShowModal,content,forms,ui,label,onClose,columns}) => {
  const dispatch = useDispatch()
  const [isShow,setIsShow] = useState(isShowModal);
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

   useEffect(()=>{
         setIsShow(isShowModal);
     },[isShowModal]);
  return (
    <div>
        <Modal isOpen={isShowModal} backdrop='blur' className='max-w-[800px]' onClose={closeModal} classNames={{
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
                  {content}
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
                     <Input 
                        label="Email" 
                        radius="sm"
                        className="text-[12px]"
                        type="text"
                        labelPlacement = "outside"
                        isRequired={true}
                        size='md'
                        isInvalid={false}
                        errorMessage="Please enter your email"
                        variant="faded"
                        placeholder="Enter your email"
                        classNames={
                            {
                                label:'text-[12px] !text-black',
                                base:'text-[12px] text-black ',
                                input:'text-[12px] bg-red-50 ',
                                inputWrapper:'text-[12px] bg-white border border-black-150' ,
                            }
                            } 
                        />
                        <Select isRequired className="max-w-xs" label="label" placeholder='Please select' labelPlacement='outside' radius='sm' variant='bordered' size='md' onValueChange={onSelect} >
                                    {[1,2,3,4,5].map((item,index) => {
                                        return (
                                            <SelectItem  value={item}  startContent={<div className='w-[40px] h-[40px] bd-primary rounded-full p-[2px] '>
                                                <img className='w-full rounded-full  h-full' src={`http://localhost:8080${item.PathImage}`} alt="" />
                                                </div>} key={item.Id}>
                                                {item.label}
                                            </SelectItem>
                                        
                                    )
                                    })}
                                </Select>
                        <DatePicker 
                        className="max-w-[284px] !min-h-[50px]"
                          size='md'
                          label="Birth date" 
                          radius='sm' 
                          classNames={
                            {
                               inputWrapper: "group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:ring-offset-0",
                                label:'text-[12px] !text-black',
                                input: "focus:ring-0 focus:border-none",
                            }
                            } 
                          variant='bordered' 
                          labelPlacement='outside' />
                        
                        <Input 
                        label="Email" 
                        radius="sm"
                        className="text-[12px]"
                        type="text"
                                size='md'
                        labelPlacement = "outside"
                        isRequired={true}
                        isInvalid={false}
                        errorMessage="Please enter your email"
                        variant="faded"
                        placeholder="Enter your email"
                        classNames={
                            {
                                label:'text-[12px] !text-black',
                                base:'text-[12px] text-black ',
                                input:'text-[12px] bg-red-50 ',
                                inputWrapper:'text-[12px] bg-white border border-black-150' ,
                            }
                            } 
                        />
                  </div>

                  <Textarea 
                  disableAnimation
                  disableAutosize 
                   classNames={{inputWrapper:'border border-black-150'}}
                     className="max-w-xs !w-full" 
                     variant='bordered'
                     radius='sm'
                      labelPlacement='outside'
                      label="Description"
                      placeholder="Enter your description" />
                    
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