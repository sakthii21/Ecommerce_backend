const express = require('express');
const cartController = require('../controllers/cartController');
const auth = require('../middlewares/auth');
const Router = express.Router();

Router.post('/cart', auth, cartController.createCart);
Router.get('/getcart',auth,cartController. getCartProducts);
Router.delete('/delete',auth,cartController.deleteProduct);
module.exports = Router;

