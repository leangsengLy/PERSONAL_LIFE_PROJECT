import { toast,Slide } from "react-toastify"
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

export const setCockieOnWeb=(userInfo)=>{
    let date = new Date();
    let Time = date.getTime()
    document.cookie=`Username=${userInfo.USERNAME} `
}
export const translateBy=({en,km})=>{
    let langCode = localStorage.getItem("language");
    let text=langCode=='en'?en:km;
    return text;
}

export const isEmpty=(data)=>{
    return  data!=='' || data!==undefined || data!==null || (Array.isArray(data)&& data.length>0) || (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length>0)
}

export const IsValidUserName=(text)=>{
    return /[0-9 -_$%@]/.test(text);
}