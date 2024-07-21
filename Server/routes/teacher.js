const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const router = express.Router({ mergeParams: true });
// const passport = require('passport');

// const List = require("../models/listings.js");

const {validateteacher, varifyJWT}=require("../middleware.js");
const teacherContoller=require("../controller/teacher.js");
// const { route } = require("./listings.js");

router.get('/',varifyJWT,teacherContoller.isTeacher);
router.delete('/',varifyJWT,teacherContoller.deleteTeacher);
//Signup
router.get("/info",varifyJWT,asyncWrap(teacherContoller.info));
router.post("/signup",varifyJWT,validateteacher, asyncWrap(teacherContoller.signupForm));

router.get("/myCourses",varifyJWT, asyncWrap(teacherContoller.myCourses));
// router.route('/:id')
// .get(asyncWrap(teacherContoller.getTeach));


module.exports = router;