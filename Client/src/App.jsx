import React,{Suspense} from 'react';
import './style/App.css';
import { Routes, Route } from 'react-router-dom';

// Lazily import all components used for routing
const Home = React.lazy(() => import('./Component/Home.jsx'));
const Details = React.lazy(() => import('./Component/Details.jsx'));
const SignUp = React.lazy(() => import('./Component/SignUp.jsx'));
const Login = React.lazy(() => import('./Component/Login.jsx'));
const Profile = React.lazy(() => import('./Component/profile.jsx'));
const BecomeTeach = React.lazy(() => import('./Component/BecomeTeach.jsx'));
const AddCourse = React.lazy(() => import('./Component/AddCourse.jsx'));
const AddLesson = React.lazy(() => import('./Component/AddLesson.jsx'));
const DashBoard = React.lazy(() => import('./Component/dashboard.jsx'));
const Certificate = React.lazy(() => import('./Component/Dashboard/certificate.jsx'));
const UpdateAccount = React.lazy(() => import('./Component/Dashboard/updateAccount.jsx'));
const MyCourses = React.lazy(() => import('./Component/Dashboard/myCourses.jsx'));
const BoughtCourses = React.lazy(() => import('./Component/Dashboard/boughtCourses.jsx'));
const Cart = React.lazy(() => import('./Component/Cart.jsx'));
const VerifyEmail = React.lazy(() => import('./Component/VerifyEmail.jsx'));
const CoursePlayer = React.lazy(() => import('./Component/coursePlayer.jsx'));
const WishList = React.lazy(() => import('./Component/wishlist.jsx'));
const Performence = React.lazy(() => import('./Component/Dashboard/performence.jsx'));

function App() {
  return (
    <>
      {/* Suspense wrapper */}
      <React.Suspense fallback={<div className="loading-fallback">Loading, please wait...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/verifyEmail" element={<VerifyEmail />} />
          <Route path="/becomeTeach" element={<BecomeTeach />} />
          <Route path="/addCourse" element={<AddCourse />} />
          <Route path="/addLesson" element={<AddLesson />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/dashboard/certificate" element={<Certificate />} />
          <Route path="/dashboard/account" element={<UpdateAccount />} />
          <Route path="/dashboard/myCourses" element={<MyCourses />} />
          <Route path="/dashboard/boughtCourses" element={<BoughtCourses />} />
          <Route path="/dashboard/performence" element={<Performence />} />
          <Route path="/coursePlayer/" element={<CoursePlayer />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </React.Suspense>
    </>
  );
}

export default App;