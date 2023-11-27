const User = require("../models/user")
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { Unauthorized } = require('http-errors');

const authenticate = async (req, _, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
        console.log("token: ", token);
        const { userId } = await jwt.verify(token, SECRET_KEY);
        console.log("jwt.verify(token, SECRET_KEY): ",await jwt.verify(token, SECRET_KEY))
        console.log("userId: ", userId);
        try {

            const user = await User.findById(userId);
            if (!user || !user.refreshToken) {
                throw Unauthorized("Not authorized");
            }
            req.user = user;
            next();
        } catch (error) {
            throw Unauthorized("Not authorized");
        }
    } catch (error) {
        next(error);
    }
}

module.exports = authenticate; 