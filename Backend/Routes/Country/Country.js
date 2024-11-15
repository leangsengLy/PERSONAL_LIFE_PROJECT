import express from 'express'
import db from '../../Database/db_connect.js'
const RoutedCountry = express.Router();
RoutedCountry.get('/list',(req,res)=>{
    // res.setHeader('Content-Type', 'application/json; charset=utf-8');
    db.query(`SELECT * FROM LZCOUNTRY`,(error,result)=>{
        console.log(result.recordset)
        return res.send({message:result.recordset})
    })
})
RoutedCountry.post('/update',(req,res)=>{
    db.query(`SELECT * FROM LZCOUNTRY`,(error,result)=>{
        return res.send({message:result.recordset})
    })
})
RoutedCountry.get('/delete/:Id',(req,res)=>{
    db.query(`SELECT * FROM LZCOUNTRY`,(error,result)=>{
        return res.send({message:result.recordset})
    })
})


export default RoutedCountry;