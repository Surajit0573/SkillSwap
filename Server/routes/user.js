const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const router = express.Router({ mergeParams: true });

const {validateuser,varifyJWT}=require("../middleware.js");
const userContoller=require("../controller/user.js");

router.get('/',varifyJWT,asyncWrap(userContoller.isLoggedin));
router.delete('/',varifyJWT,asyncWrap(userContoller.deleteAccount));
router.post("/signup",validateuser, asyncWrap(userContoller.signup));
router.post("/login",asyncWrap(userContoller.login));
router.get("/logout", varifyJWT,userContoller.logout);
router.route("/changePass")
.get(varifyJWT,asyncWrap(userContoller.changePass))
.post(varifyJWT,asyncWrap(userContoller.updatePass));

router.route("/cart")
.post(varifyJWT,asyncWrap(userContoller.addToCart))
.get(varifyJWT,asyncWrap(userContoller.getFromCart))
.delete(varifyJWT,asyncWrap(userContoller.deleteFromCart));

router.route("/payment")
.post(varifyJWT,asyncWrap(userContoller.payment));
module.exports = router;