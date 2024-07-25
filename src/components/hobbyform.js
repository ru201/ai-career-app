import React, { useState } from 'react';
import { Typography, Button, TextField, Box } from '@mui/material';

const HobbyForm = ({ onChange }) => {
  const [hobbies, setHobbies] = useState(['']);

  const handleHobbyChange = (index, event) => {
    const newHobbies = [...hobbies];
    newHobbies[index] = event.target.value;
    setHobbies(newHobbies);
    onChange(newHobbies);  // Notify the parent component about the change
  };

  const handleAddHobby = () => {
    const newHobbies = [...hobbies, ''];
    setHobbies(newHobbies);
    onChange(newHobbies);  // Notify the parent component about the change
  };

  return (
    <div style={{ marginTop: '1em' }}>
      <h2>Enter Your Hobbies</h2>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {hobbies.map((hobby, index) => (
          <TextField
            key={index}
            type="text"
            value={hobby}
            onChange={(e) => handleHobbyChange(index, e)}
            label={<Typography sx={{fontSize: '0.7em' }}>Hobby {index + 1}</Typography>}
            variant="outlined"
            margin="normal"
            sx={{ width: '100%'}}
            InputProps={{ sx: { height: '2em' }}}
            size='small'
          />
        ))}
        <Button type="button" onClick={handleAddHobby} variant="contained" sx={{ mb: 2, mt: 2, width: 0.7, fontSize: '0.6em' }}>
          Add Another Hobby
        </Button>
      </Box>
    </div>
  );
};

export default HobbyForm;