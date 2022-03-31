const {Router}  = require('express');
const { body} = require('express-validator');
const { getAutenticate } = require('../controllers');
const { validarCampos } = require('../middlewares');



const router = Router();

router.get('/login',[
    body('correo').notEmpty().withMessage('El valor es requerido'),
    body('password').notEmpty().withMessage('El valor es requerido'),
    validarCampos
],getAutenticate);

module.exports = router;
