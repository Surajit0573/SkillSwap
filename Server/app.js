if(process.env.NODE_ENV!="production"){
  require('dotenv').config();
}
const express = require("express");
const cors = require('cors');
const ExpressError = require("./utils/ExpressError.js");
// const listings = require("./routes/listings.js");
// const reviews = require("./routes/reviews.js");
// const users=require("./routes/user.js");
const courses = require("./routes/courses.js");
const users = require("./routes/user.js");
const teacher = require("./routes/teacher.js");
const upload = require("./routes/upload.js");
const app = express();
app.use(cors());
let port = 3000;
var methodOverride = require('method-override')
const path = require("path");
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport =require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user.js');

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

main().then(() => {
  console.log("connection is sucess");
})
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/skillshare');

}

//Session Options
const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,// 7 Days from now
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//save flash at res.locals
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.user=req.user;
  next();
});


//Home Route
app.get("/", (req, res) => {
  const home={massage:"Welcome to skillShare !!"};
  res.status(201).json({data:home});

});

// app.get("/user",async (req,res)=>{

//   let newUser=new User({
//     email:"sibu@gmail.com",
//     username:"surajit"
//   });

//   let user1=await User.register(newUser,"1234sibu");
//   res.send(user1);

// });

app.use("/api/courses",courses);
app.use("/api/upload",upload);
app.use("/api/user/teacher",teacher);
app.use("/api/user",users);
// app.use("/listings", listings);
// app.use("/listings/:id/reviews", reviews);
// app.use("/",users);


//Wrong Path
app.all("*", (req, res, next) => {
  next(new ExpressError(400, "Page Not Exist"));
});


//Error Handle
app.use((err, req, res, next) => {
  let { status = 500, message = "Something Went Wrong" } = err;
  res.status(status).json({ status, message });
});

