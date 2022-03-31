const {Router} = require('express')
const { query, param } = require('express-validator');

// Controller
const { getSearchResults } = require('../controllers/search.controller');


// Midlelwares
const { authenticate, validarCampos } = require('../middlewares');


// Helpers

const router = Router();


router.get('/:collection',[
    authenticate,
    param('collection').exists(['user','categories','products']),
    query('q').optional().bail(),
    query('limit').optional().bail().isInt().withMessage('El valor limit debe ser entero'),
    query('next').optional().bail().isInt().withMessage('El valor next debe ser entero'),
    validarCampos
],getSearchResults);

module.exports = router;