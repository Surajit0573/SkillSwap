import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useRef, useState } from 'react';
import cloudinary from 'cloudinary-video-player';
import 'cloudinary-video-player/cld-video-player.min.css';

const VideoPlayer = ({ id, publicId, ...props }) => {
    console.log("I am HERE : ", publicId);
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const [quality, setQuality] = useState('');

    useEffect(() => {
        try {
            // Initialize the Cloudinary video player
            if (!playerRef.current) {
                const videoElement = videoRef.current;

                if (!videoElement) return;

                const player = playerRef.current = cloudinary.videoPlayer(videoElement, {
                    cloud_name: import.meta.env.VITE_CLOUDNAME,
                    secure: true,
                    controls: true,
                    playbackRates: [0.5, 1, 1.25, 1.5, 2],
                });

                player.source(publicId, { transformation: { quality } });

            } else {
                // Update the player source and quality if the component is re-rendered
                const player = playerRef.current;
                player.source(publicId, { transformation: { quality } });
            }
        } catch (err) {
            console.error(err);
        }
    }, [publicId, quality]);

    useEffect(() => {

        const player = playerRef.current;

        return () => {
            try {
                // Clean up the player on component unmount
                if (player) {
                    player.destroy();
                    playerRef.current = null;
                }
            } catch (err) {
                console.error(err);
            }
        };

    }, []);

    const handleQualityChange = (event) => {
        setQuality(event.target.value);
    };

    const colorStyle = {
        zIndex: 10,
        color: 'white',
        '& .MuiInputLabel-root': {
            color: 'white',
            '&:hover': {
                color: 'white',
            },
        },
        '& .MuiSelect-root': {
            color: 'white',
            '&:hover': {
                color: 'white',
            },
        },
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
        },
        '& .MuiMenuItem-root': {
            color: 'white',
            '&:hover': {
                color: 'white',
            },
        },
        '& .MuiList-root': {
            backgroundColor: '#333',
        },
        '& .MuiSelect-icon': {
            color: 'white',
            '&:hover': {
                color: 'white',
            },
        },
    };

    const styles = {
        m: 1,
        minWidth: 120,
        position: 'absolute',
        top: 0,
        right: 0,
    };
    return (
        <Typography
            component="div"
            variant="body1"
            style={{
                height: '100%',
                width: '100%',
                position: 'relative',
            }}
        >
            <Box sx={{ position: 'relative' }}>
                <video
                    ref={videoRef}
                    id={id}
                    className="cld-video-player cld-fluid"
                    {...props}
                />
                <FormControl sx={styles} size="small">
                    <InputLabel id="quality-select-label" sx={colorStyle}>Quality</InputLabel>
                    <Select
                        labelId="quality-select-label"
                        id="quality-select"
                        value={quality}
                        label="Quality"
                        onChange={handleQualityChange}
                        sx={colorStyle}
                    >
                        <MenuItem value="">
                            <em>Auto</em>
                        </MenuItem>
                        <MenuItem value="auto:low">Low</MenuItem>
                        <MenuItem value="auto:eco">Eco</MenuItem>
                        <MenuItem value="auto:good">Good</MenuItem>
                        <MenuItem value="auto:best">Best</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Typography>
    );
};

export default VideoPlayer;
