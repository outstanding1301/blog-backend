const express = require('express');

const routes = express.Router();

const authCtrl = require('@api/v1/auth/auth.ctrl');


routes.post('/register', authCtrl.register);
routes.post('/login', authCtrl.login);
routes.get('/check', authCtrl.check);
routes.post('/logout', authCtrl.logout);

module.exports = routes;