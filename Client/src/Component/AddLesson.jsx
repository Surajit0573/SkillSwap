import Navbar from "./Navbar";
import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import '../style/AddCourse.css';
import AddLessonCard from './AddLessonCard';
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./footer";

const StyledContainer = styled('div')(({ theme }) => ({
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    color: 'white',
}));

const ContentWrapper = styled('div')(({ theme }) => ({
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    '@media (max-width: 768px)': {
        padding: '1rem',
    },
}));

const FormContainer = styled('div')(({ theme }) => ({
    background: 'rgba(15, 23, 42, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    padding: '2rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '@media (max-width: 768px)': {
        padding: '1rem',
    },
}));

const SectionInputContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    alignItems: 'flex-start',
    '@media (max-width: 768px)': {
        flexDirection: 'column',
        gap: '1rem',
    },
}));

const SectionList = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
}));

const EmptyState = styled('div')(({ theme }) => ({
    textAlign: 'center',
    padding: '3rem 1rem',
    background: 'rgba(30, 41, 59, 0.3)',
    borderRadius: '12px',
    border: '2px dashed rgba(59, 130, 246, 0.3)',
    color: 'rgba(255, 255, 255, 0.6)',
    '& i': {
        fontSize: '3rem',
        marginBottom: '1rem',
        color: 'rgba(59, 130, 246, 0.5)',
    },
}));

export default function AddLesson() {
    const location = useLocation();
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [Section, setSection] = useState([]);
    const [title, setTitle] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        const { state } = location;
        if (!(state && state.id)) {
            toast.error("You have to create a course first");
            navigate('/addCourse');
            return;
        }
        setId(state.id);
    }, []);

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
        flex: 1,
        '@media (max-width: 768px)': {
            width: '100%',
        },
    };

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim().length === 0) {
            toast.error("Section title cannot be empty");
            return;
        }
        
        // Check for duplicate section titles
        if (Section.some(section => section.title.toLowerCase() === title.toLowerCase())) {
            toast.error("Section title already exists");
            return;
        }
        
        setSection([...Section, { title: title.trim(), lessons: [] }]);
        setTitle('');
        toast.success("Section added successfully");
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        
        if (Section.length === 0) {
            toast.error("Please add at least one section");
            return;
        }
        
        // Check if all sections have at least one lesson
        const emptySections = Section.filter(section => section.lessons.length === 0);
        if (emptySections.length > 0) {
            toast.error(`Please add lessons to: ${emptySections.map(s => s.title).join(', ')}`);
            return;
        }
        
        setIsCreating(true);
        
        try {
            console.log(Section);
            const response = await fetch(`${import.meta.env.VITE_URL}/api/courses/${id}/addLessons`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                withCredentials: true,
                body: JSON.stringify({ Section })
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
            }
            
            console.log(result.message);
            toast.success(result.message);
            navigate('/profile');
            
        } catch (error) {
            console.error('Error creating course:', error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <StyledContainer>
            <Navbar />
            <ContentWrapper>
                <FormContainer>
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                            Add Course Content
                        </h1>
                        <p className="text-gray-300">Organize your course into sections and lessons</p>
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-300 mb-4">
                            Add New Section
                        </label>
                        <SectionInputContainer>
                            <TextField
                                value={title}
                                onChange={handleChange}
                                label="Section Title"
                                variant="outlined"
                                sx={textFieldStyles}
                                placeholder="e.g., Introduction to React"
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSubmit(e);
                                    }
                                }}
                            />
                            <Button
                                onClick={handleSubmit}
                                variant="contained"
                                size="large"
                                disabled={!title.trim()}
                                sx={{
                                    background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #2563eb, #1e40af)',
                                    },
                                    '&:disabled': {
                                        background: 'rgba(75, 85, 99, 0.5)',
                                    },
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    padding: '12px 24px',
                                    '@media (max-width: 768px)': {
                                        width: '100%',
                                    },
                                }}
                            >
                                <i className="fa-solid fa-plus mr-2"></i>
                                Add Section
                            </Button>
                        </SectionInputContainer>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 text-blue-300">
                            Course Sections ({Section.length})
                        </h2>
                        
                        {Section.length === 0 ? (
                            <EmptyState>
                                <div>
                                    <i className="fa-solid fa-folder-open"></i>
                                </div>
                                <h3 className="text-lg font-medium mb-2">No sections yet</h3>
                                <p>Add your first section to start organizing your course content</p>
                            </EmptyState>
                        ) : (
                            <SectionList>
                                {Section.map((section, index) => (
                                    <AddLessonCard 
                                        key={index} 
                                        options={[Section, index, setSection]}
                                    />
                                ))}
                            </SectionList>
                        )}
                    </div>

                    {Section.length > 0 && (
                        <div className="flex justify-center pt-6 border-t border-gray-700">
                            <Button
                                variant="contained"
                                onClick={handleCreate}
                                disabled={isCreating || Section.length === 0}
                                size="large"
                                sx={{
                                    background: 'linear-gradient(45deg, #10b981, #059669)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #059669, #047857)',
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
                                {isCreating ? (
                                    <>
                                        <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                                        Creating Course...
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-check mr-2"></i>
                                        Create Course
                                    </>
                                )}
                            </Button>
                        </div>
                    )}
                </FormContainer>
            </ContentWrapper>
            
            <Footer />
            
        </StyledContainer>
    );
}