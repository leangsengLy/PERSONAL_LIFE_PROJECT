import React from 'react'
import { Modal,ModalContent,ModalFooter,ModalHeader,ModalBody, Button } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { SystemSpeakByText } from '../../../Util/SystenSayByText';
import { setIsShow } from '../../../Store/Confirm/Confirm';
const LZComfirm = () => {
  const dispatch = useDispatch()
  const comfirm = useSelector(state=>state.Confirm.confirm);
  const isShowComfirm = useSelector(state=>state.Confirm.isOpen);
  if(isShowComfirm)setTimeout(()=>{
    SystemSpeakByText(comfirm.message)
  },400)
  const closeModal=()=>{
    dispatch(setIsShow(false))
  }
  return (
    <div>
        <Modal isOpen={isShowComfirm} backdrop='blur' onClose={closeModal} classNames={{
          closeButton:'!color-3 mt-3 mr-3 text-[17px] ',
          base:'!bg-popup',
          header:'pb-0',
          footer:"pt-1"
          }}>
            <ModalContent>
                <ModalHeader>
                <h1 className='justify-center'>{comfirm.title} </h1> 
                </ModalHeader>
                <ModalBody>
                  {comfirm.message}
                </ModalBody>
                <ModalFooter>
                    <Button size='md' color='default' onClick={comfirm.onClose}>Cancel</Button>
                    <Button size='md' color='primary' onClick={comfirm.onOk}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </div>
  )
}

export default LZComfirm