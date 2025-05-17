import { createSlice } from "@reduxjs/toolkit";

const ModalStore = createSlice({
    name:"ModalStore",
    initialState:{
        modal:{

        },
        label:"Preview",
        isShow:false
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
        }
    }
})

export const {setModal,setIsShowModal} = ModalStore.actions;
export default ModalStore.reducer;