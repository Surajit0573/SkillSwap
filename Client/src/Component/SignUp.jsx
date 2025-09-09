import React, { useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Person from '@mui/icons-material/Person';
import Email from '@mui/icons-material/Email';
import CircularProgress from '@mui/material/CircularProgress';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { AppContext } from "../AppContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './footer';
import back from '../assets/back.png'

export default function SignUp() {
  const { isLoggedin } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });
  const [errors, setErrors] = useState({ username: '', email: '', password: '' });

  useEffect(() => {
    async function fetchData() {
      const curr = await isLoggedin();
      if (curr) {
        toast.warn("You're already logged in");
        navigate('/profile');
      }
    }
    fetchData();
  }, [isLoggedin, navigate]);

  const muiStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.6)' },
      '&:hover fieldset': { borderColor: 'rgba(148, 163, 184, 0.8)' },
      '&.Mui-focused fieldset': { borderColor: '#8b5cf6', borderWidth: '2px' },
      '& input': { color: '#f8fafc' },
    },
    '& .MuiInputLabel-root': { color: 'rgba(148, 163, 184, 0.8)' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#8b5cf6' },
    '& .MuiSvgIcon-root': { color: 'rgba(148, 163, 184, 0.7)' },
    '& .MuiFormHelperText-root': { color: 'rgba(148, 163, 184, 0.8)' },
    '& .MuiFormHelperText-root.Mui-error': { color: '#ef4444' },
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateUsername = (username) => username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    else if (!validateUsername(formData.username)) newErrors.username = 'Username must be at least 3 characters and contain only letters, numbers, and underscores';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/api/user/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.ok) {
        toast.success(result.message);
        navigate('/verifyEmail');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Blur and Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${back})`,
          filter: 'blur(2px)',
          transform: 'scale(1.1)', // Prevents blur edge artifacts
        }}
      />
      
      {/* Shiny Glass Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/70 to-indigo-900/80 backdrop-blur-sm" />
      
      {/* Animated Shine Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-2/3 right-1/2 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        
        <div className="flex items-center justify-center min-h-screen px-4 py-8">
          <div className="w-full max-w-md">
            <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl ring-1 ring-white/10">
              <h1 className="text-3xl font-bold text-white text-center mb-8">
                Sign up and start learning
              </h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <TextField
                  id="username"
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  variant="outlined"
                  sx={muiStyles}
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username}
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  sx={muiStyles}
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email}
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  id="password"
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  variant="outlined"
                  sx={muiStyles}
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password}
                  disabled={isLoading}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: 'rgba(148, 163, 184, 0.7)' }}
                          disabled={isLoading}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                <Button 
                  type="submit" 
                  variant="contained" 
                  fullWidth
                  size="large"
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                  sx={{
                    background: 'linear-gradient(45deg, #8b5cf6, #a855f7)',
                    '&:hover': { background: 'linear-gradient(45deg, #7c3aed, #9333ea)' },
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem',
                    boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #7c3aed, #9333ea)',
                      boxShadow: '0 12px 40px rgba(139, 92, 246, 0.4)',
                    }
                  }}
                >
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </Button>
              </form>
              
              <p className="text-slate-300 text-center mt-6">
                Already have an account?{' '}
                <NavLink to="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                  Log in
                </NavLink>
              </p>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}