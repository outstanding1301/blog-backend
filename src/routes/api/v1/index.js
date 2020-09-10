const express = require('express');
const userRoute = require('./user');
const userPost = require('./post');

const routes = express.Router();
const login = require('./login');
const register = require('./register');

routes.use('/user', userRoute);
routes.use('/post', userPost);
routes.use('/login', login);
routes.use('/register', register.router);

module.exports = routes;