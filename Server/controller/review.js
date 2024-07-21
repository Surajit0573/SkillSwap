const User = require("../models/user.js");
const Review = require("../models/reviews.js");
const Teacher = require("../models/teacher.js");
const Course = require("../models/courses.js");
module.exports.show = async (req, res) => {
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
        let courseLen=0;
        teacher.courses.map((c) => {
            teachTotalRating += c.rating;
            if(c.rating>0){
                courseLen++;
            }
        });
        
        teacher.rating = Number((teachTotalRating / courseLen).toFixed(1));
        await teacher.save();
        console.log("Teacher : ",teacher);
        return res.json({ ok: true, message: "Review submitted successfully",data:course.reviews });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, message: "Server error" });
    }

};

// module.exports.delete = async (req, res) => {
//     let { id, reviewId } = req.params;
//     await List.findByIdAndUpdate(id, { $pull: { review: reviewId } });
//     await Review.findOneAndDelete({ _id: reviewId });
//     res.redirect(`/listings/${id}`);
// };