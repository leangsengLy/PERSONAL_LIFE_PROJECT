import { createSlice } from "@reduxjs/toolkit";
const UserLoginStore = createSlice({
    name:"UserLoginStore",
    initialState:{
        dataUser:{}
    },
    reducers:{
        setInforUser:(state,action)=>{
            state.dataUser = action.payload
        }
    }
})
export const {setInforUser}  = UserLoginStore.actions;
export default UserLoginStore.reducer;
