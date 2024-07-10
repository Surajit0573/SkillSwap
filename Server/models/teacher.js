const mongoose = require('mongoose');
const { Schema } = mongoose;
const User=require("./user.js");

// const Review = require("./reviews.js");


const teacherSchema = new mongoose.Schema({
    // user:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    // },
    name: { type: String, required: true },
    designation: { type: String, required: true },
    follower: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true,default: 0  },
    about: { type: String, required: true },
    // dp: { type: String,default:'' },
    links: {
        website: {type: String, required: true},
        twitter: {type: String, required: true},
        linkedin: {type: String, required: true},

    }
    //   review: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Review',
    //   }],
    //   owner:{
    //     type:Schema.Types.ObjectId,
    //     ref:'User'
    //   }
});

// userSchema.post("findOneAndDelete", async (listing) => {
//   console.log("MiddleWare is Called");
//   if (listing) {
//     console.log(listing);
//     await Review.deleteMany({ _id: { $in: listing.review } });
//   }
// });
const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;