const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const router = express.Router({ mergeParams: true });

// const List = require("../models/listings.js");

const { validateprofile,varifyJWT } = require("../middleware.js");
const profileContoller = require("../controller/profile.js");
// const { route } = require("./listings.js");

//Signup

router.route("/")
    .get(varifyJWT, asyncWrap(profileContoller.getProfile))
    .post(varifyJWT, asyncWrap(profileContoller.updateProfile));

router.get("/dashboard",varifyJWT, asyncWrap(profileContoller.dashboard));

router.route("/certificate")
    .get(varifyJWT, asyncWrap(profileContoller.getCertificate))
    .post(varifyJWT, asyncWrap(profileContoller.updateCertificate));
module.exports = router;