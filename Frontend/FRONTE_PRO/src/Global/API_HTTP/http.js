import axios from "axios"
export const HttpRequest = async ({url,method='get',data,success,error})=>{
    let URI = `http://localhost:8080${url.startsWith('/')?url:`/${url}`}`;
    const getToken = sessionStorage.getItem('token');
    console.log(getToken)
    if(method.toLowerCase()=="get"){
        await axios.get(URI,{
            headers:{
                Authorization:`Bearer ${getToken}`
            }
        }).then(response=>{
            if(success)  success(response)
        }).catch(err=>{
            if(success)error(err.response.data)
        })
    }
    else if(method.toLowerCase()=="post"){
        await axios.post(URI,{...data},{
            headers:{
                Authorization:`Bearer ${getToken}`
            }
        }).then(response=>{
            if(success) success(response.data)
        }).catch(err=>{
            if(error)error(err.response.data)
        })
    }
}