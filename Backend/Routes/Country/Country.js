import express from 'express'
import db from '../../Database/db_connect.js'
const RoutedCountry = express.Router();
import sql from 'mssql';
import path from 'path';
import multer from 'multer';
import moment from 'moment';
import ValidToken from '../../Auth/ValidToken.js';
//Store file in folder
const storage = multer.diskStorage({
    destination:'./uploads/',
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})
const uploadFile = multer({storage:storage})
RoutedCountry.get('/list',(req,res)=>{
    db.query(`SELECT * FROM LZCOUNTRY ORDER BY ID DESC`,(error,result)=>{
        return res.status(200).send(result.recordset)
    })
})  
RoutedCountry.get('/delete/:Id',ValidToken,async (req,res)=>{
    const {Id}= req.params;
    if(Id=="" || Id==null || Id==undefined) return res.status(400).send({message:"don't have Id to find!"})
    const stringQuery = `DELETE FROM LZCOUNTRY WHERE Id=@Id`;
    const deleteRow = await db.request().input('Id',sql.VarChar,Id).query(stringQuery);
    if(deleteRow.rowsAffected[0]==0) return res.status(404).send({message:"Data not found!"})
    else return res.status(200).send({message:"Delete country successfully!"})
})
RoutedCountry.post('/create',ValidToken,uploadFile.single("FileCountry"),async (req,res)=>{
    const {Code,Name,EnglishName} = req.body;
    if((Code==null  || Code=='' || Code==undefined) && (Name==null|| Name==''|| Name==undefined)) return res.status(400).send({message:"Some information we are required please input!"});
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
RoutedCountry.post('/update',ValidToken,async(req,res)=>{
    const {Id,Code,Name,EnglishName,ImagePath} = req.body;
    const SamIntConvert = Id?.toString().trim();
    const stringQuery = `SELECT * FROM LZCOUNTRY WHERE Id = @Id`;
    const check =await db.request().input('Id',sql.VarChar,SamIntConvert).query(stringQuery);
    if(check.recordset.length>0){
        const StringUpdate = `UPDATE LZCOUNTRY SET Code=@Code,Name=@Name,EnglishName=@EnglishName,ImagePath='Fixed',UpdateBy='LyLeangseng',UpdateDate='${moment().format('YYYY/MM/DD')}' WHERE Id=@Id`;
        const update = await db.request()
        .input('Name',sql.NVarChar,Name)
        .input('EnglishName',sql.VarChar,EnglishName)
        .input('Id',sql.VarChar,SamIntConvert)
        .input('Code',sql.VarChar,Code).query(StringUpdate);
        if(update.rowsAffected[0]!==0){
            return res.status(200).send({message:"Update data succesfully!"})
        }
    }
})



export default RoutedCountry;