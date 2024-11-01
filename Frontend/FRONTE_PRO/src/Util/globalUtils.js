import { toast,Slide } from "react-toastify"
export const ShowSnackbar=({message,type})=>{
    if(type=="error"){
        toast.error(message,
            { className:`!rounded-lg`},
            { transition: Slide}
        )
    }
    else if(type=="info"){
        toast.info(message,
            { className:`!rounded-lg`},
            { transition: Slide}
        )
    }
    else if(type=="warning"){
        toast.warning(message,
            { className:`!rounded-lg`},
            { transition: Slide}
        )
    }
    else if(type=="success"){
        toast.success(message,
            { className:`!rounded-lg !max-h-[20px]`},
            { transition: Slide}
        )
    }
}
