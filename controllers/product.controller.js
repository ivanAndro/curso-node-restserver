const { response, request } = require('express');
const res = require('express/lib/response');

// Models
const { Product } = require('../models')


const getProducts = async (req = request, res = response) => {

    const {limit = 3, next = 0} = req.query
    const query = {activo:true};
    Promise.all([
        Product.find(query).skip(Number(next)).limit(Number(limit)),
        Product.countDocuments(query)        
    ]).then((data)=>{
        const [products, totalResults] = data;
        const nextTo = Number(next) + Number(limit);
        res.json({
            totalResults,
            next: nextTo < totalResults ? nextTo : null,
            products,
        });
    });
}

const getProduct = async(req, res) => {
    try{
        const id = req.params.id;
        const product = await Product.findById(id)
            .populate("user","nombre correo")
            .populate("category","nombre");
        if(!product || !product.activo){
            return res.status(404).json({
                    message:"No se encontro el registro solicitado"
                });
        }

        res.json({
            message:"Producto encontrado",
            product
        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Ha ocurrido un error"
        });
    }
}

const postProduct = async(req = request, res = response) => {
    try{
        const {nombre,descripcion,disponible = true, precio, categoria} = req.body;
        const user = req.auth.uid;

        const product = new Product({
            nombre, descripcion, disponible, precio, user, category : categoria
        });
        await product.save();
        res.status(201).json({
            message: 'Producto registrado correctamente',
            product
        });
    }
    catch(error){
        console.log(err);
        res.status(500).json({
            message: "Ha ocurrido un error"
        });
    }
}

const putProduct = async(req = request, res = response) => {
    try{
        const id = req.params.id;
        const {nombre,descripcion,disponible, precio, categoria} = req.body;
        const user = req.auth.uid;

        const product = await Product.findById(id);

        const duplicated = await Product.findOne({ nombre, _id: { "$ne": id}});
        if(duplicated)
        {
            return res.status(401).json({
                message:"Ya existe un producto con este nombre"
            });
        }

        product.nombre = nombre;
        product.category = categoria;
        product.user = user;
        product.updatedAt = Date.now();
        product.precio = precio;
        if(disponible != null)
            product.disponible = disponible;


        await product.save();
        res.json({
            message: 'Producto actualizado correctamente',
            product
        });
    }
    catch(error){
        console.log(err);
        res.status(500).json({
            message: "Ha ocurrido un error"
        });
    }
}

const deleteProduct = async (req = request, res = response)=>{
    try{
        const id = req.params.id;
        const product = await Product.findByIdAndUpdate(id,{activo:false},{new: true});
        res.json({
            message:'Producto eliminado correctamente',
            product
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Ha ocurrido un error"
        });
    }
}

module.exports = {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    deleteProduct
}