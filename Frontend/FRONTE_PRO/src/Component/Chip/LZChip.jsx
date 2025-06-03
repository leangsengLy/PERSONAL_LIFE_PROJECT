import { Avatar, Chip } from '@nextui-org/react'
import React, { useEffect } from 'react'

function LZChip({items,onClose}) {
  const onCloseChip = (item) => {
    if(onClose) onClose(item)
    console.log("onCloseChip", item);
  }
  return (
    <div className="flex gap-4">
      {
        items.map((item, index) => {
          return (
            <Chip
              key={index}
              isSelected={item.isSelected}
              onClick={() => console.log("clicked", item)}
              className="cursor-pointer"
              variant='bordered'
              avatar={<Avatar getInitials={(name) => name.charAt(0)} name="JW" size="sm" />}
              onClose={()=>{onCloseChip(item)}}
            >
              {item.label || `Chip ${index + 1}`}
            </Chip>
          )
        })
      }
    </div>
  )
}

export default LZChip