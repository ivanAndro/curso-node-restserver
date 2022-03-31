const  validarCampos = require('../middlewares/validar-campos.middleware');
const auth = require('../middlewares/auth.middleware');
const valueSanitizer = require('../middlewares/sanitizer.middleware');
module.exports = {

    ...validarCampos,
    ...auth,
    ...valueSanitizer
}