import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Margin } from '@mui/icons-material';

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

  const styles = {
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
    marginBottom: '16px',
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
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-800 p-8 rounded-md shadow-md">
          <h1 className="text-3xl mb-6 text-center">Come Teach with Us, {name}</h1>
          <p className="text-xl mb-6 text-center">Become an instructor and change lives — including your own</p>
          <TextField 
            id="outlined-basic" 
            label="Domain" 
            name="domain" 
            value={formData.domain} 
            onChange={handleChange} 
            variant="outlined" 
            sx={styles} 
            fullWidth 
            className="mb-4"
          />
          <TextField 
            id="outlined-basic" 
            label="Qualifications" 
            name="qualifications" 
            value={formData.qualifications} 
            onChange={handleChange} 
            variant="outlined" 
            sx={styles} 
            fullWidth 
            className="mb-4"
          />
          <TextField 
            id="outlined-basic" 
            label="Year of Experience" 
            name="yoe" 
            value={formData.yoe} 
            onChange={handleChange} 
            variant="outlined" 
            sx={styles} 
            fullWidth 
            className="mb-6"
          />
          <Button 
            type="submit" 
            variant="contained" 
            size="large" 
            fullWidth 
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Become a Teacher
          </Button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}
