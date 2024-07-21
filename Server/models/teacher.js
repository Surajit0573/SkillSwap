const mongoose = require('mongoose');
const { Schema } = mongoose;
const User=require("./user.js");

// const Review = require("./reviews.js");


const teacherSchema = new mongoose.Schema({
    domain:{type:String, required:true},
    qualifications:{type:String, required:true},
    yoe:{type:Number, required:true},
    follower: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true,default: 0  },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    // reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    date: { type: Date, default: new Date() },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;