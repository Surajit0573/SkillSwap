import './style/App.css';
import Home from './Component/Home.jsx';
import {Routes,Route} from 'react-router-dom';
import Details from './Component/Details.jsx';
import SignUp from './Component/SignUp.jsx';
import Login from './Component/Login.jsx';
import TeacherProfile from './Component/teacherProfile.jsx';
import StudentProfile from './Component/studentProfile.jsx';
import BecomeTeach from './Component/BecomeTeach.jsx';
import AddCourse from './Component/AddCourse.jsx';
import AddLesson from './Component/AddLesson.jsx';
import CompleteProfile from './Component/completeProfile.jsx';
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/details" element={<Details/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/teacherProfile" element={<TeacherProfile/>} />
      <Route path="/studentProfile" element={<StudentProfile/>} />
      <Route path="/becomeTeach" element={<BecomeTeach/>} />
      <Route path="/addCourse" element={<AddCourse/>} />
      <Route path="/addLesson" element={<AddLesson/>} />
      <Route path="/completeProfile" element={<CompleteProfile/>} />
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
    </>
  )
}

export default App
