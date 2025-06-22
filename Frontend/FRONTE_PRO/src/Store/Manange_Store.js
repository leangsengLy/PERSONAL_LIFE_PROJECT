import { configureStore } from "@reduxjs/toolkit";
import SliceStore from './CreateSlice.js'
import StoreTheme from '../Store/ThemeBackground/Theme.js'
import StoreLanguage from '../Store/Language/Langauge.js'
import ConfirmStore from '../Store/Confirm/Confirm.js'
import CountryStore from '../Store/Page/Country/Country.js'
import UserLoginStore from '../Store/UserLogin/UserLogin.js'
import ColorSystemStore from '../Store/Profile/ColorSystem/ColorSystem.js'
import PreviewImageStore from '../Store/PreviewImage/PreviewImage.js'
import ModalStore from '../Store/Modal/ModalStore.js'
import PreviewIframeStore from '../Store/PreviewIFrame/PreviewIFrame.js'
import ChooseBranchStore from '../Store/ChooseBranch/ChooseBranch.js'
import ProvinceStore from '../Store/Page/Address/Province/Province.js'
export const store = configureStore({
    reducer:{
        counterTest:SliceStore,
        Theme:StoreTheme,
        Language:StoreLanguage,
        Confirm:ConfirmStore,
        User:UserLoginStore,
        ColorSystem:ColorSystemStore,
        PreviewImage: PreviewImageStore,
        branch: ChooseBranchStore,
        Modal: ModalStore,
        Iframe: PreviewIframeStore,
        //Page
        Country:CountryStore,
        province:ProvinceStore,
    }
})