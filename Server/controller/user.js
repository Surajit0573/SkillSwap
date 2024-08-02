const User = require("../models/user.js");
const Teacher = require('../models/teacher.js');
const Course = require('../models/courses.js');
const Profile = require('../models/profile.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

const bcryptRound = Number(process.env.BCRYPT_ROUND);
const jwtSecret = process.env.JWT_SECRET;

const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'None',
    secure: true,
}

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    }
});

const sendOTPEmail = (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };
    return transporter.sendMail(mailOptions);
};

const sendReceiptEmail = (customerEmail, receiptContent) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: customerEmail,
        subject: 'Your Purchase Receipt',
        html: receiptContent
    };
    return transporter.sendMail(mailOptions);
};

module.exports.payment = async (req, res) => {
    const { id } = res.payload;
    const { products, token } = req.body;
    const amount = products.reduce((total, product) => total + product.price, 0) * 90; // Amount in paise (cents for INR)
    console.log("Products: ", products);
    const idempotencyKey = uuidv4();

    try {
        const user = await User.findById(id);
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ ok: false, message: "User not found", data: null });
        }

        const customer = await stripe.customers.create({
            email: user.email,
        });

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'INR',
            customer: customer.id,
            receipt_email: user.email,
            payment_method_data: {
                type: 'card',
                card: {
                    token: token.id
                }
            },
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            },
            confirm: true, // Automatically confirm the payment intent
        }, { idempotencyKey });

        // Extract all the product _id from products and add them to the user's buyCourses
        const buyCourses = products.map((product) => product._id);
        user.buyCourses = [...user.buyCourses, ...buyCourses];
        user.cart = [];
        await user.save();

        // Generate receipt content
        const receiptContent = `
            <h1>Receipt</h1>
            <p>Thank you for your purchase!</p>
            <p><strong>Total Amount:</strong> ₹${amount / 100}</p>
            <p><strong>Products:</strong></p>
            <ul>
                ${products.map(product => `<li>${product.title} - ₹${product.price}</li>`).join('')}
            </ul>
            <p><strong>Customer Email:</strong> ${user.email}</p>
        `;

        // Send receipt to the customer and yourself
        await sendReceiptEmail(user.email, receiptContent);
        await sendReceiptEmail(process.env.EMAIL, receiptContent);

        return res.status(200).json({ ok: true, message: "Payment successful and receipt sent", data: paymentIntent });

    } catch (e) {
        console.error(e.message);
        return res.status(500).json({ ok: false, message: "Something went wrong" });
    }
};


module.exports.getCourses = async (req, res) => {
    const { id } = res.payload;
    try {
        const user = await User.findById(id).populate('buyCourses');
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ ok: false, message: "User not found", data: null });
        }
        return res.status(200).json({ ok: true, message: "Fetched course data successfully", data: user.buyCourses });
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({ ok: false, message: "Something went wrong" });
    }
}

module.exports.deleteFromCart = async (req, res) => {
    const { id } = res.payload;
    const { course_id } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ ok: false, message: "User not found", data: null });
        }
        user.cart = user.cart.filter((c) => c.toString() !== course_id.toString());
        await user.save();
        return res.status(200).json({ ok: true, message: "Course deleted from cart successfully", });

    } catch (e) {
        return res.status(500).json({ ok: false, message: "Server error" });
    }
}

module.exports.getFromCart = async (req, res) => {
    const { id } = res.payload;
    try {
        const user = await User.findById(id).populate('cart');
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ ok: false, message: "User not found", data: null });
        }
        return res.status(200).json({ ok: true, message: "Fetched cart data successfully", data: user.cart });

    } catch (e) {
        return res.status(500).json({ ok: false, message: "Server error" });
    }
}


module.exports.addToCart = async (req, res) => {
    const { id } = res.payload;
    const { course_id } = req.body;
    try {
        const user = await User.findById(id);
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ ok: false, message: "User not found", data: null });
        }
        if (user.cart.includes(course_id)) {
            console.error("Course already exists in cart");
            return res.status(400).json({ ok: false, message: "Course already exists in cart", data: null });
        }
        user.cart = [...user.cart, course_id];
        await user.save();
        return res.status(200).json({ ok: true, message: "Course Added to Cart successfully", data: user.cart });

    } catch (e) {
        return res.status(500).json({ ok: false, message: "Server error" });
    }
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
            user.profile = null;
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
    const user = await User.findById(id);
    if (!user) {
        console.error("User not found");
        return res.status(404).json({ ok: false, message: "User not found" });
    }
    return res.json({ ok: true, message: "User is Logged In" });
}

module.exports.getEmail = async (req, res) => {
    let { id } = res.payload;
    if (!id) {
        return res.status(401).json({ ok: false, message: "You have to signup first", redirect: '/signup' });
    }
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ ok: false, message: "User not found", redirect: '/signup' });
    }
    if(user.verify) {
        return res.status(400).json({ ok: false, message: "You have already verified your email" });
    }
    if (user.otp && user.otpExpiry&&user.otpExpiry >= Date.now()) {
        return res.status(400).json({ ok:true, message: "OTP already sent. Please check your email", data: user.email });
    }
    // Generate OTP and send email
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    const otpExpiry = Date.now() + 600000; // OTP valid for 10 minutes
    await sendOTPEmail(user.email, otp);
    const hashOtp = await bcrypt.hash(`${otp}`, bcryptRound);
    user.otp = hashOtp;
    user.otpExpiry = otpExpiry;
    await user.save();
    return res.json({ ok: true, message: "OTP sent to your email. Please verify.", data: user.email });

}

module.exports.verifyEmail = async (req, res) => {
    let { id } = res.payload;
    const {otp}=req.body;
    if (!id) {
        return res.status(401).json({ ok: false, message: "You have to signup first", redirect: '/signup' });
    }
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ ok: false, message: "User not found", redirect: '/signup' });
    }
    if (!(user.otp && user.otpExpiry&&user.otpExpiry >= Date.now())) {
        return res.status(400).json({ ok:true, message: "OTP Expires, Resend OTP"});
    }
    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
        console.error("Incorrect OTP");
        return res.status(401).json({ ok: false, message: "Incorrect OTP" });

    }
    user.otp=undefined;
    user.otpExpiry=undefined;
    user.verify=true;
    await user.save();
    return res.json({ ok: true, message: "Email is verified" });

}


module.exports.signup = async (req, res) => {
    let { username, password, email } = req.body;

    //Varifications
    if (!email || !username || !password) {
        return res.status(400).json({ ok: false, message: "Pleaase Provide all the required information" });

    }
    if (password.length < 8) {
        return res.status(400).json({ ok: false, message: "Password should be at least 8 characters long" });

    }
    if (username.length < 3) {
        return res.status(400).json({ ok: false, message: "Username should be at least 3 characters long" });

    }
    if (email.indexOf("@") === -1) {
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
        return res.status(400).json({ ok: false, message: "Username is not available" });

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
        return res.status(201).json({ ok: true, message: "Signup successful, Now Varify your Email", response: user });

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
            isComplete: user.isComplete,
        }
        const token = jwt.sign(payload, jwtSecret, {
            expiresIn: '24h'
        });
        res.cookie("token", token, options);

        //check if email verified or not 
        if (!user.verify) {
            console.error("Email is not verified");
            return res.status(401).json({ ok: false, message: "Email is not verified", redirect: '/verifyEmail' });
        }

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