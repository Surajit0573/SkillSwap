const Teacher = require("../models/teacher.js");
const User = require("../models/user.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bcryptRound = Number(process.env.BCRYPT_ROUND);
const jwtSecret = process.env.JWT_SECRET;
const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'None',
    secure: true,
}

module.exports.info = async (req, res) => {
    const { id, type, isComplete } = res.payload;
    console.log(res.payload);
    console.log("test path : ", req.originalUrl);
    if (type == "instructor") {
        console.log("Yur are already a instructor")
        return res.status(400).json({ ok: false, message: "You are already a instructor", redirect: '/profile', data: null });
    }
    if (!isComplete) {
        console.log("Please complete your profile first")
        return res.status(400).json({ ok: false, message: "Please complete your profile first", redirect: '/completeProfile', data: null });
    }
    try {
        const user = await User.findById(id).populate('profile');
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ ok: false, message: "User not found", data: null });
        }
        return res.status(200).json({ ok: true, message: "Fill some Additional Information", data: user.profile });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, message: "Server error", data: null });
    }

}
module.exports.signupForm = async (req, res) => {
    let {id,type,isComplete}=res.payload;
    let {domain,qualifications,yoe} = req.body;
    if (type == "instructor") {
        console.log("Yur are already a instructor")
        return res.status(400).json({ ok: false, message: "You are already a instructor", redirect: '/profile', data: null });
    }
    if (!isComplete) {
        console.log("Please complete your profile first")
        return res.status(400).json({ ok: false, message: "Please complete your profile first", redirect: '/completeProfile', data: null });
    }
    try {
        let user = await User.findById(id);
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ ok: false, message: "User not found", data: null });
        }

        const newteach = new Teacher({domain,qualifications,yoe,user});
        const response = await newteach.save();
        user=await User.findByIdAndUpdate(id,{$set:{type:"instructor",teacher:newteach}});

        const payload = {
            id: user._id,
            email: user.email,
            type: user.type,
            isComplete: user.isComplete,
        }
        const token = jwt.sign(payload, jwtSecret, {
            expiresIn: '24h'
        });
        user.password = undefined;
        res.clearCookie("token", options);
        res.cookie("token", token, options);
        res.status(200).json({ ok:true,message: "congratulations, You are registered as a Teacher", data:user});
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, message: "Server error", data: null });
    }
   
};

// module.exports.getTeach = async (req, res, next) => {
//     const { id } = req.params;
//     const teacher = await Teacher.findById(id);
//     if (teacher) {
//         res.status(200).json({ data: teacher });
//     } else {
//         res.status(404).json({ message: "teacher not found", data: false });
//     }
// };
