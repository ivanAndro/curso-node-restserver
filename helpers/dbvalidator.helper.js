const {Role, User, Category, Product, Archive} = require('../models')
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


const userIdExist = async(id = '') => {

    if(id != ''){
        const exist = await User.findById(id);
        if(!exist) throw new Error(`El id: ${id} no existe`);
    }
}
/**
 * 
 * @param {String} id Id de la categoria
 */
const verifyCategoryId = async(id = '') => {
    if(id != ''){
        const exist = await Category.findById(id);
        if(!exist) throw new Error(`No se encontro categoria con id: ${id}`);
    }
}

const verifyCategoryName =  async(nombre = '') =>{
    if(nombre == ''){
        throw new Error("No se ha especificado el nombre");
    }
    const exist = await Category.findOne({nombre});
    if(exist) throw new Error(`La categoria ${nombre} ya fue registrada`);
}

//Productos *******************************************
const verifyProductId = async(id = '') => {
    if(id != ''){
        const exist = await Product.findById(id);
        if(!exist) throw new Error(`No se encontro categoria con id: ${id}`);
    }
}
const verifyProductName =  async(nombre = '') =>{
    if(nombre == ''){
        throw new Error("No se ha especificado el nombre");
    }
    const exist = await Product.findOne({nombre});
    if(exist) throw new Error(`El producto ${nombre} ya fue registrado`);
}

// *****************************************************


// *************** Archives *******************
const verifyArchiveId = async(id) => {
    const exist = await Archive.findById(id);
    if(!exist) throw new Error('El archivo solicitado no existe');
}

/***********************************************/
module.exports = {
    isValidRole,
    isEmailDuplicated,
    idExist: userIdExist,
    
    verifyCategoryId,
    verifyCategoryName,

    verifyProductName,
    verifyProductId,

    verifyArchiveId
}