import { createSlice } from "@reduxjs/toolkit";
 const ConfirmStore = createSlice({
    name:"ConfirmStore",
    initialState:{
        confirm:{
            type:"",
            title:"",
            message:"",
            Icon:"",
            onClose:()=>{},
            onOk:()=>{}
        },
        isOpen:false
    },
    reducers:{
        setModalConfirm:(state,action)=>{
            let titleConfirm="";
            let MessageConfirm="";
            let Icon="";
            if(action.payload.type.toLowerCase()=="delete"){
                titleConfirm="Delete";
                Icon="pi pi-trash text-red-600";
                if(action.payload.message=="") MessageConfirm="Do you want to delete?"
                else MessageConfirm=action.payload.message;
            }
            if(action.payload.type.toLowerCase()=="comfirm"){
                titleConfirm="Comfirm";
                 Icon="pi pi-question-circle text-blue-600";
                if(action.payload.message=="") MessageConfirm="Do you want to continues?"
                else MessageConfirm=action.payload.message;
            }
            if(action.payload.type.toLowerCase()=="warning"){
                titleConfirm="Warning";
                 Icon="ri-alert-fill text-yellow-600";
                if(action.payload.message=="") MessageConfirm="Something went wrong!"
                else MessageConfirm=action.payload.message;
            }
            state.confirm.title=titleConfirm;
            state.confirm.Icon=Icon;
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
