import React from 'react'

function Language() {
  return (
    <div className='w-full'>
        <h2>Language</h2>
        <p>In the below you can choose your language in our system </p>
        <div className='wrapper-color flex gap-2 flex-wrap mt-3'>
          {
            [1,3,4,1,2,2].map((val)=>{
              return (<><div className='w-[80px] h-[50px] rounded-md '>
                <img className='w-full h-full object-cover  rounded-md ' src='https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_Cambodia.svg'/>
              </div></>)
            })
          }
        </div>
        <div className='w-full flex h-auto justify-center items-center flex-col gap-y-5 mt-8'>
            <p>Pick up your color sysyem</p>
            <div className='w-[130px] h-[80px] rounded-md '>
              <img className='w-full h-full object-cover  rounded-md ' src='https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_Cambodia.svg'/>
            </div>
        </div>
    </div>
  )
}

export default Language