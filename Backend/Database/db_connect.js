import sql from 'mssql';
import dotenv from 'dotenv'
dotenv.config()
const DbConnection = sql.connect({
    user:process.env.USER,
    password:process.env.PW,
    server:process.env.SERVER,
    database:process.env.DB,
     charset: 'utf8mb4', // set it to allow other language like cambodia(khmer)
    port:1433,
    options:{
        encrypt:false,
        trustServerCertificate:true
    }
},(error)=>{
    if(!error) console.log("Connect to database successfully!")
})

export default DbConnection;