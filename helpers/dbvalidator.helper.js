const Role = require('../models/role.model')
const User = require('../models/user.model')
const isValidRole = async (role = '') => {
    const existeRol = await Role.findOne({rol: role});
    if(!existeRol) throw new Error(`El rol ${role} no existe`);        
}

const isEmailDuplicated = async(correo = '') =>{
    if(correo != ""){
        const exist = await User.findOne({correo});
        if(exist) throw new Error(`El correo ${correo} ya fue registrado`);
    }
}


const idExist = async(id = '') => {

    if(id != ''){
        const exist = await User.findById(id);
        if(!exist) throw new Error(`El id: ${id} no existe`);
    }
}

module.exports = {
    isValidRole,
    isEmailDuplicated,
    idExist
}