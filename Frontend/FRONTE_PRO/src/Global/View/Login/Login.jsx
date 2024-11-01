import Online_Delivery_Service from '../../../../public/Online_Delivery_Service.gif'
import bright from '../../../../public/Icon/bright.svg'
import night from '../../../../public/Icon/night.svg'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from '../../../Store/ThemeBackground/Theme.js'
import { Button, Checkbox, input, Input, Spinner, Tooltip } from '@nextui-org/react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { getLanguage } from '../../../Store/Language/Langauge.js'
import { isEmpty, ShowSnackbar,translateBy } from '../../../Util/globalUtils.js'
import { HttpRequest } from '../../API_HTTP/http.js'
const Login = () => {
  const [isVisible,SetInVisal] = useState(false)
  const [isCreateAccount,SetIsCreateAccount]=useState(false);
  const [isShowSelectLanguage,SetIsSelectLanguage]=useState(false)
  const [isShowSpin,SetInShowSpin]=useState(false)
  const langauge = useSelector(state=>state.Language.language);
  const tr = useSelector(state=>state.Language.translate);
  const dispatch  = useDispatch();
  const isDark = useSelector(state=>state.Theme.isDark);
  const languages = useSelector(state=>state.Language.Languages);
  const isFirstLoginUser = useRef(true)
  const isFirstLoginPw = useRef(true)
  
  const [inputData,setInpuData]=useState({Username:"",Password:""});
  const onChangeTheme=()=>{
    dispatch(changeTheme(!isDark))
  }
  const toggleVisibility=()=>{
    SetInVisal(!isVisible)
  }
  
  const onClickCreateAccount=()=>{
    SetIsCreateAccount(!isCreateAccount)
  }
  window.addEventListener('click',(e)=>{
    if(!e.target.className.includes('image-language')){
      SetIsSelectLanguage(false)
    }
  })
  const OnclickFlag=()=>{
    SetIsSelectLanguage(!isShowSelectLanguage)
  }
  const onSaveLogin=()=>{
    if(inputData.Password=="" && inputData.Username=="" )ShowSnackbar({message:`Please input password and username!`,type:`error`})
    else if(inputData.Username=="")ShowSnackbar({message:`Please input username!`,type:`error`})
    else if(inputData.Password=="")ShowSnackbar({message:`Please input password!`,type:`error`})
    else{
     SetInShowSpin(true)
     HttpRequest({
      url:'http://localhost:8080/api/user/login',
      method:"post",
      data:{
        PASSWORD:inputData.Password,
        USERNAME:inputData.Username,
      },
      success:(result)=>{
        SetInShowSpin(false)
        ShowSnackbar({message:result.message,type:"success"})
     },
     error:(err)=>{
      SetInShowSpin(false)
      ShowSnackbar({message:err.message,type:"error"})
     }
    })
    }
  }
  const inputValue=(e)=>{
    if(e.target.name=="Username" && e.target.value=="") isFirstLoginUser.current=false;
    if(e.target.name=="Password" && e.target.value=="") isFirstLoginPw.current=false;
    setInpuData(val=>({...val,[e.target.name]:e.target.value}))
  }

  useEffect(()=>{
    dispatch(getLanguage('kh'))
    HttpRequest({
        url:"http://localhost:8080/api/user/list",
        method:"get",
        success:(data)=>{
          console.log(data)
        }
    })
  },[])
  useEffect(()=>{
  },[langauge])
  const OnclickCountry=(code)=>{
    dispatch(getLanguage(code))
  }
  return (
   
    <div className='w-screen h-screen bg-box-wrapper select-none flex justify-center items-center relative'>
      {/* <ToastContainer position="bottom-right" draggableDirection={true} autoClose={2000}/> */}
      <div className='absolute top-6 right-7 flex gap-x-3'>
                <div className='w-[40px] h-[40px] cursor-pointer relative p-1 rounded-full border-primary' onClick={OnclickFlag}>
                 <Tooltip content="Language" showArrow={true} placement='left'><img src={langauge.Image} alt="" className='w-full object-cover image-language h-full rounded-full'/></Tooltip>
                  <div style={{zIndex:`${isShowSelectLanguage?``:`-1`}`}} className={`min-w-[170px] h-auto grid px-5 gap-y-4 bg-popup shadow py-5 rounded-2xl absolute transition-all  ease-in-out duration-200 opacity-0  right-1 top-11 ${isShowSelectLanguage?`opacity-100 z-10  -translate-x-2 translate-y-1`:``} `}>
                        {
                          languages.map(val=>{
                            return (
                              < >
                                <div key={val.code} className='flex items-center justify-start gap-x-3' onClick={()=>{OnclickCountry(val.code)}}>
                                   <div className='w-[30px] h-[30px] rounded-full p-1 border border-slate-100'>
                                      <img src={val.Image} alt="" className='w-full h-full rounded-full' />
                                   </div>
                                   <div>{val.EnglishName}</div>
                                </div>
                              </>
                            )
                          })
                        }
                  </div>
                </div>
                <Tooltip content="Light" showArrow={true} >
                <div className='w-[40px] h-[40px]  cursor-pointer p-2 rounded-full border-primary' onClick={onChangeTheme}>
                  <img src={isDark?bright:night} alt="" className='w-full h-full rounded-full'/>
                </div>
                </Tooltip>
      </div>
        <div className='w-[1100px] flex max-[863px]:justify-center justify-between items-center mx-5'>
          <img src={Online_Delivery_Service} alt="" className='max-w-[500px] max-[863px]:hidden w-full h-auto' />
          {
            !isCreateAccount?(<>
              <div className='max-w-[330px]  w-full  rounded-3xl bg-slate  px-7 pt-10 !pb-10'>
            <h1 className='text-center text-[29px] font-bold color-primary mb-5 '>V-Are System</h1>
            <div className='flex flex-col gap-y-4'>
            <div>
             <Input type='text' isRequired={true} value={inputData.Username } errorMessage="Username are required!" isInvalid={inputData.Username=="" && !isFirstLoginUser.current} name="Username" onChange={inputValue} className='color-1' radius='lg' labelPlacement='outside' size='lg' placeholder={tr.enter_username} label={tr.username}/> 
            </div>
            <div>
            <Input  labelPlacement='outside' isRequired={true} name="Password" value={inputData.Password}  isInvalid={inputData.Password=="" && !isFirstLoginPw.current} errorMessage="Password are required!"  onChange={inputValue} size='lg' placeholder={tr.enter_password} label={tr.password} className='color-1'
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
              <Button className='bg-primary w-full h-[50px] mt-3 text-white font-bold text-[17px]' onClick={onSaveLogin}>
                {
                  !isShowSpin?(<>{tr.login}</>):(<><Spinner size='sm' color='warning'/></>)
                }
              </Button>
            </div>
            <div className='text-center'>
                <div className='color-1 my-2'>{tr.not_register_yet}</div>
                <div className='color-primary cursor-pointer' onClick={onClickCreateAccount}>{tr.create_an_account}</div>
            </div>
            </div>
          </div>
            </>):(<>
              <div className='min-w-[330px] w-[340px]  rounded-3xl bg-slate px-7 pt-10 !pb-10'>
            <h1 className='text-center text-[29px] font-bold color-primary mb-5 '>{tr.create_an_account}</h1>
            <div className='flex flex-col gap-y-4'>
            <div>
             <Input type='text' className='color-1' classNames={{ label: "color-1"}} labelPlacement='outside' size='lg' placeholder={tr.enter_username} label={tr.username}/> 
            </div>
            <div>
            <Input  labelPlacement='outside' size='lg' classNames={{ label: "color-1"}} placeholder={tr.enter_password} label={tr.password} className='color-1'
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
            <Input  labelPlacement='outside' size='lg' classNames={{ label: "color-1"}} placeholder={tr.enter_hint_password} label={tr.hint_password}
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
                <div className='color-1 my-2'>{tr.you_have_account_already}</div>
                <div className='color-primary cursor-pointer' onClick={onClickCreateAccount}>{tr.login}</div>
            </div>
            </div>
          </div>
          </>)
          }
        </div>
        <div className='w-full flex flex-col justify-center items-center absolute  bottom-10 text-white'>
          <div className='font-extralight text-center color-1 px-10'>*Develop by: Ly Zee Vlogger</div>
        </div>
    </div>
  )
}

export default Login