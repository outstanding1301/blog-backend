const express = require('express');
const {User} = require('../../../../database/models/index.js');
const crypto = require('../../../../.crypto.js');
const { Op } = require('sequelize');
const passport = require('passport');
const { isNotLoggedIn } = require('../../../../auth/middlewares.js');

const routes = express.Router();

const tryLogin = async (id, password) => {
    const user = await User.findOne({
        attributes: ['id', 'nickname', 'registerDate'],
        where: {
            [Op.or] : [
                {
                    username: id,
                    password: crypto(password)
                },
                {
                    email: id,
                    password: crypto(password)
                }
            ]
        },
        raw: true
    });

    if(!user) {
        return undefined;
    }
    return user;
}

const login = async (req, res, next) => {
    const {id, password} = req.body;
    // console.log(req.body);
    passport.authenticate('local', (authError, user, info) => {
        if(authError) {
            return next(authError);
        }
        if(!user) {
            return res.status(401).json({
                success: false,
                data: '아이디가 없거나 비밀번호가 틀렸습니다.'
            })
        }
        return req.login(user, (loginError) => {
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.status(200).json({
                success: true,
                data: user.nickname
            })
        });
    })(req, res, next);
    // console.log(req.body);
    // try {
    //     const user = await tryLogin(id, password);
    //     if(user) {
    //         res.status(200).json({
    //             success: true,
    //             data: user.nickname
    //         })
    //     }
    //     else {
    //         res.status(401).json({
    //             success: false,
    //             data: '아이디가 없거나 비밀번호가 틀렸습니다.'
    //         })
    //     }
    // }
    // catch(err) {
    //     next(new Error('잘못된 데이터 전달됨'));
    //     return;
    // }
}

routes.post('/', isNotLoggedIn, login);

module.exports = routes;