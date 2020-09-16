const express = require('express');
const userRoute = require('routes/api/v1/user');
const userPost = require('routes/api/v1/post');

const routes = express.Router();
const login = require('routes/api/v1/login');
const register = require('routes/api/v1/register');

routes.use('/user', userRoute);
routes.use('/post', userPost);
routes.use('/login', login);
routes.use('/register', register.router);

module.exports = routes;