const { request, response } = require("express");
const {Category, Product} = require('../models')

const getCategories = async (req = request, res= response) => {

    const {limit = 3, next = 0} = req.query
    const query = {activo:true};
    const getResults = Category.find(query).skip(Number(next)).limit(Number(limit)).populate('user','nombre correo');
    const getTotalResults = Category.countDocuments(query);
    Promise.all([
        getResults,
        getTotalResults
    ]).then((data)=>{
        const [categories, totalResults] = data;
        const nextTo = Number(next) + Number(limit);
        res.json({
            totalResults,
            next: nextTo < totalResults ? nextTo : null,
            categories,
        });
    });
}

const getCategory = async (req = request, res = response) => {
    const {id} = req.params;

    const category = await Category.findById(id);
    if(!category) return res.status(400).json({message:'No se encontro el registro solicitado'});

    return res.json({category, message:"Categoria registrada"});
}


const postCategory = async (req = request, res = response) => {
    const {nombre} = req.body;
    const user = req.auth.uid;
    const category = new Category({ nombre, user });

    await category.save();

    return res.json({category, message:"Categoria registrada"});
}

const putCategory = async (req = request, res = response) => {
    const {id} = req.params;
    const {nombre} = req.body;
    const userId = req.auth.uid;
    const duplicated = await Category.findOne({nombre, _id: {"$ne": id}});
    if(duplicated)
        return res.status(400).json({message:'Nombre ya existente'});


    const category = await Category.findById(id);
    if(!category) return res.status(400).json({message:'No se encontro el registro solicitado'});


    category.nombre = nombre;
    category.updatedAt = Date.now();
    category.user = userId;
    await category.save();
    return res.json({category, message:"Categoria actualizada"});
}


const deleteCategory = async (req = request, res = response) => {
    const {id} = req.params;
    const category = await Category.findById(id);
    if(!category) return res.status(400).json({message:'No se encontro el registro solicitado'});
    category.activo = false; 
    await category.save();
    return res.json({category, message:"Categoria eliminada"});
}

const getCategoryProducts = async ( req = request, res = response) => {
    const {id} = req.params;
    var {q, limit = 5, next = 0} = req.query;
    limit = Number(limit);
    next = Number(next);
    var filter = {
        $and : [{activo: true},{category:id}]
    }
    if(q != ""){
        const regex = RegExp(q,'i');
        filter.$or = [{nombre: regex},{descripcion: regex}];        
    }

    Promise.all([
        Product.find(filter).skip(next).limit(limit),
        Product.countDocuments(filter)
    ]).then(
        data => {
            const [results, totalResults] = data;
            const nextTo = next + limit;
            res.json({
                message:'Solicitud completada exitosamente',
                results,
                totalResults,
                next: nextTo < totalResults ? nextTo : null
            });

        },
        err => {
            console.log(err);
            res.status(500).json({
                message:'Ha ocurrido un error'
            });
        }
    );


}


module.exports = {
    getCategories,
    postCategory,
    putCategory,
    deleteCategory,
    getCategory,
    getCategoryProducts
}