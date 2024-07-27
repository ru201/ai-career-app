import { updateInterestProfile, updateSkillsProfile, updateValuesProfile, updateCareers } from './dataSlice';
import axios from 'axios';

const API_BASE_URL = 'https://openai-api-server-a8416b8f4972.herokuapp.com';

export const GenerateInterestProfile = async (interests, dispatch) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/generate-interest-profile`, { "interests": interests });
        console.log(response.data);
        dispatch(updateInterestProfile(response.data));
    } catch (error) {
        console.error('Error generating interest profile:', error);
        throw error;
    }
};

export const GenerateSkillsProfile = async (skills, interests, dispatch) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/generate-skills-profile`, { "skills": skills, "interests": interests });
        console.log(response.data);
        dispatch(updateSkillsProfile(response.data));
    } catch (error) {
        console.error('Error generating skills profile:', error);
        throw error;
    }
};

export const GenerateValuesProfile = async (values, dispatch) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/generate-values-profile`, { "values": values });
        console.log(response.data);
        dispatch(updateValuesProfile(response.data));
    } catch (error) {
        console.error('Error generating values profile:', error);
        throw error;
    }
};

export const GenerateCareers = async (interests, skills, values, dispatch) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/generate-careers`, { "interests": interests, "skills": skills, "values": values });
        dispatch(updateCareers(response.data));
    } catch (error) {
        console.error('Error generating careers:', error);
        throw error;
    }
};

export const GenerateMessage = async ( messages ) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/generate-message`, { "messages": messages });
        console.log(response.data);
        return response.data;
        // dispatch
    } catch (error) {
        console.error('Error generating chat message:', error);
        throw error;
    }
};