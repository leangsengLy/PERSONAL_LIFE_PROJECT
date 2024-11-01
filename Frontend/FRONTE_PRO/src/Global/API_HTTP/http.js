import axios from "axios"
export const HttpRequest = async ({url,method='get',data,success,error})=>{
    console.log(method.toLowerCase())
    if(method.toLowerCase()=="get"){
        await axios.get(url).then(response=>{
            if(success)  success(response)
        }).catch(err=>{
            if(success)error(error.response.data)
        })
    }
    else if(method.toLowerCase()=="post"){
        await axios.post(url,{...data}).then(response=>{
            if(success)success(response.data)
        }).catch(err=>{
            if(error)error(err.response.data)
        })
    }
}