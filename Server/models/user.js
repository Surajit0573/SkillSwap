const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Profile = require('./profile');
const Teacher = require('./teacher');

const User = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    type:{
        type:String,
        default:"learner"
    },
    isComplete:{
        type:Boolean,
        default:false
    },
    profile:{
        type:Schema.Types.ObjectId,
        ref:'Profile'
    },
    teacher:{
        type:Schema.Types.ObjectId,
        ref:'Teacher'
    },
    cart:[{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    wishlist:[{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    buyCourses:[{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    billingDetails:[{}]

    
});

module.exports = mongoose.model('User', User);