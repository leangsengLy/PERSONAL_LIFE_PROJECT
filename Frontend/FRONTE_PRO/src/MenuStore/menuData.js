import MoneyPie from '../../public/Menu/pie-graph.svg'
import store from '../../public/Menu/store.svg'
import Chat from '../../public/Menu/chat.svg'
import calendar from '../../public/Menu/calendar.svg'
import family from '../../public/Menu/parenting.svg'
import data from '../../public/Menu/growth-graph.svg'
import chart from '../../public/Menu/pie-chart.svg'
import media from '../../public/Menu/social-promotion.svg'
import Setting from '../../public/Menu/gear-setting.svg'
import QR from '../../public/Menu/qr-code.svg'

// subcofee Image
import inventory from '../../public/Menu/Sub_Menu_Coffee/inventory.svg'
import moneySend from '../../public/Menu/Sub_Menu_Coffee/money-send.svg'
import money from '../../public/Menu/Sub_Menu_Coffee/money.svg'
import user from '../../public/Menu/Sub_Menu_Coffee/user.svg'
import office from '../../public/Menu/Sub_Menu_Coffee/office.svg'
import horizontal from '../../public/Menu/Sub_Menu_Coffee/align-horizontal.svg'
export const StoreMenu = [
    {
        Id:1,
        Name:"ហាងការហ្វេ",
        EnglishName:"Shop coffee",
        iconImage:store,
        SubMenu:[
            {   Name:"ផលិតផល",
                EnglishName:"Product",
                iconImage:inventory,
            },
            {   Name:"ប្រាក់ចំណាយ",
                EnglishName:"Net OutCome",
                iconImage:moneySend,
            },
            {   Name:"ប្រាក់ចំណូល",
                EnglishName:"Net Income",
                iconImage:money,
            },
            {   Name:"បុគ្គលិក",
                EnglishName:"Employee",
                iconImage:user,
            },
            {   Name:"ប្រាក់ខែ",
                EnglishName:"Salary",
                iconImage:office,
            },
            {   Name:"ទិន្នន័យ",
                EnglishName:"Data a month",
                iconImage:horizontal,
            },
            
          
        ]
    },
    {
        Id:2,
        Name:"ហិរញ្ញវត្ថុ",
        EnglishName:"Money",
        iconImage:MoneyPie,
        SubMenu:[]
    },
    {
        Id:3,
        Name:"ផ្ញើរសារ",
        EnglishName:"Chat",
        iconImage:Chat,
        SubMenu:[]
    },
    {
        Id:4,
        Name:"ស្ថិតិ",
        EnglishName:"Graph",
        iconImage:data,
        SubMenu:[]
    },
    {
        Id:5,
        Name:"QR Scan",
        EnglishName:"QR Scan",
        iconImage:QR,
        SubMenu:[]
    },
    {
        Id:6,
        Name:"ប្រព័ន្ទកែប្រែ",
        EnglishName:"Setting",
        iconImage:Setting,
        SubMenu:[]
    },
    
    {
        Id:7,
        Name:"កាលវីភាគ",
        EnglishName:"Schedule",
        iconImage:calendar,
        SubMenu:[
            {   Name:"ហាងការហ្វេ",
                EnglishName:"Shop coffee",
                iconImage:calendar,
            },
            {   Name:"ហាងការហ្វេ",
                EnglishName:"Shop coffee",
                iconImage:store,
            },
            {   Name:"ហាងការហ្វេ",
                EnglishName:"Shop coffee",
                iconImage:store,
            },
            {   Name:"ហាងការហ្វេ",
                EnglishName:"Shop coffee",
                iconImage:store,
            }
        ]
    },
    {
        Id:8,
        Name:"គ្រួសារ",
        EnglishName:"Family",
        iconImage:family,
        SubMenu:[
            {   Name:"ហាងការហ្វេ",
                EnglishName:"Shop coffee",
                iconImage:calendar,
            },
            {   Name:"ហាងការហ្វេ",
                EnglishName:"Shop coffee",
                iconImage:store,
            },
            {   Name:"ហាងការហ្វេ",
                EnglishName:"Shop coffee",
                iconImage:family,
            },
            {   Name:"ហាងការហ្វេ",
                EnglishName:"Shop coffee",
                iconImage:family,
            }
        ]
    },
    
    {  Id:9,
        Name:"ស្ថិតិ",
        EnglishName:"Graph",
        iconImage:chart,
        SubMenu:[]
    },
    {
        Id:10,
        Name:"Media",
        EnglishName:"Media",
        iconImage:media,
        SubMenu:[]
    },
  
]