const bcrypt = require("bcryptjs");
const User = require("../models/user");
const generateTokens = require("../helpers/generateToken");
const { Conflict, Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Conflict(`Email ${email} in use`);
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({ name, email, password: hashPassword });

    res.status(201).json({
      name,
      email,
    });
  } catch (error) {
    next(error);
  }
};

// Login User and get him Token for access to some route action
const login = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    try {
      const hashPassword = bcrypt.compare(password, user.password);
    } catch {
      return res.status(401).json({ message: "Invalid Email or password" });
    }

    const { accessToken, refreshToken } = generateTokens(user);
    await User.findByIdAndUpdate(user._id, { refreshToken });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
};
const refresh = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = generateTokens(req.user);
    await User.findByIdAndUpdate(req.user._id, { refreshToken });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
};
// Logout User
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { refreshToken: "" }, { new: true });
  res.status(200).json({
    message: "User successfully logout",
  });
};

module.exports = { signup, login, refresh, logout };
