import React from "react";
import '../App.css';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

export default function Header () {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/chatbot');
    };

    return (
        <div className='header'>
            <h3 className='app-name'>myfuture</h3>
            <IconButton
                aria-label="chat"
                onClick={handleClick}
                sx={{
                    backgroundColor: 'transparent',
                    "&:hover": {
                        backgroundColor: 'transparent'
                    }
                }}
            >
                <ChatIcon />
            </IconButton>
        </div>
    );

}



            