import { createSlice } from "@reduxjs/toolkit";
import Image_kh from '../../../public/Flag/kh.png'
import Image_USA from '../../../public/Flag/usa.png'
import Image_Lao from '../../../public/Flag/lao.png'
import Image_br from '../../../public/Flag/br.png'
import Image_ch from '../../../public/Flag/ch.png'
import Image_th from '../../../public/Flag/th.png'
import Image_vn from '../../../public/Flag/vn.png'
import Image_ph from '../../../public/Flag/ph.png'
import Image_my from '../../../public/Flag/my.png'
import Image_id from '../../../public/Flag/id.png'
import en from '../../Language/en.json';
import kh from '../../Language/kh.json';
const StoreLanguage = createSlice({
    name:"StoreLanguage",
    initialState:{
        Languages:[
            {
                code:"kh",
                Name:"ខ្មែរ",
                EnglishName:"Cambodia",
                Language:kh,
                Image:Image_kh,
            },
            {
                code:"en",
                Name:"អង់គ្លេស",
                EnglishName:"English",
                Language:en,
                Image:Image_USA
            },
            {
                code:"lao",
                Name:"លាវ",
                EnglishName:"LAO",
                Language:en,
                Image:Image_Lao
            },{
                code:"ch",
                Name:"ចិន",
                EnglishName:"China",
                Language:en,
                Image:Image_ch
            },
            {
                code:"br",
                Name:"ប្រេហ្សុីល",
                EnglishName:"Brazil",
                Language:en,
                Image:Image_br
            },
            {
                code:"th",
                Name:"ថៃ",
                EnglishName:"Thailand",
                Language:en,
                Image:Image_th
            },
            {
                code:"vn",
                Name:"វៀតណាម",
                EnglishName:"Vietnam",
                Language:en,
                Image:Image_vn
            },
            {
                code:"my",
                Name:"មីយ៉ាម៉ា",
                EnglishName:"Myanmar",
                Language:en,
                Image:Image_my
            },
            {
                code:"ph",
                Name:"ភីលីភីន",
                EnglishName:"Philippines",
                Language:en,
                Image:Image_ph
            },
            {
                code:"id",
                Name:"ឥណ្ឌា",
                EnglishName:"India",
                Language:en,
                Image:Image_id
            }
        ],
        translate:{},
        language:[],

    },
    reducers:{
        getLanguage:(state,action)=>{
            localStorage.setItem("language",action.payload)
            state.translate = state.Languages.filter(val=>val.code==action.payload)[0].Language;
            state.language = state.Languages.filter(val=>val.code==action.payload)[0];
            console.log(state.Languages.filter(val=>val.code==action.payload)[0])
        }
    }
})
export const {getLanguage} = StoreLanguage.actions;
export default StoreLanguage.reducer;