import { createSlice } from "@reduxjs/toolkit";

const ColorSystemStore = createSlice({
    name:"ColorSystemStore",
    initialState:{
        colors:[
                '001A6E',
                '074799',
                '009990',
                'FCC737',
                'F26B0F',
                '7E1891',
                '4B5945',
                'F72C5B',
                'A7D477',
                'B1F0F7',
                '0A97B0',
                '0A97B0',
                '2A3335',
                '640D5F',
                'EB5B00',
                'EB5B00',
                '1F4529',
                '4335A7',
                '80C4E9',
                'FF7F3E',
                'FF2929',
                '8B5DFF',
                'FA4032',
                '219B9D',
                '1A1A1D',
                '3D5300',
                'ABBA7C',
                'FFE31A',
                'F09319',
                '000B58',
                '003161',
                '740938',
                '133E87',
                '091057',
                '00FF9C',
                'B6FFA1',
                '257180',
                'F2E5BF',
                'EB8317',
                '798645',
                '72BF78',
                '433878',
                'FF6500',
                '1E3E62',
                '87A2FF',
                '347928',
                'FAF7F0',
        ],
        selectColor:"F26B0F",
    },
    reducers:{
        setColorSystem:(state,action)=>{
            state.selectColor = action.payload;
        }
    }

})
export const {setColorSystem}  = ColorSystemStore.actions;
export default ColorSystemStore.reducer;