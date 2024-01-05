const ctrl = require("../controllers/users");
const {ctrlWrapper} = require("../helpers");
const {validateBody, authenticate,refreshToken} = require("../middlewares");
const express = require("express");
//const {signupSchema, loginSchema} = require('../schemas/users');

const router = express.Router();

//router.post("/register", validateBody(signupSchema), ctrlWrapper(ctrl.signup));

//router.post("/login", validateBody(loginSchema), ctrlWrapper(ctrl.login));
router.post("/register", ctrlWrapper(ctrl.signup));

router.post("/login", ctrlWrapper(ctrl.login));

router.post("/refresh",refreshToken, ctrlWrapper(ctrl.refresh));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/me", authenticate, ctrlWrapper(ctrl.userInfo));

module.exports = router;