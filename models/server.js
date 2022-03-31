const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.database')

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT

        this.paths = {
            user:       '/api/users',
            auth:       '/api/auth',
            search:      '/api/search',
            category:   '/api/categories',
            product:    '/api/products'
        }

        // Base de datos
        this.conectarDB();


        // Middlewares
        this.middlewares();

        // Rutas de aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
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
        this.app.use(this.paths.user, require('../routes/user.routes'));
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.search, require('../routes/search.routes'));
        this.app.use(this.paths.category, require('../routes/category.routes'));
        this.app.use(this.paths.product, require('../routes/product.routes'));
    }

    start(){
        this.app.listen(this.port, () =>{
            console.log(`Servidor corriendo en ${this.port}`);
        });
    }

}

module.exports = Server;