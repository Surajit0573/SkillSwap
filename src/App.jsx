import './style/App.css';
import Home from './Component/Home.jsx';
import {Routes,Route} from 'react-router-dom';
import Details from './Component/Details.jsx';
import SignUp from './Component/SignUp.jsx';
import Login from './Component/Login.jsx';
import Profile from './Component/profile.jsx';
import BecomeTeach from './Component/BecomeTeach.jsx';
import AddCourse from './Component/AddCourse.jsx';
import AddLesson from './Component/AddLesson.jsx';
import DashBoard from './Component/dashboard.jsx';
import Certificate from './Component/Dashboard/certificate.jsx';
import UpdateAccount from './Component/Dashboard/updateAccount.jsx';
import MyCourses from './Component/Dashboard/myCourses.jsx';
import BoughtCourses from './Component/Dashboard/boughtCourses.jsx';
import Cart from './Component/Cart.jsx';
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/details" element={<Details/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/becomeTeach" element={<BecomeTeach/>} />
      <Route path="/addCourse" element={<AddCourse/>} />
      <Route path="/addLesson" element={<AddLesson/>} />
      <Route path="/dashboard" element={<DashBoard/>} />
      <Route path="/dashboard/certificate" element={<Certificate />} />
      <Route path="/dashboard/account" element={<UpdateAccount />} />
      <Route path="/dashboard/myCourses" element={<MyCourses />} />
      <Route path="/dashboard/boughtCourses" element={<BoughtCourses />} />
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
    </>
  )
}

export default App
