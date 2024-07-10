import * as React from 'react';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../style/SignUp.css';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';
export default function BecomeTeach() {
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
            name:'',
            designation: '',
            about: '',
            website:'',
            twitter: '',
            linkedin: '',

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
              const response = await fetch('http://localhost:3000/api/user/teacher/signup', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });
              const result = await response.json();
              console.log(result);
            } catch (error) {
              console.error('Error:', error);
            }
          };


    return (
      
        <>
        <Navbar/>
            <div className="signup">
                    <form onSubmit={handleSubmit}>
                    <div className="signup-form">
                    <h1>Come teach with us</h1>
                    <p>Become an instructor and change lives — including your own</p>
                    <TextField id="outlined-basic" label="Full Name" name='name' value={formData.name} onChange={handleChange} variant="outlined"  sx={styles} className='inputtext'/>
                    <TextField id="outlined-basic" label="Designation" name='designation'  value={formData.designation} onChange={handleChange} variant="outlined" sx={styles} className='inputtext'/>
                    <TextField id="outlined-basic" label="About" name='about'  value={formData.about} onChange={handleChange} variant="outlined" sx={styles} className='inputtext'/>
                    <TextField id="outlined-basic" label="Website" name='website'  value={formData.website} onChange={handleChange} variant="outlined" sx={styles} className='inputtext'/>
                    <TextField id="outlined-basic" label="Twitter" name='twitter'  value={formData.twitter} onChange={handleChange} variant="outlined" sx={styles} className='inputtext'/>
                    <TextField id="outlined-basic" label="Linkedin" name='linkedin'  value={formData.linkedin} onChange={handleChange} variant="outlined" sx={styles} className='inputtext'/>
                    <Button type='submit' variant="contained" size="medium">Become a Teacher</Button>
                    </div>
                    </form>
                    
               
            </div>
        </>
    )
}