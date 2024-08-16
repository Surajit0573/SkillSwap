
const Teacher = require("../models/teacher.js");
const Review = require("../models/reviews.js");
const User = require("../models/user.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Course = require("../models/courses.js");
const bcryptRound = Number(process.env.BCRYPT_ROUND);
const jwtSecret = process.env.JWT_SECRET;
const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'None',
    secure: true,
}

module.exports.performence = async(req,res)=> {
    const { id, type } = res.payload;
    if (type != "instructor") {
        return res.status(400).json({ ok: false, message: "You are not an instructor" });
    }
    try {
        const user = await User.findById(id).populate('teacher') .populate('performence.course');
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ ok: false, message: "User not found", data: null });
        }
        const performence=user.performence;
        console.log("User performence : ",performence);
        const totalStudent=performence.length;
        let totalIncome=0;
        performence.map((curr)=>{
            totalIncome+=(curr.course.price*80)/100;
        });
        const aggregatedData = performence.reduce((acc, curr) => {
            const { month } = curr;
            const monthData = acc.find(item => item.month === month);
            
            if (monthData) {
              monthData.studentGain++;
            } else {
              acc.push({ id: acc.length + 1, month: month, studentGain: 1 });
            }
            
            return acc;
          }, []);
          
        return res.status(200).json({ok: true, message:"Performence has been updated", data: aggregatedData,totalStudent: totalStudent,totalIncome:totalIncome});

    } catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, message: "Server error" });
    }
}

module.exports.isTeacher = async (req, res) => {
    const { id, type, isComplete } = res.payload;
    if (type == "instructor") {
        return res.status(400).json({ ok: true, message: "Welcome back instructor" });
    }
    return res.status(400).json({ ok: false, message: "You are not an instructor" });
}

module.exports.deleteTeacher = async (req, res) => {
    const { id, type, isComplete } = res.payload;
    if (type != "instructor") {
        return res.status(400).json({ ok: false, message: "You are not an instructor" });
    }
    try {
        const user = await User.findById(id).populate('teacher');
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ ok: false, message: "User not found", data: null });
        }
        let courses = user.teacher.courses;
        //delete reviews 
        await Review.deleteMany({ auther: user._id }).then((r) => {
            console.log(`Deleted ${r.deletedCount} reviews`);
        }).catch((err) => {
            console.error(`Error deleting reviews: ${err}`);
        });
        //delete
        courses.map(async (c) => {
            await Course.findByIdAndDelete(c).then((c) => {
                console.log(`Deleted course: ${c && c.title}`);
            }).catch((err) => {
                console.error(`Error deleting course: ${err}`);
            });
        });
        await Teacher.findByIdAndDelete(user.teacher._id).then((t) => {
            console.log(`Teacher Deleted`);
        }).catch((err) => {
            console.error(`Error deleting Teacher: ${err}`);
        });
        user.teacher = null;
        user.type = 'learner';
        await user.save();
        const payload = {
            id: user._id,
            email: user.email,
            type: user.type,
            isComplete: user.isComplete,
        }
        const token = jwt.sign(payload, jwtSecret, {
            expiresIn: '24h'
        });
        res.clearCookie("token", options);
        res.cookie("token", token, options);
        return res.status(400).json({ ok: true, message: "You have been removed as a Instructor" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, message: "Server error" });
    }
}

module.exports.info = async (req, res) => {
    const { id, type, isComplete } = res.payload;
    if (type == "instructor") {
        console.log("Your are already a instructor")
        return res.status(400).json({ ok: false, message: "You are already a instructor", redirect: '/profile', data: null });
    }
    if (!isComplete) {
        console.log("Please complete your profile first")
        return res.status(400).json({ ok: false, message: "Please complete your profile first", redirect: '/dashboard', data: null });
    }
    try {
        let user = await User.findById(id).populate('profile');
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ ok: false, message: "User not found", data: null });
        }
        if (user.teacher) {
            user.type = 'instructor';
            await user.save();
            const payload = {
                id: user._id,
                email: user.email,
                type: user.type,
                isComplete: user.isComplete,
            }
            const token = jwt.sign(payload, jwtSecret, {
                expiresIn: '24h'
            });
            res.clearCookie("token", options);
            res.cookie("token", token, options);
            return res.status(400).json({ ok: false, message: "You got signed in as a instructor", redirect: '/profile', data: null });
        }
        return res.status(200).json({ ok: true, message: "Fill some Additional Information", data: user.profile });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, message: "Server error", data: null });
    }

}
module.exports.signupForm = async (req, res) => {
    let { id, type, isComplete } = res.payload;
    let { domain, qualifications, yoe } = req.body;
    if (type == "instructor") {
        console.log("Your are already a instructor")
        return res.status(400).json({ ok: false, message: "You are already a instructor", redirect: '/profile', data: null });
    }
    if (!isComplete) {
        console.log("Please complete your profile first")
        return res.status(400).json({ ok: false, message: "Please complete your profile first", redirect: '/dashboard', data: null });
    }
    try {
        let user = await User.findById(id);
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ ok: false, message: "User not found", data: null });
        }

        const newteach = new Teacher({ domain, qualifications, yoe, user });
        const response = await newteach.save();
        user = await User.findByIdAndUpdate(id, { $set: { type: "instructor", teacher: newteach } }, { new: true });

        const payload = {
            id: user._id,
            email: user.email,
            type: user.type,
            isComplete: user.isComplete,
        }
        console.log("Iam here : ", payload);
        const token = jwt.sign(payload, jwtSecret, {
            expiresIn: '24h'
        });
        user.password = undefined;
        res.clearCookie("token", options);
        res.cookie("token", token, options);
        res.status(200).json({ ok: true, message: "congratulations, You are registered as a Teacher", data: user });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, message: "Server error", data: null });
    }

};

module.exports.myCourses = async (req, res) => {
    const { id, type, isComplete } = res.payload;
    if (type != "instructor") {
        return res.status(400).json({ ok: false, message: "You are not an instructor", redirect: '/becomeTeach', data: null });
    }
    try {
        const user = await User.findById(id);
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ ok: false, message: "User not found", redirect: '/login', data: null });
        }
        const teacher = await Teacher.findById(user.teacher).populate('courses');
        if (!teacher) {
            return res.status(400).json({ ok: false, message: "You are not an instructor", redirect: '/becomeTeach', data: null });
        }
        return res.status(200).json({ ok: true, message: "Your Courses fetched successfully", data: teacher.courses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, message: "Server error", data: null });
    }
}

// module.exports.getTeach = async (req, res, next) => {
//     const { id } = req.params;
//     const teacher = await Teacher.findById(id);
//     if (teacher) {
//         res.status(200).json({ data: teacher });
//     } else {
//         res.status(404).json({ message: "teacher not found", data: false });
//     }
// };
