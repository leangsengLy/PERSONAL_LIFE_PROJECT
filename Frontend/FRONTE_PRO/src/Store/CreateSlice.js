import { createSlice } from "@reduxjs/toolkit";
export const SliceStore = createSlice({
    name:"SliceStore",
    initialState:{
        value: 0,
    },
    reducers:{
        Sumcount:(state,action)=>{
            console.log(action)
            state.value = state.value + action.payload;
        }
    },
})
export const {Sumcount} = SliceStore.actions;
export default SliceStore.reducer