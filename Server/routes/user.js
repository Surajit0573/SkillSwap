const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const router = express.Router({ mergeParams: true });

const {validateuser,varifyJWT}=require("../middleware.js");
const userContoller=require("../controller/user.js");

router.post("/signup",validateuser, asyncWrap(userContoller.signup));
router.post("/login",asyncWrap(userContoller.login));
router.get("/logout", varifyJWT,userContoller.logout);

module.exports = router;