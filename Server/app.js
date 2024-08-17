if(process.env.NODE_ENV!="production"){
  require('dotenv').config();
}
const express = require("express");
const cors = require('cors');
const ExpressError = require("./utils/ExpressError.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const courses = require("./routes/courses.js");
const users = require("./routes/user.js");
const teacher = require("./routes/teacher.js");
const profile = require("./routes/profile.js");
const upload = require("./routes/upload.js");
const review=require("./routes/reviews.js");
const app = express();
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));
let port = 3000;
var methodOverride = require('method-override')
const path = require("path");
const mongoose = require('mongoose');
const User=require('./models/user.js');

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

main().then(() => {
  console.log("connection is sucess");
})
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);

}

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
app.use("/api/user/profile",profile);
app.use("/api/user",users);
app.use("/api/review",review);
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

