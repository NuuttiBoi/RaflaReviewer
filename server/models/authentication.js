const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, "avain");
        const user = await User.findOne({ _id: decodedToken.userId });

        if (user) {
            req.user = user;
            next();
        } else {
            res.status(401).json({ message: 'Not authorized' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Not authorized' });
    }
}

module.exports = { requireAuth }