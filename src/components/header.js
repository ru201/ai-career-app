import React from "react";
import '../App.css';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

export default function Header () {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/home');
    };

    const style = {
        width: '0.7em'
    };

    return (
        <div className='header'>
            <h3 className='app-name'>findmyfuture</h3>
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
                <PersonIcon sx={style} />
            </IconButton>
        </div>
    );

}



            