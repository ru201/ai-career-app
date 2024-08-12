import React, { useState } from "react";
import '../App.css';
import Header from '../components/header';
import Navbar from  '../components/navbar';
import { useSelector } from 'react-redux';
import BarChart from "../components/barchart";
import ValuesChart from "../components/valueschart";
import SkillsChart from "../components/skillschart";
import ProfileDescription from "../components/profiledescription";
import NavButton from "../components/navButton";
import ReactLoading from "react-loading";

export default function Profile () {
    
    const interests = useSelector((state) => state.data.interestProfile);
    const values= useSelector((state) => state.data.valuesProfile);
    const skills = useSelector((state) => state.data.skillsProfile);

    const interestsComplete = useSelector((state) => state.data.interestsComplete);
    const valuesComplete = useSelector((state) => state.data.valuesComplete);
    const skillsComplete = useSelector((state) => state.data.skillsComplete);

    const [selectedInterest, setSelectedInterest] = useState('Creative');
    const [selectedValue, setSelectedValue] = useState('Job Stability');
    const [selectedSkill, setSelectedSkill] = useState('Building');

    const descriptions = {
        "Creative": "Creative interests involve art, design, language, and self-expression. Creatives thrive in unstructured environments, crafting unique and innovative work.",
        "Analytical": "Analytical individuals excel in problem-solving and data analysis. They enjoy dissecting complex issues and finding logical solutions.",
        "Leadership": "Leadership includes guiding, motivating, and managing others. Leaders shine in roles requiring decision-making and team direction.",
        "Scientific": "Scientific interest lies in research, experiments, and understanding how things work in the natural world. Scientists thrive on discovery and exploration.",
        "Social": "Social individuals enjoy interacting with others, building relationships, and working collaboratively towards common goals. They excel in team-oriented environments.",
        "Physical": "Physical activities involve hands-on tasks and movement. Those inclined towards physical work enjoy using their bodies and skills to accomplish tangible goals.",
        "Organisational": "Organisational interests include planning, coordinating, and managing tasks efficiently. Organisers thrive in structured environments where order and detail are critical.",
        "Entrepreneurial": "Entrepreneurship involves starting new ventures, taking risks, and innovating in business. Entrepreneurs thrive in dynamic environments, driven by creativity and ambition.",
        "Job Stability": "Job stability is about seeking secure and predictable career paths with long-term prospects and financial security.",
        "Work-life Balance": "Work-life balance prioritises having time for both work and personal life, ensuring well-being and fulfillment in both areas.",
        "Personal Growth": "Personal growth involves continuous learning, skill development, and expanding one's knowledge and capabilities.",
        "Autonomy": "Autonomy means preferring independence in decision-making and work style, enjoying freedom and self-direction in tasks and responsibilities.",
        "Purpose Driven": "Being purpose-driven involves finding meaning and fulfillment in work that aligns with personal values and contributes positively to society.",
        "Building": "Building skills include constructing, repairing, or creating tangible items or structures. Builders excel in hands-on, technical, or craft-oriented work.",
        "Thinking": "Thinking skills encompass intellectual activities such as problem-solving, analysis, and generating ideas. Thinkers thrive in roles requiring deep thought and innovation.",
        "Creating": "Creating skills involve producing original works through art, writing, design, or innovation. Creators find joy in expressing themselves and generating new ideas.",
        "Helping": "Helping involves assisting others, providing care, and making a positive impact on individuals or communities. Helpers thrive in supportive and nurturing environments.",
        "Persuading": "Persuading skills involve influencing, convincing, and motivating others to take action or adopt new ideas. Persuaders excel in roles requiring negotiation and communication.",
        "Organising": "Organising skills include implementing plans, coordinating resources, and managing tasks efficiently. Organisers thrive in structured environments where order and detail are crucial."
    };    

    const handleSelectInterest = (interest) => {
        console.log(interest);
        setSelectedInterest(interest);
    }

    const handleSelectValue = (value) => {
        console.log(value);
        setSelectedValue(value);
    }

    const handleSelectSkill = (skill) => {
        console.log(skill);
        setSelectedSkill(skill);
    }

    console.log('interests: ', interests, 'values: ', values, 'skills: ', skills);

    let chartInterests = Object.keys(interests).map((key) => {return {"name": key, "score": interests[key][0]}});

    const pieColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];
    let chartValues = [];
    Object.keys(values).forEach(key => {
        if (values[key][0] > 0) { 
            chartValues.push({"name": key, "score": values[key][0]});
        }
    });
    chartValues.forEach((el, index) => {el['fill'] = pieColors[index]});

    let chartSkills = Object.keys(skills).map((key) => {return {"name": key, "score": skills[key][0]}});

    const allActivitiesComplete = interestsComplete && valuesComplete && skillsComplete;

    const profileLoaded = skills.hasOwnProperty(selectedSkill) && interests.hasOwnProperty(selectedInterest) && values.hasOwnProperty(selectedValue);

    const buttonStyle = {
        width: 0.6, 
        borderRadius: 3, 
        fontSize: '0.55em'
    }

    return (
        <div id='profile' className='base'>
            <Header />
            <div className="main">
                <div className="inner-content">
                    <h1>Your Profile</h1>

                    { allActivitiesComplete && profileLoaded ? (
                        <>
                            <h2>Interests</h2>
                            <p>The bar graph below shows your level of interest in various areas.</p>
                            <p className="color-text">Select an interest area to learn more.</p>
                            <BarChart 
                                chartData={chartInterests} 
                                handleSelect={handleSelectInterest} 
                            />
                            <ProfileDescription 
                                title={selectedInterest} 
                                scoreDesc={interests[selectedInterest][1]} 
                                score={interests[selectedInterest][0]} 
                                desc={descriptions[selectedInterest]}  
                            />
                            <h2>Values</h2>
                            <p>The pie chart below displays your major career values.</p>
                            <p className="color-text">Select a value segment to learn more.</p>
                            <ValuesChart 
                                chartData={chartValues} 
                                handleSelect={handleSelectValue} 
                            />
                            <ProfileDescription 
                                title={selectedValue} 
                                scoreDesc={values[selectedValue][1]} 
                                score={values[selectedValue][0]} 
                                desc={descriptions[selectedValue]} 
                            />
                            <h2>Aptitudes</h2>
                            <p>The radar chart below depicts the distribution of your aptitudes.</p>
                            <p className="color-text">Select an aptitude label to learn more.</p>
                            <SkillsChart 
                                chartData={chartSkills} 
                                handleSelect={handleSelectSkill} 
                            />
                            <ProfileDescription 
                                title={selectedSkill} 
                                scoreDesc={skills[selectedSkill][1]} 
                                score={skills[selectedSkill][0]} 
                                desc={descriptions[selectedSkill]}
                            />
                            <div className='centered-div submit-button-div'>
                                <NavButton
                                    variant={'contained'} 
                                    style={buttonStyle} 
                                    route={'/careers'} 
                                    text={'Your Careers'} 
                                />
                            </div>
                        </>
                        ) : !profileLoaded && allActivitiesComplete ? (
                            <div className="centered-div">
                                <ReactLoading type="cylon" color="#0E4C92" height={100} width={50} />
                            </div>
                        ) : (
                            <>
                                <h2>Activities Incomplete</h2>
                                <p>Please complete all activities to see your profile details.</p>
                            </>
                        )}
                </div>
            </div>
            <Navbar />   
        </div>
    );

}
