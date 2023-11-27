const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { REFRESH_SECRET_KEY } = process.env;
const { Unauthorized } = require("http-errors");

const refreshToken = async (req, _, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
    const { userId } = await jwt.verify(token, REFRESH_SECRET_KEY);
    try {
      const user = await User.findById(userId);

      if (!user || !user.refreshToken) {
        throw Unauthorized("Not authorizeds");
      }
      req.user = user;
      next();
    } catch (error) {
      throw Unauthorized("Not authorized");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = refreshToken;
