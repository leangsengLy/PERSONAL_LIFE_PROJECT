import { createSlice } from "@reduxjs/toolkit";

const ModalStore = createSlice({
    name:"ModalStore",
    initialState:{
        modal:{
            isPadding:true,
            w:'h-[440px]',
            h:'w-[340px]'
        },
        label:"",
        isShow:false,
        body:"",
    },
    reducers:{
        setModal:(state,action)=>{
            state.modal = action.payload;
        },
        setIsShowModal:(state,action)=>{
            state.isShow = action.payload;
        },
        setLabel:(state,action)=>{
            state.label = action.payload;
        },
        setBody:(state,action)=>{
            state.body = action.payload;
        }
    }
})

export const {setModal,setIsShowModal,setBody,setLabel} = ModalStore.actions;
export default ModalStore.reducer;