const { Router } = require('express');
const { body, query, param } = require('express-validator');
// Controller
const { getUsers, putUser, postUser, deleteUser } = require('../controllers');

// Middlelwares
const {validarCampos,authenticate, authorize} = require('../middlewares');

// Helpers
const { isValidRole, isEmailDuplicated, idExist } = require('../helpers');

const router = Router();

router.get('/',[
    query('limit').optional().bail().isInt().withMessage('El valor limit debe ser entero'),
    query('next').optional().bail().isInt().withMessage('El valor next debe ser entero'),
    validarCampos
],getUsers);

router.put('/:id',[
    param('id').isMongoId().withMessage('El Id ingresado no es valido').bail().custom(idExist),
    body('nombre','El nombre es obligatorio').notEmpty(),
    body('role').notEmpty().withMessage('El correo es requerido').bail().custom(isValidRole),
    validarCampos
],putUser);
router.post('/', [
    body('role').notEmpty().withMessage('El correo es requerido').bail().custom(isValidRole),
    body('correo','Es correo es requerido').notEmpty().withMessage('El correo es requerido').bail().isEmail().withMessage('El email no es un correo').bail().custom(isEmailDuplicated),
    body('nombre','El nombre es obligatorio').notEmpty(),
    body('password').notEmpty().withMessage('El password es obligatorio').bail().isLength({min: 6}).withMessage('La contraseña debe ser de 6 caracteres minimo'),
    validarCampos
],postUser);

router.delete('/:id',[
    authenticate,
    authorize('ADMIN_ROLE'),
    param('id').isMongoId().withMessage('El Id ingresado no es valido').bail().custom(idExist),
    validarCampos
],deleteUser);



module.exports = router;