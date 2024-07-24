import React, { useState } from "react";
import '../App.css';
import Header from '../components/header';
import Navbar from  '../components/navbar';
import Quiz from '../components/quiz';
import { useDispatch, useSelector } from 'react-redux';
import { completeSkills, updateCareers, updateSkillsProfile } from '../dataSlice';
import { useNavigate } from "react-router-dom";
import { GenerateCareers, GenerateSkillsProfile } from "../apiHelpers";

export default function Skills () {

    const [selectedSkills, setSelectedSkills] = useState([]);

    const navigate = useNavigate();
    
    const dispatch = useDispatch();

    // Generate careeers if all data has been filled.
    const interests = useSelector((state) => state.data.interests);
    const values = useSelector((state) => state.data.values);
    const careerGeneration = (skills) => {
        if (Object.keys(interests).length > 0 && Object.keys(values).length > 0) {
            dispatch(updateCareers({}));
            GenerateCareers(interests, skills, values, dispatch);
        }
    }

    const handleSubmit = (newSkills) => {
        dispatch(updateSkillsProfile({}));
        setSelectedSkills(newSkills);
        console.log(selectedSkills);
        dispatch(completeSkills(newSkills));
        GenerateSkillsProfile(newSkills, interests, dispatch);
        careerGeneration(newSkills);
        navigate('/');
    }

    const options = [
        ['Caring for animals', 'Learning how things work'],
        ['Finding answers to questions', 'Installing equipment'],
        ['Creating artworks', 'Doing mathematical or statistical calculations'],
        ['Giving advice to people', 'Expressing your ideas creatively'],
        ['Designing systems for doing things', 'Convincing people to support your ideas'],
        ['Negotiating or bargaining with people', 'Keeping people safe and healthy'],
        ['Growing plants', 'Choosing the best way to do something'],
        ['Performing music, drama, dance or comedy', 'Measuring, weighing, or testing the strength of things'],
        ['Helping people solve their problems', 'Collecting useful information'],
        ['Leading a team of people', 'Finding creative ways to do things'],
        ['Keeping people company', 'Fixing things'],
        ['Researching the natural world', 'Telling interesting stories'],
        ['Changing people\'s behaviour', 'Inventing things'],
        ['Debating ideas and issues with people', 'Analysing information'],
        ['Organising information, people, or things', 'Designing things to be beautiful or interesting'],
        ['Protecting the environment', 'Teaching people'],
        ['Scheduling activities or events', 'Building things'],
        ['Keeping a calendar or diary up to date', 'Solving problems'],
        ['Managing a farm or orchard', 'Selling things to people'],
        ['Putting things in order', 'Caring for sick or injured people'],
        ['Preventing or finding a cure for diseases', 'Making lists of things that need to be done']
    ];
    
    const images = {
        'Caring for animals': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-caring-for-animals.png?sfvrsn=7d8baad8_2',
        'Learning how things work': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-learning-how-things-work.png?sfvrsn=5e8baad8_2',
        'Finding answers to questions': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-finding-answers-to-questions.png?sfvrsn=898aaad8_2',
        'Installing equipment': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-installing-equipment.png?sfvrsn=778baad8_2',
        'Creating artworks': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-creating-artworks.png?sfvrsn=b88aaad8_2',
        'Doing mathematical or statistical calculations': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-mathematical-statistical-calculations.png?sfvrsn=a08aaad8_2',
        'Giving advice to people': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-giving-advice.png?sfvrsn=508baad8_2',
        'Expressing your ideas creatively': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-express-ideas-creatively.png?sfvrsn=638baad8_2',
        'Designing systems for doing things': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-designing-systems.png?sfvrsn=4b8baad8_2',
        'Convincing people to support your ideas': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-convince-people.png?sfvrsn=aa8aaad8_2',
        'Negotiating or bargaining with people': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-negotiating-bargaining.png?sfvrsn=758baad8_2',
        'Keeping people safe and healthy': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-keep-people-safe-healthy.png?sfvrsn=4d8baad8_2',
        'Growing plants': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-growing-plants.png?sfvrsn=ac8aaad8_2',
        'Choosing the best way to do something': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-choosing-best-way.png?sfvrsn=8c8aaad8_2',
        'Performing music, drama, dance or comedy': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-performing-music-drama-dance-comedy.png?sfvrsn=ae8aaad8_2',
        'Measuring, weighing, or testing the strength of things': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-measuring-weighing-testing.png?sfvrsn=498baad8_2',
        'Helping people solve their problems': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-helping-people-solve-problems.png?sfvrsn=468baad8_2',
        'Collecting useful information': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-collecting-useful-information.png?sfvrsn=568baad8_2',
        'Leading a team of people': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-leading-a-team.png?sfvrsn=658baad8_2',
        'Finding creative ways to do things': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-find-creative-ways.png?sfvrsn=6f8baad8_2',
        'Keeping people company': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-keeping-people-company.png?sfvrsn=b18aaad8_2',
        'Fixing things': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-fixing-things.png?sfvrsn=5a8baad8_2',
        'Researching the natural world': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-researching-natural-world.png?sfvrsn=448baad8_2',
        'Telling interesting stories': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-telling-interesting-stories.png?sfvrsn=b58aaad8_2',
        'Changing people\'s behaviour': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-changing-peoples-behaviour.png?sfvrsn=548baad8_2',
        'Inventing things': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-inventing-things.png?sfvrsn=678baad8_2',
        'Debating ideas and issues with people': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-debating-ideas-and-issues.png?sfvrsn=a28aaad8_2',
        'Analysing information': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-analysing-information.png?sfvrsn=ba8aaad8_2',
        'Organising information, people, or things': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-organising-information-people-things.png?sfvrsn=a48aaad8_2',
        'Designing things to be beautiful or interesting': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-designing-things.png?sfvrsn=718baad8_2',
        'Protecting the environment': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-protecting-the-environment.png?sfvrsn=808aaad8_2',
        'Teaching people': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-teaching-people.png?sfvrsn=a68aaad8_2',
        'Scheduling activities or events': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-scheduling-activities-events.png?sfvrsn=5c8baad8_2',
        'Building things': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-build-things.png?sfvrsn=7f8baad8_2',
        'Keeping a calendar or diary up to date': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-keeping-calendar-diary.png?sfvrsn=a88aaad8_2',
        'Solving problems': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-solving-problems.png?sfvrsn=798baad8_2',
        'Managing a farm or orchard': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-manage-farm-orchard.png?sfvrsn=738baad8_2',
        'Selling things to people': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-selling-things.png?sfvrsn=588baad8_2',
        'Putting things in order': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-puttings-things-in-order.png?sfvrsn=528baad8_2',
        'Caring for sick or injured people': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-sick-injured.png?sfvrsn=7b8baad8_2',
        'Preventing or finding a cure for diseases': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-preventing-disease.png?sfvrsn=618baad8_2',
        'Making lists of things that need to be done': 'https://myfuture.edu.au/images/default-source/my-career-profile/skills-th-make-list.png?sfvrsn=8e8aaad8_2'
    };

    return (
        <div id='skills' className='base'>
            <Header />
            <div className="main bottom-margin">
                <div className="inner-content">
                    <h1 style={{marginBottom: '40px'}}>Skills Discovery</h1>
                    <p style={{marginBottom: '30px'}}>Considering what you are skilled at is a great way to find careers that match your skillsets and can improve career decision making. <br /><br /> Select the option that you are most skilled at from the 21 choices below.</p>
                    <Quiz options={options} images={images} handleSubmit={handleSubmit} />
                </div>
            </div>
            <Navbar />   
        </div>
    )

}
