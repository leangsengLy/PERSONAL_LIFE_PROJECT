import { Chip } from '@nextui-org/react'
import React from 'react'

function LZChip() {
  return (
    <div className="flex gap-4">
      <Chip onClose={() => console.log("close")}>Chip</Chip>
    </div>
  )
}

export default LZChip