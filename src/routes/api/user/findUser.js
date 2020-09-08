const {User} = require('../../../database/models/index.js');

const findUser = async (id) => {
    const user = await User.findOne({
        attributes: ['id', 'nickname', 'registerDate'],
        where: {
            id: id
        },
        raw: true
    });
    return user;
};

const router = async (req, res) => {
    const {id} = req.params;
    const user = await findUser(id);
    res.send(user);
}

module.exports = {
    findUser, router
}