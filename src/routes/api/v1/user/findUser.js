const {User} = require('@models/index.js');

const findUser = async (username) => {
    const user = await User.findOne({
        attributes: ['username', 'nickname', 'email', 'registerDate'],
        where: {
            username
        },
        raw: true
    });
    return user;
};

const router = async (req, res, next) => {
    const {username} = req.params;
    const user = await findUser(username);
    if(user){
        res.status(200).json({
            success: true,
            data: user
        })
    }
    else {
        res.status(404).json({
            success: false,
            data: '유저 찾을 수 없음'
        })
    }
}

module.exports = {
    findUser, router
}