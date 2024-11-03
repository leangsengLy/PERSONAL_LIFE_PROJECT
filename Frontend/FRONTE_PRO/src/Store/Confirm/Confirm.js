import { createSlice } from "@reduxjs/toolkit";
 const ConfirmStore = createSlice({
    name:"ConfirmStore",
    initialState:{
        confirm:{
            type:"",
            message:"",
            onClose:()=>{},
            onOk:()=>{}
        },
        isOpen:false
    },
    reducers:{
        setModalConfirm:(state,action)=>{
            state.confirm.type=action.payload.type;
            state.confirm.message=action.payload.message;
            state.confirm.onOk=action.payload.onOk;
            state.confirm.onClose=action.payload.onClose;
        },
        show:(state,action)=>{
            state.isOpen=action.payload
        }
    }
})
export const {setModalConfirm} = ConfirmStore.actions
export default ConfirmStore.reducer
