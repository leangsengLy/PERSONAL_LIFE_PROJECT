import { configureStore } from "@reduxjs/toolkit";
import SliceStore from './CreateSlice.js'
import StoreTheme from '../Store/ThemeBackground/Theme.js'
export const store = configureStore({
    reducer:{
        counterTest:SliceStore,
        Theme:StoreTheme
    }
})