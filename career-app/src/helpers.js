import OpenAI from "openai";
import { updateInterestProfile, updateSkillsProfile, updateValuesProfile } from './dataSlice';

export async function GenerateInterestProfile(interests, dispatch) {
    const openai = new OpenAI({ apiKey: process.env.REACT_APP_API_KEY, dangerouslyAllowBrowser: true });
    const prompt = `
    Interests: ${JSON.stringify(interests)}
    Based on the interests data object given above, analyze it and only return me a json object that fits the template defined below with no other text. Make sure the descriptions are friendly, engaging, encouraging and speak directly to the user. 
    {
        "creative": ["creativity score as an integer out of 100 based on the interests input", "description of what the score means in terms of their creativity"],
        "analytical": ["analytical score as an integer out of 100 based on the interests input", "description of what the score means in terms of their analytical interest"],
        "leadership": ["leadership score as an integer out of 100 based on the interests input", "description of what the score means in terms of their leadership interest"],
        "scientific": ["scientific score as an integer out of 100 based on the interests input", "description of what the score means in terms of their scientific interest"],
        "social": ["social score as an integer out of 100 based on the interests input", "description of what the score means in terms of their social interest"],
        "physical": ["physical score as an integer out of 100 based on the interests input", "description of what the score means in terms of their physical activity interest"],
        "organisational": ["organisational score as an integer out of 100 based on the interests input", "description of what the score means in terms of their organisational interest"],
        "entrepreneurial": ["entrepreneurial score as an integer out of 100 based on the interests input", "description of what the score means in terms of their entrepreneurial interest"]
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
    Based on the skills data object given above, analyze it and only return me a json object that fits the template defined below with no other text. Make sure the descriptions are friendly, engaging, encouraging and speak directly to the user. 
    {
        "building": ["building skill score as an integer out of 100 based on the skills input", "description of what the score means in terms of their building skill"],
        "thinking": ["thinking skill score as an integer out of 100 based on the skills input", "description of what the score means in terms of their thinking skill"],
        "creating": ["creating skill score as an integer out of 100 based on the skills input", "description of what the score means in terms of their creating skill"],
        "helping": ["helping skill score as an integer out of 100 based on the skills input", "description of what the score means in terms of their helping skill"],
        "persuading": ["persuading skill score as an integer out of 100 based on the skills input", "description of what the score means in terms of their persuading skill"],
        "organising": ["organising skill score as an integer out of 100 based on the skills input", "description of what the score means in terms of their organising skill"]
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
    Based on the values data object given above, analyze it and only return me a json object that fits the template defined below with no other text. Make sure the descriptions are friendly, engaging, encouraging and speak directly to the user. 
    {
        "work-life balance": ["work-life balance value score as an integer out of 100 based on the values input", "description of what the score means in terms of their work-life balance value"],
        "job stability": ["job stability value score as an integer out of 100 based on the values input", "description of what the score means in terms of their job stability value"],
        "personal growth": ["personal growth value score as an integer out of 100 based on the values input", "description of what the score means in terms of their personal growth value"],
        "purpose driven": ["purpose driven value score as an integer out of 100 based on the values input", "description of what the score means in terms of their purpose driven value"],
        "autonomy": ["autonomy value score as an integer out of 100 based on the values input", "description of what the score means in terms of their autonomy value"]
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