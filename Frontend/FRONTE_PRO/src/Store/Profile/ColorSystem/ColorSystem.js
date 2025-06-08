import { createSlice } from "@reduxjs/toolkit";

const ColorSystemStore = createSlice({
    name:"ColorSystemStore",
    initialState:{
        colors:[
                {color:'074799',isDark:false},
                {color:'009990',isDark:false},
                {color:'F26B0F',isDark:false},
                {color:'7E1891',isDark:false},
                {color:'4B5945',isDark:true},
                {color:'F72C5B',isDark:true},
                {color:'B1F0F7',isDark:true},
                {color:'0A97B0',isDark:true},
                {color:'0A97B0',isDark:true},
                {color:'2A3335',isDark:false},
                {color:'640D5F',isDark:false},
                {color:'1F4529',isDark:false},
                {color:'4335A7',isDark:false},
                {color:'80C4E9',isDark:true},
                {color:'FF2929',isDark:true},
                {color:'8B5DFF',isDark:true},
                {color:'FA4032',isDark:true},
                {color:'219B9D',isDark:true},
                {color:'3D5300',isDark:true},
                {color:'003161',isDark:true},
                {color:'740938',isDark:false},
                {color:'133E87',isDark:false},
                {color:'00FF9C',isDark:true},
                {color:'257180',isDark:true},
                {color:'EB8317',isDark:true},
                {color:'798645',isDark:true},
                {color:'72BF78',isDark:true},
                {color:'433878',isDark:true},
                {color:'FF6500',isDark:true},
                {color:'1E3E62',isDark:false},
                {color:'87A2FF',isDark:true},
                {color:'347928',isDark:true},
                {color:'FAF7F0',isDark:true},
        ],
        selectColor: {color:'F26B0F',isDark:true},
    },
    reducers:{
        setColorSystem:(state,action)=>{
            console.log("ColorSystem => ",action.payload);
            state.selectColor = action.payload;
        }
    }

})
export const {setColorSystem}  = ColorSystemStore.actions;
export default ColorSystemStore.reducer;