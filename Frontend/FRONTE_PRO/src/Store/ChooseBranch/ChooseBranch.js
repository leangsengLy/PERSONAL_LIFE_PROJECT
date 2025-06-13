import { createSlice } from "@reduxjs/toolkit";
const ChooseBranchStore = createSlice({
    name:"ChooseBranchStore",
    initialState:{
        dataList:[],
        branch:{}
    },
    reducers:{
       setBranch:(state,action)=>{
            state.branch = action.payload;
       }
    }
})

export const {setBranch} = ChooseBranchStore.actions;
export default ChooseBranchStore.reducer;