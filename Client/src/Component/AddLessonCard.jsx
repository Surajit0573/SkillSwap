import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import '../style/AddCourse.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState, useContext, useEffect } from 'react';
import { AppContext } from "../AppContext";
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
export default function LessonCard({ options }) {
    let Section = options[0];
    const index = options[1];
    let setSection = options[2];
    const [open, setOpen] = React.useState(false);
    const [lessonName, SetLessonName] = useState('');
    const { getUrl, deleteFile } = useContext(AppContext);
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const handleClick = () => {
        setOpen(!open);
    };

    useEffect(() => {
        async function update() {
            const currUrl = await getUrl(file);
            setUrl(currUrl);
        }
        if (file != null) {
            update();
        }
    }, [file]);

    function handleFileChange(e) {
        setFile(e.target.files[0]);
            deleteFile(url);

    }

    const handleChange = (e) => {
        SetLessonName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("name", lessonName, " url : ", url);
        Section[index].lessons.push({ name: lessonName, url: url });
        setSection([...Section]);
        SetLessonName('');
        setUrl('');
    }

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
    width: '80%',
}

return (
    <List
        sx={{
            bgcolor: ' #222831', marginTop: '10px', borderRadius: '10px',
        }}
        component="nav"
    >
        <ListItemButton onClick={handleClick}>
            <ListItemText primary={Section[index].title} />
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                    <div className="">
                        <div className='AddLessonForm'>
                            <div><TextField id="outlined-basic" label='Lesson Name' onChange={handleChange} value={lessonName} variant="outlined" sx={styles} className='inputtext' /></div>
                            <div><Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                onChange={handleFileChange}
                            >
                                Upload Lesson

                                <VisuallyHiddenInput type="file" />
                            </Button></div>
                            <div className='lessonAddButton'> <Button onClick={handleSubmit} disabled={!url} variant="contained" size="medium">ADD</Button></div>
                        </div>
                    </div>
                </ListItemButton>
            </List>

            {Section[index].lessons.length > 0 && Section[index].lessons.map((l, lessonIndex) => (
                <div className='singleCard' key={lessonIndex}>
                    <div>
                        <a href={l.url}>{l.url.indexOf("video") > -1 ? <i className="fa-solid fa-video"></i> : <i className="fa-solid fa-file-lines"></i>}</a>
                    </div>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={l.name} />
                    </ListItemButton>
                    <div>
                        <Button onClick={() => {
                            deleteFile(url);
                            Section[index].lessons.splice(lessonIndex, 1);
                            setSection([...Section]);
                        }}>Delete</Button>
                    </div>
                </div>
            ))}



        </Collapse>
    </List>
);
}