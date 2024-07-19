import Navbar from "./Navbar";
import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import '../style/AddCourse.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AppContext } from "../AppContext";
import Sidebar from "./Dashboard/sidebar";
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
export default function AddCourse() {
    const navigate = useNavigate();
    const [course, setCourse] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        benefits: '',
        requirements: '',
    });
    const { getUrl, deleteFile } = useContext(AppContext);
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState('');
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

    useEffect(() => {
        async function update() {
            const currUrl = await getUrl(file);
            console.log(currUrl);
            setUrl(currUrl);
        }
        if (file != null) {
            update();
        }
    }, [file]);

    function addTag(e) {
        if (e.nativeEvent.data == " ") {
            if (tag.length != 0)
                setTags([...tags, tag]);
            setTag('');
            return;
        }
        setTag(e.target.value);
    }

    function deleteTag(e) {
        console.log(e.target.getAttribute('name'));
        setTags(tags.filter((t) => t != e.target.getAttribute('name')));
    }

    function handleChange(e) {
        setCourse({ ...course, [e.target.name]: e.target.value });
    }

    async function handleFileChange(e) {
        setFile(e.target.files[0]);
        console.log(url);
        deleteFile(url);
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setCourse({ ...course, price: Number(course.price) });
        console.log(course);
        try {
            // Send the POST request with the file
            const response = await fetch('http://localhost:3000/api/courses/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                withCredentials: true,
                body: JSON.stringify({ course, url, tags }),
            });
            const result = await response.json();
            if (!result.ok) {
                console.log(result.message);
                if (result.redirect) {
                    navigate(result.redirect);
                    return;
                } else {
                    navigate(-1);
                    return;
                }
            }
            navigate('/addLesson', { state: { id: result.data._id } });

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }
    return (
        <>
         <div>
            <Navbar />
            <div className="h-[90vh] flex justify-between">
            <div>
                <Sidebar />
                </div>
                <div className="overflow-y-scroll flex-grow flex-wrap ">
                <div className="addCourse">
                <h1 className="text-4xl font-bold m-4 ">Add Course</h1>
                <div className="addCourseForm">
                    <TextField id="outlined-basic" name="title" value={course.title} onChange={handleChange} label='Course Tilte' variant="outlined" sx={styles} className='inputtext' required />
                    <TextField id="outlined-multiline-static" name="description" value={course.description} onChange={handleChange} label="Short Description" multiline rows={3} sx={styles} className='inputtext' required />
                    <TextField id="outlined-basic" name="price" label='Course Price' value={course.price} onChange={handleChange} variant="outlined" sx={styles} className='inputtext' required />
                    <TextField id="outlined-basic" name="category" label='Course Categoty' value={course.category} onChange={handleChange} variant="outlined" sx={styles} className='inputtext' required />
                    <TextField id="outlined-basic" name="tags" value={tag} onChange={addTag} label='Add Tags' variant="outlined" sx={styles} className='inputtext' />
                    <div className="showTags flex items-center flex-wrap w-[535px] ">
                        {tags.map((t, index) => (<div key={index} className="oneTag mb-4">#{t}<button name={t} onClick={deleteTag}><i name={t} className="fa-solid fa-xmark flex"></i></button></div>))}
                    </div>
                    <div className='upload w-[535px]'>
                        <img src={url}></img>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            name="thumbnail"
                            onChange={handleFileChange}
                        >
                            Upload Thumbnail

                            <VisuallyHiddenInput type="file" />
                        </Button>
                    </div>
                    <TextField id="outlined-multiline-static" name="benefits" value={course.benefits} onChange={handleChange} label="Benefits" multiline rows={3} sx={styles} className='inputtext' required />
                    <TextField id="outlined-multiline-static" name="requirements" value={course.requirements} onChange={handleChange} label="Requirements" multiline rows={3} sx={styles} className='inputtext' required />
                    <Button type='submit' onClick={handleSubmit} disabled={!((url != '') && (tags.length > 0))} variant="contained" size="medium">Next</Button>
                </div>
            </div>          
                </div>
              
            </div>
        </div>

           
        </>
    )
}