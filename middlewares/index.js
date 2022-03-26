const  validarCampos = require('../middlewares/validar-campos.middleware');
const auth = require('../middlewares/auth.middleware');

module.exports = {

    ...validarCampos,
    ...auth
}