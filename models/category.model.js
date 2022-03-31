const { Schema, model} = require('mongoose');

const CategorySchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'] 
    },
    activo:{
        type:Boolean,
        default: true,
        require: true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required : true
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


CategorySchema.methods.toJSON = function(){
    const { __v, _id, ...category} = this.toObject();
    category.uid = _id;
    if(category.user._id){
        category.user.uid = category.user._id;
        delete category.user._id;
    }
    return category;
}

module.exports = model('Category', CategorySchema);