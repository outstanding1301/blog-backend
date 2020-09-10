const express = require('express');
const findUser = require('./findUser.js');
const createUser = require('./createUser.js');

const routes = express.Router();

routes.get('/:username', findUser.router);
routes.post('/', createUser.router);

module.exports = routes;