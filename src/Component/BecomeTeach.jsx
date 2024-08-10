import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../style/SignUp.css';
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
        const response = await fetch('http://localhost:3000/api/user/teacher/info', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: "include",
          withCredentials: true,
        });
        const result = await response.json();
        console.log(result);
        if (!result.ok) {
          toast.error(result.message);
          if (result.redirect) {
            console.log(result.message);
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
    domain: '',
    qualifications: '',
    yoe: '',
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
    formData.yoe = Number(formData.yoe);
    try {
      const response = await fetch('http://localhost:3000/api/user/teacher/signup', {
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
          console.log(result.message);
          navigate(result.redirect);
          return;
        } else {
          navigate(-1);
          return;
        }
      }else{
        toast.success(result.message);
        console.log(result.message);
        navigate('/profile');
      }
    } catch (error) {
      toast.success('something went wrong');
      console.error('Error:', error);
    }
  };


  return (

    <>
      <Navbar />
      <div className="signup">
        <form onSubmit={handleSubmit}>
          <div className="signup-form">
            <h1 className='text-2xl'>Come teach with us {name}</h1>
            <p className='text-2xl m-4' >Become an instructor and change lives — including your own</p>
            <TextField id="outlined-basic" label="Domain" name='domain' value={formData.domain} onChange={handleChange} variant="outlined" sx={styles} className='inputtext' />
            <TextField id="outlined-basic" label="Qualifications" name='qualifications' value={formData.qualifications} onChange={handleChange} variant="outlined" sx={styles} className='inputtext' />
            <TextField id="outlined-basic" label="Year of Experience" name='yoe' value={formData.yoe} onChange={handleChange} variant="outlined" sx={styles} className='inputtext' />
            <Button type='submit' variant="contained" size="medium">Become a Teacher</Button>
          </div>
        </form>


      </div>
    </>
  )
}