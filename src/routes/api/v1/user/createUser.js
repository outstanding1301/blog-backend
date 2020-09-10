const {User} = require('../../../../database/models/index.js');
const crypto = require('../../../../../.crypto.js');
const { Op } = require('sequelize');

const createUser = async (username, password, email, nickname) => {
    const count = await User.count({
        where: {
            [Op.or]: [
                {
                    username, email
                }
            ]
        }
    });

    if(count != 0)
        return false;
        

    await User.create({
        username, password, email, nickname
    });
    
    return true;
};

const router = async (req, res) => {
    const {username, password, email} = req.body;
    let {nickname} = req.body;
    if(!nickname) {
        nickname = username;
    }
    const success = await createUser(username, crypto(password), email, nickname);
    if(success) {
        res.status(200).json({
            success: true,
            data: '유저 등록 성공: '+username
        })
    }
    else {
        res.status(409).json({
            success: false,
            data: '중복된 아이디'
        })
    }
}

module.exports = {
    createUser, router
}