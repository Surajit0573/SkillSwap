import Navbar from "./Navbar";
import CourseDetails from "./Details/CourseDetails";
import Lessons from "./Details/Lesson";
import About from "./Details/About";
import Teacher from "./Details/Teacher";
import Reviews from "./Details/Reviews";
import Related from "./Details/Related";
import '../style/Details.css'
export default function Details(){
    return(
        <>
           <Navbar/>
           <CourseDetails/>
           <Lessons/>
           <About/>
           <Teacher/>
           <Reviews/>
           <Related/>
        </>
    )
}