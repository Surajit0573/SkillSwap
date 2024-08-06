const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const router = express.Router({ mergeParams: true });
const {varifyJWT,validatereview}=require("../middleware.js");
const reviewController=require("../controller/review.js")


// create Review 
router.route('/:id')
.get(asyncWrap(reviewController.show))
.post(varifyJWT,validatereview, asyncWrap(reviewController.create));

//Delete Review
router.delete("/:id/:reviewId",varifyJWT,asyncWrap(reviewController.delete));

module.exports = router;