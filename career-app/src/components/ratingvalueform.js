import React, { useState } from 'react';
import { Box, Typography, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';

const RatingValueForm = ({ onChange, questions }) => {
    const initialScores = {};
    Object.keys(questions).forEach(category => {
      initialScores[category] = new Array(questions[category].length).fill(2);
    });
    
    // Send initial scores to parent component
    const [scores, setScores] = useState(initialScores);
    onChange(scores);

    const handleRadioChange = (category, index, value) => {
      const newScores = { ...scores };
      newScores[category][index] = value;
      setScores(newScores);
      onChange(newScores); // Notify the parent component about the change
    };

    const style = { '&:hover': { backgroundColor: 'transparent' } };

    return (
        <div style={{ marginTop: '40px' }}>
        <Box sx={{mt: 4}}>
            {Object.keys(questions).map(category => (
            <Box key={category}>
                {questions[category].map((question, index) => (
                <Box key={index} mb={2}>
                    <Typography sx={{ color: '#1976D2', fontWeight: 600, mb: 1 }}>{question}</Typography>
                    <FormControl component="fieldset">
                    <RadioGroup
                        column="true"
                        value={scores[category][index]}
                        onChange={(event) => handleRadioChange(category, index, Number(event.target.value))}
                        sx={{mb: 2}}
                    >
                        <FormControlLabel value={4} control={<Radio sx={style} />} label="Very Important" />
                        <FormControlLabel value={3} control={<Radio sx={style} />} label="Important" />
                        <FormControlLabel value={2} control={<Radio sx={style} />} label="Neutral" />
                        <FormControlLabel value={1} control={<Radio sx={style} />} label="Not  Important" />
                    </RadioGroup>
                    </FormControl>
                </Box>
                ))}
            </Box>
            ))}
        </Box>
        </div>
    );
};

export default RatingValueForm;
