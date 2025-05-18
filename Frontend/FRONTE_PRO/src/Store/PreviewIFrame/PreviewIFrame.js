import { createSlice } from "@reduxjs/toolkit";

const PreviewIframeStore = createSlice({
    name:"PreviewIframeStore",
    initialState:{
        iframe:{
            w:"w-[1000px]",
            h:"h-[500px]",
            path:""
        },
        isShow:false
    },
    reducers:{
        setIframe:(state,action)=>{
            console.log(action)
            const videoId = action.payload.path.split('v=')[1]?.split('&')[0]; // Extracts 'lhzd3gwnVP4'
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
            state.iframe.path = embedUrl;
            if(action.payload.w!=null) state.iframe.w = action.payload.w;
            if(action.payload.h!=null) state.iframe.h = action.payload.h;
        },
        setIsShow:(state,action)=>{
            state.isShow = action.payload;
        }
    }
})

export const {setIframe,setIsShow} = PreviewIframeStore.actions;
export default PreviewIframeStore.reducer;