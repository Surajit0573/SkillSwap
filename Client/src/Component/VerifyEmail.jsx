import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { AppContext } from "../AppContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './footer';

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

  const styles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgb(156 163 175)', // gray-400
      },
      '&:hover fieldset': {
        borderColor: 'rgb(209 213 219)', // gray-300
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgb(99 102 241)', // indigo-500
      },
      '& input': {
        color: 'rgb(243 244 246)', // gray-100
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgb(156 163 175)', // gray-400
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'rgb(99 102 241)', // indigo-500
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/api/user/verifyEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        withCredentials: true,
        body: JSON.stringify({ otp }),
      });
      const result = await response.json();
      console.log(result);
      if (result.ok) {
        toast.success(result.message);
        navigate('/profile');
      } else if (!result.ok) {
        toast.error(result.message);
        if (result.redirect) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      <Navbar />
      
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Verify Your Email
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              We've sent a verification code to your email address
            </p>
          </div>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Display */}
              {email.length > 0 && (
                <div className="space-y-2">
                  <TextField
                    id="outlined-read-only-input"
                    label="Registered Email"
                    defaultValue={email}
                    sx={styles}
                    InputProps={{
                      readOnly: true,
                    }}
                    className="w-full"
                    variant="outlined"
                  />
                </div>
              )}

              {/* OTP Input */}
              <div className="space-y-2">
                <TextField
                  id="outlined-basic"
                  label="Enter OTP"
                  name="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  variant="outlined"
                  sx={styles}
                  className="w-full"
                  placeholder="Enter 6-digit code"
                  inputProps={{
                    maxLength: 6,
                    pattern: '[0-9]{6}',
                    inputMode: 'numeric'
                  }}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-indigo-500/50"
                sx={{
                  backgroundColor: 'rgb(99 102 241)',
                  '&:hover': {
                    backgroundColor: 'rgb(79 70 229)',
                  },
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: '600',
                }}
              >
                Verify Email
              </Button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 text-center space-y-3">
              <p className="text-gray-400 text-sm">
                Didn't receive the code?{' '}
                <button className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                  Resend OTP
                </button>
              </p>
              <p className="text-gray-400 text-sm">
                Wrong email?{' '}
                <NavLink 
                  to="/signup" 
                  className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                >
                  Go back to signup
                </NavLink>
              </p>
            </div>
          </div>

          {/* Security Note */}
          <div className="text-center">
            <p className="text-gray-500 text-xs sm:text-sm max-w-sm mx-auto">
              For your security, this code will expire in 10 minutes. 
              Please check your spam folder if you don't see the email.
            </p>
          </div>
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
}