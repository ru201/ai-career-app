import React, { useState } from 'react';
import { Box, Typography, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';

const RatingForm = ({ onChange, questions }) => {
  const initialScores = {};
  Object.keys(questions).forEach(category => {
    initialScores[category] = new Array(questions[category].length).fill(3);
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

  const style = {
    '&:hover': { backgroundColor: 'transparent' },
    '& .MuiSvgIcon-root': {
        fontSize: '1em',
      } 
  };

  return (
    <div style={{ marginTop: '1em' }}>
      <Box sx={{mt: 0}}>
        {Object.keys(questions).map(category => (
          <Box key={category}>
            {/* <Typography variant="h6">{category}</Typography> */}
            {questions[category].map((question, index) => (
              <Box key={index} mb={1}>
                <Typography sx={{ color: '#1976D2', fontWeight: 600, mb: 1, fontSize: '0.7em' }}>{question}</Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    column="true"
                    value={scores[category][index]}
                    onChange={(event) => handleRadioChange(category, index, Number(event.target.value))}
                    sx={{mb: 1, ml: 1}}
                  >
                    <FormControlLabel value={5} control={<Radio sx={style} />} label={<Typography sx={{fontSize: '0.7em' }}>Strongly Agree</Typography>} />
                    <FormControlLabel value={4} control={<Radio sx={style} />} label={<Typography sx={{fontSize: '0.7em' }}>Agree</Typography>} />
                    <FormControlLabel value={3} control={<Radio sx={style} />} label={<Typography sx={{fontSize: '0.7em' }}>Neutral</Typography>} />
                    <FormControlLabel value={2} control={<Radio sx={style} />} label={<Typography sx={{fontSize: '0.7em' }}>Disagree</Typography>} />
                    <FormControlLabel value={1} control={<Radio sx={style} />} label={<Typography sx={{fontSize: '0.7em' }}>Strongly Disagree</Typography>} />
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

export default RatingForm;
