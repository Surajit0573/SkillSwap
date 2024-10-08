if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const Course = require("../models/courses.js");
const User = require("../models/user.js");
const Teacher = require("../models/teacher.js");


module.exports.index = async (req, res) => {
    try {
        let courses = await Course.find();
        if (!courses) {
            console.error("No courses found");
            return res.status(404).json({ ok: false, message: "No courses found", redirect: '/', data: null });
        }
        // const updatedCourses = await Promise.all(courses.map(async (course)=>{
        //     const user= await User.findById(course.teacher).populate('profile');
        //     user.password=undefined;
        //     course.teacher=user;
        //     return course;

        // }));
        // console.log("Courses after mapping : ",updatedCourses);
        res.status(201).json({ ok: true, message: "Courses Fetched Successfully", data: courses });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, message: "Server error" });
    }
};

module.exports.getCategory = async (req, res) => {
    const {name}=req.params;
    console.log(req.params);
    try {
        let courses = await Course.find({category:name});
        if (!courses) {
            return res.status(404).json({ ok: false, message: "No courses found in this category", data: null });
        }
        res.status(201).json({ ok: true, message: "Courses Fetched Successfully", data: courses });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, message: "Server error" });
    }
};


module.exports.getWishlist = async (req, res) => {
    const { id } = res.payload;
    console.log("I am here",id);
    try {
        const user=await User.findById(id).populate('wishlist');
        if(!user){
            console.error("User not found");
            return res.status(404).json({ ok: false, message: "User not found", redirect: '/login', data: null });
        }
        res.status(201).json({ ok: true, message: "Wishlist Fetched Successfully", data: user.wishlist });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, message: "Server error" });
    }
};


module.exports.create = async (req, res) => {
    const { id, type } = res.payload;
    if (type != 'instructor') {
        return res.status(400).json({ ok: false, message: "You are not an instructor", redirect: '/becomeTeach', data: null });
    }
    let { course, tags, url } = req.body;
    course={...course,category:course.category.toLowerCase()};
    try {
        const user = await User.findById(id).populate('teacher').populate('profile');
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ ok: false, message: "User not found", redirect: '/login', data: null });
        }
        const newCourse = new Course({ ...course, tags, teacher: user, teacherName: user.profile.fullname });
        newCourse.thumbnail = url;
        await newCourse.save();
        await Teacher.findByIdAndUpdate(user.teacher._id, { $set: { courses: [...user.teacher.courses, newCourse] } });
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


module.exports.show = async (req, res) => {
    const { id } = req.params;
    try {
        let course = await Course.findById(id);
        if (!course) {
            console.error("No courses found");
            return res.status(404).json({ ok: false, message: "No courses found", redirect: '/', data: null });
        }
        const user = await User.findById(course.teacher).populate('profile').populate('teacher');
        user.password = undefined;
        course.teacher = user;
        //is owner
        let isOwner = false;
        if (req.cookies.token && req.cookies.token.length > 0) {
            const decoded = jwt.verify(req.cookies.token, jwtSecret);
            const currUser = await User.findById(decoded.id);
            const isVerified = currUser.verify;
            if (isVerified) {
                isOwner = (currUser.buyCourses.includes(course._id));
                console.log('isOwner : ', isOwner);
            }
        }
        if (!isOwner) {
            course.sections.map((section) => (section.lessons.map((lesson) => lesson.url = '')));
        }
        console.log('isOwner : ', isOwner);
        console.log('Course : ', course.sections);
        res.status(201).json({ ok: true, message: "Course Fetched Successfully", data: course, isOwner });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, message: "Server error" });
    }
}


module.exports.like = async (req, res) => {
    const { id } = res.payload;
    let { course_id } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ ok: false, message: "User not found", redirect: '/login', data: null });
        }
        if (user.wishlist.includes(course_id)) {
            await User.findByIdAndUpdate(id, { $pull: { wishlist: course_id } });
            res.status(200).json({ ok: true, message: "Course removed from your wishlist" });
        } else {
            await User.findByIdAndUpdate(id, { $push: {wishlist: course_id } });
            res.status(200).json({ ok: true, message: "Course added to your wishlist" });
        }

    } catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, message: "Server error" });
    }
};

module.exports.isLike=async (req, res) => {
    const { id } = res.payload;
    let { course_id } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ ok: false, message: "User not found", redirect: '/login', data: null });
        }
        if (user.wishlist.includes(course_id)) {
            res.status(200).json({ ok: true, message: "Course is in your wishlist", });
        } else {
            res.status(200).json({ ok: false, message: "Course is not in your wishlist" });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, message: "Server error" });
    }
}
