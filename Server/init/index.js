const mongoose = require('mongoose');
const Course = require("../models/courses.js");
const initdata = require("./data.js");

main().then(()=>{
console.log("connection is sucess");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/skillshare');

}

const initDB = async ()=>{
    await Course.insertMany(initdata.data);
    console.log("data is Initialized");
};

initDB();