const express = require('express');
const userRoute = require('@api/v1/user');
const userPost = require('@api/v1/post');

const routes = express.Router();
// const login = require('routes/api/v1/login');
// const register = require('routes/api/v1/register');
const auth = require('@api/v1/auth');

routes.use('/user', userRoute);
routes.use('/post', userPost);
routes.use('/auth', auth);

// routes.use('/login', login);
// routes.use('/register', register.router);

module.exports = routes;