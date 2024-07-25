import React, { useState } from 'react';
import { Typography, Button, TextField, Box } from '@mui/material';

const SubjectForm = ({ onChange }) => {
  const [subjects, setSubjects] = useState(['']);

  const handleSubjectChange = (index, event) => {
    const newSubjects = [...subjects];
    newSubjects[index] = event.target.value;
    setSubjects(newSubjects);
    onChange(newSubjects);  // Notify the parent component about the change
  };

  const handleAddSubject = () => {
    const newSubjects = [...subjects, ''];
    setSubjects(newSubjects);
    onChange(newSubjects);  // Notify the parent component about the change
  };

  return (
    <div style={{ marginTop: '1em' }}>
      <h2>Enter Your Favourite School Subjects</h2>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {subjects.map((subject, index) => (
          <TextField
            key={index}
            type="text"
            value={subject}
            onChange={(e) => handleSubjectChange(index, e)}
            label={<Typography sx={{fontSize: '0.7em' }}>Subject {index + 1}</Typography>}
            variant="outlined"
            margin="normal"
            sx={{ width: '100%'}}
            InputProps={{ sx: { height: '2em' }}}
            size='small'
          />
        ))}
        <Button type="button" onClick={handleAddSubject} variant="contained" sx={{ mb: 2, mt: 2, width: 0.7, fontSize: '0.6em' }}>
          Add Another Subject
        </Button>
      </Box>
    </div>
  );
};

export default SubjectForm;
