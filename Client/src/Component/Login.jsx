import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../style/SignUp.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { AppContext } from "../AppContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './footer';
export default function Login() {
  const { isLoggedin } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData(){
      const curr=await isLoggedin();
    if(curr){
      toast.warn("you are already logged in")
      navigate('/profile');
    }
  }
  fetchData();
  }, []);
  const styles =
  {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
      '& input': {
        color: 'white',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'white',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'white',
    },
  }

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        withCredentials: true,
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      if (result.ok) {
        toast.success(result.message);
        navigate('/profile');
      } else if (!result.ok) {
        toast.error(result.message);
        if(result.redirect){
          navigate(result.redirect);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (

    <>
      <Navbar />
      <div className="signup">
        <img src="https://st.depositphotos.com/18722762/51522/v/450/depositphotos_515228796-stock-illustration-online-registration-sign-login-account.jpg"></img>
        <form onSubmit={handleSubmit}>
          <div className="signup-form">
            <h1>Login and start learning</h1>
            <TextField id="outlined-basic" label="Email" name='email' value={formData.email} onChange={handleChange} variant="outlined" sx={styles} className='inputtext' />
            <TextField id="outlined-basic" label="Password" name='password' value={formData.password} onChange={handleChange} variant="outlined" sx={styles} className='inputtext' />
            <Button type='submit' variant="contained" size="medium">Log In</Button>
            <p>Doesn't have an account? <NavLink to='/signup'>Sign Up</NavLink></p>
          </div>
        </form>
      </div>
      <Footer/>
    </>
  )
}