const express = require('express');
const userRoute = require('./user');

const routes = express.Router();
const login = require('./login');

routes.use('/user', userRoute);
routes.use('/login', login);

module.exports = routes;