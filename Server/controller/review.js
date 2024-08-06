if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const User = require("../models/user.js");
const Review = require("../models/reviews.js");
const Teacher = require("../models/teacher.js");
const Course = require("../models/courses.js");
module.exports.create = async (req, res) => {
    const { id } = res.payload;
    const { rating, comment } = req.body;
    const courseId = req.params.id;
    try {
        const newReview = await Review.create({ rating, comment, author: id });
        const course = await Course.findByIdAndUpdate(courseId, { $push: { reviews: newReview._id } }, { new: true }).populate('reviews').populate('teacher');
        if (!course) {
            console.error("Course not found");
            return res.status(404).json({ ok: false, message: "Course not found", data: null });
        }
        let totalRating = 0;
        course.reviews.map((r) => {
            totalRating += r.rating;
        });

        course.rating = Number((totalRating / course.reviews.length).toFixed(1));
        await course.save();
        const teacher = await Teacher.findById(course.teacher.teacher).populate('courses');
        if (!teacher) {
            console.error("Teacher not found");
            return res.status(404).json({ ok: false, message: "Teacher not found", data: null });
        }
        let teachTotalRating = 0;
        let courseLen = 0;
        teacher.courses.map((c) => {
            teachTotalRating += c.rating;
            if (c.rating > 0) {
                courseLen++;
            }
        });

        teacher.rating = Number((teachTotalRating / courseLen).toFixed(1));
        await teacher.save();
        console.log("Teacher : ", teacher);
        return res.status(200).json({ ok: true, message: "Review submitted successfully", data: course.reviews });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, message: "Server error" });
    }

};

module.exports.show = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findById(id);
        if (!review) {
            console.error("Review not found");
            return res.status(404).json({ ok: false, message: "Review not found", data: null });
        }
        const author = await User.findById(review.author).populate('profile');
        review.author = author;
        let isOwner = false;
        if (req.cookies.token && req.cookies.token.length > 0) {
            const decoded = jwt.verify(req.cookies.token, jwtSecret);
            const currUser = await User.findById(decoded.id);
            const isVerified = currUser.verify;
            if (isVerified) {
                isOwner = (currUser._id.toString() == author._id.toString());
                console.log('isOwner of Review : ', isOwner);
            }
        }
        return res.status(200).json({ ok: true, message: "Review retrieved successfully", data: review, isOwner });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, message: "Server error" });
    }
}

module.exports.delete = async (req, res) => {
    let { id, reviewId } = req.params;
    try {
        const review = await Review.findById(reviewId);
        const course = await Course.findById(id).populate('reviews');
        let teachTotalRating = 0;
        let courseLen = 0;
        course.reviews.map((c) => {
            teachTotalRating += c.rating;
            if (c.rating > 0) {
                courseLen++;
            }
        });
        const user =await User.findById(course.teacher);
        const teacher= await Teacher.findById(user.teacher).populate('courses');
        let TotalRating = 0;
        let Len = 0;
        teacher.courses.map((c) => {
           TotalRating += c.rating;
            if (c.rating > 0) {
            Len++;
            }
        });
        teacher.rating = Number((TotalRating / Len).toFixed(1));
        await teacher.save();

        await Course.findByIdAndUpdate(id, { $pull: { reviews: reviewId }, rating: ( Number(((teachTotalRating -review.rating)/ courseLen).toFixed(1))) });
        await Review.findOneAndDelete({ _id: reviewId });
        return res.status(200).json({ ok: true, message: "Review deleted successfully" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, message: "Server error" });
    }
};