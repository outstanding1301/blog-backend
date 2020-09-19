const {User} = require('@models');
const crypto = require('@src/.crypto');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

const createUser = async (username, password, email, nickname) => {
    const count = await User.count({
        where: {
            [Op.or]: [
                {
                    username
                },
                {
                    email
                }
            ]
        }
    });

    if(count != 0)
        return false;
        

    const user = (await User.create({
        username, password, email, nickname
    })).get();
    delete user.password;

    return user;
};

const tryLogin = async (id, password) => {
    const user = await User.findOne({
        attributes: ['id', 'username', 'email', 'nickname', 'registerDate'],
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

module.exports.register = async (req, res, next) => {
    const {username, password, email} = req.body;
    let {nickname} = req.body;
    if(!nickname) {
        nickname = username;
    }
    const user = await createUser(username, crypto(password), email, nickname);
    if(user) {
        const token = User.generateToken(user);
        res.cookie('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true
        });
        res.status(200).json(user)
    }
    else {
        res.status(409).json({
            success: false,
            data: '중복된 아이디입니다.'
        })
    }
}

module.exports.login = async (req, res, next) => {
    const {id, password} = req.body;
    try {
        const user = await tryLogin(id, password);
        if(user) {
            const token = User.generateToken(user);
            res.cookie('access_token', token, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true
            });
            res.status(200).json(user)
        }
        else {
            res.status(401).json({
                success: false,
                data: '아이디가 없거나 비밀번호가 틀렸습니다.'
            })
        }
    }
    catch(err) {
        next(new Error('잘못된 데이터 전달됨'));
        return;
    }
}

module.exports.check = async (req, res) => {
    const { user } = req;
    if(!user) {
        return res.status(401).json({
            success: false,
            data: '로그인 중이 아닙니다.'
        });
    }

    const userInDB = await User.findUserById(user._id);
    if(userInDB.nickname !== user.nickname) {
        const tokenNew = User.generateToken(userInDB);
        res.cookie('access_token', tokenNew, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true
        });
        user.nickname = userInDB.nickname;
    }
    res.status(200).json(user)
}

module.exports.logout = async (req, res) => {
    if(req.user) {
        res.clearCookie('access_token');
        return res.status(200).json({
            success: true,
            data: '로그아웃 되었습니다.'
        })
    }
    return res.status(401).json({
        success: false,
        data: '로그인 중이 아닙니다.'
    });
}