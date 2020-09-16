const express = require('express');
const findUser = require('@api/v1/user/findUser.js');
const createUser = require('@api/v1/user/createUser.js');
const { isLoggedIn } = require('@src/auth/middlewares.js');

const routes = express.Router();

routes.get('/:username', isLoggedIn, findUser.router);
routes.post('/', createUser.router);

module.exports = routes;

// alias <<