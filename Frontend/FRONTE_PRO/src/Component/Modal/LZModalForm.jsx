
import React, { useEffect, useState } from 'react'
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
  const startContent=(item)=>{
    return (<>
              <div className='w-[30px] h-[30px] bd-primary rounded-full p-[2px] '>
                <img className='w-full rounded-full  h-full' src={`http://localhost:8080${item.PathImage}`} alt="" />
                </div>
            </>)
  }
  const renderValue=(items,list)=>{
     var item = list.find((val)=>val.key==items[0].key)
     console.log("Item",item)
     console.log("list",list)
      return (
          <>
              <div className='flex gap-x-2 items-center' >
                  <div className='min-w-[30px] w-[30px] min-h-[30px] h-[30px] bd-primary rounded-full p-[2px] '>
                  <img className='w-full rounded-full  h-full' src={`http://localhost:8080${item.PathImage}`} alt="" />
                  </div>
                  <span className='text-[13px] text-black'>{item[LZGlobal.translate({en:"EnglishName",km:"Name"})]}</span>
              </div>
          </>
      );
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
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-2">
                      <LZInput isRequired={true}/>
                      <LZDatePicker isRequired={true}/>
                      <LZDateRangePicker/>
                      <LZSelect 
                      startContent={startContent}
                       renderValue={renderValue}
                        isRequired={true}
                        isMulti={true}
                         api={
                          {
                            url:"/api/cinema/list",
                            method:"post",
                            data:{id:0,search:""},
                            key:"Id",
                            value:LZGlobal.translate({en:"EnglishName",km:"Name"})
                            }}/>
                       {/* await  HttpRequest({
            url:"/api/cinema/list",
            method:'post',
            data:{
                 id:0,
                 search:""
            },
            success:(result)=>{
                SetCinema(result)
                console.log(Cinemas)
            },
            error:(error)=>{
                console.log(error)
            }
        }) */}
                  </div>

                 <LZTextArea/>
                    
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