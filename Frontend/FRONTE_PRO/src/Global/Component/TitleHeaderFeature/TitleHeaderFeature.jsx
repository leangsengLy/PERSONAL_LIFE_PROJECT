import React from 'react'
function TitleHeaderFeature({title='no title',onBack,isBack}) {
    const onBackPage=()=>{
        if(onBack){
            onBack();
        }
    }
  return (
    <div className='flex gap-x-2 items-center'>
        {
            isBack?(<>
               <i className="ri-arrow-left-line cursor-pointer text-[20px]" onClick={onBackPage}></i>
            </>):(<></>)
        }
        <h5>{title}</h5>
    </div>
  )
}

export default TitleHeaderFeature