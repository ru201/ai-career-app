import React from "react";
import '../App.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { GenerateCareers } from "../helpers";

export default function Activities() {

    const interestsComplete = useSelector((state) => state.data.interestsComplete);
    const valuesComplete = useSelector((state) => state.data.valuesComplete);
    const skillsComplete = useSelector((state) => state.data.skillsComplete);

    const interests = useSelector((state) => state.data.interests);
    const values = useSelector((state) => state.data.values);
    const skills = useSelector((state) => state.data.skills);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const buttonStyle = { width: '230px', borderRadius: 3 };
    const completeButtonStyle = { width: '230px', borderRadius: 3, backgroundColor: '#33B249', '&:hover': {backgroundColor: '#2CA740'} };

    // Check if all activities are completed
    const allActivitiesComplete = interestsComplete && valuesComplete && skillsComplete;

    console.log('interestsComplete: ', interestsComplete, 'valuesComplete: ', valuesComplete, 'skillsComplete: ', skillsComplete);

    const handleUnlock = () => {
        GenerateCareers(interests, skills, values, dispatch);
        navigate('/profile');
    }

    return (
        <div className='activities'>
            <Button onClick={() => { navigate('/interests')}} sx={interestsComplete ? completeButtonStyle : buttonStyle} variant="contained">Interest Discovery</Button>
            <Button onClick={() => { navigate('/values')}} sx={valuesComplete ?  completeButtonStyle : buttonStyle} variant="contained">Career Values</Button>
            <Button onClick={() => {navigate('/skills')}} sx={skillsComplete ? completeButtonStyle : buttonStyle} variant="contained">Skills Discovery</Button>
            <Button onClick={handleUnlock} sx={buttonStyle} variant="contained" disabled={!allActivitiesComplete}>Unlock Your Profile</Button>
        </div>
    );
}
