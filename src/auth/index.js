const local = require('auth/localStrategy');
const { User } = require('database/models');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        console.log('serialize User : ');
        console.dir(user.get());
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log('deserialize User : '+id);
        User.findOne({ where: { id }})
        .then(user => done(null, user))
        .catch(err => done(err));
    })

    local(passport);
}