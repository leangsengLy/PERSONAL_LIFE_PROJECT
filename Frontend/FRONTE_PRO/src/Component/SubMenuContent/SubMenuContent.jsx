import React from 'react'
import { useParams } from 'react-router-dom'

function SubMenuContent() {
const param = useParams();
console.log(param.subType)
  return (
    <div>{param.subType}</div>
  )
}

export default SubMenuContent