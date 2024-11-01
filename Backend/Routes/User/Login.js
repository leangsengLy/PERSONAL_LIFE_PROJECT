import express from 'express';
import db from '../../Database/db_connect.js'
import bcrypt from 'bcrypt'
import generateToken from '../../Auth/jwtUtils/jwtUtils.js'
import ValidToken from '../../Auth/ValidToken.js'
const RouteUser = express.Router();
RouteUser.get('/list',ValidToken,(req,res)=>{
    db.query(`SELECT * FROM LZLOGIN`,(error,result)=>{
        if(result)return res.status(200).send(result.recordset)
        else return res.status(404).send(error)
    })
})
RouteUser.get('/list/:id',ValidToken,(req,res)=>{
    const {id} = req.params;
    db.query(`SELECT * FROM LZLOGIN WHERE ID IN (${id})`,(error,result)=>{
        if(result) return res.status(200).send(result.recordset)
        else return res.status(404).send(error)
    })
})
RouteUser.post('/create',(req,res)=>{
    const {USERNAME,PASSWORD,HINT_PW} = req.body;
    console.log(PASSWORD)
    bcrypt.hash(PASSWORD,10,(error,hash)=>{
        if(error)console.log("erorr convert password ",error);
        db.query(`INSERT INTO LZLOGIN VALUES ('${USERNAME}','${hash}','${HINT_PW}','${new Date().toISOString()}')`,(error,result)=>{
            if(result)return res.status(200).send({message:'create user login successfuly!'})
            else return res.status(404).send(error)
        })
    })
})
RouteUser.post('/update_login',ValidToken,async (req,res)=>{    
    const {Id} = req.body;
    await db.query(`SELECT * FROM LZLOGIN WHERE ID = ${Id}`,(err,re)=>{
        if(re.recordset.length>0){
            db.query(`UPDATE LZLOGIN SET HINT_PW = ${req.body.HINT_PW},USERNAME = ${req.body.USERNAME} , PASSWORD = ${req.body.PASSWORD} WHERE ID = ${Id} `,(error,result)=>{
                if(result)return res.status(200).send(result.recordset)
                else return res.status(400).send(error)
            })
        }else {
            return res.status(400).send({message:"User not found!"})
        }
    });
})

RouteUser.post('/login',async (req,res)=>{
    const {USERNAME,PASSWORD} = req.body;
    console.log(USERNAME)
    console.log(PASSWORD)
    db.query(`SELECT * FROM LZLOGIN WHERE USERNAME='${USERNAME}'`,(error,result)=>{
        if(error) return res.status(400).send({message:"User not found!"});
        else {
            console.log(result)
            if(result.recordset.length>0){
                bcrypt.compare(PASSWORD,result?.recordset[0].PASSWORD,(er,re)=>{
                    if(!re) return res.status(400).send({message:"Password invalid!"})
                    else {
                        const token = generateToken(result?.recordset[0]);
                        return res.status(200).send({
                            message:"Login succesfully!",
                            token:token
                        }) }
                })
            }else return res.status(400).send({message:"The username doesn't in our system!"})
        }
    });
})

export default RouteUser;