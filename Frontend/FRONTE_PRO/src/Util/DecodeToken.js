import {jwtDecode} from "jwt-decode"
export  const DecodeToken = (token)=>{
    try{
        const decoded = jwtDecode(token);
        console.log(decoded)
    }catch(err){
        console.log("Invalid token:", err);
    }
}