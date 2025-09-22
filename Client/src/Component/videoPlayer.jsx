import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import cloudinary from 'cloudinary-video-player';
import 'cloudinary-video-player/cld-video-player.min.css';

const PlayerContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    background: '#000',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    
    '& .cld-video-player': {
        width: '100% !important',
        height: '100% !important',
        borderRadius: '12px',
    },
    
    '& .vjs-poster': {
        backgroundSize: 'cover !important',
        backgroundPosition: 'center !important',
    },
    
    '& .video-js': {
        width: '100% !important',
        height: '100% !important',
        borderRadius: '12px',
    },
    
    '& .vjs-big-play-button': {
        fontSize: '2.5em',
        lineHeight: '1.5em',
        height: '1.5em',
        width: '3em',
        borderRadius: '50%',
        background: 'rgba(59, 130, 246, 0.9)',
        border: 'none',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        transition: 'all 0.2s ease',
        
        '&:hover': {
            background: 'rgba(59, 130, 246, 1)',
            transform: 'translate(-50%, -50%) scale(1.1)',
        },
    },
    
    '& .vjs-control-bar': {
        background: 'linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.7))',
        backdropFilter: 'blur(10px)',
        height: '4rem',
        
        '@media (max-width: 768px)': {
            height: '3.5rem',
        },
    },
    
    '& .vjs-progress-control': {
        '& .vjs-progress-holder': {
            height: '6px',
            borderRadius: '3px',
            
            '& .vjs-load-progress': {
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '3px',
            },
            
            '& .vjs-play-progress': {
                background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
                borderRadius: '3px',
                
                '&:before': {
                    color: '#60a5fa',
                    fontSize: '1.2em',
                    textShadow: '0 0 1em rgba(96, 165, 250, 0.5)',
                },
            },
        },
    },
    
    '& .vjs-volume-panel': {
        '& .vjs-volume-control': {
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '4px',
        },
    },
    
    '& .vjs-button': {
        '& .vjs-icon-placeholder:before': {
            fontSize: '1.8em',
            lineHeight: '1.67',
            
            '@media (max-width: 768px)': {
                fontSize: '1.5em',
            },
        },
    },
    
    '& .vjs-current-time, & .vjs-time-divider, & .vjs-duration': {
        display: 'block',
        fontSize: '1em',
        lineHeight: '2',
        
        '@media (max-width: 768px)': {
            fontSize: '0.9em',
        },
    },
    
    '@media (max-width: 768px)': {
        borderRadius: '8px',
        
        '& .cld-video-player, & .video-js': {
            borderRadius: '8px',
        },
    },
}));

const QualitySelector = styled(FormControl)(({ theme }) => ({
    position: 'absolute',
    top: '16px',
    right: '16px',
    zIndex: 10,
    minWidth: 120,
    
    '& .MuiInputLabel-root': {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '0.875rem',
        '&.Mui-focused': {
            color: '#60a5fa',
        },
    },
    
    '& .MuiOutlinedInput-root': {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '8px',
        
        '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.3)',
        },
        
        '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
        },
        
        '&.Mui-focused fieldset': {
            borderColor: '#60a5fa',
        },
        
        '& .MuiSelect-select': {
            color: 'white',
            fontSize: '0.875rem',
            padding: '8px 14px',
        },
        
        '& .MuiSelect-icon': {
            color: 'rgba(255, 255, 255, 0.7)',
        },
    },
    
    '& .MuiPaper-root': {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '8px',
    },
    
    '& .MuiMenuItem-root': {
        color: 'white',
        fontSize: '0.875rem',
        
        '&:hover': {
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
        },
        
        '&.Mui-selected': {
            backgroundColor: 'rgba(59, 130, 246, 0.3)',
            '&:hover': {
                backgroundColor: 'rgba(59, 130, 246, 0.4)',
            },
        },
    },
    
    '@media (max-width: 768px)': {
        top: '12px',
        right: '12px',
        minWidth: 100,
        
        '& .MuiOutlinedInput-root .MuiSelect-select': {
            padding: '6px 10px',
            fontSize: '0.8rem',
        },
        
        '& .MuiInputLabel-root': {
            fontSize: '0.8rem',
        },
    },
}));

const LoadingOverlay = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: '12px',
    zIndex: 5,
    
    '& .loading-content': {
        textAlign: 'center',
        color: 'white',
        
        '& i': {
            fontSize: '3rem',
            color: '#60a5fa',
            marginBottom: '1rem',
            animation: 'spin 1s linear infinite',
        },
        
        '& p': {
            fontSize: '1.1rem',
            opacity: 0.8,
        },
    },
    
    '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
    },
    
    '@media (max-width: 768px)': {
        borderRadius: '8px',
        
        '& .loading-content i': {
            fontSize: '2rem',
        },
        
        '& .loading-content p': {
            fontSize: '1rem',
        },
    },
}));

const VideoPlayer = ({ id, publicId, ...props }) => {
    console.log("VideoPlayer - publicId:", publicId);
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const [quality, setQuality] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        try {
            setIsLoading(true);
            setError(false);
            
            // Clean up existing player
            if (playerRef.current) {
                try {
                    playerRef.current.dispose();
                } catch (err) {
                    console.warn('Error disposing player:', err);
                }
                playerRef.current = null;
            }

            const videoElement = videoRef.current;
            if (!videoElement || !publicId) {
                setIsLoading(false);
                return;
            }

            // Initialize the Cloudinary video player
            const player = cloudinary.videoPlayer(videoElement, {
                cloud_name: import.meta.env.VITE_CLOUDNAME,
                secure: true,
                controls: true,
                fluid: true,
                playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
                seekThumbnails: true,
                bigPlayButton: true,
                posterOptions: {
                    transformation: {
                        startOffset: 'auto',
                    },
                },
                colors: {
                    accent: '#60a5fa',
                    base: '#ffffff',
                },
            });

            // Set up event listeners
            player.on('loadstart', () => {
                setIsLoading(true);
            });
            
            player.on('canplay', () => {
                setIsLoading(false);
            });
            
            player.on('error', (e) => {
                console.error('Player error:', e);
                setError(true);
                setIsLoading(false);
            });

            // Set the video source
            const sourceOptions = {
                transformation: quality ? { quality } : {},
            };
            
            player.source(publicId, sourceOptions);
            
            playerRef.current = player;

        } catch (err) {
            console.error('Error initializing player:', err);
            setError(true);
            setIsLoading(false);
        }
    }, [publicId, quality]);

    useEffect(() => {
        return () => {
            // Clean up the player on component unmount
            try {
                if (playerRef.current) {
                    playerRef.current.dispose();
                    playerRef.current = null;
                }
            } catch (err) {
                console.warn('Error cleaning up player:', err);
            }
        };
    }, []);

    const handleQualityChange = (event) => {
        setQuality(event.target.value);
    };

    if (error) {
        return (
            <PlayerContainer>
                <div className="flex items-center justify-center h-full text-center text-red-400">
                    <div>
                        <i className="fa-solid fa-exclamation-triangle text-4xl mb-4"></i>
                        <p className="text-lg">Unable to load video</p>
                        <p className="text-sm opacity-70">Please try again later</p>
                    </div>
                </div>
            </PlayerContainer>
        );
    }

    return (
        <PlayerContainer>
            <video
                ref={videoRef}
                id={id}
                className="cld-video-player cld-fluid"
                {...props}
            />
            
            {isLoading && (
                <LoadingOverlay>
                    <div className="loading-content">
                        <i className="fa-solid fa-spinner"></i>
                        <p>Loading video...</p>
                    </div>
                </LoadingOverlay>
            )}
            
            <QualitySelector size="small">
                <InputLabel id="quality-select-label">Quality</InputLabel>
                <Select
                    labelId="quality-select-label"
                    id="quality-select"
                    value={quality}
                    label="Quality"
                    onChange={handleQualityChange}
                >
                    <MenuItem value="">
                        <em>Auto</em>
                    </MenuItem>
                    <MenuItem value="auto:low">Low (360p)</MenuItem>
                    <MenuItem value="auto:eco">Eco (480p)</MenuItem>
                    <MenuItem value="auto:good">Good (720p)</MenuItem>
                    <MenuItem value="auto:best">Best (1080p)</MenuItem>
                </Select>
            </QualitySelector>
        </PlayerContainer>
    );
};

export default VideoPlayer;