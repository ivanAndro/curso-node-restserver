const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const authenticate = (req = request,res, next) =>{
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({
            message:"No se ha especificado la autorización"
        });
    }
    try{
        const payload = jwt.verify(token, process.env.SECRETKEY);   
        req.auth = payload;
        next();
    }catch(error){
        console.log(error);
        return res.status(401).json({
            message:"Token invalido"
        });
    }
};

const authorize = (...roles) => (req,res = response,next) =>{
    if(!req.auth){
        return res.status(500).json({
            message: "Es necesario validar el token"
        });
    }

    if(!roles.includes(req.auth.role))
        return res.status(401).json({ message: "Acceso denegado"});
    
    next();
}


module.exports = {
    authorize,
    authenticate
};