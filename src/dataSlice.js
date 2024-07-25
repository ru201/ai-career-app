import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    interestsComplete: false,
    valuesComplete: false,
    skillsComplete: false,
    interests: {},
    values: [],
    skills: [],
    interestProfile: {},
    valuesProfile: {},
    skillsProfile: {},
    careers: {}
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
    updateInterestProfile: (state, action) => {
      state.interestProfile = action.payload;
    },
    updateValuesProfile: (state, action) => {
      state.valuesProfile = action.payload;
    },
    updateSkillsProfile: (state, action) => {
      state.skillsProfile = action.payload;
    },
    updateCareers: (state, action) => {
      state.careers = action.payload;
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

export const { completeInterests, completeValues, completeSkills, updateInterestProfile, updateValuesProfile, updateSkillsProfile, updateCareers, resetData } = dataSlice.actions;

export default dataSlice.reducer;
