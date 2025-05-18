import { Tooltip } from '@nextui-org/react'
import React from 'react'

function LZToolTip({title,content}) {
  return (
    <Tooltip content={title}>
        {content}
    </Tooltip>
  )
}

export default LZToolTip