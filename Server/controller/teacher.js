const Teacher = require("../models/teacher.js");

// module.exports.signupForm = async (req, res) => {
//     res.render("./user/signup.ejs");
// };

module.exports.signupForm = async (req, res) => {
    let { name, designation, about, website, twitter, linkedin } = req.body;
    const newteach= new Teacher({name, designation, about, links:{website, twitter, linkedin} });
    const response= await newteach.save();
    res.status(200).json({message:"congratulations, You are registered as a Teacher",data:response});
};

module.exports.getTeach= async (req, res, next) => {
    const {id}=req.params;
    const teacher=await Teacher.findById(id);
    if(teacher){
    res.status(200).json({data:teacher});
    }else{
        res.status(404).json({message:"teacher not found",data:false});
    }
};

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