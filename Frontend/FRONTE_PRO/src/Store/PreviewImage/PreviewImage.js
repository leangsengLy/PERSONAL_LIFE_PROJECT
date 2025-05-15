import { createSlice } from "@reduxjs/toolkit";

const PreviewImageStore = createSlice({
    name:"PreviewImageStore",
    initialState:{
        isShow:false,
        imagePath:"http://localhost:8080/Image/branch/20250504115941_Midtown.jpg",
    },
    reducers:{
        setShowPreview:(state,action)=>{
            state.isShow = action.payload
        },
        setImagePath:(state,action)=>{
            state.imagePath = action.payload
        },
       
    }
})
export const {setShowPreview,setImagePath}  = PreviewImageStore.actions;
export default PreviewImageStore.reducer;