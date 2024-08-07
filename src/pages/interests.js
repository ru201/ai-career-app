import React, { useState } from "react";
import '../App.css';
import Header from '../components/header';
import Navbar from  '../components/navbar';
import HobbyForm from '../components/hobbyform';
import SubjectForm from '../components/subjectform';
import RatingForm from '../components/ratingform';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { completeInterests, updateCareers, updateInterestProfile, updateSkillsProfile } from '../dataSlice';
import { GenerateCareers, GenerateInterestProfile } from "../apiHelpers";
import { GenerateSkillsProfile } from "../apiHelpers";

export default function Interests () {
    const [hobbies, setHobbies] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [riasecScores, setRiasecScores] = useState({});
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleHobbyFormChange = (newHobbies) => {
        setHobbies(newHobbies);
    };

    const handleSubjectFormChange = (newSubjects) => {
        setSubjects(newSubjects);
    };

    const handleRiasecFormChange = (newScores) => {
        setRiasecScores(newScores);
    };

    const skills = useSelector((state) => state.data.skills);
    const values = useSelector((state) => state.data.values);
    const careerGeneration = (interests) => {
      if (skills.length > 0 && Object.keys(values).length > 0) {
        dispatch(updateCareers({}));
        GenerateCareers(interests, skills, values, dispatch);
      }
    }



    const handleSubmit = () => {
        dispatch(updateInterestProfile({}));
        const mappedScores = {};
        Object.keys(questions).forEach(category => {
            questions[category].forEach((element, index) => {
              if (riasecScores[category][index] === 5) {
                mappedScores[element] = "Strongly Agree";
              } else if (riasecScores[category][index] === 4) {
                mappedScores[element] = "Slightly Agree";
              } else if (riasecScores[category][index] === 3) {
                mappedScores[element] = "Neutral";
              } else if (riasecScores[category][index] === 2) {
                mappedScores[element] = "Slightly Disagree";
              } else if (riasecScores[category][index] === 1) {
                mappedScores[element] = "Strongly Disagree";
              }
            });
        });

        dispatch(completeInterests({'Hobbies': hobbies, 'Subjects': subjects, 'Scores': mappedScores}));

        GenerateInterestProfile({'Hobbies': hobbies, 'Subjects': subjects, 'RIASEC Assessment': mappedScores}, dispatch);
        if (skills.length > 0) {
          dispatch(updateSkillsProfile({}));
          GenerateSkillsProfile(skills, {'Hobbies': hobbies, 'Subjects': subjects, 'RIASEC Assessment': mappedScores}, dispatch);
        }

        careerGeneration({'Hobbies': hobbies, 'Subjects': subjects, 'Scores': mappedScores});

        navigate('/home');
    };

    const questions = {
        Realistic: [
          "I like working with my hands.",
          "I enjoy repairing things.",
          "I prefer working outdoors.",
          "I enjoy physical activities.",
          "I like using tools and machinery."
        ],
        Investigative: [
          "I enjoy solving math problems.",
          "I like doing scientific experiments.",
          "I prefer working independently on research projects.",
          "I enjoy analyzing data.",
          "I am curious about how things work."
        ],
        Artistic: [
          "I enjoy creating art (painting, drawing, sculpture).",
          "I like performing arts (acting, dancing, music).",
          "I enjoy writing stories, poems, or articles.",
          "I prefer unstructured activities that allow me to be creative.",
          "I enjoy designing things (fashion, interiors, graphics)."
        ],
        Social: [
          "I enjoy helping people with their problems.",
          "I like working in groups or teams.",
          "I find satisfaction in teaching or training others.",
          "I am interested in social and cultural issues.",
          "I enjoy volunteering for community services."
        ],
        Enterprising: [
          "I like to take charge of situations.",
          "I enjoy persuading others to see my point of view.",
          "I prefer competitive activities.",
          "I like to plan and lead activities or projects.",
          "I enjoy selling products or ideas."
        ],
        Conventional: [
          "I enjoy organizing files and records.",
          "I like working with numbers and data.",
          "I prefer following established procedures and routines.",
          "I enjoy managing and organizing details.",
          "I like working with spreadsheets and databases."
        ]
      };
    
    return (
        <div id='interests' className='base'>
            <Header />
            <div className="main">
                <div className="inner-content">
                    <h1>Interest Discovery</h1>
                    <p>Identifying and understanding your interests is a great starting point for building the self-awareness needed for career decision making.
                    <br /><br />
                    <span className="color-text">Complete the activities below to help us understand your interests.</span>
                    <br /><br />
                    If you find yourself unsure about a certain interest, try getting an opinion from someone you trust and assess whether it reflects your experiences.</p> 
                    <div className="top-margin">
                      <HobbyForm onChange={handleHobbyFormChange} />
                    </div>
                    <div className="top-margin">
                      <SubjectForm onChange={handleSubjectFormChange} />
                    </div>
                    <h2 className="top-margin">Interests Assessment</h2>
                    <p>For each statement below select how well you agree with it.</p>
                    <RatingForm questions={questions} onChange={handleRiasecFormChange} />
                    <Box
                        sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}
                    >
                        <Button sx={{fontSize: '0.7em', width: 0.5}} variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                        </Button>
                    </Box>
                </div> 
            </div>
            <Navbar />   
        </div>
    )

}
