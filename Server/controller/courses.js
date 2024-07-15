const { redirect } = require("react-router-dom");
const Course = require("../models/courses.js");
const User = require("../models/user.js");
const Teacher = require("../models/teacher.js");
module.exports.index = async (req, res) => {
    const courses = await Course.find();
    res.status(201).json({ data: courses });
};

// module.exports.newForm = (req, res) => {
//     res.render("./listings/create");
// };

module.exports.create = async (req, res) => {
    const { id, type } = res.payload;
    if (type != 'instructor') {
        return res.status(400).json({ ok: false, message: "You are not an instructor", redirect: '/becomeTeach', data: null });
    }
    let { course, tags, url } = req.body;
    try {
        const user = await User.findById(id).populate('teacher');
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ ok: false, message: "User not found", redirect: '/login', data: null });
        }
        const newCourse = new Course({ ...course, tags, teacher: user });
        newCourse.thumbnail = url;
        await newCourse.save();
        await Teacher.findByIdAndUpdate(user.teacher._id,{$set:{courses:[...user.teacher.courses,newCourse]}});
        res.status(201).json({ ok: true, message: "Course created successfully", data: newCourse });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, message: "Server error" });
    }
};

module.exports.addLessons = async (req, res) => {
    const { type } = res.payload;
    if (type != 'instructor') {
        return res.status(400).json({ ok: false, message: "You are not an instructor", redirect: '/becomeTeach', data: null });
    }
    let { id } = req.params;
    let { Section } = req.body;
    try {
        const course = await Course.findByIdAndUpdate(id, { sections: Section });
        res.status(200).json({ ok: true, message: "Lessons added successfully", data: course });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, message: "Server error" });
    }
};


