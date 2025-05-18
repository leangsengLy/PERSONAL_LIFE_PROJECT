import { toast,Slide } from "react-toastify"
import CryptoJS  from 'crypto-js'
export const ShowSnackbar=({message,type})=>{
    if(type=="error"){
        toast.error(message,
            { className:`!rounded-lg !bg-popup dark:!bg-black`},
            { transition: Slide}
        )
    }
    else if(type=="info"){
        toast.info(message,
            { className:`!rounded-lg !bg-popup dark:!bg-black`},
            { transition: Slide}
        )
    }
    else if(type=="warning"){
        toast.warning(message,
            { className:`!rounded-lg !bg-popup dark:!bg-black`},
            { transition: Slide}
        )
    }
    else if(type=="success"){
        toast.success(message,
            { className:`!rounded-lg !max-h-[20px] !bg-popup dark:!bg-black`},
            { transition: Slide}
        )
    }
}

export const setCockieOnWeb=(userInfo,token)=>{
    sessionStorage.setItem('userInfo',JSON.stringify(userInfo))
    sessionStorage.setItem('token',token)
}
export const translateBy=({en,km})=>{
    let langCode = localStorage.getItem("language");
    let text=langCode=='en'?en:km;
    return text;
}

export const ConvertMnToHour=(minute)=>{
    var hour = parseInt((minute / 60));
    var mn = minute % 60;
    return {hour:hour,minute:mn}
}

export const isEmpty=(data)=>{
    return  data!=='' && data!==undefined && data!==null && (Array.isArray(data)&& data.length>0) && (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length>0)
}

export const IsValidUserName=(text)=>{
    return /[0-9 -_$%@]/.test(text);
}


export const EncriptObject=(Object)=>{
    const Json = JSON.stringify(Object);
    const genderateQueryString = CryptoJS.AES.encrypt(Json,"Work@123").toString(); //line for generate new encrypt code
    return genderateQueryString;
}
export const decryptObject = (encryptedText) => {
    try {
      // Decrypt the string
      const bytes = CryptoJS.AES.decrypt(encryptedText, "Work@123");
      // Convert back to JSON string
      const decryptedJson = bytes.toString(CryptoJS.enc.Utf8);
      // Parse the JSON string back to an object
      return JSON.parse(decryptedJson);
    } catch (error) {
      console.error('Error decrypting:', error);
      return null;
    }
  };
