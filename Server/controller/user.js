const User = require("../models/user.js");
const Teacher = require('../models/teacher.js');
const Course = require('../models/courses.js');
const Profile= require('../models/profile.js');
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

module.exports.deleteAccount = async (req, res) => {
    const { id, type, isComplete } = res.payload;
    try {
        const user = await User.findById(id).populate('teacher');
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ ok: false, message: "User not found", data: null });
        }
        if (type == 'instructor') {
            let courses = user.teacher.courses;
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
        }
        if (isComplete) {
            await Profile.findByIdAndDelete(user.profile).then((p) => {
                console.log(`Profile Deleted`);
            }).catch((err) => {
                console.error(`Error deleting Profile: ${err}`);
            });
            user.isComplete = false;
            user.profile=null;
        }
        await user.save();
        await User.findByIdAndDelete(id);
        res.clearCookie("token", options);
        return res.status(400).json({ ok: true, message: "Your account have been removed" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, message: "Server error" });
    }
}


module.exports.isLoggedin = async (req, res) => {
    let { id } = res.payload;
    if (!id) {
        console.error("User not logged in");
        return res.status(401).json({ ok: false, message: "User not logged in" });
    }
    const user = User.findById(id);
    if (!user) {
        console.error("User not found");
        return res.status(404).json({ ok: false, message: "User not found" });
    }
    return res.json({ ok: true, message: "User is Logged In" });
}


module.exports.signup = async (req, res) => {

    let { username, password, email } = req.body;

    //Varifications
    if (!email || !username || !password) {
        console.error("Please enter all required information");
        return res.status(400).json({ ok: false, message: "Pleaase Provide all the required information" });

    }
    if (password.length < 8) {
        console.error("Password should be at least 8 characters long");
        return res.status(400).json({ ok: false, message: "Password should be at least 8 characters long" });

    }
    if (username.length < 3) {
        console.error("Username should be at least 3 characters long");
        return res.status(400).json({ ok: false, message: "Username should be at least 3 characters long" });

    }
    if (email.indexOf("@") === -1) {
        console.error("Please enter a valid email address");
        return res.status(400).json({ ok: false, message: "Please enter a valid email address" });

    }

    //Email already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.error("Email is already registered");
        return res.status(400).json({ ok: false, message: "Email is already registered" });

    }
    //unique username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
        console.error("Username is already registered");
        return res.status(400).json({ ok: false, message: "Username is already registered" });

    }


    try {
        //Hash PassWord
        const hashPassword = await bcrypt.hash(password, bcryptRound);
        //Create a new user
        const user = await User.create({
            username,
            password: hashPassword,
            email
        });
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
        res.cookie("token", token, options);
        return res.status(201).json({ ok: true, message: "Signup successful", response: user });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ ok: false, message: "Something went wrong while signuping" });

    }


};


module.exports.login = async (req, res) => {
    const { username, password } = req.body;

    //Varifications
    if (!username || !password) {
        console.error("Please enter all required information");
        return res.status(400).json({ ok: false, message: "Pleaase Provide all the required information" });

    }
    //Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
        console.error("User not found");
        return res.status(404).json({ ok: false, message: "User not found" });

    }
    //Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.error("Incorrect password");
        return res.status(401).json({ ok: false, message: "Incorrect password" });

    }
    try {
        const user = await User.findOne({ username });
        const payload = {
            id: user._id,
            email: user.email,
            type: user.type,
            isComplete: user.isComplete
        }
        const token = jwt.sign(payload, jwtSecret, {
            expiresIn: '24h'
        });
        res.cookie("token", token, options);
        return res.status(200).json({ ok: true, message: "Successfully Logged in!" });

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ ok: false, message: "Something went wrong while login" });
    }


    // return res.status(200).json({massege: "Successfully logged in", ok: true, });


}

module.exports.logout = (req, res) => {
    res.clearCookie("token", options);
    res.status(201).json({ status: 200, massege: "Successfully logged out", ok: true, });

};

module.exports.changePass = async (req, res) => {
    const { id } = res.payload;
    try {
        const user = await User.findById(id);
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ ok: false, message: "User not found", data: null });
        }
        return res.status(200).json({ ok: true, message: "successfully found user", data: user.username });
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({ ok: false, message: "Something went wrong" });
    }

};


module.exports.updatePass = async (req, res) => {
    const { id } = res.payload;
    const { currPass, newPass } = req.body;
    //Varifications
    if (!currPass || !newPass) {
        console.error("Please enter all required information");
        return res.status(400).json({ ok: false, message: "Pleaase Provide all the required information" });

    }
    //Check if user exists
    const user = await User.findById(id);
    if (!user) {
        console.error("User not found");
        return res.status(404).json({ ok: false, message: "User not found", redirect: "/login" });

    }
    //Check if password is correct
    const isMatch = await bcrypt.compare(currPass, user.password);
    if (!isMatch) {
        console.error("Incorrect password");
        return res.status(401).json({ ok: false, message: "Incorrect password" });

    }
    try {
        //Hash PassWord
        const hashPassword = await bcrypt.hash(newPass, bcryptRound);
        //Update password
        user.password = hashPassword;
        await user.save();
        return res.status(200).json({ ok: true, message: "Password updated successfully" });
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({ ok: false, message: "Something went wrong while updating password" });
    }

};