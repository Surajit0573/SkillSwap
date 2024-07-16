const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const router = express.Router();
// const { isLoggedin, isOwner, validateListing } = require("../middleware.js");
const {validateCourse,varifyJWT} = require("../middleware.js");
const coursesController = require("../controller/courses.js");

router.route("/")
    .get(asyncWrap(coursesController.index)) //Read Route
    .post(varifyJWT,validateCourse, asyncWrap(coursesController.create)); //Create

// // Render Create Form --> its have to be before show or new will be detected as id
// router.get("/new", isLoggedin, listingController.newForm);

router.route("/:id/addLessons")
.post(varifyJWT,asyncWrap(coursesController.addLessons));

router.route("/:id")
    .get(asyncWrap(coursesController.show)); //Show Route
//     .patch(isLoggedin, isOwner,upload.single('image'), validateListing, asyncWrap(listingController.edit)) //Edit
//     .delete(isLoggedin, isOwner, asyncWrap(listingController.delete)); //Delete 

// // Render Edit Form
// router.get("/:id/edit", isLoggedin, isOwner, asyncWrap(listingController.editForm));



module.exports = router;