import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import '../style/AddCourse.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useContext, useEffect } from 'react';
import { AppContext } from "../AppContext";
import { toast } from 'react-toastify';

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

const StyledCard = styled('div')(({ theme }) => ({
    background: 'rgba(30, 41, 59, 0.8)',
    borderRadius: '12px',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.2s ease',
    '&:hover': {
        borderColor: 'rgba(59, 130, 246, 0.5)',
        transform: 'translateY(-2px)',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
}));

const LessonForm = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1rem',
    background: 'rgba(15, 23, 42, 0.5)',
    borderRadius: '8px',
    margin: '0.5rem 0',
    '@media (max-width: 768px)': {
        padding: '0.75rem',
    },
}));

const LessonItem = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 1rem',
    background: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '8px',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    margin: '0.25rem 0',
    transition: 'all 0.2s ease',
    '&:hover': {
        background: 'rgba(59, 130, 246, 0.15)',
        borderColor: 'rgba(59, 130, 246, 0.3)',
    },
    '@media (max-width: 768px)': {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '0.5rem',
        padding: '1rem',
    },
}));

const LessonInfo = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flex: 1,
    '& i': {
        fontSize: '1.25rem',
        color: '#60a5fa',
        minWidth: '20px',
    },
    '& a': {
        color: 'white',
        textDecoration: 'none',
        '&:hover': {
            color: '#60a5fa',
        },
    },
    '@media (max-width: 768px)': {
        width: '100%',
        '& span': {
            fontSize: '0.9rem',
        },
    },
}));

const ButtonContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    '@media (max-width: 768px)': {
        width: '100%',
        justifyContent: 'flex-end',
    },
}));

export default function LessonCard({ options }) {
    let Section = options[0];
    const index = options[1];
    let setSection = options[2];
    const [open, setOpen] = React.useState(false);
    const [lessonName, SetLessonName] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const { getUrl, deleteFile } = useContext(AppContext);
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');

    const handleClick = () => {
        setOpen(!open);
    };

    useEffect(() => {
        async function update() {
            setIsUploading(true);
            try {
                const currUrl = await getUrl(file);
                setUrl(currUrl);
                toast.success('File uploaded successfully');
            } catch (error) {
                toast.error('Failed to upload file');
            } finally {
                setIsUploading(false);
            }
        }
        if (file != null) {
            update();
        }
    }, [file]);

    function handleFileChange(e) {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Validate file type
            const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'application/pdf'];
            if (!validTypes.includes(selectedFile.type)) {
                toast.error('Please select a valid video file (MP4, WebM, OGG) or PDF document');
                return;
            }
            
            // Validate file size (100MB limit)
            if (selectedFile.size > 100 * 1024 * 1024) {
                toast.error('File size must be less than 100MB');
                return;
            }
            
            setFile(selectedFile);
            if (url) {
                deleteFile(url);
            }
        }
    }

    const handleChange = (e) => {
        SetLessonName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!lessonName.trim()) {
            toast.error('Please enter a lesson name');
            return;
        }
        
        if (!url) {
            toast.error('Please upload a file for the lesson');
            return;
        }

        // Check for duplicate lesson names
        if (Section[index].lessons.some(lesson => lesson.name.toLowerCase() === lessonName.trim().toLowerCase())) {
            toast.error('A lesson with this name already exists in this section');
            return;
        }

        console.log("name", lessonName, " url : ", url);
        Section[index].lessons.push({ name: lessonName.trim(), url: url });
        setSection([...Section]);
        SetLessonName('');
        setUrl('');
        setFile(null);
        toast.success('Lesson added successfully');
    };

    const handleDeleteLesson = (lessonIndex, lessonUrl) => {
        if (window.confirm('Are you sure you want to delete this lesson?')) {
            deleteFile(lessonUrl);
            Section[index].lessons.splice(lessonIndex, 1);
            setSection([...Section]);
            toast.success('Lesson deleted successfully');
        }
    };

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
            '& input': {
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
        width: '100%',
    };

    return (
        <StyledCard>
            <List component="nav">
                <ListItemButton 
                    onClick={handleClick}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        },
                    }}
                >
                    <ListItemText 
                        primary={
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold text-white">
                                    {Section[index].title}
                                </span>
                                <span className="text-sm text-blue-300 bg-blue-900 px-2 py-1 rounded-full">
                                    {Section[index].lessons.length} lessons
                                </span>
                            </div>
                        }
                        sx={{
                            '& .MuiListItemText-primary': {
                                color: 'white',
                            },
                        }}
                    />
                    {open ? (
                        <ExpandLess sx={{ color: '#60a5fa' }} />
                    ) : (
                        <ExpandMore sx={{ color: '#60a5fa' }} />
                    )}
                </ListItemButton>

                <Collapse in={open} timeout="auto" unmountOnExit>
                    <div className="p-4">
                        <LessonForm>
                            <h4 className="text-lg font-medium text-blue-300 mb-2">
                                Add New Lesson
                            </h4>
                            
                            <TextField
                                label="Lesson Name"
                                onChange={handleChange}
                                value={lessonName}
                                variant="outlined"
                                sx={textFieldStyles}
                                placeholder="e.g., Introduction to Components"
                            />
                            
                            <div className="flex flex-col sm:flex-row gap-4 items-start">
                                <Button
                                    component="label"
                                    variant="contained"
                                    startIcon={isUploading ? (
                                        <i className="fa-solid fa-spinner fa-spin"></i>
                                    ) : (
                                        <CloudUploadIcon />
                                    )}
                                    disabled={isUploading}
                                    sx={{
                                        background: 'linear-gradient(45deg, #6366f1, #4f46e5)',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #5b21b6, #4c1d95)',
                                        },
                                        '&:disabled': {
                                            background: 'rgba(75, 85, 99, 0.5)',
                                        },
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        flex: 1,
                                        '@media (max-width: 640px)': {
                                            width: '100%',
                                        },
                                    }}
                                >
                                    {isUploading ? 'Uploading...' : 'Upload File'}
                                    <VisuallyHiddenInput 
                                        type="file" 
                                        accept="video/*,application/pdf"
                                        onChange={handleFileChange}
                                        disabled={isUploading}
                                    />
                                </Button>
                                
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!url || !lessonName.trim() || isUploading}
                                    variant="contained"
                                    sx={{
                                        background: 'linear-gradient(45deg, #10b981, #059669)',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #059669, #047857)',
                                        },
                                        '&:disabled': {
                                            background: 'rgba(75, 85, 99, 0.5)',
                                        },
                                        borderRadius: '8px',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        minWidth: '100px',
                                    }}
                                >
                                    <i className="fa-solid fa-plus mr-2"></i>
                                    Add
                                </Button>
                            </div>
                            
                            {file && (
                                <div className="text-sm text-gray-300 bg-gray-800 p-2 rounded">
                                    <i className="fa-solid fa-file mr-2"></i>
                                    Selected: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                                </div>
                            )}
                        </LessonForm>

                        {Section[index].lessons.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-lg font-medium text-blue-300 mb-3">
                                    Lessons in this section
                                </h4>
                                {Section[index].lessons.map((lesson, lessonIndex) => (
                                    <LessonItem key={lessonIndex}>
                                        <LessonInfo>
                                            <a href={lesson.url} target="_blank" rel="noopener noreferrer">
                                                {lesson.url.indexOf("video") > -1 ? (
                                                    <i className="fa-solid fa-video"></i>
                                                ) : (
                                                    <i className="fa-solid fa-file-lines"></i>
                                                )}
                                            </a>
                                            <span className="text-white font-medium">
                                                {lesson.name}
                                            </span>
                                        </LessonInfo>
                                        
                                        <ButtonContainer>
                                            <Button
                                                href={lesson.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    borderColor: 'rgba(59, 130, 246, 0.5)',
                                                    color: '#60a5fa',
                                                    '&:hover': {
                                                        borderColor: '#60a5fa',
                                                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                                    },
                                                    textTransform: 'none',
                                                }}
                                            >
                                                <i className="fa-solid fa-external-link-alt mr-1"></i>
                                                Preview
                                            </Button>
                                            
                                            <IconButton
                                                onClick={() => handleDeleteLesson(lessonIndex, lesson.url)}
                                                size="small"
                                                sx={{
                                                    color: '#ef4444',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                                        color: '#dc2626',
                                                    },
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ButtonContainer>
                                    </LessonItem>
                                ))}
                            </div>
                        )}
                    </div>
                </Collapse>
            </List>
        </StyledCard>
    );
}