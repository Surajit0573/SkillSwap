const Profile = require("../models/profile.js");
const User = require("../models/user.js");
// module.exports.signupForm = async (req, res) => {
//     res.render("./user/signup.ejs");
// };

module.exports.signupForm = async (req, res) => {
    // let { fullname, about, dp,links } = req.body;
    // const newprofile= new Profile({fullname, about, dp,links });
    // const response= await newprofile.save();
   console.log("I am Here : ",res.user);
    res.status(200).json({message:"congratulations, You are Completed Your Profile",data:""});
};

// module.exports.getProfile= async (req, res, next) => {
//     const {id}=req.params;
//     const teacher=await Teacher.findById(id);
//     if(teacher){
//     res.status(200).json({data:teacher});
//     }else{
//         res.status(404).json({message:"teacher not found",data:false});
//     }
// };

// module.exports.loginForm = async (err,req, res) => {
//    res.status(400).json({message:err,data:false});
// };

// module.exports.login = async (req, res) => {

//     res.status(201).json({ status: 200, massege: "Successfully logged in", data: true });

// }

// module.exports.logout = (req, res, next) => {
//     req.logout((err) => {
//         if (err) {
//             return next(err);
//         }

//         req.flash("success", "Successfully Logout");
//         res.redirect("/listings");
//     });

// };