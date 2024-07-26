import React, { useState } from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material';

const QuizOption = ({ text, imageUrl, onClick, selected }) => (
    <Button
        onClick={onClick}
        variant={selected ? 'contained' : 'outlined'}
        color="primary"
        fullWidth
        sx={{
            height: '12em', // Ensure all buttons have the same height
            width: '100%', // Ensure all buttons have the same width
            maxWidth: '20em', // Added maxWidth to control the maximum width
            display: 'flex',
            flexDirection: 'column',
            padding: 2,
            border: selected ? '2px solid' : '1px solid',
            borderColor: selected ? 'primary.main' : 'grey.500',
            backgroundColor: selected ? 'primary.light' : 'background.paper',
        }}
    >
        <img src={imageUrl} alt={text} style={{ width: '3.2em', marginBottom: 10 }} />
        <Typography variant="body2" align="center" sx={{ fontSize: '0.7em', textTransform: "capitalize" }}>{text}</Typography>
    </Button>
);

const QuizBody = ({ handleSubmit, options, onOptionSelect, selectedOptions, images }) => (
    <Container maxWidth="md">
        {options.map((pair, index) => (
            <Grid container spacing={2} alignItems="center" justifyContent="center" key={index} sx={{ marginBottom: 4 }}>
                <Grid item xs={12} sm={5.2} sx={{ textAlign: 'center' }}> {/* Adjusted sm breakpoint */}
                    <QuizOption
                        text={pair[0]}
                        imageUrl={images[pair[0]]}
                        onClick={() => onOptionSelect(index, 0)}
                        selected={selectedOptions[index] === 0}
                    />
                </Grid>
                <Grid item xs={12} sm={1.5} sx={{ textAlign: 'center' }}> {/* Adjusted sm breakpoint */}
                    <Typography variant="body1" align="center" sx={{ fontSize: '0.7em' }}>or</Typography>
                </Grid>
                <Grid item xs={12} sm={5.2} sx={{ textAlign: 'center' }}> {/* Adjusted sm breakpoint */}
                    <QuizOption
                        text={pair[1]}
                        imageUrl={images[pair[1]]}
                        onClick={() => onOptionSelect(index, 1)}
                        selected={selectedOptions[index] === 1}
                    />
                </Grid>
            </Grid>
        ))}
        <Box display="flex" justifyContent="center" mt={4}>
            <Button variant="contained" sx={{ fontSize: '0.7em', width: '80%' }} onClick={() => handleSubmit(Object.keys(selectedOptions).map(index => options[index][selectedOptions[index]]))}>
                Complete Activity
            </Button>
        </Box>
    </Container>
);

const Quiz = ({ options, images, handleSubmit }) => {
    const [selectedOptions, setSelectedOptions] = useState({});

    const handleOptionSelect = (questionIndex, optionIndex) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [questionIndex]: optionIndex
        }));
    };

    return (
        <QuizBody
            options={options}
            images={images}
            onOptionSelect={handleOptionSelect}
            selectedOptions={selectedOptions}
            handleSubmit={handleSubmit}
        />
    );
};

export default Quiz;
