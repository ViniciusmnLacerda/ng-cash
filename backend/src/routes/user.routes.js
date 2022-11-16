const express = require('express');
const { userController } = require('../controllers');
const { validateUser } = require('../middlewares/user.middleware');

const route = express.Router();

route.get('/login', validateUser ,userController.getUsers)

route.post('/signup', validateUser ,userController.signUp)

module.exports = route;