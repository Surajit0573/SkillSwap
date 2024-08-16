import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function LessonCard({ name, data, num }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{
        bgcolor: '#31363F',
        marginTop: '10px',
        borderRadius: '10px',
        '&:hover': {
          bgcolor: '#1976d2',
        },
      }}
      component="nav"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={`${num}. ${name}`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <div className="flex flex-col w-full">
              {data.map((d, index) => (
                <div
                  key={index}
                  className="flex my-2 justify-between hover:bg-blue-400 px-4 py-2 rounded-md"
                >
                  <p>
                    {d.url.indexOf('video') > -1 ? (
                      <i className="fa-solid fa-video"></i>
                    ) : (
                      <i className="fa-solid fa-file-lines"></i>
                    )}
                    <span className="mx-4">{d.name}</span>
                  </p>
                  <p>
                    <i className="fa-solid fa-lock mx-4"></i> 5:23 min
                  </p>
                </div>
              ))}
            </div>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
