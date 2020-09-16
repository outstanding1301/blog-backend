const express = require('express');

const routes = express.Router();
const v1 = require('routes/api/v1');

routes.use('/v1', v1);

module.exports = routes;