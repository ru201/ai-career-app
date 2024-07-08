import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    interestsComplete: false,
    valuesComplete: false,
    skillsComplete: false, 
    interests: {},
    values: [], 
    skills: []
  },
  reducers: {
    completeInterests: (state, action) => {
      state.interestsComplete = true;
      state.interests = action.payload;
    },
    completeValues: (state, action) => {
        state.valuesComplete = true;
        state.values = action.payload;
    },
    completeSkills: (state, action) => {
        state.skillsComplete = true;
        state.skills = action.payload;
    },
    resetData: (state) => {
        state.interestsComplete = false;
        state.valuesComplete = false;
        state.skillsComplete = false;
        state.interests = {};
        state.skills = [];
        state.values = [];
    }
  },
});

export const { completeInterests, completeValues, completeSkills  } = dataSlice.actions;

export default dataSlice.reducer;
