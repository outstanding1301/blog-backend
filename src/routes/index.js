const express = require('express');
const routes = express.Router();

const apiRoute = require('./api');

routes.use('/api', apiRoute);
routes.get('/test', (req, res, next) => {
    console.log('인증 여부 : '+req.isAuthenticated());
    res.json({
        success: req.isAuthenticated()
    });
})

module.exports = routes;