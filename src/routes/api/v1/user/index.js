const express = require('express');
const findUser = require('routes/api/v1/user/findUser.js');
const createUser = require('routes/api/v1/user/createUser.js');
const { isLoggedIn } = require('auth/middlewares.js');

const routes = express.Router();

routes.get('/:username', isLoggedIn, findUser.router);
routes.post('/', createUser.router);

module.exports = routes;

// alias <<