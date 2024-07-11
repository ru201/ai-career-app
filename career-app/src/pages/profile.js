import React from "react";
import '../App.css';
import Header from '../components/header';
import Navbar from  '../components/navbar';
import InterestChart from '../components/interestchart';
import { useSelector } from 'react-redux';

export default function Profile () {
    
    const interests = useSelector((state) => state.data.interestProfile);
    const values= useSelector((state) => state.data.valuesProfile);
    const skills = useSelector((state) => state.data.skillsProfile);

    console.log('interests: ', interests, 'values: ', values, 'skills: ', skills);

    // "careers": {"Json object that gives 10 careers that best suit the profile of the user based on their interests aptitudes and values. Give me a description, education level needed, weekly pay, future growth potential and main tasks for each career."}

    return (
        <div id='profile' className='base'>
            <Header />
            <div className="main bottom-margin">
                <div className="inner-content">
                    <h1>Your Profile</h1>
                    <h2>Interests</h2>
                    <InterestChart />
                </div>
            </div>
            <Navbar />   
        </div>
    )

}
