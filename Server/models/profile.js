const mongoose = require('mongoose');
const { Schema } = mongoose;
const User=require("./user.js");
const Course = require("./courses.js");


const profileSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    dp: { type: String,default:'' },
    skills: [{ type: String }],
    myCourses: [{ course:{type: Schema.Types.ObjectId, ref: 'Course'},completion:[{type:String}] }],
    certifications: [String],
    about: { type: String, required: true },
    links: {
        website: {type: String, required: true},
        twitter: {type: String, required: true},
        linkedin: {type: String, required: true},

    }
});
const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;