import React from "react";
import '../App.css';
import Header from '../components/header';
import Navbar from  '../components/navbar';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button'; 
import { useNavigate } from "react-router-dom";

export default function Careers () {

    const interestsComplete = useSelector((state) => state.data.interestsComplete);
    const valuesComplete = useSelector((state) => state.data.valuesComplete);
    const skillsComplete = useSelector((state) => state.data.skillsComplete);

    const careers = useSelector((state) => state.data.careers);
    console.log(careers);

    const navigate = useNavigate();
    
    const allActivitiesComplete = interestsComplete && valuesComplete && skillsComplete;

    const buttonStyle = { 
        width: '250px', 
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 3, 
        textTransform: 'capitalize', 
        backgroundColor: '#EFEEFD', 
        color: 'black', 
        fontWeight: 'normal',
        '&:hover': { backgroundColor: '#B0AEE0' }, 
    };

    return (
        <div id='careers' className='base'>
            <Header />
            <div className="main bottom-margin">
                <div className="inner-content">
                    <h1>Your Careers</h1>
                    {allActivitiesComplete && Object.keys(careers).length > 0 ? (
                        <>
                            <h2>Explore your careers</h2>
                            <p>
                                Find your personalised career suggestions below. Select them to learn more about each career.
                            </p>
                            <div className="career-buttons">
                                {Object.keys(careers).map(career => (
                                    <Button onClick={() => {navigate(`/careers/${career}`)}} sx={buttonStyle} key={career} variant="contained">{career}
                                </Button>
                                ))}
                            </div>
                        </>
                    ) : allActivitiesComplete && Object.keys(careers).length === 0 ? (
                        <>
                            <h2>Loading Careers...</h2>
                        </>
                    ) : (
                        <>
                            <h2>Activities Incomplete</h2>
                            <p>Please complete all activities to see your career recommendations.</p>
                        </>
                    )}  
                </div>
            </div>
            <Navbar />   
        </div>
    );
}
