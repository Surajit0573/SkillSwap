import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
export default function LessonCard({name="Section",data=[{name:"Lesson"}]}) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

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
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
          {data.map((d)=>(
            <ListItemText primary={d.name} />
          ))}
            
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}