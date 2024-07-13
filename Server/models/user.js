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
    }
    
});

module.exports = mongoose.model('User', User);