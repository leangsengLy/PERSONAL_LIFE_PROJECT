import express from 'express';
const RouteCommune = express.Router();
import sql from 'mssql'
import db from '../../../Database/db_connect.js'
import moment from 'moment';
import ValidToken from '../../../Auth/ValidToken.js';
RouteCommune.get('/list',ValidToken,async(req,res)=>{
    let stringQery = `SELECT * FROM LZCOMMUNE ORDER BY ID DESC`
    let exec = await db.request().query(stringQery)
    return res.status(400).send(exec.recordset);
})
RouteCommune.post('/create',ValidToken,async(req,res)=>{
    const {Code,Name,EnglishName,Description,DistrictId} = req.body;
    console.log(req.body)
    if(DistrictId=='' || DistrictId == undefined) return res.status(400).send({message:"data not found with district Id!"})
    if(Code==''||Name=='') return res.status(400).send({message:"Some information we are required!"})
    let queryString = `INSERT INTO LZCOMMUNE VALUES (@Code,@Name,@EnglishName,@DistrictId,'${moment(new Date()).format(" DD MMMM,YYYY")}','${req.userAccess.USERNAME}',NULL,NULL,@Description)`;
    let exec = await db.request().
    input('Code',sql.VarChar,Code).
    input('Name',sql.NVarChar,Name).
    input('EnglishName',sql.VarChar,EnglishName).
    input('DistrictId',sql.Int,DistrictId).
    input('Description',sql.VarChar,Description).query(queryString)
    if(exec.rowsAffected.length>0) return res.status(200).send({message:"Create a commune successfully!"});
    else return res.status(400).send({message:"Something when create while create!"});
})
RouteCommune.post('/update',ValidToken,async(req,res)=>{
    const {Name,EnglishName,Description,Id} = req.body;
    if(Id=='' || Id==undefined) return res.status(400).send({message:"Id not found!"})
    if(Name=='') return res.status(400).send({message:"Some information we are required!"})
    const check = `SELECT * FROM LZCOMMUNE WHERE Id = @Id`;
    const checkDistrict = await db.request().input('Id',sql.Int,Id).query(check)
    if(checkDistrict.recordset.length==0) return res.status(400).send({message:"Id not found in our system!"})
    let queryString = `UPDATE LZCOMMUNE SET Name=@Name,EnglishName=@EnglishName,UpdateDate='${moment(new Date()).format(" DD MMMM,YYYY")}',UpdateBy='${req.userAccess.USERNAME}',Description=@Description WHERE Id = @Id`;
    let exec = await db.request().
    input('Name',sql.NVarChar,Name).
    input('Id',sql.Int,Id).
    input('EnglishName',sql.VarChar,EnglishName).
    input('Description',sql.VarChar,Description).query(queryString)
    if(exec.rowsAffected.length>0) return res.status(200).send({message:"Update a commune successfully!"});
    else return res.status(400).send({message:"Something when create while update!"});
})
RouteCommune.get('/delete/:Id',ValidToken,async(req,res)=>{
    const {Id} = req.params;
    if(Id=='' || Id==undefined) return res.status(400).send({message:"data not found!"})
    const check = `SELECT * FROM LZCOMMUNE WHERE Id = @Id`;
    const checkDistrict = await db.request().input('Id',sql.Int,Id).query(check)
    if(checkDistrict.recordset.length==0) return res.status(400).send({message:"Id not found in our system!"})
    const stringQuery = `DELETE FROM LZCOMMUNE WHERE Id = @Id`;
    const exec = await db.request().input('Id',sql.Int,Id).query(stringQuery)
    if(exec.rowsAffected.length>0) return res.status(200).send("Delete commune successfully!");
    else return res.status(400).send({message:"Something when create while delete!"});
})

export default RouteCommune;