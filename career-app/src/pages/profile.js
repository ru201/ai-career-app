import React from "react";
import '../App.css';
import Header from '../components/header';
import Navbar from  '../components/navbar';

export default function Profile () {

    return (
        <div id='profile' className='base'>
            <Header />
            <div className="main"></div>
            <Navbar />   
        </div>
    )

}
