import { Textarea } from '@nextui-org/react'
import React from 'react'

function LZTextArea({label}) {
  return (
     <Textarea 
                  disableAnimation
                  disableAutosize 
                   classNames={{inputWrapper:'border border-black-150',base:'!max-w-full'}}
                     className="max-w-xs !w-full" 
                     variant='bordered'
                     radius='sm'
                      labelPlacement='outside'
                      label={label||"Label"}
                      placeholder="Enter your description" />
  )
}

export default LZTextArea