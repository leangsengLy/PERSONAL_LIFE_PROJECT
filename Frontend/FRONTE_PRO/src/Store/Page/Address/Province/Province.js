import { createSlice } from "@reduxjs/toolkit";
const ProvinceStore = createSlice({
    name:"ProvinceStore",
    initialState:{
        filter:{

        }
    },
    reducers:{
        SetFilterProvince:(state,action)=>{
            state.filter = action.payload;
        }
    }
})

export const {SetFilterProvince} = ProvinceStore.actions;
export default ProvinceStore.reducer;