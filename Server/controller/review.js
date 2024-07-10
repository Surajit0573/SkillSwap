const List = require("../models/listings.js");
const Review = require("../models/reviews.js");

module.exports.show = async (req, res) => {
    let listing = await List.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.review.push(newReview);
    await newReview.save();
    let list = await listing.save();
    res.redirect(`/listings/${req.params.id}`);
};

module.exports.delete = async (req, res) => {
    let { id, reviewId } = req.params;
    await List.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await Review.findOneAndDelete({ _id: reviewId });
    res.redirect(`/listings/${id}`);
};