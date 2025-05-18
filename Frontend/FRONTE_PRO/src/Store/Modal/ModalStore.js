import { createSlice } from "@reduxjs/toolkit";

const ModalStore = createSlice({
    name:"ModalStore",
    initialState:{
        modal:{
            isPadding:true,
            width:200,
            height:200
        },
        label:"",
        isShow:false,
        body:"",
    },
    reducers:{
        setModal:(state,action)=>{
            console.log(action)
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

export const {setModal,setIsShowModal,setBody} = ModalStore.actions;
export default ModalStore.reducer;