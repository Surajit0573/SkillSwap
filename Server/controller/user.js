const User = require("../models/user.js");

// module.exports.signupForm = async (req, res) => {
//     res.render("./user/signup.ejs");
// };

module.exports.signup = async (req, res) => {

    let { username, password, email } = req.body;
    let newuser = new User({ username, email });
    let user1 = await User.register(newuser, password);
    console.log(user1);
    req.login(user1, (err) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({ Status: 200, Message: "User signed up successfully", data: user1 });
        // req.flash("success", "Welcome to Wandarlust");
        // res.redirect("/listings");
    });


};

module.exports.loginForm = async (err,req, res) => {
   res.status(400).json({message:err,data:false});
};

module.exports.login = async (req, res) => {

    res.status(201).json({ status: 200, massege: "Successfully logged in", data: true });

}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.status(201).json({ status: 200, massege: "Successfully logged out", data: true });
    });

};