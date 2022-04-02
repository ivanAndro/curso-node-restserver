const { request } = require("express");

const verifyFileParam = (name) => (req = request, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files[name]) {
        return res.status(400).json({
            message:'No existe el parametro ' + name 
        });
    }
    next();
}

module.exports = {
    verifyFileParam
}
