import jwt from 'jsonwebtoken';
import env from 'dotenv'
env.config();
const generateToken = (payload)=>{
    const privateKey = process.env.PRIVATE_KEY;
    const Option_token={
        expiresIn:'1h'
    }
    const token = jwt.sign(payload,privateKey,Option_token)
    return token;
}
export default generateToken;