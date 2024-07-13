const User = require("../models/user.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bcryptRound=Number(process.env.BCRYPT_ROUND);
const jwtSecret=process.env.JWT_SECRET;
const options={
    expires:new Date(Date.now()+24*60*60*1000),
    httpOnly: true,
    sameSite: 'None',
    secure: true,
}
module.exports.signup = async (req, res) => {
   
    let { username, password, email } = req.body;

    //Varifications
    if(!email||!username||!password){
        console.error("Please enter all required information");
        return res.status(400).json({ok: false, message:"Pleaase Provide all the required information"});
        
    }
    if(password.length<8){
        console.error("Password should be at least 8 characters long");
        return res.status(400).json({ok: false, message:"Password should be at least 8 characters long"});
        
    }
    if(username.length<3){
        console.error("Username should be at least 3 characters long");
        return res.status(400).json({ok: false, message:"Username should be at least 3 characters long"});
        
    }
    if(email.indexOf("@")===-1){
        console.error("Please enter a valid email address");
        return res.status(400).json({ok: false, message:"Please enter a valid email address"});
        
    }

    //Email already registered
    const existingUser= await User.findOne({email});
    if(existingUser){
        console.error("Email is already registered");
        return res.status(400).json({ok: false, message:"Email is already registered"});
        
    }
    //unique username
    const existingUsername= await User.findOne({username});
    if(existingUsername){
        console.error("Username is already registered");
        return res.status(400).json({ok: false, message:"Username is already registered"});
        
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
    const payload={
        id:user._id,
        email:user.email,
        type:user.type,
        isComplete:user.isComplete,
    }
    const token = jwt.sign(payload,jwtSecret,{
        expiresIn:'24h'
    });
    user.password=undefined;
     res.cookie("token",token,options);
     return res.status(201).json({ok: true, message:"Signup successful", response:user});
    
   }catch(err){
    console.error(err);
    return res.status(500).json({ok: false, message:"Something went wrong while signuping"});
    
   }


};
 

module.exports.login = async (req, res) => {
   const {username, password} = req.body;
   
   //Varifications
   if(!username||!password){
       console.error("Please enter all required information");
       return res.status(400).json({ok: false, message:"Pleaase Provide all the required information"});
       
   }
   //Check if user exists
   const user = await User.findOne({ username });
   if (!user) {
       console.error("User not found");
       return res.status(404).json({ok: false, message:"User not found"});
       
   }
   //Check if password is correct
   const isMatch = await bcrypt.compare(password, user.password);
   if (!isMatch) {
       console.error("Incorrect password");
       return res.status(401).json({ok: false, message:"Incorrect password"});
       
   }
   try{
    const user = await User.findOne({ username });
    const payload={
        id:user._id,
        email:user.email,
        type:user.type,
        isComplete:user.isComplete}
        const token = jwt.sign(payload,jwtSecret,{
            expiresIn:'24h'
        });
        res.cookie("token",token,options);
        return res.status(200).json({ok:true,message:"Successfully Logged in!"});
    
   }catch(err){
    console.error(err.message);
    return res.status(500).json({ok: false, message:"Something went wrong while login"});
   }
    

    // return res.status(200).json({massege: "Successfully logged in", ok: true, });
    

}

module.exports.logout = (req, res, next) => {
    res.clearCookie("token",options);
    res.status(201).json({ status: 200, massege: "Successfully logged out", ok: true,  });

};