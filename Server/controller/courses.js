const Course = require("../models/courses.js");
module.exports.index = async (req, res) => {
    const courses = await Course.find();
    res.status(201).json({ data:courses });
};

// module.exports.newForm = (req, res) => {
//     res.render("./listings/create");
// };

module.exports.create = async (req, res) => {
    let { course,tags,url } = req.body;
    const newCourse = new Course({...course,tags});
    newCourse.thumbnail=url;
    console.log(newCourse);
    await newCourse.save()
    // req.flash("success", "New Listing Created!");
    // res.redirect("/listings");
    res.status(201).json({ message: "Course created successfully",data:newCourse });   
};

module.exports.addLessons=async (req,res)=>{
    let { id } = req.params;
    let {Section}=req.body;
    const course=await Course.findByIdAndUpdate(id,{sections:Section});
    res.status(200).json({ message: "Lessons added successfully",data:course });
};


