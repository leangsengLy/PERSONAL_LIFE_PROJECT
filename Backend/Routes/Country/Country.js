import express from 'express'
import db from '../../Database/db_connect.js'
const RoutedCountry = express.Router();
import sql from 'mssql';
import path from 'path';
import multer from 'multer';
import moment from 'moment';
import ValidToken from '../../Auth/ValidToken.js';
import env from 'dotenv'
import fs from 'fs'
env.config();
//Store file in folder
const storage = multer.diskStorage({
    destination:'./uploads/',
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})
const uploadFile = multer({storage:storage})
RoutedCountry.get('/list',ValidToken,(req,res)=>{
    db.query(`SELECT * FROM LZCOUNTRY ORDER BY ID DESC`,(error,result)=>{
        return res.status(200).send(result.recordset)
    })
})  
RoutedCountry.get('/delete/:Id',ValidToken,async (req,res)=>{
    const {Id}= req.params;
    if(Id=="" || Id==null || Id==undefined) return res.status(400).send({message:"don't have Id to find!"})
    const stringQuery = `DELETE FROM LZCOUNTRY WHERE Id=@Id`;
    const stringCheck = `SELECT * FROM WHERE ID=@Id`;
    const check = await db.request().input('Id',sql.VarChar,Id).query(stringCheck)
    const deleteRow = await db.request().input('Id',sql.VarChar,Id).query(stringQuery);
    console.log(check)
    if(deleteRow.rowsAffected[0]==0) return res.status(404).send({message:"Data not found!"})
    else {
        await RemoveImageFromFolder(deleteRow);
        return res.status(200).send({message:"Delete country successfully!"})
    }
})
RoutedCountry.post('/create',ValidToken,uploadFile.single("File"),async (req,res)=>{
    console.log(req.get('host'))
    const {Code,Name,EnglishName} = req.body;
    if((Code==null  || Code=='' || Code==undefined) && (Name==null|| Name==''|| Name==undefined)) return res.status(400).send({message:"Some information we are required please input!"});
    const stringCheck = `SELECT * FROM LZCOUNTRY WHERE Code = @Code`;
    const checkCode = await db.request().input('Code',sql.VarChar,Code).query(stringCheck) //this line we using for assign value by paramater on "Code"
    if(checkCode.recordset.length>0) return res.status(400).send({message:"Code Already existed!"})
    db.query(`INSERT INTO LZCOUNTRY VALUES('${Code}',N'${Name}','${EnglishName}','http://localhost:${process.env.PORT}/${req?.file?.filename??null}','${moment().format('YYYY/MM/DD')}','${req.userAccess.USERNAME}',null,null)`,(error,result)=>{
        if(result){
            return res.status(200).send({
                message:"Create Country successfuly!",
            })
        }else{
            return res.status(500).send({message:"Error while created!"})
        }
    })
})
const RemoveImageFromFolder =async (data)=>{
    const fileName = data.recordset[0].ImagePath.split('/')[data.recordset[0].ImagePath.split('/').length-1]
    const listfile = fs.readdir(`${path.join(process.cwd(),'uploads')}`,(error,files)=>{
        if(files.includes(fileName)){
            fs.unlinkSync(path.join(process.cwd(),'uploads',fileName));
        }
    })
}
RoutedCountry.post('/update',ValidToken,uploadFile.single("File"),async (req,res)=>{
    const {Id,Code,Name,EnglishName} = req.body;
    console.log(req?.file?.filename)
    const SamIntConvert = Id?.toString().trim();
    const stringQuery = `SELECT * FROM LZCOUNTRY WHERE Id = @Id`;
    const check =await db.request().input('Id',sql.VarChar,SamIntConvert).query(stringQuery);
    if(check.recordset.length>0){
        await RemoveImageFromFolder(check);
        const StringUpdate = `UPDATE LZCOUNTRY SET Code=@Code,Name=@Name,EnglishName=@EnglishName,ImagePath=@Image,UpdateBy=@UpdateBy,UpdateDate='${moment().format('YYYY/MM/DD')}' WHERE Id=@Id`;
        const update = await db.request()
        .input('Name',sql.NVarChar,Name)
        .input('Image',sql.NVarChar,`http://localhost:${process.env.PORT}/${req?.file?.filename}`)
        .input('EnglishName',sql.VarChar,EnglishName)
        .input('UpdateBy',sql.VarChar,req.userAccess.USERNAME)
        .input('Id',sql.VarChar,SamIntConvert)
        .input('Code',sql.VarChar,Code).query(StringUpdate);
        if(update.rowsAffected[0]!==0){
            return res.status(200).send({message:"Update data succesfully!"})
        }
    }
})



export default RoutedCountry;