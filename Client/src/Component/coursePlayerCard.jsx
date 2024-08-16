import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { NavLink } from 'react-router-dom';
export default function LessonCard({ name, data, num, id }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  function extractCloudinaryPath(url) {
    if(url&&url.length>0){
      console.log("URL : ",url);
    console.log(url);
    const dotParts = url.split('.');
    const secondLastPart = dotParts[dotParts.length - 2];
    const parts = secondLastPart.split('/');
    const extractedPath = parts.slice(-2).join('/');
    return extractedPath;
    }
  }


  return (
    <List
      sx={{
        bgcolor: '#31363F', marginTop: '10px', borderRadius: '10px', '&:hover': {
          bgcolor: '#1976d2', // Change this to your desired hover color
        },
      }}
      component="nav"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={num + ". " + name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <div className='flex flex-col w-full'>
              {data.map((d, index) => (
                <NavLink to="/coursePlayer" state={{ id, publicId: extractCloudinaryPath(d.url) }} key={index}><div className='flex my-2 justify-between hover:bg-blue-400 p-4 rounded-md'>
                  <p>{d.url.indexOf("video") > -1 ? <i className="fa-solid fa-video"></i> : <i className="fa-solid fa-file-lines"></i>}<span className='mx-4'>{d.name}</span></p>
                  <p>5:23 min</p>
                </div></NavLink>
              ))}
            </div>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}