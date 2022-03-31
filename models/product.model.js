const { Schema, model} = require('mongoose');

const ProductSchema = Schema({
    nombre:{
        type: String,
        required: [true,'El nombre es obligatorio'],        
    },
    descripcion:{
        type: String,
    },
    precio:{
        type: Number,
        default: 0
    },
    disponible:{
        type: Boolean,
        default: true,
        require: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: [true, 'El usuario es requerido']
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: [true, 'La categoria es requerida']
    },
    activo:{
        type:Boolean,
        default: true,
        require: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
});

ProductSchema.methods.toJSON = function(){
    const { __v, _id, activo, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

module.exports = model('Product', ProductSchema)