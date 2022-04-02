const authController  = require('../controllers/auth.controller');
const userController  = require('../controllers/user.controller');
const categoryController  = require('../controllers/category.controller');
const productController = require('../controllers/product.controller');
const searchController = require('../controllers/product.controller');
const uploadConstroller = require('../controllers/uploads.controller');

module.exports = {
    ...authController,
    ...userController,
    ...categoryController,
    ...productController,
    ...searchController,
    ...uploadConstroller
}