import { Textarea } from '@nextui-org/react'
import React from 'react'

function LZTextArea() {
  return (
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
  )
}

export default LZTextArea