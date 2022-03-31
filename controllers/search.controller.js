const { request ,response } = require('express');
const { User, Category, Product } = require('../models');


const getSearchResults = async (req = request,res = response) => {

    const collection = req.params.collection;
    var {q, limit = 5, next = 0} = req.query;
    limit = Number(limit);
    next = Number(next);
    const regex = RegExp(q,'i');
    var filter = {};

    var getResults;
    var getTotalResults;
    switch (collection) {
        case 'users':
            filter.$and =[{estado:true}]
            if(q != '')
                filter.$or = [{nombre: regex}, {correo: regex}];      
            
            getResults = User.find(filter).skip(next).limit(limit),
            getTotalResults = User.countDocuments(filter)
            break;
        case 'categories':
            filter.$and =[{activo:true}]
            if(q != '')
                filter.nombre = regex;
            
            getResults = Category.find(filter).skip(next).limit(limit);
            getTotalResults = Category.countDocuments(filter);
            break;
        case 'products':
            filter.$and =[{activo:true}]
            if(q != '')
                filter.$or = [{nombre: regex}, {descripcion: regex}];                  
            getResults = Product.find(filter).skip(next).limit(limit);
            getTotalResults = Product.countDocuments(filter);
            break;
        default:
            return res.status(404).json({
                message:'Recurso no valido'
            });
    }
    Promise.all([getResults, getTotalResults]).then(
        data => {
            const [results, totalResults] = data;
            const nextTo = next + limit;
            res.json({
                    message:'Solicitud completada existosamente',
                    results,
                    totalResults,
                    next: nextTo < totalResults ? nextTo : null,
                });    
        },
        err => {
            res.status(500).json({
                message: err
            });
        });

}

module.exports = {
    getSearchResults
}