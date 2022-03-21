const express = require('express');
const cors = require('cors');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT

        // Middlewares
        this.middlewares();

        // Rutas de aplicacion
        this.routes();
    }

    middlewares(){

        // Cors
        this.app.use(cors());

        // Body Formater

        this.app.use(express.json());

        // Directorio publico 
        this.app.use( express.static('public'));
    }

    routes(){
        this.app.use('/api/usuarios', require('../routes/user.routes'));
    }

    start(){
        this.app.listen(this.port, () =>{
            console.log(`Servidor corriendo en ${this.port}`);
        });
    }

}

module.exports = Server;