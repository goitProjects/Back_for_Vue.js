const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { Unauthorized } = require("http-errors");

const authenticate = async (req, _, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

    if (!token) {
      throw new Unauthorized();
    }

    const { userId } = await jwt.verify(token, SECRET_KEY);

    const user = await User.findById(userId);
    if (!user || !user.refreshToken) {
      throw new Unauthorized();
    }

    req.user = user;
    next();
  } catch (error) {
    next(new Unauthorized());
  }
};

module.exports = authenticate;
