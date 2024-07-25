import React, { useState } from "react";
import '../App.css';
import Header from '../components/header';
import Navbar from  '../components/navbar';
import RatingValueForm from '../components/ratingvalueform';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { completeValues, updateCareers, updateValuesProfile } from '../dataSlice';
import { useNavigate } from "react-router-dom";
import { GenerateCareers, GenerateValuesProfile } from "../apiHelpers";

export default function Values () {

  const [values, setValues] = useState();

  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  
  const handleChange = (newValues) => {
      setValues(newValues)
  };

  // Generate careers if all data has been filled
  const interests = useSelector((state) => state.data.interests);
  const skills = useSelector((state) => state.data.skills);
  const careerGeneration = (values) => {
    if (Object.keys(interests).length > 0 && skills.length > 0) {
      dispatch(updateCareers({}));
      GenerateCareers(interests, skills, values, dispatch);
    }
  }

  const handleSubmit = () => {
      // Change Values
      dispatch(updateValuesProfile({}));
      const mappedValues = {};
      Object.keys(questions).forEach(category => {
          questions[category].forEach((element, index) => {
            if (values[category][index] === 4) {
              mappedValues[element] = "Very Important";
            } else if (values[category][index] === 3) {
              mappedValues[element] = "Important";
            } else if (values[category][index] === 2) {
              mappedValues[element] = "Neutral";
            } else if (values[category][index] === 1) {
              mappedValues[element] = "Not Important";
            }
          });
      });
      console.log(mappedValues);
      dispatch(completeValues(mappedValues));
      GenerateValuesProfile(mappedValues, dispatch);
      careerGeneration(mappedValues);
      navigate('/');
  }

  const questions = {
      Achievement: [
        "Using your skills, knowledge and experience.",
        "A sense of satisfaction at undertaking and completing tasks and projects."
      ],
      Conditions: [
        "Work where you are busy all the time.",
        "Opportunity to work in an individual capacity.",
        "A range of activities.",
        "Fair terms and conditions of pay, leave, superannuation and other benefits.",
        "Stable long-term employment.",
        "Working conditions that suit your personality and preference."
      ],
      Recognition: [
        "Having opportunities for personal/career growth.",
        "Being acknowledged and valued for the work you do.",
        "Giving directions and instructions to others.",
        "Work that leads others in your organisation or community to look up to you.",
      ],
      Relationships: [
        "Working with people who are friendly, understanding and know their job.",
        "Opportunity to provide services and support to others through your work.",
        "Work that allows you to maintain your own sense of right and wrong.",
        "Work that allows you to express your religious or cultural or political beliefs.",
      ],
      Support: [
        "Being treated fairly by your employer.",
        "Constructive feedback, and supportive supervision and management.",
        "Workforce training and career development."
      ],
      Independence: [
        "Conceptualising, developing and expressing your own ideas.",
        "Making independent decisions and taking responsibility for the outcomes.",
        "Planning and implementing your work with little supervision.",
        "Work that allows you to take on challenges and stimulating activities.",
        "Work that provides meaning to your life."
      ],
      Lifestyle: [
          "Not allowing your work to affect the way you want to live.",
          "Balancing work and non-work activities.",
          "Participating in family life."
      ]
    };


  return (
      <div id='values' className='base'>
          <Header />
          <div className="main bottom-margin">
              <div className="inner-content">
                  <h1>Career Values</h1>
                  <p>Your career values are what you find important and gain satisfaction from at work. <br /><br /> Identifying and understanding your career values can help you explore more suitable career options. <br /><br /> Let's find out what values are important to you. Select how important you find each item below.</p>
                  <RatingValueForm onChange={handleChange} questions={questions} />
                  <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                  >
                      <Button sx={{fontSize: '0.7em', width: 0.6}} variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                      </Button>
                  </Box>               
              </div>
          </div>
          <Navbar />   
      </div>
  )

}
