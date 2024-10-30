import Online_Delivery_Service from '../../../../public/Online_Delivery_Service.gif'
import cambo from '../../../../public/Image/Flag/Cambodia.png'
import bright from '../../../../public/Icon/bright.svg'
import night from '../../../../public/Icon/night.svg'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from '../../../Store/ThemeBackground/Theme.js'
import { Button, Checkbox, Input } from '@nextui-org/react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const Login = () => {
  const [isVisible,SetInVisal] = useState(false)
  const [isCreateAccount,SetIsCreateAccount]=useState(false);
  const dispatch  = useDispatch();
  const isDark = useSelector(state=>state.Theme.isDark);
  const onChangeTheme=()=>{
    dispatch(changeTheme(!isDark))
  }
  const toggleVisibility=()=>{
    SetInVisal(!isVisible)
  }
  const onClickCreateAccount=()=>{
    SetIsCreateAccount(!isCreateAccount)
  }
  return (
    <div className='w-screen h-screen bg-box-wrapper flex justify-center items-center relative'>
      <div className='absolute top-6 right-7 flex gap-x-3'>
                <div className='w-[40px] h-[40px] cursor-pointer p-1 rounded-full border-primary'>
                  <img src={cambo} alt="" className='w-full h-full rounded-full'/>
                </div>
                <div className='w-[40px] h-[40px]  cursor-pointer p-2 rounded-full border-primary' onClick={onChangeTheme}>
                  <img src={isDark?bright:night} alt="" className='w-full h-full rounded-full'/>
                </div>
      </div>
        <div className='w-[1100px] flex justify-between items-center mx-5'>
          <img src={Online_Delivery_Service} alt="" className='max-w-[500px] w-full h-auto' />
          {
            !isCreateAccount?(<>
              <div className='min-w-[330px]  w-[340px]  rounded-3xl bg-slate p-5 pt-10 !pb-10'>
            <h1 className='text-center text-[29px] font-bold color-primary mb-5 '>V-Are System</h1>
            <div className='flex flex-col gap-y-4'>
            <div>
             <Input type='text' className='color-1' labelPlacement='outside' size='lg' placeholder='Enter username' label="Username"/> 
            </div>
            <div>
            <Input  labelPlacement='outside' size='lg' placeholder='Enter username' label="Password" className='color-1'
             endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                {isVisible ? (
                  <RemoveRedEyeIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <VisibilityOffIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            />
            </div>
            <div>
              <Checkbox ><span className='color-1' >Remember me</span></Checkbox>
            </div>
            <div>
              <Button className='bg-primary w-full h-[50px] mt-3 text-white font-bold text-[17px]' >
                Login
              </Button>
            </div>
            <div className='text-center'>
                <div className='color-1 my-2'>Not registered yet?</div>
                <div className='color-primary cursor-pointer' onClick={onClickCreateAccount}>Create an account</div>
            </div>
            </div>
          </div>
            </>):(<>
              <div className='min-w-[330px]  w-[340px]  rounded-3xl bg-slate p-5 pt-10 !pb-10'>
            <h1 className='text-center text-[29px] font-bold color-primary mb-5 '>Create an Account</h1>
            <div className='flex flex-col gap-y-4'>
            <div>
             <Input type='text' className='color-1' labelPlacement='outside' size='lg' placeholder='Enter username' label="Username"/> 
            </div>
            <div>
            <Input  labelPlacement='outside' size='lg' placeholder='Enter username' label="Password" className='color-1'
             endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                {isVisible ? (
                  <RemoveRedEyeIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <VisibilityOffIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            />
            </div>
            <div>
            <Input  labelPlacement='outside' size='lg' placeholder='Enter Hint password' label="Hint Password" className='color-1'
             endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                {isVisible ? (
                  <RemoveRedEyeIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <VisibilityOffIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            />
            </div>
            <div>
              <Checkbox ><span className='color-1' >Remember me</span></Checkbox>
            </div>
            <div>
              <Button className='bg-primary w-full h-[50px] mt-3 text-white font-bold text-[17px]' >
              Sign up
              </Button>
            </div>
            <div className='text-center'>
                <div className='color-1 my-2'>You have account already?</div>
                <div className='color-primary cursor-pointer' onClick={onClickCreateAccount}>Login</div>
            </div>
            </div>
          </div>
          </>)
          }
        </div>
        <div className='w-full flex flex-col justify-center items-center absolute bottom-10 text-white'>
          <div className='font-extralight text-center color-1'>*There are the feature for you to do with your life style and funny with our system enjoy with us and Develop by: Ly Zee Vlogger</div>
          <p  className='font-extralight color-1' >Thank you for join with.</p>
        </div>
    </div>
  )
}

export default Login