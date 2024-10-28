import Db from './Database/db_connect.js'
import express from 'express';
const app = express();
import dotenv  from 'dotenv'
import RouteUser from './Routes/User/Login.js'
dotenv.config();
app.use(express.json())
app.use('/user',RouteUser)
app.listen(process.env.PORT,()=>{
    console.log("==>Your server is running on port",process.env.PORT,"💕 👌 ❤️ 👌");
})

