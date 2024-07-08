import React from "react";
import '../App.css';
import Header from '../components/header';
import Navbar from  '../components/navbar';
import { useSelector } from 'react-redux';

export default function Profile () {
    
    const interests = useSelector((state) => state.data.interests);
    const values= useSelector((state) => state.data.values);
    const skills = useSelector((state) => state.data.skills);

    console.log('interests: ', interests, 'values: ', values, 'skills: ', skills);

    return (
        <div id='profile' className='base'>
            <Header />
            <div className="main"></div>
            <Navbar />   
        </div>
    )

}
