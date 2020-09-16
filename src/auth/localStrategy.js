const LocalStrategy = require('passport-local').Strategy;

const { User } = require('database/models');
const { Op } = require('sequelize');
const crypto = require('.crypto.js');

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password'
    }, async (username, password, done) => {
        try {
            const user = await User.findOne({
                where: {
                    [Op.or] : [
                        {
                            username: username,
                            password: crypto(password)
                        },
                        {
                            email: username,
                            password: crypto(password)
                        }
                    ]
                }
            });

            if(user) {
                done(null, user);
            }
            else {
                done(null, false, {message: '아이디가 없거나 비밀번호가 틀렸습니다.'})
            }
        }
        catch (err) {
            console.error(err);
            done(err);
        }
    }))
}