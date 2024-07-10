const List = require("./models/listings.js");
const Review = require("./models/reviews.js");
const ExpressError = require("./utils/ExpressError.js");
const { courseSchema, reviewSchema,userSchema,teacherSchema } = require("./schemaValidation.js");

module.exports.isLoggedin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Have to be login before change listing");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveurl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const list = await List.findById(id);
    if (!list.owner.equals(res.locals.user._id)) {
        req.flash("error", "you are not the owner !!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isAuthor = async (req, res, next) => {
    const { id,reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.user._id)) {
        req.flash("error", "you are not the author !!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

//Listing Schema Validation
module.exports.validateCourse = (req, res, next) => {
    let { error } = courseSchema.validate(req.body);
    if (error) {
        console.log(error);
        let errMsg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

//Review Schema Validation
module.exports.validatereview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        console.log(error);
        let errMsg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};


//User Schema Validation
module.exports.validateuser = (req, res, next) => {
    let { error } = userSchema.validate(req.body);
    if (error) {
        console.log(error);
        let errMsg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

//Teacher Schema Validation
module.exports.validateteacher = (req, res, next) => {
    let { error } = teacherSchema.validate(req.body);
    if (error) {
        console.log(error);
        let errMsg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};