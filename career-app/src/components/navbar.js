import React from "react";
import '../App.css';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import PersonIcon from '@mui/icons-material/Person';

export default function Navbar () {

    const navigate = useNavigate();

    const handleClickHome = () => {
        navigate('/');
    };

    const handleClickCareers = () => {
        navigate('/careers');
    };

    const handleClickProfile = () => {
        navigate('/profile');
    };

    const iconButtonStyle = {
        backgroundColor: 'transparent',
        "&:hover": {
            backgroundColor: 'transparent'
        }
    }

    return (
        <div className='navbar'>
            <IconButton
                aria-label="home"
                onClick={handleClickHome}
                sx={iconButtonStyle}
            >
                <HomeIcon />
            </IconButton>
            <IconButton
                aria-label="profile"
                onClick={handleClickProfile}
                sx={iconButtonStyle}
            >
                <AutoGraphIcon />
            </IconButton>
            <IconButton
                aria-label="careers"
                onClick={handleClickCareers}
                sx={iconButtonStyle}
            >
                <WorkIcon />
            </IconButton>
            <IconButton
                aria-label="person"
                onClick={handleClickHome}
                sx={iconButtonStyle}
            >
                <PersonIcon />
            </IconButton>
        </div>
    );

}