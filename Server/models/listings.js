const mongoose = require('mongoose');
const { Schema } = mongoose;

const Review = require("./reviews.js");
const User=require("./user.js");

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url:String,
    filename:String,
  },
  price: {
    type: Number,
    min: 1,
  },
  location: String,
  country: String,
  review: [{
    type: Schema.Types.ObjectId,
    ref: 'Review',
  }],
  owner:{
    type:Schema.Types.ObjectId,
    ref:'User'
  }
});

userSchema.post("findOneAndDelete", async (listing) => {
  console.log("MiddleWare is Called");
  if (listing) {
    console.log(listing);
    await Review.deleteMany({ _id: { $in: listing.review } });
  }
});
const List = mongoose.model("List", userSchema);

module.exports = List;