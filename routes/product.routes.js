const { Router} = require('express');
const { body,param,query } = require('express-validator');

const router = Router();

// Controller
const { getProducts, getProduct, postProduct, putProduct, deleteProduct} = require('../controllers');

// Middlewares
const { authenticate, validarCampos, valueUppercase, authorize } = require('../middlewares');

// Helpers
const { verifyCategoryId, verifyProductName, verifyProductId } = require('../helpers');



router.get("/",[
    query('limit')
        .optional().bail()
        .isInt().withMessage('El valor limit debe ser entero'),
    query('next')
        .optional().bail()
        .isInt().withMessage('El valor next debe ser entero'),
],getProducts)

router.get('/:id',[
    authenticate,
    param('id')
        .isMongoId().withMessage('El Id ingresado no es valido').bail(),
    validarCampos
],getProduct);


router.post("/",[
    authenticate,
    body('categoria')
        .notEmpty().withMessage('La categoria es requerida').bail()
        .isMongoId().withMessage('La categoria no es un id valido').bail()
        .custom(verifyCategoryId),
    body('nombre')
        .notEmpty().withMessage().bail()
        .customSanitizer(valueUppercase)
        .custom(verifyProductName),
    body('descripcion')
        .optional().bail()
        .isLength({max:500}).withMessage('La descripción debe ser menor a 500 carácteres'),
    body('disponible')
        .optional().bail().isBoolean().withMessage('El valor disponible debe ser boolean'),
    body('precio')
        .notEmpty().withMessage('El precio es requerido').bail()
        .isNumeric().withMessage('El precio debe ser numerico'),    
    validarCampos     
],postProduct)

router.put("/:id",[
    authenticate,
    param('id').isMongoId().withMessage('El Id ingresado no es valido'),
    body('categoria')
        .notEmpty().withMessage('La categoria es requerida').bail()
        .isMongoId().withMessage('La categoria no es un id valido').bail()
        .custom(verifyCategoryId),
    body('nombre')
        .notEmpty().withMessage().bail()
        .customSanitizer(valueUppercase),
    body('descripcion')
        .optional().bail()
        .isLength({max:500}).withMessage('La descripción debe ser menor a 500 carácteres'),
    body('disponible')
        .optional().bail().isBoolean().withMessage('El valor disponible debe ser boolean'),
    body('precio')
        .notEmpty().withMessage('El precio es requerido').bail()
        .isNumeric().withMessage('El precio debe ser numerico'),    
    validarCampos     
],putProduct)


router.delete('/:id',[
    authenticate,
    authorize('ADMIN_ROLE'),
    param('id')
        .isMongoId().withMessage('El Id ingresado no es valido').bail()
        .custom(verifyProductId),
    validarCampos
],deleteProduct);

module.exports = router;