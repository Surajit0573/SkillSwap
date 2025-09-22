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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./footer";

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

const StyledContainer = styled('div')(({ theme }) => ({
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    color: 'white',
}));

const FormContainer = styled('div')(({ theme }) => ({
    background: 'rgba(15, 23, 42, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    padding: '2rem',
    margin: '1rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '@media (max-width: 768px)': {
        padding: '1rem',
        margin: '0.5rem',
    },
}));

const TagContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '1rem',
    padding: '0.5rem',
    background: 'rgba(30, 41, 59, 0.5)',
    borderRadius: '8px',
    border: '1px solid rgba(59, 130, 246, 0.2)',
}));

const Tag = styled('div')(({ theme }) => ({
    background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 4px 8px rgba(59, 130, 246, 0.3)',
    },
    '& button': {
        background: 'none',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        padding: '2px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.2s ease',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.2)',
        },
    },
}));

const ImagePreview = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: '400px',
    minHeight: '200px',
    background: 'rgba(30, 41, 59, 0.5)',
    borderRadius: '12px',
    border: '2px dashed rgba(59, 130, 246, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    padding: '1rem',
    marginBottom: '1rem',
    transition: 'border-color 0.2s ease',
    '&:hover': {
        borderColor: '#3b82f6',
    },
    '& img': {
        maxWidth: '100%',
        maxHeight: '200px',
        objectFit: 'cover',
        borderRadius: '8px',
    },
}));

export default function AddCourse() {
    const navigate = useNavigate();
    const { isLoggedin } = useContext(AppContext);
    
    useEffect(() => {
        async function fetchData() {
            const curr = await isLoggedin();
            if (!curr) {
                toast.error('You must be logged in');
                navigate('/login');
            }
        }
        fetchData();
    }, []);

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

    const textFieldStyles = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'rgba(59, 130, 246, 0.5)',
                transition: 'border-color 0.2s ease',
            },
            '&:hover fieldset': {
                borderColor: '#3b82f6',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#60a5fa',
                borderWidth: '2px',
            },
            '& input, & textarea': {
                color: 'white',
            },
            background: 'rgba(30, 41, 59, 0.3)',
            borderRadius: '8px',
        },
        '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.7)',
            '&.Mui-focused': {
                color: '#60a5fa',
            },
        },
        marginBottom: '1.5rem',
        width: '100%',
    };

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
        if (e.nativeEvent.data === " " || e.key === 'Enter') {
            e.preventDefault();
            if (tag.trim().length > 0 && !tags.includes(tag.trim())) {
                setTags([...tags, tag.trim()]);
            }
            setTag('');
            return;
        }
        setTag(e.target.value);
    }

    function deleteTag(e) {
        const tagToDelete = e.target.getAttribute('name');
        setTags(tags.filter((t) => t !== tagToDelete));
    }

    function handleChange(e) {
        setCourse({ ...course, [e.target.name]: e.target.value });
    }

    async function handleFileChange(e) {
        setFile(e.target.files[0]);
        if (url) {
            deleteFile(url);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
        // Validation
        if (!course.title || !course.description || !course.price || !course.category) {
            toast.error('Please fill in all required fields');
            return;
        }
        
        if (tags.length === 0) {
            toast.error('Please add at least one tag');
            return;
        }
        
        if (!url) {
            toast.error('Please upload a thumbnail image');
            return;
        }

        setCourse({ ...course, price: Number(course.price) });
        
        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/api/courses/`, {
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
                toast.error(result.message);
                if (result.redirect) {
                    navigate(result.redirect);
                    return;
                } else {
                    navigate(-1);
                    return;
                }
            }
            
            toast.success(result.message);
            navigate('/addLesson', { state: { id: result.data._id } });

        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Something went wrong. Please try again.');
        }
    }

    return (
        <StyledContainer>
            <Navbar />
            <div className="min-h-[90vh] flex">
                {/* Sidebar - Hidden on mobile, shown on tablet and up */}
                <div className="hidden lg:block">
                    <Sidebar />
                </div>
                
                {/* Main Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-4xl mx-auto p-4">
                        <FormContainer>
                            <div className="text-center mb-8">
                                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                                    Create New Course
                                </h1>
                                <p className="text-gray-300">Fill in the details to create your course</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <TextField
                                        name="title"
                                        value={course.title}
                                        onChange={handleChange}
                                        label="Course Title *"
                                        variant="outlined"
                                        sx={textFieldStyles}
                                        required
                                    />
                                    <TextField
                                        name="category"
                                        value={course.category}
                                        onChange={handleChange}
                                        label="Course Category *"
                                        variant="outlined"
                                        sx={textFieldStyles}
                                        required
                                    />
                                </div>

                                <TextField
                                    name="description"
                                    value={course.description}
                                    onChange={handleChange}
                                    label="Short Description *"
                                    multiline
                                    rows={3}
                                    sx={textFieldStyles}
                                    required
                                />

                                <TextField
                                    name="price"
                                    value={course.price}
                                    onChange={handleChange}
                                    label="Course Price *"
                                    type="number"
                                    variant="outlined"
                                    sx={textFieldStyles}
                                    required
                                />

                                <div>
                                    <TextField
                                        name="tags"
                                        value={tag}
                                        onChange={addTag}
                                        onKeyDown={addTag}
                                        label="Add Tags (Press space or enter to add)"
                                        variant="outlined"
                                        sx={textFieldStyles}
                                        helperText="Add tags to help students find your course"
                                    />
                                    
                                    {tags.length > 0 && (
                                        <TagContainer>
                                            {tags.map((t, index) => (
                                                <Tag key={index}>
                                                    #{t}
                                                    <button
                                                        type="button"
                                                        name={t}
                                                        onClick={deleteTag}
                                                    >
                                                        <i name={t} className="fa-solid fa-xmark"></i>
                                                    </button>
                                                </Tag>
                                            ))}
                                        </TagContainer>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Course Thumbnail *
                                    </label>
                                    <ImagePreview>
                                        {url ? (
                                            <img src={url} alt="Course thumbnail" />
                                        ) : (
                                            <>
                                                <div className="text-6xl text-gray-500 mb-2">
                                                    <i className="fa-regular fa-image"></i>
                                                </div>
                                                <p className="text-gray-400 text-center">
                                                    Upload a course thumbnail
                                                </p>
                                            </>
                                        )}
                                        <Button
                                            component="label"
                                            variant="contained"
                                            startIcon={<CloudUploadIcon />}
                                            sx={{
                                                background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
                                                '&:hover': {
                                                    background: 'linear-gradient(45deg, #2563eb, #1e40af)',
                                                },
                                                borderRadius: '8px',
                                                textTransform: 'none',
                                                fontSize: '1rem',
                                            }}
                                        >
                                            {url ? 'Change Thumbnail' : 'Upload Thumbnail'}
                                            <VisuallyHiddenInput
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </Button>
                                    </ImagePreview>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <TextField
                                        name="benefits"
                                        value={course.benefits}
                                        onChange={handleChange}
                                        label="Course Benefits *"
                                        multiline
                                        rows={3}
                                        sx={textFieldStyles}
                                        required
                                    />
                                    <TextField
                                        name="requirements"
                                        value={course.requirements}
                                        onChange={handleChange}
                                        label="Course Requirements *"
                                        multiline
                                        rows={3}
                                        sx={textFieldStyles}
                                        required
                                    />
                                </div>

                                <div className="flex justify-center pt-6">
                                    <Button
                                        type="submit"
                                        disabled={!url || tags.length === 0}
                                        variant="contained"
                                        size="large"
                                        sx={{
                                            background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
                                            '&:hover': {
                                                background: 'linear-gradient(45deg, #2563eb, #1e40af)',
                                            },
                                            '&:disabled': {
                                                background: 'rgba(75, 85, 99, 0.5)',
                                            },
                                            borderRadius: '12px',
                                            padding: '12px 32px',
                                            fontSize: '1.1rem',
                                            fontWeight: 600,
                                            textTransform: 'none',
                                            minWidth: '200px',
                                        }}
                                    >
                                        Next: Add Lessons
                                        <i className="fa-solid fa-arrow-right ml-2"></i>
                                    </Button>
                                </div>
                            </form>
                        </FormContainer>
                    </div>
                </div>
            </div>
            <Footer />
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
            />
        </StyledContainer>
    );
}