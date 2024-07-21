const { Description, Language, EngineeringOutlined } = require('@mui/icons-material');
const mongoose = require('mongoose');
const { Schema } = mongoose;

// const Review = require("./reviews.js");
// const User=require("./user.js");

const coursesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
  }],
  thumbnail: {
    type: String,
  },
  benefits: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  sections: [
    {
      title: { type: String, required: true },
      lessons: [
        {
          name: { type: String, required: true },
          url: { type: String },
        }
      ]
    }
  ],
  teacher: { type: Schema.Types.ObjectId, ref: "User" },
  teacherName: { type: String, required: true },
  enrolledUsers: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  language: { type: String, default: "English" },

  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review',
  }],
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
const Course = mongoose.model("Course", coursesSchema);

module.exports = Course;