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
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-blue-500/20 hover:border-cyan-500/40 transition-all duration-300">
            <List
                sx={{
                    bgcolor: 'transparent',
                    '& .MuiListItemButton-root': {
                        '&:hover': {
                            bgcolor: 'rgba(6, 182, 212, 0.1)',
                        },
                    },
                    '& .MuiListItemText-primary': {
                        color: '#ffffff',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                    },
                    '& .MuiSvgIcon-root': {
                        color: '#06b6d4',
                    },
                }}
                component="nav"
            >
                <ListItemButton onClick={handleClick} sx={{ py: 2 }}>
                    <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                            {num}
                        </div>
                        <ListItemText primary={name} />
                    </div>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <div className="bg-black/30 backdrop-blur-sm">
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <div className="w-full space-y-2 py-2">
                                    {data?.map((lesson, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between bg-gray-800/30 hover:bg-cyan-600/20 px-4 py-3 rounded-lg transition-all duration-300 border border-gray-700/30 hover:border-cyan-500/30"
                                        >
                                            <div className="flex items-center gap-3">
                                                {lesson.url?.indexOf('video') > -1 ? (
                                                    <i className="fa-solid fa-play-circle text-cyan-400"></i>
                                                ) : (
                                                    <i className="fa-solid fa-file-lines text-blue-400"></i>
                                                )}
                                                <span className="text-white font-medium">
                                                    {lesson.name}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                                <i className="fa-solid fa-lock"></i>
                                                <span>5:23</span>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    {(!data || data.length === 0) && (
                                        <div className="text-center py-4 text-gray-500">
                                            No lessons in this module
                                        </div>
                                    )}
                                </div>
                            </ListItemButton>
                        </List>
                    </div>
                </Collapse>
            </List>
        </div>
    );
}
