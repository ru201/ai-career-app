import React from "react";
import '../App.css';
import Header from '../components/header';
import Navbar from  '../components/navbar';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function Career () {

    const { careerTitle } = useParams(); 

    const careers = useSelector((state) => state.data.careers);

    // const growthRate = careers[careerTitle]['future-growth'];
    // const growthRating = 'Moderate Growth';

    // if (growthRate < 0) {
    //     growthRating = 'Declining job market, as jobs become less available.';
    // } else if (growthRate >= 0 && growthRate <= 1.9) {
    //     growthRating = 'Slow growth with minimal expansion. The job market may be relatively stable with limited job opportunities.';
    // } else if (growthRate >= 2 && growthRate <= 4.9) {
    //     growthRating = 'Moderate growth rate with a stable and sustainable increase in employment the next 5 years.';
    // } else if (growthRate >= 5 && growthRate <= 9.9) {
    //     growthRating = 'Strong growth signifying a steady expansion and a robust increase in new jobs in the next 5 years.';
    // } else if (growthRate >= 10) {
    //     growthRating = 'Very strong growth indicating rapid expansion in the field resulting in many new job opportunities.';
    // }

    
    return (
        <div id='careers' className='base'>
            <Header />
            <div className="main">
                <div className="inner-content">
                    <h1>{careerTitle}</h1>
                    <p>{careers[careerTitle]['description']}</p>
                    <h2>Why This Career Fits You</h2>
                    <p>{careers[careerTitle]['explanation']}</p>
                    <h2>Recommended Qualifications</h2>
                    <p>{careers[careerTitle]['education-level']}</p>
                    <h2>Weekly Pay</h2>
                    <p style={{fontSize: '0.9em'}}>{careers[careerTitle]['weekly-pay']}</p>
                    <p>{careers[careerTitle]['pay-rating']}</p>
                    <h2>Main Tasks</h2>
                    <ul>
                        {
                            careers[careerTitle]['main-tasks'].map((task) => {return <li>{task}</li>})
                        }
                    </ul>
                    <h2>Future Growth</h2>
                    <p style={{fontSize: '0.9em'}}>{careers[careerTitle]['future-growth']}%</p>
                    <p>Projected employment growth rate in the next 5 years. <br /><br /> {careers[careerTitle]['growth-rating']}</p>
                    <h2>Related Careers</h2>
                    <ul>
                        {
                            careers[careerTitle]['related-careers'].map((career) => {return <li>{career}</li>})
                        }
                    </ul>
                    <h2>More Information</h2>
                    <ol>
                        {
                            careers[careerTitle]['links'].map((link) => {return <li><a href={link} target="_blank" rel="noreferrer">{link}</a></li>})
                        }
                    </ol>
                </div>
            </div>
            <Navbar />   
        </div>
    );
}
