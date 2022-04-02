const { Router } = require('express');
const { body, check, param } = require('express-validator');

// Controller
const { upload,uploadRoute, getArchive } = require('../controllers')

// Midlelwares
const { authenticate, validarCampos, verifyFileParam } = require('../middlewares');

// Helpers

const { validPath, verifyArchiveId } = require('../helpers');

const router = Router();

router.post('',[
    authenticate,
    verifyFileParam('file')
],upload);

router.put('/:collection/:id',[
    authenticate,
    verifyFileParam('file'),
    param('collection').custom(validPath('users','products')),
    param('id','El id debe ser un valor valido').isMongoId(),
    validarCampos
],uploadRoute);

router.get('/:id',[
    param('id')
        .isMongoId().withMessage("Id no valido").bail()
        .custom(verifyArchiveId),
    validarCampos
], getArchive);

module.exports = router;