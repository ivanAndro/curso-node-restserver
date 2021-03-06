const { Schema, model} = require('mongoose');

const UserSchema = Schema({
    nombre:{
        type: String,
        required: [true,'El nombre es obligatorio'],        
    },
    correo:{
        type: String,
        required: [ true, 'El correo es obligatorio'],
        unique: true,
    },
    password:{
        type: String,
        required: [ true, 'La contraseña es obligatoria'],
    },
    role:{
        type: String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    image:{
        type: Schema.Types.ObjectId,
        ref:'Archive',
        require: false
    },
    google: {
        type: Boolean,
        default: false
    }
    
});

UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', UserSchema)