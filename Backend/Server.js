import Db from './Database/db_connect.js'
import express from 'express';
import {exec} from 'child_process'
import fs from 'fs'
import path from 'path'
import cors from 'cors'
import dotenv  from 'dotenv'
import RouteUser from './Routes/User/Login.js'
dotenv.config();

const chromeFile = path.join(process.cwd(),'chrome')
const app = express();
app.use(express.static(path.join(process.cwd(),'Public/Image')))
app.use(express.json())
app.use(cors({
    origin:"http://localhost:8090",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Ensure OPTIONS is included
    allowedHeaders: ['Content-Type', 'Authorization'] // Adjust based on your needs
}))
app.use('/api/user',RouteUser)


app.get('/',(req,res)=>{
    return res.sendFile(path.join(process.cwd(),'HTML/Index.html'))
})


app.listen(process.env.PORT,()=>{
    if(process.platform=='win32'){
        if(!fs.existsSync(chromeFile)){
            exec(`start chrome http://localhost:${process.env.PORT}`);
            fs.writeFileSync(chromeFile,'opened chrome please my man')
        }
    }
    console.log("==>Your server is running on port",process.env.PORT,"💕 👌 ❤️ 👌");
})

