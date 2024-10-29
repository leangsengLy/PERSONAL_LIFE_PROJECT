import { createSlice } from "@reduxjs/toolkit";
export const storeTheme = createSlice({
    name:"storeTheme",
    initialState:{
        isDark:true
    },
    reducers:{
        changeTheme:(state,action)=>{
            state.isDark =action.payload;
        }
    }
})
export const {changeTheme} = storeTheme.actions;
export default storeTheme.reducer;