const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const router = express.Router({ mergeParams: true });
const {isLoggedin,isAuthor,validatereview}=require("../middleware.js");
const reviewController=require("../controller/review.js")

// show Review 
router.post("/", isLoggedin,validatereview, asyncWrap(reviewController.show));

//Delete Review
router.delete("/:reviewId", isLoggedin,isAuthor,asyncWrap(reviewController.delete));

module.exports = router;