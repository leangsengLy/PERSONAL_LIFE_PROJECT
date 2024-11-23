import jwt from 'jsonwebtoken'
import env from 'dotenv'
env.config();
const ValidToken =(req,res,next)=>{
    const authHeader  = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.PRIVATE_KEY,(error,payload)=>{
            if(payload) {
                console.log(payload)
                next();
            }
            else {
                return res.status(401).json({message:"Your are faking the token in my system now. you still not allow to access! 😄😂🥱😭"})
            }
        })
    }else{
        return res.status(401).json({message:"You don't have token so we not allow to access!"})
    }
}
export default ValidToken;