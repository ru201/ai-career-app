import React, { useState } from "react";
import '../App.css';
import Header from '../components/header';
import Navbar from  '../components/navbar';
import { useSelector } from 'react-redux';
import BarChart from "../components/barchart";
import ValuesChart from "../components/valueschart";
import SkillsChart from "../components/skillschart";
import ProfileDescription from "../components/profiledescription";

export default function Profile () {
    
    const interests = useSelector((state) => state.data.interestProfile);
    const values= useSelector((state) => state.data.valuesProfile);
    const skills = useSelector((state) => state.data.skillsProfile);

    const [selectedInterest, setSelectedInterest] = useState('creative');
    const [selectedValue, setSelectedValue] = useState('Job Stability');
    const [selectedSkill, setSelectedSkill] = useState('building');

    const descriptions = {
        "creative": "Creative interests involve art, design, language, and self-expression. Creatives thrive in unstructured environments, crafting unique and innovative work.",
        "analytical": "Analytical individuals excel in problem-solving and data analysis. They enjoy dissecting complex issues and finding logical solutions.",
        "leadership": "Leadership includes guiding, motivating, and managing others. Leaders shine in roles requiring decision-making and team direction.",
        "scientific": "Scientific interest lies in research, experiments, and understanding how things work in the natural world. Scientists thrive on discovery and exploration.",
        "social": "Social individuals enjoy interacting with others, building relationships, and working collaboratively towards common goals. They excel in team-oriented environments.",
        "physical": "Physical activities involve hands-on tasks and movement. Those inclined towards physical work enjoy using their bodies and skills to accomplish tangible goals.",
        "organisational": "Organisational interests include planning, coordinating, and managing tasks efficiently. Organisers thrive in structured environments where order and detail are critical.",
        "entrepreneurial": "Entrepreneurship involves starting new ventures, taking risks, and innovating in business. Entrepreneurs thrive in dynamic environments, driven by creativity and ambition.",
        "Job Stability": "Job stability is about seeking secure and predictable career paths with long-term prospects and financial security.",
        "Work-life Balance": "Work-life balance prioritises having time for both work and personal life, ensuring well-being and fulfillment in both areas.",
        "Personal Growth": "Personal growth involves continuous learning, skill development, and expanding one's knowledge and capabilities.",
        "Autonomy": "Autonomy means preferring independence in decision-making and work style, enjoying freedom and self-direction in tasks and responsibilities.",
        "Purpose Driven": "Being purpose-driven involves finding meaning and fulfillment in work that aligns with personal values and contributes positively to society.",
        "building": "Building skills include constructing, repairing, or creating tangible items or structures. Builders excel in hands-on, technical, or craft-oriented work.",
        "thinking": "Thinking skills encompass intellectual activities such as problem-solving, analysis, and generating ideas. Thinkers thrive in roles requiring deep thought and innovation.",
        "creating": "Creating skills involve producing original works through art, writing, design, or innovation. Creators find joy in expressing themselves and generating new ideas.",
        "helping": "Helping involves assisting others, providing care, and making a positive impact on individuals or communities. Helpers thrive in supportive and nurturing environments.",
        "persuading": "Persuading skills involve influencing, convincing, and motivating others to take action or adopt new ideas. Persuaders excel in roles requiring negotiation and communication.",
        "organising": "Organising skills include implementing plans, coordinating resources, and managing tasks efficiently. Organisers thrive in structured environments where order and detail are crucial."
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

    const pieColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1']
    let chartValues = Object.keys(values).map((key) => {return {"name": key, "score": values[key][0]}});
    chartValues.forEach((el, index) => {el['fill'] = pieColors[index]});

    let chartSkills = Object.keys(skills).map((key) => {return {"name": key, "score": skills[key][0]}});

    return (
        <div id='profile' className='base'>
            <Header />
            <div className="main bottom-margin">
                <div className="inner-content">
                    <h1>Your Profile</h1>
                    <h2>Interests</h2>
                    <p className="smaller-text">The bar graph below shows your level of interest in various areas. Select an interest area to learn more.</p>
                    <BarChart chartData={chartInterests} handleSelect={handleSelectInterest} />
                    <ProfileDescription title={selectedInterest} scoreDesc={interests[selectedInterest][1]} score={interests[selectedInterest][0]} desc={descriptions[selectedInterest]}  />
                    <h2>Values</h2>
                    <p className="smaller-text">The pie chart below displays your major career values.  Select a value segment to learn more.</p>
                    <ValuesChart chartData={chartValues} handleSelect={handleSelectValue} />
                    <ProfileDescription title={selectedValue} scoreDesc={values[selectedValue][1]} score={values[selectedValue][0]} desc={descriptions[selectedValue]} />
                    <h2>Aptitudes</h2>
                    <p className="smaller-text">The radar chart below depicts the distribution of your aptitudes. Select an aptitude label to learn more.  </p>
                    <SkillsChart chartData={chartSkills} handleSelect={handleSelectSkill} />
                    <ProfileDescription title={selectedSkill} scoreDesc={skills[selectedSkill][1]} score={skills[selectedSkill][0]} desc={descriptions[selectedSkill]} />
                </div>
            </div>
            <Navbar />   
        </div>
    );

}
