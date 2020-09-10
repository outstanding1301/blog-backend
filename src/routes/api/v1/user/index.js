const express = require('express');
const findUser = require('./findUser.js');
const createUser = require('./createUser.js');
const { isLoggedIn } = require('../../../../auth/middlewares.js');

const routes = express.Router();

routes.get('/:username', isLoggedIn, findUser.router);
routes.post('/', createUser.router);

module.exports = routes;