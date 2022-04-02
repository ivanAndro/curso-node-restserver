const { Schema, model } = require('mongoose');

const ArchiveSchema = Schema(
    {
        name:{
            type: String,
            require: [true, 'El nombre es requerido']
        },
        extension:{
            type: String,
            require: [true, 'El nombre es requerido']
        },
        mimeType:{
            type: String,
            require: [ true, 'El tipo mime es requeridi']
        },
        path:{
            type: String,
            require: [true, 'El path es requerido']            
        },
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: [true, 'El usuario es requerido']
        },
        createdAt:{
            type: Date,
            require: [true, 'El nombre es requerido'],
            default: Date.now,
        }

    }
);

module.exports = model('Archive', ArchiveSchema);