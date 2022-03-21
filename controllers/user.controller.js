const { response, request } = require('express');


const getUsers = (req = request,res = response) => {
    const {q, nombre = null, page = null } = req.query;
    res.json({
        msg:'get API',
        q,
        nombre,
        page
    });
}

const postUser = (req,res = response) => {
    const {body} = req;
    console.log(body);
    res.json({
        msg:'post API',
        body
    });
}

const putUser = (req,res = response) => {

    const {id} = req.params;

    res.json({
        msg:'get API',
        id
    });
}

const deleteUser = (req,res = response) => {
    res.json({
        msg:'get API'
    });
}



module.exports = {
    getUsers,
    postUser,
    putUser,
    deleteUser
}