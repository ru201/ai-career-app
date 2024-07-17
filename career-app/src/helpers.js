import OpenAI from "openai";
import { updateInterestProfile, updateSkillsProfile, updateValuesProfile, updateCareers } from './dataSlice';

export async function GenerateInterestProfile(interests, dispatch) {
    const openai = new OpenAI({ apiKey: process.env.REACT_APP_API_KEY, dangerouslyAllowBrowser: true });
    const prompt = `
    Interests: ${JSON.stringify(interests)}
    Based on the interests data object given above, analyze it and only return me a json object that fits the template defined below with no other text. Make sure the descriptions are max 40 words, friendly, engaging, encouraging and speak directly to the user. 
    {
        "Creative": ["creativity score as an integer out of 100 based on the interests input", "description of what the score means in terms of their creativity"],
        "Analytical": ["analytical score as an integer out of 100 based on the interests input", "description of what the score means in terms of their analytical interest"],
        "Leadership": ["leadership score as an integer out of 100 based on the interests input", "description of what the score means in terms of their leadership interest"],
        "Scientific": ["scientific score as an integer out of 100 based on the interests input", "description of what the score means in terms of their scientific interest"],
        "Social": ["social score as an integer out of 100 based on the interests input", "description of what the score means in terms of their social interest"],
        "Physical": ["physical score as an integer out of 100 based on the interests input", "description of what the score means in terms of their physical activity interest"],
        "Organisational": ["organisational score as an integer out of 100 based on the interests input", "description of what the score means in terms of their organisational interest"],
        "Entrepreneurial": ["entrepreneurial score as an integer out of 100 based on the interests input", "description of what the score means in terms of their entrepreneurial interest"]
    }
    `;
    
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a career advisor and personality analyst assistant designed to output JSON." },
                { role: "user", content: prompt },
            ],
            model: "gpt-3.5-turbo",
            response_format: { type: "json_object" },
        });
        
        const responseFormatted = JSON.parse(completion.choices[0].message.content);
        console.log(responseFormatted);

        dispatch(updateInterestProfile(responseFormatted));
    } catch (error) {
        console.log('Error fetching formatted interest data:', error);
    }
};

export async function GenerateSkillsProfile(skills, dispatch) {
    const openai = new OpenAI({ apiKey: process.env.REACT_APP_API_KEY, dangerouslyAllowBrowser: true });

    const prompt = `
    Skills: ${JSON.stringify(skills)}
    Based on the skills data object given above, analyze it and only return me a json object that fits the template defined below with no other text. Make sure the descriptions are max 40 words, friendly, engaging, encouraging and speak directly to the user. 
    {
        "Building": ["building skill score as an integer out of 100 based on the skills input", "description of what the score means in terms of their building skill"],
        "Thinking": ["thinking skill score as an integer out of 100 based on the skills input", "description of what the score means in terms of their thinking skill"],
        "Creating": ["creating skill score as an integer out of 100 based on the skills input", "description of what the score means in terms of their creating skill"],
        "Helping": ["helping skill score as an integer out of 100 based on the skills input", "description of what the score means in terms of their helping skill"],
        "Persuading": ["persuading skill score as an integer out of 100 based on the skills input", "description of what the score means in terms of their persuading skill"],
        "Organising": ["organising skill score as an integer out of 100 based on the skills input", "description of what the score means in terms of their organising skill"]
    }
    `;
    
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a career advisor and personality analyst assistant designed to output JSON." },
                { role: "user", content: prompt },
            ],
            model: "gpt-3.5-turbo",
            response_format: { type: "json_object" },
        });
        
        const responseFormatted = JSON.parse(completion.choices[0].message.content);
        console.log(responseFormatted);

        dispatch(updateSkillsProfile(responseFormatted));
    } catch (error) {
        console.log('Error fetching formatted skills data:', error);
    }
};

export async function GenerateValuesProfile(values, dispatch) {
    const openai = new OpenAI({ apiKey: process.env.REACT_APP_API_KEY, dangerouslyAllowBrowser: true });

    const prompt = `
    Values: ${JSON.stringify(values)}
    Based on the values data object given above, analyze it and only return me a json object that fits the template defined below with no other text. Make sure the descriptions are max 40 words, friendly, engaging, encouraging and speak directly to the user.
    {
        "Work-life Balance": ["work-life balance value score as an integer out of 100 based on the values input", "description of what the score means in terms of their work-life balance value"],
        "Job Stability": ["job stability value score as an integer out of 100 based on the values input", "description of what the score means in terms of their job stability value"],
        "Personal Growth": ["personal growth value score as an integer out of 100 based on the values input", "description of what the score means in terms of their personal growth value"],
        "Purpose Driven": ["purpose driven value score as an integer out of 100 based on the values input", "description of what the score means in terms of their purpose driven value"],
        "Autonomy": ["autonomy value score as an integer out of 100 based on the values input", "description of what the score means in terms of their autonomy value"]
    }
    `;
    
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a career advisor and personality analyst assistant designed to output JSON." },
                { role: "user", content: prompt },
            ],
            model: "gpt-3.5-turbo",
            response_format: { type: "json_object" },
        });
        
        const responseFormatted = JSON.parse(completion.choices[0].message.content);
        console.log(responseFormatted);

        dispatch(updateValuesProfile(responseFormatted));
    } catch (error) {
        console.log('Error fetching formatted values data:', error);
    }
};

export async function GenerateCareers(interests, skills, values, dispatch) {
    const openai = new OpenAI({ apiKey: process.env.REACT_APP_API_KEY, dangerouslyAllowBrowser: true });

    const prompt = `
    Interests: ${JSON.stringify(interests)}
    Skills: ${JSON.stringify(skills)}
    Values: ${JSON.stringify(values)}
    Only return me a JSON object that contains 10 careers that are best suited to the user based on their interests, skills and values from the data object given above. The more suitable the career is, the earlier it should be ordered. Each career should be a JSON object that fits the template defined below.
    "career title" : {
        "description": "A two to three sentence description of the career.",
        "education-level": "The education level or experience required for the career.",
        "weekly-pay": "The average weekly pay for the career in Australia given in Australian Dollar in the format decimal number with only a dollar sign in front.",
        "future-growth": "The estimated future growth rate of the career in the next 10 years given as a percentage.",
        "main-tasks": "An array of the five main tasks performed as part of the career."
    }
    `;
    
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a career advisor and personality analyst assistant designed to output JSON." },
                { role: "user", content: prompt },
            ],
            model: "gpt-3.5-turbo",
            response_format: { type: "json_object" },
        });
        
        const responseFormatted = JSON.parse(completion.choices[0].message.content);
        console.log(responseFormatted);

        dispatch(updateCareers(responseFormatted));
    } catch (error) {
        console.log('Error fetching career data:', error);
    }
};