import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../style/SignUp.css';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { AppContext } from "../AppContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {
  const location = useLocation();
  const { getEmail } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const result = await getEmail();
      console.log("USEEFFECT IN VERIFYEMAIL  ", result);
      if (result.ok) {
        toast.success(result.message);
        setEmail(result.data);
        return;
      } else {
        toast.error(result.message);
        if (result.redirect) {
          navigate(result.redirect);
        } else {
          navigate('/signup');
        }
        return;
      }
    }
    try {
      fetchData();
    } catch (e) {
      console.error('Error:', e);
      toast.error("Something went wrong");
      return;
    }
  }, [location]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/user/verifyEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        withCredentials: true,
        body: JSON.stringify({otp}),
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
          return;
        }
        return;
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    }
  };


  return (

    <>
      <Navbar />
      <div className="signup">
        <form onSubmit={handleSubmit}>
          <div className="signup-form">
            <h1>Verify your email</h1>
            {(email.length > 0) && <TextField
              id="outlined-read-only-input"
              label="Registered Email"
              defaultValue={email}
              sx={styles}
              InputProps={{
                readOnly: true,
              }}
            />}
            <br />
            <TextField id="outlined-basic" label="OTP" name='OTP' value={otp} onChange={(e) => setOtp(e.target.value)} variant="outlined" sx={styles} className='inputtext' />
            <Button type='submit' variant="contained" size="medium">Varify</Button>
          </div>
        </form>
      </div>
    </>
  )
}