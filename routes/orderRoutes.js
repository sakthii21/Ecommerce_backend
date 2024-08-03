const express = require('express');
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/auth');

const Router = express.Router();

Router.post('/postorder', auth, orderController.orderproduct);
Router.get('/getorder',auth, orderController.getOrders);


module.exports = Router;

