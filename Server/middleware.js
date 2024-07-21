if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
  }
const jwt = require('jsonwebtoken');
const ExpressError = require("./utils/ExpressError.js");
const { courseSchema, reviewSchema,userSchema,teacherSchema,profileSchema } = require("./schemaValidation.js");
const jwtSecret=process.env.JWT_SECRET;


module.exports.varifyJWT= async(req,res,next)=>{
    if (!req.cookies.token) {
        return res.status(401).json({ message: "You are not logged in", ok: false, redirect:'/login' });
    }
    const token = req.cookies.token;
    if (!token||token.length==0) {
        return res.status(401).json({ message: "You are not logged in", ok: false,redirect:'/login' });
    }
    try {
        const decoded = await jwt.verify(token,jwtSecret);
        res.payload = decoded;
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(401).json({ message:"Something went Wrong in varification", ok: false,redirect:null});
    }
}


// module.exports.isOwner = async (req, res, next) => {
//     const { id } = req.params;
//     const list = await List.findById(id);
//     if (!list.owner.equals(res.locals.user._id)) {
//         req.flash("error", "you are not the owner !!");
//         return res.redirect(`/listings/${id}`);
//     }
//     next();
// }

// module.exports.isAuthor = async (req, res, next) => {
//     const { id,reviewId } = req.params;
//     const review = await Review.findById(reviewId);
//     if (!review.author.equals(res.locals.user._id)) {
//         req.flash("error", "you are not the author !!");
//         return res.redirect(`/listings/${id}`);
//     }
//     next();
// }

//Listing Schema Validation
module.exports.validateCourse = (req, res, next) => {
    let { error } = courseSchema.validate(req.body);
    if (error) {
        console.error(error);
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
        console.error(error);
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
        console.error(error);
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
        console.error(error);
        let errMsg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

//Profile Schema Validation
module.exports.validateprofile = (req, res, next) => {
    let { error } = profileSchema.validate(req.body);
    if (error) {
        console.error(error);
        let errMsg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};