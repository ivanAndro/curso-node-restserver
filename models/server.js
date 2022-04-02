const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config.database')

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT

        this.paths = {
            user:       '/api/users',
            auth:       '/api/auth',
            search:     '/api/search',
            category:   '/api/categories',
            product:    '/api/products',
            uploads:    '/api/uploads'
        }
        this.routers = {
            user:       require('../routes/user.routes'),
            auth:       require('../routes/auth.routes'),
            search:     require('../routes/search.routes'),
            category:   require('../routes/category.routes'),
            product:    require('../routes/product.routes'),
            uploads:    require('../routes/uploads.routes')
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

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use(this.paths.user,       this.routers.user);
        this.app.use(this.paths.auth,       this.routers.auth);
        this.app.use(this.paths.search,     this.routers.search);
        this.app.use(this.paths.category,   this.routers.category);
        this.app.use(this.paths.product,    this.routers.product);
        this.app.use(this.paths.uploads,    this.routers.uploads);
    }

    start(){
        this.app.listen(this.port, () =>{
            console.log(`Servidor corriendo en ${this.port}`);
        });
    }

}

module.exports = Server;