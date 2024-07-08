import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

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
    <div style={{ marginTop: '40px' }}>
      <h2>Enter Your Favourite Subjects</h2>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
        {subjects.map((subject, index) => (
          <TextField
            key={index}
            type="text"
            value={subject}
            onChange={(e) => handleSubjectChange(index, e)}
            label={`Subject ${index + 1}`}
            variant="outlined"
            margin="normal"
            sx={{ width: '95%', marginRight: '17px' }}
          />
        ))}
        <Button type="button" onClick={handleAddSubject} variant="contained" sx={{ mb: 2, mt: 2 }}>
          Add Another Subject
        </Button>
      </Box>
    </div>
  );
};

export default SubjectForm;
