const { User } = require('@models');
const jwt = require('jsonwebtoken');

const jwtMiddleware = async (req, res, next) => {
    const token = req.cookies['access_token'];
    // console.log(token);
    if(!token) return next();
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);

        req.user = decoded;

        const now = Math.floor(Date.now() / 1000);
        if(decoded.exp - now < 60 * 60 * 24 * 3.5) {
            const user = await User.findUserById(decoded._id);
            const tokenNew = User.generateToken(user);
            res.cookie('access_token', tokenNew, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true
            });
        }

        return next();
    }
    catch (e) {
        console.error(e);
        return next();
    }
}

module.exports = jwtMiddleware;