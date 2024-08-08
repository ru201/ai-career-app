import React from "react";
import '../App.css';
import Header from '../components/header';
import Navbar from  '../components/navbar';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button'; 
import { useNavigate } from "react-router-dom";
import NavButton from '../components/navButton';
import ReactLoading from "react-loading";

export default function Careers () {

    const interestsComplete = useSelector((state) => state.data.interestsComplete);
    const valuesComplete = useSelector((state) => state.data.valuesComplete);
    const skillsComplete = useSelector((state) => state.data.skillsComplete);

    const careers = useSelector((state) => state.data.careers);
    console.log(careers);

    const navigate = useNavigate();
    
    const allActivitiesComplete = interestsComplete && valuesComplete && skillsComplete;

    const buttonStyle = { 
        width: 0.8, 
        paddingTop: 1.3,
        paddingBottom: 1.3,
        borderRadius: 3, 
        textTransform: 'capitalize', 
        backgroundColor: '#EFEEFD', 
        color: 'black', 
        fontWeight: 'normal',
        fontSize: '0.7em',
        '&:hover': { backgroundColor: '#B0AEE0' }, 
    };

    const navButtonStyle = {
        width: 0.6, 
        borderRadius: 3, 
        fontSize: '0.55em',
        marginTop: '2em'
    }

    return (
        <div id='careers' className='base'>
            <Header />
            <div className="main">
                <div className="inner-content">
                    <h1>Your Careers</h1>
                    {allActivitiesComplete && Object.keys(careers).length > 0 ? (
                        <>
                            <h2>Explore your careers</h2>
                            <p>
                                Find your personalised career suggestions below.
                                <br/><br/>
                                Don't feel limited by these options, they are simply career possibilities you may likely align with at this point in your life.
                                <br/><br/>
                                <span className="color-text">Select a career to learn more.</span>
                            </p>
                            <div className="career-buttons">
                                {Object.keys(careers).map(career => (
                                    <Button onClick={() => {navigate(`/careers/${career}`)}} sx={buttonStyle} key={career} variant="contained">
                                        {career}
                                    </Button>
                                ))}
                            </div>
                            <div className="centered-div submit-button-div">
                                <NavButton variant={'contained'} text={'Your Chat Assistant'} route={'/chatbot'} style={navButtonStyle} />
                            </div>
                        </>
                    ) : allActivitiesComplete && Object.keys(careers).length === 0 ? (
                        <div className="centered-div">
                            <ReactLoading type="cylon" color="#0E4C92" height={100} width={50} />
                        </div>
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
