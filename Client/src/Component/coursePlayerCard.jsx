import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { NavLink, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledCard = styled('div')(({ theme }) => ({
  background: 'rgba(15, 23, 42, 0.6)',
  borderRadius: '16px',
  border: '1px solid rgba(139, 92, 246, 0.2)',
  marginBottom: '12px',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(12px)',
  '&:hover': {
    borderColor: 'rgba(139, 92, 246, 0.4)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(139, 92, 246, 0.15)',
  },
}));

const SectionHeader = styled(ListItemButton)(({ theme }) => ({
  padding: '20px',
  borderRadius: '16px',
  '&:hover': {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
  },
}));

const LessonContainer = styled('div')(({ theme }) => ({
  padding: '8px 20px 20px 20px',
  background: 'rgba(15, 23, 42, 0.4)',
  borderRadius: '0 0 16px 16px',
}));

const LessonItem = styled('div')(({ theme, isActive }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 20px',
  margin: '6px 0',
  borderRadius: '12px',
  border: isActive ? '2px solid rgba(139, 92, 246, 0.6)' : '1px solid rgba(71, 85, 105, 0.3)',
  background: isActive 
    ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.15))' 
    : 'rgba(30, 41, 59, 0.4)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent)',
    transition: 'left 0.5s ease',
  },
  
  '&:hover': {
    background: isActive 
      ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.2))' 
      : 'rgba(139, 92, 246, 0.15)',
    borderColor: isActive ? 'rgba(139, 92, 246, 0.8)' : 'rgba(139, 92, 246, 0.5)',
    transform: 'translateX(6px)',
    boxShadow: '0 4px 15px rgba(139, 92, 246, 0.2)',
    
    '&::before': {
      left: '100%',
    },
  },
  
  '@media (max-width: 768px)': {
    padding: '12px 16px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px',
  },
}));

const LessonInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  flex: 1,
  minWidth: 0,
  
  '& .lesson-icon': {
    fontSize: '20px',
    minWidth: '24px',
    textAlign: 'center',
    padding: '8px',
    borderRadius: '8px',
    background: 'rgba(139, 92, 246, 0.2)',
  },
  
  '& .lesson-name': {
    color: 'white',
    fontWeight: 600,
    fontSize: '0.95rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: 1,
    lineHeight: 1.4,
  },
  
  '@media (max-width: 768px)': {
    width: '100%',
    gap: '12px',
    '& .lesson-icon': {
      padding: '6px',
    },
    '& .lesson-name': {
      fontSize: '0.9rem',
      whiteSpace: 'normal',
      overflow: 'visible',
    },
  },
}));

const LessonDuration = styled('div')(({ theme }) => ({
  color: 'rgba(248, 250, 252, 0.8)',
  fontSize: '0.85rem',
  fontWeight: 600,
  background: 'rgba(139, 92, 246, 0.25)',
  padding: '6px 12px',
  borderRadius: '20px',
  minWidth: 'fit-content',
  border: '1px solid rgba(139, 92, 246, 0.3)',
  
  '@media (max-width: 768px)': {
    alignSelf: 'flex-end',
    fontSize: '0.8rem',
    padding: '4px 10px',
  },
}));

const SectionTitle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  
  '& .section-info': {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
  },
  
  '& .section-icon': {
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '18px',
  },
  
  '& .section-name': {
    color: 'white',
    fontWeight: 700,
    fontSize: '1.1rem',
    flex: 1,
    textAlign: 'left',
  },
  
  '& .lesson-count': {
    color: '#a855f7',
    fontSize: '0.85rem',
    background: 'rgba(139, 92, 246, 0.2)',
    padding: '6px 12px',
    borderRadius: '16px',
    fontWeight: 600,
    border: '1px solid rgba(139, 92, 246, 0.3)',
    minWidth: 'fit-content',
  },
  
  '@media (max-width: 768px)': {
    '& .section-name': {
      fontSize: '1rem',
    },
    '& .section-icon': {
      width: '36px',
      height: '36px',
      fontSize: '16px',
    },
  },
}));

const ActiveIndicator = styled('div')({
  position: 'absolute',
  right: '16px',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
  animation: 'pulse 2s infinite',
  
  '@keyframes pulse': {
    '0%, 100%': {
      opacity: 1,
      transform: 'translateY(-50%) scale(1)',
    },
    '50%': {
      opacity: 0.5,
      transform: 'translateY(-50%) scale(1.2)',
    },
  },
});

export default function LessonCard({ name, data, num, id }) {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const currentPublicId = location.state?.publicId;

  const handleClick = () => {
    setOpen(!open);
  };

  function extractCloudinaryPath(url) {
    if (url && url.length > 0) {
      console.log("URL : ", url);
      const dotParts = url.split('.');
      const secondLastPart = dotParts[dotParts.length - 2];
      const parts = secondLastPart.split('/');
      const extractedPath = parts.slice(-2).join('/');
      return extractedPath;
    }
    return null;
  }

  // Enhanced duration estimation with more variety
  const getEstimatedDuration = (url, index) => {
    if (url.includes('video')) {
      const durations = ['5:30', '8:45', '12:20', '15:10', '7:55', '10:30', '6:15', '14:45'];
      return durations[index % durations.length];
    }
    const pages = [5, 8, 12, 15, 7, 10, 6, 14];
    return `${pages[index % pages.length]} pages`;
  };

  return (
    <StyledCard>
      <List component="nav" sx={{ padding: 0 }}>
        <SectionHeader onClick={handleClick} disableRipple>
          <ListItemText
            primary={
              <SectionTitle>
                <div className="section-info">
                  <div className="section-icon">
                    <svg fill="currentColor" viewBox="0 0 20 20" style={{ width: '20px', height: '20px' }}>
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <span className="section-name">
                    {num}. {name}
                  </span>
                </div>
                <span className="lesson-count">
                  {data.length} lesson{data.length !== 1 ? 's' : ''}
                </span>
              </SectionTitle>
            }
          />
          <div style={{ marginLeft: '12px' }}>
            {open ? (
              <ExpandLess sx={{ 
                color: '#8b5cf6', 
                fontSize: '28px',
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'scale(1.1)' }
              }} />
            ) : (
              <ExpandMore sx={{ 
                color: '#8b5cf6', 
                fontSize: '28px',
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'scale(1.1)' }
              }} />
            )}
          </div>
        </SectionHeader>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <LessonContainer>
            {data.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <div className="w-20 h-20 bg-slate-700/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-lg font-medium">No lessons available</p>
                <p className="text-sm mt-1">This section is being prepared</p>
              </div>
            ) : (
              data.map((lesson, index) => {
                const lessonPublicId = extractCloudinaryPath(lesson.url);
                const isActive = currentPublicId === lessonPublicId;
                const isVideo = lesson.url.indexOf("video") > -1;
                
                return (
                  <NavLink
                    to="/coursePlayer"
                    state={{ id, publicId: lessonPublicId }}
                    key={index}
                    style={{ textDecoration: 'none' }}
                  >
                    <LessonItem isActive={isActive}>
                      <LessonInfo>
                        <div className={`lesson-icon ${isVideo ? 'text-red-400' : 'text-blue-400'}`}>
                          {isVideo ? (
                            <svg fill="currentColor" viewBox="0 0 20 20" style={{ width: '16px', height: '16px' }}>
                              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                            </svg>
                          ) : (
                            <svg fill="currentColor" viewBox="0 0 20 20" style={{ width: '16px', height: '16px' }}>
                              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"/>
                            </svg>
                          )}
                        </div>
                        <span className="lesson-name" title={lesson.name}>
                          {lesson.name}
                        </span>
                      </LessonInfo>
                      
                      <div className="flex items-center gap-3">
                        <LessonDuration>
                          {getEstimatedDuration(lesson.url, index)}
                        </LessonDuration>
                        
                        {isActive && (
                          <div className="relative">
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
                              </svg>
                            </div>
                            <ActiveIndicator />
                          </div>
                        )}
                      </div>
                      
                      {/* Progress indicator for completed lessons */}
                      {!isActive && Math.random() > 0.7 && (
                        <div className="absolute top-3 right-3">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                            </svg>
                          </div>
                        </div>
                      )}
                    </LessonItem>
                  </NavLink>
                );
              })
            )}
          </LessonContainer>
        </Collapse>
      </List>
    </StyledCard>
  );
}