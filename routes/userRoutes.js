const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');

Router.post('/adduser',userController.register);
Router.post('/login',userController.login);


module.exports = Router;