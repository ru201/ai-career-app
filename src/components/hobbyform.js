import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

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
    <div style={{ marginTop: '40px' }}>
      <h2>Enter Your Hobbies</h2>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
        {hobbies.map((hobby, index) => (
          <TextField
            key={index}
            type="text"
            value={hobby}
            onChange={(e) => handleHobbyChange(index, e)}
            label={`Hobby ${index + 1}`}
            variant="outlined"
            margin="normal"
            sx={{ width: '95%', marginRight: '17px' }}
          />
        ))}
        <Button type="button" onClick={handleAddHobby} variant="contained" sx={{ mb: 2, mt: 2 }}>
          Add Another Hobby
        </Button>
      </Box>
    </div>
  );
};

export default HobbyForm;