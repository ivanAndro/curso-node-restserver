const validarCampos = require('../middlewares/validar-campos.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const sanitizerMiddleware = require('../middlewares/sanitizer.middleware');
const filesMiddleware = require('../middlewares/files.middleware');
module.exports = {
    ...validarCampos,
    ...authMiddleware,
    ...sanitizerMiddleware,
    ...filesMiddleware
}