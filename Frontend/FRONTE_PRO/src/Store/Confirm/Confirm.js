import { createSlice } from "@reduxjs/toolkit";
 const ConfirmStore = createSlice({
    name:"ConfirmStore",
    initialState:{
        confirm:{
            type:"",
            title:"",
            message:"",
            onClose:()=>{},
            onOk:()=>{}
        },
        isOpen:false
    },
    reducers:{
        setModalConfirm:(state,action)=>{
            let titleConfirm="";
            let MessageConfirm="";
            if(action.payload.type.toLowerCase()=="delete"){
                titleConfirm="Delete"
                if(action.payload.message=="") MessageConfirm="Do you want to delete?"
                else MessageConfirm=action.payload.message;
            }
            if(action.payload.type.toLowerCase()=="comfirm"){
                titleConfirm="Comfirm"
                if(action.payload.message=="") MessageConfirm="Do you want to continues?"
                else MessageConfirm=action.payload.message;
            }
            state.confirm.title=titleConfirm;
            state.confirm.message=MessageConfirm;
            state.confirm.onOk=action.payload.onOk;
            state.confirm.onClose=action.payload.onClose;
        },
        setIsShow:(state,action)=>{
            state.isOpen=action.payload
        }
    }
})
export const {setModalConfirm,setIsShow} = ConfirmStore.actions
export default ConfirmStore.reducer
