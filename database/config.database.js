const mongoose = require('mongoose');

const dbConnection = async () => {
    try{
        mongoose.connect(process.env.MONGODB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
            (err, res) => {
                if(err) throw err;
                console.log("Base de datos en linea");
            }
        );
    }catch(error){
        console.log(error);
        throw new Error('Error al conectar la base datos');
    }

}



module.exports = {
    dbConnection
}