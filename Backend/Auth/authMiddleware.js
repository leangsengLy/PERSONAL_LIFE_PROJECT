import jwt from 'jsonwebtoken';
const verifyToken =(req,res,next)=>{
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({error:"Access denied!"});

}
export default verifyToken;