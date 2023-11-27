const jwt = require("jsonwebtoken");
require("dotenv").config();
const {SECRET_KEY, REFRESH_SECRET_KEY, ACCESS_TOKEN_EXPIRES_IN} = process.env;

const generateTokens = (user) => {
    console.log("user._id: ", user._id)
    const accessToken = jwt.sign({userId: user._id}, SECRET_KEY, {expiresIn: ACCESS_TOKEN_EXPIRES_IN});
    const refreshToken = jwt.sign({userId: user._id}, REFRESH_SECRET_KEY);

    return {accessToken, refreshToken};
}
module.exports = generateTokens;
