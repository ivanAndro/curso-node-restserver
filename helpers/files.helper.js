const path = require('path');
const fs = require('fs');

const {Archive} = require("../models");

const uploadFile = async( file,user, collection = '' , allowedExtensions =  ['.png','.jpg','.jpeg']) => {

    try{
        if(!user){
            return Promise.reject('No se ha especificado el usuario autenticado');
        }
        const extension = path.extname(file.name).toLowerCase();
        const dirPath = path.join('uploads',collection);
        if(!allowedExtensions.includes(extension))
            return Promise.reject(`Archivos permitidos: ${allowedExtensions}`);
        const archive = new Archive({
            name: file.name,
            extension,
            mimeType: file.mimetype,
            path:dirPath,
            user
        });
        await archive.save();
        return new Promise((resolve, reject) => {
            const fileName = archive._id + extension;
            const filePath = path.join(dirPath, fileName);
            const uploadPath = path.join(__dirname,'..', filePath);
            file.mv(uploadPath, (err) => {
                if (err){
                    reject(err);            
                }
                resolve(archive);
            });
        }); 

    }catch(err){
        return Promise.reject(err);
    }
}

const deleteFile = async(id) => {
    try{
        const archive = await Archive.findById(id);
        if(archive){
            const fileName = archive._id + archive.extension;
            const pathImage = path.join(__dirname,'../', archive.path, fileName);
            console.log('Se eliminara:', pathImage);
            if(fs.existsSync(pathImage)){
                fs.unlinkSync(pathImage);
            }
            await Archive.findByIdAndDelete(id);
        }
        return true;

    }catch(err){
        console.log(err);
        return false;
    }

}

const getFile = async(id) =>{
    try{
        const archive = await Archive.findById(id);
        if(!archive) return null;
        const fileName = archive._id + archive.extension;
        const pathImage = path.join(__dirname,'../', archive.path, fileName);
        if(!fs.existsSync(pathImage)) return null;
        return pathImage;
    }catch(err){
        console.log(err);
        return null;
    }

}


module.exports = {
    uploadFile,
    deleteFile,
    getFile
}