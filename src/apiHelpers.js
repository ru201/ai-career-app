import { updateInterestProfile, updateSkillsProfile, updateValuesProfile, updateCareers } from './dataSlice';
import axios from 'axios';

const API_BASE_URL = 'https://protected-stream-72014-fbe82cb3d238.herokuapp.com';

// Helper function to handle retries
const retryRequest = async (fn, retries = 3, delay = 1000) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            // Retry only if it's a 503 error or CORS issue
            if (attempt < retries && (error.response?.status === 503 || error.message.includes('CORS'))) {
                console.warn(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
                await new Promise(res => setTimeout(res, delay));
            } else {
                throw error; // Rethrow if all retries failed or if it’s another error
            }
        }
    }
};

// GenerateInterestProfile with retry logic
export const GenerateInterestProfile = async (interests, dispatch) => {
    await retryRequest(async () => {
        const response = await axios.post(`${API_BASE_URL}/generate-interest-profile`, { "interests": interests });
        console.log(response.data);
        dispatch(updateInterestProfile(response.data));
    });
};

// GenerateSkillsProfile with retry logic
export const GenerateSkillsProfile = async (skills, interests, dispatch) => {
    await retryRequest(async () => {
        const response = await axios.post(`${API_BASE_URL}/generate-skills-profile`, { "skills": skills, "interests": interests });
        console.log(response.data);
        dispatch(updateSkillsProfile(response.data));
    });
};

// GenerateValuesProfile with retry logic
export const GenerateValuesProfile = async (values, dispatch) => {
    await retryRequest(async () => {
        const response = await axios.post(`${API_BASE_URL}/generate-values-profile`, { "values": values });
        console.log(response.data);
        dispatch(updateValuesProfile(response.data));
    });
};

// GenerateCareers with retry logic
export const GenerateCareers = async (interests, skills, values, dispatch) => {
    await retryRequest(async () => {
        const response = await axios.post(`${API_BASE_URL}/generate-careers`, { "interests": interests, "skills": skills, "values": values });
        dispatch(updateCareers(response.data));
    });
};

// GenerateMessage with retry logic
export const GenerateMessage = async (messages) => {
    return await retryRequest(async () => {
        const response = await axios.post(`${API_BASE_URL}/generate-message`, { "messages": messages });
        console.log(response.data);
        return response.data;
    });
};
