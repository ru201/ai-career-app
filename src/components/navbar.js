import React from "react";
import '../App.css';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ChatIcon from '@mui/icons-material/Chat';

export default function Navbar () {

    const navigate = useNavigate();

    const handleClickHome = () => {
        navigate('/home');
    };

    const handleClickCareers = () => {
        navigate('/careers');
    };

    const handleClickProfile = () => {
        navigate('/profile');
    };

    const handleClickChat = () => {
        navigate('/chatbot');
    };

    const iconButtonStyle = {
        backgroundColor: 'transparent',
        "&:hover": {
            backgroundColor: 'transparent'
        }
    }

    const style = {
        width: '0.7em'
    };

    return (
        <div className='navbar'>
            <IconButton
                aria-label="home"
                onClick={handleClickHome}
                sx={iconButtonStyle}
            >
                <HomeIcon sx={style} />
            </IconButton>
            <IconButton
                aria-label="profile"
                onClick={handleClickProfile}
                sx={iconButtonStyle}
            >
                <AutoGraphIcon sx={style} />
            </IconButton>
            <IconButton
                aria-label="careers"
                onClick={handleClickCareers}
                sx={iconButtonStyle}
            >
                <WorkIcon sx={style} />
            </IconButton>
            <IconButton
                aria-label="chat"
                onClick={handleClickChat}
                sx={iconButtonStyle}
            >
                <ChatIcon sx={style} />
            </IconButton>
        </div>
    );

}