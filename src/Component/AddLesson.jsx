import Navbar from "./Navbar";
import * as React from 'react';
import { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import '../style/AddCourse.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddLessonCard from './AddLessonCard';
import { useNavigate,useLocation } from "react-router-dom";
import axios from 'axios';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
export default function AddLesson() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [Section,setSection]=useState([]);
    const [title,setTitle]=useState('');
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
        marginBottom: '20px',
        '& .MuiOutlinedInput-input': {
            color: 'white',
        },
        width: '70%',
    }

    const handleChange =(e)=>{
        setTitle(e.target.value);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setSection([...Section,{title,lessons:[]}]);
        setTitle('');
    }

    const handleCreate=async(e)=>{
        e.preventDefault();
        const id = state.id;
        console.log("ide",id);
        try {
            // Send the POST request with the file
            console.log(Section);
            const response = await axios.post(`http://localhost:3000/api/courses/${id}/addLessons`, {Section});
            navigate('/');
            

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }
    return (
        <>
            <Navbar />
            <div className="addCourse">
                <h1>Add Lessons</h1>
                <div className="addCourseForm">
                    <div className="addLesson">
                        <TextField id="outlined-basic" onChange={handleChange} value={title} label='Add Section' variant="outlined" sx={styles} className='inputtext' />
                        <Button onClick={handleSubmit} variant="contained" size="medium">Add</Button>
                    </div>
                    <div className="showLesson">
                    {Section.length>0&&Section.map((s,index)=><AddLessonCard options={[Section,index,setSection]}/>)}
                    </div>
                    <Button variant="contained" onClick={handleCreate} size="medium">Create</Button>
                </div>
            </div>
        </>
    )
}