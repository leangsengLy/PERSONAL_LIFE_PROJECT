import { createSlice } from "@reduxjs/toolkit";
export const TableStore = createSlice({
    name:"TableStore",
    initialState:{
        filterDef:{
            page:1,
            record:10,
            search:""
        },
    },
    reducers:{
        setFilterDef:(state,action)=>{
            var filter = action.payload;
            state.filterDef.page = filter.Page;
            state.filterDef.record = filter.Record;
            state.filterDef.search = filter.Search;
        }
    }
})
export const {setFilterDef} = TableStore.actions;
export default TableStore.reducer;