const express = require("express");

const ctrl = require("../controllers/points");
const {ctrlWrapper} = require("../helpers");
const {validateBody, authenticate} = require("../middlewares");

const router = express.Router();

//const {signupSchema, loginSchema} = require('../schemas/users');
//router.post("/register", validateBody(signupSchema), ctrlWrapper(ctrl.signup));
//router.post("/login", validateBody(loginSchema), ctrlWrapper(ctrl.login));

router.get("/", authenticate, ctrlWrapper(ctrl.getAllPoints));
router.post("/", authenticate, ctrlWrapper(ctrl.addPoint));
router.put("/",authenticate, ctrlWrapper(ctrl.updatePoint));
router.delete("/",authenticate, ctrlWrapper(ctrl.deletePoint));

module.exports = router;