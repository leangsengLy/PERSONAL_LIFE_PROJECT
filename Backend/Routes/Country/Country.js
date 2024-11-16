import express from 'express'
import db from '../../Database/db_connect.js'
const RoutedCountry = express.Router();
import sql from 'mssql';
import path from 'path';
import multer from 'multer';
import moment from 'moment';
//Store file in folder
const storage = multer.diskStorage({
    destination:'./uploads/',
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})
const uploadFile = multer({storage:storage})
RoutedCountry.get('/list',(req,res)=>{
    db.query(`SELECT * FROM LZCOUNTRY`,(error,result)=>{
        return res.send(result.recordset)
    })
})  
RoutedCountry.get('/delete/:Id',async (req,res)=>{
    const {Id}= req.params;
    if(Id=="" || Id==null || Id==undefined) return res.send({message:"don't have Id to find!"})
    const stringQuery = `DELETE FROM LZCOUNTRY WHERE Id=@Id`;
    const deleteRow = await db.request().input('Id',sql.VarChar,Id).query(stringQuery);
    console.log(deleteRow)
    if(deleteRow.rowsAffected[0]==0) return res.send({message:"Data not found!"})
    else return res.send({message:"Delete country successfully!"})
})
RoutedCountry.post('/create',uploadFile.single("FileCountry"),async (req,res)=>{
    const {Code,Name,EnglishName} = req.body;
    if((Code==null || Code==undefined) && (Name==null|| Name==undefined)) return res.send({message:"Some information we are required please input!"});
    const stringCheck = `SELECT * FROM LZCOUNTRY WHERE Code = @Code`;
    const checkCode = await db.request().input('Code',sql.VarChar,Code).query(stringCheck) //this line we using for assign value by paramater on "Code"
    if(checkCode.recordset.length>0) return res.status(400).send({message:"Code Already existed!"})
    db.query(`INSERT INTO LZCOUNTRY VALUES('${Code}',N'${Name}','${EnglishName}','${req?.file?.filename??null}','${moment().format('YYYY/MM/DD')}','Lyzee',null,null)`,(error,result)=>{
        if(result){
            return res.status(200).send({
                message:"Create Country successfuly!",
            })
        }else{
            return res.status(500).send({message:"Error while created!"})
        }
    })
})
RoutedCountry.post('/update',(req,res)=>{
    db.query(`SELECT * FROM LZCOUNTRY`,(error,result)=>{
        return res.send({message:result.recordset})
    })
})



export default RoutedCountry;