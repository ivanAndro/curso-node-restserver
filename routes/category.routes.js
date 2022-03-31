const {Router}  = require('express');
const { body, param, query} = require('express-validator');

// Controller
const { getCategories,postCategory, putCategory, deleteCategory, getCategory, getCategoryProducts } = require('../controllers');

// Middlewares
const { validarCampos, authenticate, authorize, valueUppercase } = require('../middlewares');

// Helpers
const { verifyCategoryName, verifyCategoryId } = require('../helpers');

const router = Router();

// Obtener todas las categorias
router.get('/',[
    query('limit').optional().bail().isInt().withMessage('El valor limit debe ser entero'),
    query('next').optional().bail().isInt().withMessage('El valor next debe ser entero'),
],getCategories);

// Obtener una categoria por id
router.get('/:id',[
    param('id').isMongoId().withMessage('El Id ingresado no es valido').bail(),
    validarCampos
],getCategory);

// Registrar una categoria
router.post('/',[
    authenticate,
    body('nombre').notEmpty().withMessage('El nombre es requerido').bail().customSanitizer(valueUppercase).custom(verifyCategoryName),
    validarCampos
],postCategory);

// Actualizar una categoria
router.put('/:id',[
    param('id').isMongoId().withMessage('El Id ingresado no es valido'),
    body('nombre').notEmpty().withMessage('El nombre es requerido').bail().customSanitizer(valueUppercase),
    validarCampos
],putCategory);

// Eliminar una categoria
router.delete('/:id',[
    authenticate,
    authorize('ADMIN_ROLE'),
    param('id').isMongoId().withMessage('El Id ingresado no es valido').bail(),
    validarCampos
],deleteCategory);

router.get('/:id/products',[
    authenticate,
    query('limit').optional().bail().isInt().withMessage('El valor limit debe ser entero'),
    query('next').optional().bail().isInt().withMessage('El valor next debe ser entero'),
    param('id').isMongoId().withMessage('El Id ingresado no es valido').bail().custom(verifyCategoryId),
    validarCampos
],getCategoryProducts)


module.exports = router;
