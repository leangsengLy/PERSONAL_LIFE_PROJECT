import axios from "axios"
import { SystemSpeakByText } from "../../Util/SystenSayByText";
import { ShowSnackbar } from "../../Util/globalUtils";
export const HttpRequest = async ({url,method='get',data,success,error,type='data'})=>{
    let URI = `http://localhost:8080${url.startsWith('/')?url:`/${url}`}`;
    const getToken = sessionStorage.getItem('token');
    console.log(getToken)
    if(method.toLowerCase()=="get"){
        await axios.get(URI,{
            headers:{
                Authorization:`Bearer ${getToken}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then(response=>{
            if(success) success(response)
        }).catch(err=>{
            console.log(err)
            if(err.status==401) {
                ShowSnackbar({message:err.response.data.message,type:'error'})
            }
            if(err)error(err.response.data)
        })
    }
    else if(method.toLowerCase()=="post"){
        await axios.post(URI,{...data},{
            headers:{
                Authorization:`Bearer ${getToken}`,
                'Content-Type': type=='file'?'multipart/form-data':'application/json',
            }
        }).then(response=>{
            if(success) success(response.data)
        }).catch(err=>{
            if(err.status==401) {
                ShowSnackbar({message:err.response.data.message,type:'error'})
            }
            if(err)error(err.response.data)
        })
    }
}