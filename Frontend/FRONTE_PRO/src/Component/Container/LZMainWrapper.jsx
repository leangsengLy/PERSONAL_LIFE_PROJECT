import React from 'react'

function LZMainWrapper({contentTag}) {
  return (
    <div className='py-3 px-5 blog-submenu  lzscroll !h-full'>
        {contentTag}
    </div>
  )
}

export default LZMainWrapper