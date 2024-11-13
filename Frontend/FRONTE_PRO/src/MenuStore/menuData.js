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
        code:'coffee',
        Name:"ហាងការហ្វេ",
        EnglishName:"Shop coffee",
        iconImage:store,
        SubMenu:[
            {   
                Code:"Product",
                Name:"ផលិតផល",
                EnglishName:"Product",
                iconImage:inventory,
                icon :"ri-box-3-fill"
            },
            {   
                Code:"Employee",
                Name:"បុគ្គលិក",
                EnglishName:"Employee",
                iconImage:user,
                icon :"ri-group-fill"
            },
            {   
                Code:"Salary",
                Name:"ប្រាក់ខែ",
                EnglishName:"Salary",
                iconImage:office,
                icon :"ri-money-dollar-box-fill"
            },
            {   
                Name:"ទិន្នន័យ",
                Code:"Data_a_month",
                EnglishName:"Data a month",
                iconImage:horizontal,
                icon :"ri-line-chart-fill"
            },
            
          
        ]
    },
    {
        Id:2,
        code:'money',
        Name:"ហិរញ្ញវត្ថុ",
        EnglishName:"Money",
        iconImage:MoneyPie,
        SubMenu:[]
    },
    {
        Id:3,
        code:'chat',
        Name:"ផ្ញើរសារ",
        EnglishName:"Chat",
        iconImage:Chat,
        SubMenu:[]
    },
    {
        Id:4,
        Name:"ស្ថិតិ",
        code:'graph',
        EnglishName:"Graph",
        iconImage:data,
        SubMenu:[]
    },
    {
        Id:5,
        Name:"QR Scan",
        code:'qr_scan',
        EnglishName:"QR Scan",
        iconImage:QR,
        SubMenu:[]
    },
    {
        Id:6,
        Name:"ប្រព័ន្ទកែប្រែ",
        code:'setting',
        EnglishName:"Setting",
        iconImage:Setting,
        SubMenu:[
            {   
                Code:"country",
                Name:"ប្រទេស",
                EnglishName:"Country",
                icon :"ri-global-fill"
            },
            {   
                Code:"userLogin",
                Name:"អ្នកប្រើប្រាស់",
                EnglishName:"UserAccount",
                icon :"ri-admin-fill"
            },
        ]
    },
    
    {
        Id:7,
        Name:"កាលវីភាគ",
        code:'schedule',
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
        code:'family',
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
        code:'graph',
        EnglishName:"Graph",
        iconImage:chart,
        SubMenu:[]
    },
    {
        Id:10,
        code:'media',
        Name:"Media",
        EnglishName:"Media",
        iconImage:media,
        SubMenu:[]
    },
  
]