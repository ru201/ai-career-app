import React from "react";
import '../App.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Activities () {

    const navigate = useNavigate();
    
    const buttonStyle = {width: '230px', borderRadius: 3}

    return (
        <div className='activities'>
            <Button onClick={() => navigate('/interests')} sx={buttonStyle}variant="contained">Interest Discovery</Button>
            <Button onClick={() => navigate('/careers')} sx={buttonStyle}variant="contained">Career Values</Button>
            <Button onClick={() => navigate('/skills')} sx={buttonStyle}variant="contained">Skills Discovery</Button>
            <Button onClick={() => navigate('/subjects')} sx={buttonStyle}variant="contained">Favourite Subjects</Button>
        </div>
    );

}