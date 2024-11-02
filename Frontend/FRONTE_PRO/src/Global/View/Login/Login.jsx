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
import { isEmpty, IsValidUserName, ShowSnackbar,translateBy } from '../../../Util/globalUtils.js'
import { HttpRequest } from '../../API_HTTP/http.js'
import { SoundAudio } from '../../../Util/Sound.js'
import { SystemSpeakByText } from '../../../Util/SystenSayByText.js'
const Login = () => {
  const [isVisible,SetInVisal] = useState(false)
  const [isVisibleHintPassword,SetisVisibleHintPassword] = useState(false)
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
  const isFirstCreateHint = useRef(true)
  const isFirstCreatePw = useRef(true)
  const isFirstCreateUser = useRef(true)

  const click = SoundAudio('click')
  const noti = SoundAudio('noti')
  const fail = SoundAudio('fail')
  const [inputData,setInpuData]=useState({Username:"",Password:""});
  const [inputDataCreate,setInpuDataCreate]=useState({Username:"",Password:"",HintPassword:""});
  const onChangeTheme=()=>{
    click.play();
    dispatch(changeTheme(!isDark))
  }
  const toggleVisibility=()=>{
    SetInVisal(!isVisible)
   
  }
  const toggleVisibilityCreate=()=>{
    SetisVisibleHintPassword(!isVisibleHintPassword)
  }

  
  const onClickCreateAccount=()=>{
    SetIsCreateAccount(!isCreateAccount)
    console.log(isCreateAccount)
    if(!isCreateAccount){
      setInpuDataCreate(val=>{
        return {...val,HintPassword:'',Password:'',Username:''}
      })
    }
    else {
      setInpuData(val=>{
        return {...val,Password:'',Username:''}
      })
    }
  }
const onSignUpUser=()=>{
  let message="";
  if(inputDataCreate.Username=="") message+="Username "
  if(inputDataCreate.Password=="") message+="Password ";
  if(inputDataCreate.HintPassword=="") message+="Hint Password ";
  if(inputDataCreate.Username=="" || inputDataCreate.Password=="" || inputDataCreate.HintPassword=="")
      ShowSnackbar({message:`Please input ${message}!`,type:`error`})
  else {
    if(inputDataCreate.Password.length<=6){
      message+="Password ";
      isFirstCreateHint.current=false;
    }
    if(inputDataCreate.HintPassword.length<=6) {
      message+="Hint Password ";
      isFirstCreatePw.current=false;
    }
    if(inputDataCreate.HintPassword.length<=6 || inputDataCreate.Password.length<=6){
      ShowSnackbar({message:`Your ${message} should have 7 charaters !`,type:`error`})
    }
    else{
      SetInShowSpin(true)
      HttpRequest({
        url:'/api/user/create',
        method:"post",
        data:{
          PASSWORD:inputDataCreate.Password,
          USERNAME:inputDataCreate.Username,
          HINT_PW:inputDataCreate.HintPassword,
        },
        success:(result)=>{
          SetInShowSpin(false)
          setTimeout(()=>{
            noti.play();
          },600)
          ShowSnackbar({message:result.message,type:"success"})
          setTimeout(()=>{
            setInpuDataCreate(val=>({HintPassword:'',Password:'',Username:''}))
            SetIsCreateAccount(false);
          },3000)
      },
      error:(err)=>{
        setTimeout(()=>{
          fail.play();
        },600)
        SetInShowSpin(false)
        ShowSnackbar({message:err.message,type:"error"})
      }
      })
    }
    
  }
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
    
    click.play();
    if(inputData.Password=="" && inputData.Username=="" )ShowSnackbar({message:`Please input password and username!`,type:`error`})
    else if(inputData.Username=="")ShowSnackbar({message:`Please input username!`,type:`error`})
    else if(inputData.Password=="")ShowSnackbar({message:`Please input password!`,type:`error`})
    else{
     SetInShowSpin(true)
     HttpRequest({
      url:'api/user/login',
      method:"post",
      data:{
        PASSWORD:inputData.Password,
        USERNAME:inputData.Username,
      },
      success:(result)=>{
        noti.play();
        SetInShowSpin(false)
        ShowSnackbar({message:result.message,type:"success"})
        setTimeout(()=>{
          SystemSpeakByText(result.message,true)
        },600)
     },
     error:(err)=>{
      fail.play();
      SetInShowSpin(false)
      ShowSnackbar({message:err.message,type:"error"})
      setTimeout(()=>{
        SystemSpeakByText(err.message,true)
      },600)
      
     }
    })
    }
  }
  const inputValue=(e)=>{
    if(e.target.name=="Username" && e.target.value=="") isFirstLoginUser.current=false;
    if(e.target.name=="Password" && e.target.value=="") isFirstLoginPw.current=false;
    setInpuData(val=>({...val,[e.target.name]:e.target.value}))

  }
  const inputValueCreateAccount=(e)=>{
    console.log(e)
    if(e.target.name=="Username" && e.target.value=="") isFirstCreateUser.current=false;
    if(e.target.name=="Password" && e.target.value=="") isFirstCreatePw.current=false;
    if(e.target.name=="HintPassword" && e.target.value=="") isFirstCreateHint.current=false;
    setInpuDataCreate(val=>({...val,[e.target.name]:e.target.value}))
  }

  useEffect(()=>{
    dispatch(getLanguage('kh'))
  },[])
  useEffect(()=>{
  },[langauge])
  const OnclickCountry=(code)=>{
    click.play();
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
                          languages.map((val,index)=>{
                            return (
                              < >
                                <div key={index} className='flex items-center justify-start gap-x-3' onClick={()=>{OnclickCountry(val.code)}}>
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
             <Input type='text' isRequired={true} value={inputData.Username } errorMessage={`${IsValidUserName(inputData.Username)?`Your username should have only text!`:`Username are required!`}`} isInvalid={(inputData.Username==""  && !isFirstLoginPw.current) || IsValidUserName(inputData.Username)}  name="Username" onChange={inputValue} className='color-1' radius='lg' labelPlacement='outside' size='lg' placeholder={tr.enter_username} label={tr.username}/> 
            </div>
            <div>
            <Input  labelPlacement='outside' isRequired={true} name="Password" value={inputData.Password}  isInvalid={inputData.Username==""  && !isFirstLoginPw.current} errorMessage="Password are required!"  onChange={inputValue} size='lg' placeholder={tr.enter_password} label={tr.password} className='color-1'
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
             <Input type='text' className='color-1' value={inputDataCreate.Username}  errorMessage={`${IsValidUserName(inputDataCreate.Username)?`Your username should have only text!`:`Username are required!`}`} isInvalid={(inputDataCreate.Username==""  && !isFirstCreateUser.current) || IsValidUserName(inputDataCreate.Username)}  name="Username" onChange={inputValueCreateAccount} labelPlacement='outside' size='lg' placeholder={tr.enter_username} label={tr.username}/> 
            </div>
            <div>
            <Input  labelPlacement='outside' value={inputDataCreate.Password} size='lg' name="Password" isInvalid={(inputDataCreate.Password=="" || inputDataCreate.Password.length<=6) && !isFirstCreatePw.current}  isRequired={true} errorMessage={`${inputDataCreate.HintPassword.length<=6 && inputDataCreate.Password!==""?`Your passsword should have 7 charaters!`:`Please input Password`}`}  onChange={inputValueCreateAccount} placeholder={tr.enter_password} label={tr.password} className='color-1'
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
            <Input  labelPlacement='outside' value={inputDataCreate.HintPassword} size='lg' name="HintPassword" isInvalid={(inputDataCreate.HintPassword=="" || inputDataCreate.HintPassword.length<=6) && !isFirstCreateHint.current}  isRequired={true} errorMessage={`${inputDataCreate.HintPassword.length<=6 && inputDataCreate.HintPassword!==""?`Your hint passsword should have 7 charaters!`:`Please input Hint Password`}`} onChange={inputValueCreateAccount} placeholder={tr.enter_hint_password} label={tr.hint_password}
             endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibilityCreate} aria-label="toggle password visibility">
                {isVisibleHintPassword ? (
                  <RemoveRedEyeIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <VisibilityOffIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisibleHintPassword ? "text" : "password"}
            />
            </div>
            <div>
              <Checkbox ><span className='color-1' >Remember me</span></Checkbox>
            </div>
            <div>
              <Button className='bg-primary w-full h-[50px] mt-3 text-white font-bold text-[17px]' onClick={onSignUpUser}>
                {
                  !isShowSpin?(<>Sign Up</>):(<><Spinner size='sm' color='warning'/></>)
                }
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