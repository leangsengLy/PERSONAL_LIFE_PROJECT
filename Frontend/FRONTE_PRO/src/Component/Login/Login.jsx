
import React, { useEffect, useRef, useState } from 'react'
import Online_Delivery_Service from '../../../public/Menu/Online_Delivery_Service.gif';
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from '../../Store/ThemeBackground/Theme.js'
import { Button, Checkbox, input, Input, Spinner, Tooltip } from '@nextui-org/react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { getLanguage } from '../../Store/Language/Langauge.js'
import { isEmpty, IsValidUserName, setCockieOnWeb, ShowSnackbar,translateBy } from '../../Util/globalUtils.js'
import { HttpRequest } from '../../Global/API_HTTP/http.js'
import { SoundAudio } from '../../Util/Sound.js'
import { SystemSpeakByText } from '../../Util/SystenSayByText.js'
import CountryLanguage from '../CircleAction/LZIconLanguage.jsx'
import LZIconTheme from '../CircleAction/LZIconTheme.jsx'
import { DecodeToken } from '../../Util/DecodeToken.js'
import { setInforUser, setUserInfoDetail } from '../../Store/UserLogin/UserLogin.js'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [isVisible,SetInVisal] = useState(false)
  const navigate= useNavigate();
    const userInfo = useSelector(state=>state.User.dataUser);
  const [isVisibleHintPassword,SetisVisibleHintPassword] = useState(false)
  const [isCreateAccount,SetIsCreateAccount]=useState(false);
  const [isShowSpin,SetInShowSpin]=useState(false)
  const tr = useSelector(state=>state.Language.translate);
  const isFirstLoginUser = useRef(true)
  const isFirstLoginPw = useRef(true)
  const isFirstCreateHint = useRef(true)
  const isFirstCreatePw = useRef(true)
  const isFirstCreateUser = useRef(true)
  const dispatch = useDispatch();
  const click = SoundAudio('click')
  const noti = SoundAudio('noti')
  const fail = SoundAudio('fail')
  const [inputData,setInpuData]=useState({Username:"",Password:""});
  const [inputDataCreate,setInpuDataCreate]=useState({Username:"",Password:"",HintPassword:""});
  useEffect(()=>{
    if(window.location.pathname=="/login" || window.location.pathname=="/logout") sessionStorage.clear();
  },[])
  const toggleVisibility=()=>{
    SetInVisal(!isVisible)
   
  }
  const toggleVisibilityCreate=()=>{
    SetisVisibleHintPassword(!isVisibleHintPassword)
  }

  
  const onClickCreateAccount=()=>{
    SetIsCreateAccount(!isCreateAccount)
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
  if(inputDataCreate.Username=="" || inputDataCreate.Password=="" || inputDataCreate.HintPassword==""){
    // //SystemSpeakByText(`Please input ${message}!`,false)
    ShowSnackbar({message:`Please input ${message}!`,type:`error`})
  }
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
        url:'/api/login/create',
        method:"post",
        data:{
          password:inputDataCreate.Password,
          email:inputDataCreate.Username,
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

 
  const onSaveLogin=()=>{
    click.play();
    if(inputData.Password=="" && inputData.Username=="" ){
      ShowSnackbar({message:`Please input password and username!`,type:`error`})
      // //SystemSpeakByText(`Please input password and username!`,false)
    }
    else if(inputData.Username==""){
      ShowSnackbar({message:`Please input username!`,type:`error`})
      // //SystemSpeakByText(`Please input username!`,false)
    }
    else if(inputData.Password==""){
      //SystemSpeakByText('Please input password!',false)
      // ShowSnackbar({message:`Please input password!`,type:`error`})
    }
    else{
     SetInShowSpin(true)
     HttpRequest({
      url:'api/login/login',
      method:"post",
      data:{
        password:inputData.Password,
        email:inputData.Username,
      },
      success:(result)=>{
        localStorage.setItem("userInfo",JSON.stringify(result))
        const getToken = DecodeToken(result.token);
        setCockieOnWeb(getToken,result.token)
        dispatch(setInforUser(result))
        noti.play();
        SetInShowSpin(false)
        ShowSnackbar({message:result.message,type:"success"})
        navigate('/branch')
        GetInforUser()
        setTimeout(()=>{
          // //SystemSpeakByText(result.message,false)
        },400)
     },
     error:(err)=>{
      if(err==undefined || isEmpty(err)){
        fail.play();
        SetInShowSpin(false)
        ShowSnackbar({message:`Did you open your server!`,type:"error"})
      }else {
        fail.play();
        SetInShowSpin(false)
        ShowSnackbar({message:err.message,type:"error"})
        setTimeout(()=>{
          // //SystemSpeakByText(err.message,false)
        },600)
      }
      
      
     }
    })
    }
  }
 
  const GetInforUser=async()=>{
      HttpRequest({
                  url:'api/user_profile/info',
                  data:{
                    loginId:userInfo.Id
                  },
                  method:"post",
                  success:(success)=>{
                    dispatch(setUserInfoDetail(success))
                      // setProfileInfo(val=>(
                      //   {
                      //     ...val,
                      //     Address:success.Address==null?"Address default tek tla.":success?.Address,
                      //     Career:success.Major==null?"IT developer or doctor teacher":success?.Major,
                      //     Username:success.Name==null?"Your Name":success.Name,
                      //     Id: success.Id,
                      //     Description:success.Description==null?"Description default I need to make a something to you.":success?.Description,
                      //     Phone:success.Phone1==null?"099 855 645":success?.Phone1,
                      //     Program:success.ExperienceDescription==null?"language that you have learn or study...":success?.ExperienceDescription,
                      //   }))
                  },
                  error:(error)=>{
                      ShowSnackbar({message:error.message,type:'error'})
                  }
              })
    }
  const KeyEnter=(e)=>{
    if(e.key=="Enter"){
      if(!isCreateAccount) onSaveLogin();
      else onSignUpUser();
    }
  }
  const inputValue=(e)=>{
    if(e.target.name=="Username" && e.target.value=="") isFirstLoginUser.current=false;
    if(e.target.name=="Password" && e.target.value=="") isFirstLoginPw.current=false;
    setInpuData(val=>({...val,[e.target.name]:e.target.value}))

  }
  const inputValueCreateAccount=(e)=>{
    if(e.target.name=="Username" && e.target.value=="") isFirstCreateUser.current=false;
    if(e.target.name=="Password" && e.target.value=="") isFirstCreatePw.current=false;
    if(e.target.name=="HintPassword" && e.target.value=="") isFirstCreateHint.current=false;
    setInpuDataCreate(val=>({...val,[e.target.name]:e.target.value}))
  }


 
  
  return (
    <div className='w-screen h-screen lz-animation bg-box-wrapper select-none flex justify-center items-center relative'>
      <div className='absolute top-6 right-7 flex gap-x-3'>
                <CountryLanguage isLoginOrisHomePage={true}/>
                <LZIconTheme  isLoginOrisHomePage={true}/>
      </div>
        <div className='w-[1100px] flex max-[863px]:justify-center justify-between items-center mx-5'>
          <img src={Online_Delivery_Service} alt="" className='max-w-[500px] max-[863px]:hidden w-full h-auto' />
          {
            !isCreateAccount?(<>
              <div className='max-w-[330px]  w-full  rounded-3xl bg-slate  px-7 pt-10 !pb-10'>
            <h1 className='text-center text-[25px] font-bold color-primary mb-5 '>V-Are System</h1>
            <div className='flex flex-col gap-y-4'>
            <div>
             <Input classNames={{label:"text-[13px]",input:"text-[13px]"}} type='email' isRequired={true}  onKeyDown={KeyEnter} value={inputData.Username }  isInvalid={(inputData.Username==""  && !isFirstLoginPw.current)}  name="Username" onChange={inputValue} className='color-1 !text-[13px]' radius='lg' labelPlacement='outside' size='lg' placeholder={tr.enter_username} label={tr.username}/> 
            </div>
            <div>
            <Input classNames={{label:"text-[13px]",input:"text-[13px]"}} labelPlacement='outside'  onKeyDown={KeyEnter} isRequired={true} name="Password" value={inputData.Password}  isInvalid={inputData.Username==""  && !isFirstLoginPw.current} errorMessage="Password are required!"  onChange={inputValue} size='lg' placeholder={tr.enter_password} label={tr.password} className='color-1'
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
             <Input type='text' className='color-1' onKeyDown={KeyEnter} value={inputDataCreate.Username}  errorMessage={`${IsValidUserName(inputDataCreate.Username)?`Your username should have only text!`:`Username are required!`}`} isInvalid={(inputDataCreate.Username==""  && !isFirstCreateUser.current) || IsValidUserName(inputDataCreate.Username)}  name="Username" onChange={inputValueCreateAccount} labelPlacement='outside' size='lg' placeholder={tr.enter_username} label={tr.username}/> 
            </div>
            <div>
            <Input  labelPlacement='outside' onKeyDown={KeyEnter} value={inputDataCreate.Password} size='lg' name="Password" isInvalid={(inputDataCreate.Password=="" || inputDataCreate.Password.length<=6) && !isFirstCreatePw.current}  isRequired={true} errorMessage={`${inputDataCreate.HintPassword.length<=6 && inputDataCreate.Password!==""?`Your passsword should have 7 charaters!`:`Please input Password`}`}  onChange={inputValueCreateAccount} placeholder={tr.enter_password} label={tr.password} className='color-1'
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
            <Input  labelPlacement='outside' onKeyDown={KeyEnter} value={inputDataCreate.HintPassword} size='lg' name="HintPassword" isInvalid={(inputDataCreate.HintPassword=="" || inputDataCreate.HintPassword.length<=6) && !isFirstCreateHint.current}  isRequired={true} errorMessage={`${inputDataCreate.HintPassword.length<=6 && inputDataCreate.HintPassword!==""?`Your hint passsword should have 7 charaters!`:`Please input Hint Password`}`} onChange={inputValueCreateAccount} placeholder={tr.enter_hint_password} label={tr.hint_password}
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