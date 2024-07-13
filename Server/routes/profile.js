const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const router = express.Router({ mergeParams: true });

// const List = require("../models/listings.js");

const { validateprofile } = require("../middleware.js");
const profileContoller = require("../controller/profile.js");
// const { route } = require("./listings.js");

//Signup

router.route("/signup")
    .post(validateprofile, asyncWrap(profileContoller.signupForm));

// router.route('/:id')
// .get(asyncWrap(teacherContoller.getTeach));
//Login
// router.route("/login")
// .get(asyncWrap(userContoller.loginForm))
// .post( saveurl,passport.authenticate('local', { failureRedirect: '/api/user/login' }), asyncWrap(userContoller.login));

// //logout
// router.get("/logout", userContoller.logout);


// //Error Handle
// router.use((err, req, res, next) => {
//     let { status = 500, message = "Something Went Wrong" } = err;
//     if (message == "A user with the given username is already registered") {
//         req.flash("error", message);
//         res.redirect("/signup");
//     }
//     next();
// });

module.exports = router;