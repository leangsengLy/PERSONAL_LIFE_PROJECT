import React from 'react'
import { Modal,ModalContent,ModalFooter,ModalHeader,ModalBody, Button } from '@nextui-org/react'
const LZComfirm = () => {
  return (
    <div>
        <Modal isOpen={true}>
            <ModalContent>
                <ModalHeader>
                        Testing
                </ModalHeader>
                <ModalBody></ModalBody>
                <ModalFooter>
                    <Button>Cancel</Button>
                    <Button>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </div>
  )
}

export default LZComfirm