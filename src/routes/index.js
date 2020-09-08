const express = require('express');
const routes = express.Router();

const apiRoute = require('./api');

routes.use('/api', apiRoute);

module.exports = routes;