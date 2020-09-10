const express = require('express');
const userRoute = require('./user');
const userPost = require('./post');

const routes = express.Router();
const login = require('./login');

routes.use('/user', userRoute);
routes.use('/post', userPost);
routes.use('/login', login);

module.exports = routes;