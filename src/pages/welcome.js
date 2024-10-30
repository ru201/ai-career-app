import React from 'react';
import Typewriter from 'typewriter-effect';
import '../App.css';
import { useDispatch } from 'react-redux';
import { enterName } from '../dataSlice';
import { Button, TextField } from '@mui/material';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Welcome () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const valueRef = useRef('');

    const handleSubmit = () => {
        dispatch(enterName(valueRef.current.value));
        navigate('/home');
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
    };

    const careers = [
        "Astronaut",
        "Physiotherapist",
        "Wildlife Biologist",
        "Film Director",
        "Architect",
        "Surgeon",
        "Lawyer",
        "Interior Designer",
        "Engineer",
        "Nuclear Physicist",
        "Chef",
        "Programmer",
        "Teacher"
    ];

    return (
        <div className='base'>
            <div className='main centered-div'>
                <div className='welcome-content centered-div'>
                    <h1>Welcome to <span className='app-name'>findmyfuture</span> </h1>
                    <p style={{marginBottom: '3em'}}>Your personal career advisor and self-discovery tool.</p>
                    <Typewriter
                        options={{
                            strings: careers,
                            autoStart: true,
                            loop: true,
                            wrapperClassName: 'typewriter-text',
                            cursorClassName: 'Typewriter__cursor typewriter-cursor'
                        }}
                    />
                    <p style={{marginTop: '3em'}}>Enter your name below to get started.</p>
                    <TextField
                        label="Your Name" 
                        variant="outlined" 
                        inputRef={valueRef}
                        onKeyDown={handleKeyDown} 
                        sx={{ width: 0.7, mt: 1 }}
                        InputProps={{ sx: { fontSize: '0.7em' }}}
                        InputLabelProps={{ sx: { fontSize: '0.7em' }}}
                    />    
                    <Button 
                        type="button" 
                        onClick={handleSubmit} 
                        variant="contained" 
                        sx={{ mt: 3, width: '15em', fontSize: '0.6em' }}
                        className='mui-button'
                    >    
                        Find Your Future
                    </Button>  
                </div>
            </div>
        </div>
    );
}