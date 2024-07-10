const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    date: {
        type: Date,
        default: new Date(),
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

const Review = mongoose.model("Review", userSchema);

module.exports = Review;