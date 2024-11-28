import React from 'react'
import TitleHeaderFeature from '../../../Global/Component/TitleHeaderFeature/TitleHeaderFeature'
import { useNavigate } from 'react-router-dom'

function Province() {
    const navigate = useNavigate()
    const onBackpage=()=>{
        navigate('/web/setting/country')
    }
  return (
    <div>
        <TitleHeaderFeature onBack={onBackpage} isBack={true}/>
    </div>
  )
}

export default Province