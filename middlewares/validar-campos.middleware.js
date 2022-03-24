const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next ) => {

    const formatter = ({ msg, param, value}) => {
        return {
            message: msg,
            value,
            param
        };
      };
    const errors = validationResult(req).formatWith(formatter);
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array()});
    next();
    
}

module.exports = {
    validarCampos
}