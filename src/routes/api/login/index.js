const express = require('express');
const {User} = require('../../../database/models/index.js');
const crypto = require('../../../../.crypto.js');

const routes = express.Router();

const tryLogin = async (id, password) => {
    const user = await User.findOne({
        attributes: ['id', 'nickname', 'registerDate'],
        where: {
            id: id,
            password: crypto(password)
        },
        raw: true
    });

    if(!user) {
        return undefined;
    }
    return user;
}

const login = async (req, res) => {
    const {id, password} = req.body;
    console.log(req.body);
    try {
        const user = await tryLogin(id, password);
        if(user) {
            res.send('로그인 성공! '+user.nickname);
        }
        else {
            res.status(404).send('로그인 실패! 아이디가 없거나 비밀번호가 틀렸습니다.');
        }
    }
    catch(err) {
        res.status(500).send('잘못된 입력.');
        return;
    }
}

routes.post('/', login);

module.exports = routes;