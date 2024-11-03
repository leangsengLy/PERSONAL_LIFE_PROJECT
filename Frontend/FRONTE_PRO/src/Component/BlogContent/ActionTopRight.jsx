import React from 'react'
import LZIconTheme from '../IconAciton/LZIconTheme'
import LZIconLanguage from '../IconAciton/LZIconLanguage'

function ActionTopRight() {
  return (
    <div className='flex absolute top-7 right-10 gap-x-3'>
        <LZIconLanguage/>
        <LZIconTheme/>
    </div>
  )
}

export default ActionTopRight