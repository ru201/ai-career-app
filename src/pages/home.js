import React from "react";
import '../App.css';
import Header from '../components/header';
import Navbar from  '../components/navbar';
import Activities from '../components/activities';
import { useSelector } from "react-redux";

export default function Home () {
    const name = useSelector((state) => state.data.name);
    console.log(name);
    return (
        <div id='home' className='base'>
            <Header />
            <div className="main">
                <div className="home-msg">
                    <h1>
                        Hi {name}!
                    </h1>
                    <h2>
                        Let's find your perfect career
                    </h2>
                    <p>
                        Complete the activities below to unlock your career recommendations and interests profile, then start a conversation with our friendly chat assistant for personalised advice.
                    </p>
                </div>
                <Activities />
            </div>
            <Navbar />    
        </div>
    );

}
