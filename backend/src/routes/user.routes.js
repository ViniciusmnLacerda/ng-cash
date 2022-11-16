const express = require('express');
const { userController } = require('../controllers');
const { validateUser } = require('../middlewares/user.middleware');

const route = express.Router();

route.post('/login', validateUser ,userController.login)

route.post('/signup', validateUser ,userController.signUp)

module.exports = route;