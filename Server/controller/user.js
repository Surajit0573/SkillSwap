if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
  }
const User = require("../models/user.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bcryptRound=Number(process.env.BCRYPT_ROUND);
const jwtSecret=process.env.BCRYPT_SECRET
module.exports.signup = async (req, res) => {
   
    let { username, password, email } = req.body;

    //Varifications
    if(!email||!username||!password){
        console.error("Please enter all required information");
        res.status(400).json({ok: false, message:"Pleaase Provide all the required information"});
    }
    if(password.length<8){
        console.error("Password should be at least 8 characters long");
        res.status(400).json({ok: false, message:"Password should be at least 8 characters long"});
    }
    if(username.length<3){
        console.error("Username should be at least 3 characters long");
        res.status(400).json({ok: false, message:"Username should be at least 3 characters long"});
    }
    if(email.indexOf("@")===-1){
        console.error("Please enter a valid email address");
        res.status(400).json({ok: false, message:"Please enter a valid email address"});
    }

    //Email already registered
    const existingUser= await User.findOne({email});
    if(existingUser){
        console.error("Email is already registered");
        res.status(400).json({ok: false, message:"Email is already registered"});
    }
    //unique username
    const existingUsername= await User.findOne({username});
    if(existingUsername){
        console.error("Username is already registered");
        res.status(400).json({ok: false, message:"Username is already registered"});
    }


    try{
    //Hash PassWord
    const hashPassword= await bcrypt.hash(password,bcryptRound);
    //Create a new user
    const user = await User.create({
        username,
        password:hashPassword,
        email
    });

    const token = jwt.sign(payload,);

   }catch(err){
    console.error(err);
    res.status(500).json({ok: false, message:"Something went wrong while signuping"});
   }


};


module.exports.loginForm = async (req, res) => {
    res.status(400).json({message:"Invalid credentials",ok:false});
 };
 

module.exports.login = async (req, res) => {
    res.status(200).json({massege: "Successfully logged in", ok: true, });

}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.status(201).json({ status: 200, massege: "Successfully logged out", ok: true,  });
    });

};