import { createSlice } from "@reduxjs/toolkit";
const UserLoginStore = createSlice({
    name:"UserLoginStore",
    initialState:{
        dataUser:{},
        useInfoDetail:{}
    },
    reducers:{
        setInforUser:(state,action)=>{
            state.dataUser = action.payload
        },
        setUserInfoDetail:(state,action)=>{
            state.useInfoDetail = action.payload
        }
    }
})
export const {setInforUser,setUserInfoDetail}  = UserLoginStore.actions;
export default UserLoginStore.reducer;
