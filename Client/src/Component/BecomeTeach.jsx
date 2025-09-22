import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BecomeTeach() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL}/api/user/teacher/info`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: "include",
          withCredentials: true,
        });
        const result = await response.json();
        if (!result.ok) {
          toast.error(result.message);
          if (result.redirect) {
            navigate(result.redirect);
            return;
          }
        } else {
          setName(result.data.fullname);
        }
      } catch (e) {
        console.error(e);
        toast.error('Something went wrong');
      }
    }
    fetchData();
  }, []);

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      '& fieldset': {
        borderColor: 'rgba(71, 85, 105, 0.6)',
        borderWidth: '1px',
      },
      '&:hover': {
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        '& fieldset': {
          borderColor: 'rgba(139, 92, 246, 0.6)',
        },
      },
      '&.Mui-focused': {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)',
        '& fieldset': {
          borderColor: '#8b5cf6',
          borderWidth: '2px',
        },
      },
      '& input': {
        color: '#f1f5f9',
        fontSize: '16px',
        padding: '16px 14px',
      },
      '& textarea': {
        color: '#f1f5f9',
        fontSize: '16px',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(148, 163, 184, 0.8)',
      fontSize: '16px',
      fontWeight: 500,
      '&.Mui-focused': {
        color: '#8b5cf6',
        fontWeight: 600,
      },
    },
    marginBottom: '24px',
  };

  const [formData, setFormData] = useState({
    domain: '',
    qualifications: '',
    yoe: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.yoe = Number(formData.yoe);
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/api/user/teacher/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        withCredentials: true,
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!result.ok) {
        toast.error(result.message);
        if (result.redirect) {
          navigate(result.redirect);
          return;
        } else {
          navigate(-1);
          return;
        }
      } else {
        toast.success(result.message);
        navigate('/profile');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Main Container - Dark Theme */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative flex items-center justify-center min-h-screen px-4 py-8 pt-20">
          <div className="w-full max-w-4xl">
            
            {/* Header Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-8 shadow-2xl">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Become a Teacher,{' '}
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                  {name}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                Share your knowledge and inspire the next generation of learners
              </p>
            </div>

            {/* Form Section */}
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden">
              
              {/* Form Header */}
              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 px-8 py-8 border-b border-slate-700/50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                      <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                      </svg>
                      Teacher Application
                    </h2>
                    <p className="text-slate-400 mt-2 text-base sm:text-lg">
                      Tell us about your expertise and join our community
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Application Open
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8 lg:p-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Grid Layout for Desktop */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Domain Field */}
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                          <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                          </svg>
                        </div>
                        <TextField
                          label="Domain of Expertise"
                          name="domain"
                          value={formData.domain}
                          onChange={handleChange}
                          variant="outlined"
                          sx={{
                            ...textFieldStyles,
                            '& .MuiOutlinedInput-root': {
                              ...textFieldStyles['& .MuiOutlinedInput-root'],
                              paddingLeft: '50px',
                            }
                          }}
                          fullWidth
                          placeholder="e.g., Web Development, Data Science, UI/UX Design"
                          required
                        />
                      </div>

                      {/* Years of Experience */}
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                          <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
                          </svg>
                        </div>
                        <TextField
                          label="Years of Experience"
                          name="yoe"
                          type="number"
                          value={formData.yoe}
                          onChange={handleChange}
                          variant="outlined"
                          sx={{
                            ...textFieldStyles,
                            '& .MuiOutlinedInput-root': {
                              ...textFieldStyles['& .MuiOutlinedInput-root'],
                              paddingLeft: '50px',
                            }
                          }}
                          fullWidth
                          placeholder="Enter your years of professional experience"
                          inputProps={{ min: 0, max: 50 }}
                          required
                        />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Qualifications Field */}
                      <div className="relative group h-full">
                        <div className="absolute left-4 top-8 pointer-events-none z-10">
                          <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                        <TextField
                          label="Qualifications & Certifications"
                          name="qualifications"
                          value={formData.qualifications}
                          onChange={handleChange}
                          variant="outlined"
                          sx={{
                            ...textFieldStyles,
                            '& .MuiOutlinedInput-root': {
                              ...textFieldStyles['& .MuiOutlinedInput-root'],
                              paddingLeft: '50px',
                              height: '100%',
                              alignItems: 'flex-start',
                            }
                          }}
                          fullWidth
                          multiline
                          rows={6}
                          placeholder="List your degrees, certifications, awards, and relevant achievements..."
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Benefits Section */}
                  <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10 rounded-2xl p-8 border border-purple-500/20">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      Why Join Our Platform?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { icon: "💰", title: "Competitive Earnings", desc: "Up to 70% revenue share" },
                        { icon: "🌍", title: "Global Reach", desc: "Students from 190+ countries" },
                        { icon: "🛠️", title: "Pro Tools", desc: "Advanced teaching resources" },
                        { icon: "📞", title: "24/7 Support", desc: "Dedicated instructor support" }
                      ].map((benefit, index) => (
                        <div key={index} className="bg-slate-700/30 rounded-xl p-4 text-center hover:bg-slate-700/50 transition-all duration-300">
                          <div className="text-3xl mb-3">{benefit.icon}</div>
                          <h4 className="text-white font-semibold mb-2">{benefit.title}</h4>
                          <p className="text-slate-300 text-sm">{benefit.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-8">
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                        color: 'white',
                        fontSize: { xs: '16px', sm: '18px' },
                        fontWeight: 700,
                        padding: { xs: '16px 32px', sm: '20px 40px' },
                        borderRadius: '16px',
                        textTransform: 'none',
                        boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
                          boxShadow: '0 25px 50px rgba(139, 92, 246, 0.4)',
                          transform: 'translateY(-2px)',
                        },
                        '&:active': {
                          transform: 'translateY(0px)',
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                          transition: 'left 0.5s',
                        },
                        '&:hover::before': {
                          left: '100%',
                        },
                      }}
                    >
                      <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"/>
                      </svg>
                      Start Your Teaching Journey
                    </Button>
                  </div>

                  {/* Footer Note */}
                  <div className="text-center pt-6 border-t border-slate-700/50">
                    <p className="text-slate-400 text-sm">
                      By submitting this application, you agree to our{' '}
                      <span className="text-purple-400 cursor-pointer hover:underline transition-colors duration-200">
                        Terms of Service
                      </span>{' '}
                      and{' '}
                      <span className="text-purple-400 cursor-pointer hover:underline transition-colors duration-200">
                        Instructor Guidelines
                      </span>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: 'rgba(15, 23, 42, 0.9)',
          color: '#f1f5f9',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '12px',
          backdropFilter: 'blur(16px)',
        }}
      />
    </>
  );
}