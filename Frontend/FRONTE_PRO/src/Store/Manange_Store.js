import { configureStore } from "@reduxjs/toolkit";
import SliceStore from './CreateSlice.js'
import StoreTheme from '../Store/ThemeBackground/Theme.js'
import StoreLanguage from '../Store/Language/Langauge.js'
import ConfirmStore from '../Store/Confirm/Confirm.js'
import CountryStore from '../Store/Page/Country/Country.js'
export const store = configureStore({
    reducer:{
        counterTest:SliceStore,
        Theme:StoreTheme,
        Language:StoreLanguage,
        Confirm:ConfirmStore,
        Country:CountryStore
    }
})