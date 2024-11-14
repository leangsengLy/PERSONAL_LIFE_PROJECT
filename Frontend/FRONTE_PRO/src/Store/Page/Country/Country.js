import { createSlice } from "@reduxjs/toolkit";
const CountryStore = createSlice({
    name:"Countrystore",
    initialState:{
        dataList:[
            {
                Name:"Lyleangseng1",
                Code:"Me",
                EnglishName:"Me",
                CreateBy:"Lyzee",
                CreateDate:"10-2-2022",
                UpdateBy:"",
                UpdateDate:"",
            },
            {
                Name:"Lyleangseng1",
                EnglishName:"Lyleangseng1",
                Code:"Me",
                CreateBy:"Lyzee",
                CreateDate:"10-2-2022",
                UpdateBy:"Saeave",
                UpdateDate:"10-2-2022",
            },
        ]
    },
    reducers:{
        upadateList:(state,action)=>{
            state.dataList = action.payload;
        }
    }
})

export const {upadateList} = CountryStore.actions;
export default CountryStore.reducer;