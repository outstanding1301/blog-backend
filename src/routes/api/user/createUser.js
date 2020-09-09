const {User} = require('../../../database/models/index.js');
const crypto = require('../../../../.crypto.js');

const createUser = async (id, password, nickname) => {
    const count = await User.count({
        where: {id: id}
    });

    if(count != 0)
        return false;
        

    await User.create({
        id, nickname, password
    });
    
    return true;
};

const router = async (req, res) => {
    const {id, password} = req.body;
    let {nickname} = req.body;
    if(!nickname) {
        nickname = id;
    }
    const success = await createUser(id, crypto(password), nickname);
    if(success) {
        res.send(`유저 등록 성공 : ${id}(${nickname})`);
    }
    else {
        res.send('유저 등록 실패 : 중복된 ID');
    }
}

module.exports = {
    createUser, router
}