
const { request, response } = require("express");
const { User, Product, Archive } = require("../models");
const { uploadFile, deleteFile, getFile} = require('../helpers');
const upload = async(req = request, res = response) => {   
    const file = req.files.file; 
    uploadFile(file,req.auth.uid,'documents').then( archive => {
        res.json({
            message: `Archivo cargado correctamente`,
            archive
        });

    }, err => {
        console.log(err);
        res.status(500).json({
            message: 'Ha ocurrido un error al cargar el archivo'
        });
    })
}

const uploadRoute = async(req = request,res = response) => {
    try{
        const {collection, id} = req.params;
        const file = req.files.file; 
        let modelo;
        switch (collection) {
            case 'users':
                modelo = await User.findById(id);
                break;
            case 'products':
                modelo = await Product.findById(id);
                break;    
            default:
                return res.status(500).json({message: 'Ruta no configurada'});
        }
        
        if(!modelo) return res.status(404).json({message:'Documento no encontrado'});
        if(modelo.image){
            const isDelete = await deleteFile(modelo.image);
            if(!isDelete) return res.status(500).json({message: 'No se pudo eliminar el archivo original'});
        }
        const archive = await uploadFile(file,req.auth.uid,collection);
        modelo.image = archive._id;
        modelo.save();
        res.json({
            message:'Solicitud completada exitosamente',
            archive
        });

    }catch(err){
        console.log(err);
        res.status(500).json({message:'Ha ocurrido un error al procesar la solicitud'});
    }
}

const getArchive = async(req = request, res = response) => {
    try{
        const {id} = req.params;
        const filePath = await getFile(id);
        if(!filePath) return res.status(404).json({message:"No se encontro el archivo solicitado"});
        res.sendFile(filePath);

    }catch(err){
        console.log(err);
        res.status(500).json({message:'Ha ocurrido un error al procesar la solicitud'});
    }
}

module.exports = {
    upload,
    uploadRoute,
    getArchive
}