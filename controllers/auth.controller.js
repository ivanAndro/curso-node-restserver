const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { generarJWT } = require('../helpers/jwt.helper');

const getAutenticate = async (req = request,res = response) => {

    try{
        const {correo, password} = req.body;
        const query = {correo: correo};
        const user = await User.findOne(query);

        if(!user){
            return res.status(404).json({
                'message': "Usuario no encontrado"
            });
        }
        if(!user.estado){
            return res.status(404).json({
                'message': "Usuario no activo"
            });
        }

        const valid = bcrypt.compareSync(password, user.password)
        if(!valid){
            return res.status(404).json({
                'message': "Contraseña incorrecta"
            });
        }

        const token = await generarJWT(user.id, user.role);
    
        res.json({
            message: "Token generado",
            token
        });
    }
    catch(error){
        console.log(error);
        return res.status(500)
        .json({
            message: "Ha ocurrido un error"
        });
    }
}


module.exports = {
    getAutenticate,
}