import { Textarea } from '@nextui-org/react'
import React from 'react'

function LZTextArea({label,onChange,name,value}) {
  return (
     <Textarea 
                  disableAnimation
                  name={name}
                  value={value}
                  onChange={onChange}
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