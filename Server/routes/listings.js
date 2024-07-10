const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const router = express.Router();
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
    .get(asyncWrap(listingController.index)) //Read Route
    .post(upload.single('image'),validateListing, asyncWrap(listingController.create)); //Create

// Render Create Form --> its have to be before show or new will be detected as id
router.get("/new", isLoggedin, listingController.newForm);


router.route("/:id")
    .get(asyncWrap(listingController.show)) //Show Route
    .patch(isLoggedin, isOwner,upload.single('image'), validateListing, asyncWrap(listingController.edit)) //Edit
    .delete(isLoggedin, isOwner, asyncWrap(listingController.delete)); //Delete 

// Render Edit Form
router.get("/:id/edit", isLoggedin, isOwner, asyncWrap(listingController.editForm));



module.exports = router;