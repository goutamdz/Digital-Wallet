const {JWT_SECRET} = require('./config');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    console.log("going into middleware")
    const authHeader=req.headers['authorization'];
    console.log("auth: "+authHeader);

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.json({message:"No token provided"});
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        
        if(decoded.userId){
            req.userId = decoded.userId;
        }
        next();
    }
    catch(err){
        return res.json({message:"Unauthorized"});
    }
}

module.exports = {authMiddleware};