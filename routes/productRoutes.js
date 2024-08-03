const express = require('express');
const Router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/auth');

Router.get('/products' , auth,productController.getallproducts);
Router.post('/savedproduct', productController.createproducts);
Router.put('/product/:id',  productController.updateProduct);
Router.delete('/del/:id' , productController.deleteproduct);

module.exports = Router;

