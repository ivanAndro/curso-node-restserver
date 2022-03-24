const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const getUsers = async (req = request,res = response) => {

    const {limit = 3, next = 0} = req.query
    const query = {estado: true};
    const getUsers = User.find(query).skip(Number(next)).limit(Number(limit));
    const getTotalResults = User.countDocuments(query);

    Promise.all([
        getUsers,
        getTotalResults
    ]).then((data)=>{
        const [users, totalResults] = data;
        res.json({
            totalResults,
            users
        });
    });
}

const postUser = async (req,res = response) => {

    const {nombre, correo,password, role} = req.body;
    const usuario = new User({nombre, correo, password, role});

    // encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password,salt);

    
    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const putUser = async (req = request , res = response) => {

    const {nombre, role} = req.body;
    const { id } = req.params;

    const user = await User.findById(id);
    user.role = role;
    user.nombre = nombre;
    user.save();
    res.json(user);
}

const deleteUser = async (req = request,res = response) => {
    const { id } = req.params;
    const user = await User.findOneAndUpdate(
        {id},
        {estado:false}
    );
    res.json(user);
}



module.exports = {
    getUsers,
    postUser,
    putUser,
    deleteUser
}