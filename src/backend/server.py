from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os
from os.path import join, dirname
from dotenv import load_dotenv
import json
import logging

logging.basicConfig(level=logging.INFO)

app = FastAPI()

# Load environment variables from .env file
dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, adjust in production
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

async def generate_completion(prompt: str) -> dict:
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a career advisor and personality analyst assistant designed to output JSON. Do not output markdown."}, 
                {"role": "user", "content": prompt}
            ],
            response_format= { "type": "json_object" },
            temperature=0
        )
        response_text = response.choices[0].message.content
        return response_text
    except Exception as e:
        logging.error(f"Error generating completion: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    
async def generate_message_completion(messages: list):
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages
        )
        response_text = response.choices[0].message.content
        return response_text
    except Exception as e:
        logging.error(f"Error generating message completion: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate-interest-profile")
async def generate_interest_profile(data: dict):
    logging.info(f"Received data: {data}")
    prompt = f"""
    Interests: {data['interests']}
    Based on the interests data object given above, analyze it and only return me a json object that fits the template defined below with no other text. Make sure the descriptions are strings, max 40 words, friendly, engaging, target senior high school students and speak directly to the user. Make sure the keys are exactly the same. Make sure the scores are not strings.
    {{
        "Creative": ["creativity score as an integer out of 100 based on the interests input", "description of what the score means in terms of their creativity"],
        "Analytical": ["analytical score as an integer out of 100 based on the interests input", "description of what the score means in terms of their analytical interest"],
        "Leadership": ["leadership score as an integer out of 100 based on the interests input", "description of what the score means in terms of their leadership interest"],
        "Scientific": ["scientific score as an integer out of 100 based on the interests input", "description of what the score means in terms of their scientific interest"],
        "Social": ["social score as an integer out of 100 based on the interests input", "description of what the score means in terms of their social interest"],
        "Physical": ["physical score as an integer out of 100 based on the interests input", "description of what the score means in terms of their physical activity interest"],
        "Organisational": ["organisational score as an integer out of 100 based on the interests input", "description of what the score means in terms of their organisational interest"],
        "Entrepreneurial": ["entrepreneurial score as an integer out of 100 based on the interests input", "description of what the score means in terms of their entrepreneurial interest"]
    }}
    """
    response_text = await generate_completion(prompt)
    try:
        response_json = json.loads(response_text)
        return response_json
    except json.JSONDecodeError:
        logging.error(f"Failed to parse JSON response: {response_text}")
        raise HTTPException(status_code=500, detail="Failed to parse JSON response")

@app.post("/generate-skills-profile")
async def generate_skills_profile(data: dict):
    logging.info(f"Received data: {data}")
    prompt = f"""
    Skills: {data['skills']}
    Interests: {data['interests']}
    Based on the skills and interests data object given above, analyze it and only return me a json object that fits the template defined below with no other text. Make sure the descriptions are strings, max 40 words, friendly, engaging, target senior high school students and speak directly to the user. Make sure the keys are exactly the same. Make sure the scores are not strings.
    {{
        "Building": ["building skill score as an integer out of 100 based on the skills input", "description of what the score means in terms of their building skill"],
        "Thinking": ["thinking skill score as an integer out of 100 based on the skills input", "description of what the score means in terms of their thinking skill"],
        "Creating": ["creating skill score as an integer out of 100 based on the skills input", "description of what the score means in terms of their creating skill"],
        "Helping": ["helping skill score as an integer out of 100 based on the skills input", "description of what the score means in terms of their helping skill"],
        "Persuading": ["persuading skill score as an integer out of 100 based on the skills input", "description of what the score means in terms of their persuading skill"],
        "Organising": ["organising skill score as an integer out of 100 based on the skills input", "description of what the score means in terms of their organising skill"]
    }}
    """
    response_text = await generate_completion(prompt)
    try:
        response_json = json.loads(response_text)
        return response_json
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse JSON response")

@app.post("/generate-values-profile")
async def generate_values_profile(data: dict):
    logging.info(f"Received data: {data}")
    prompt = f"""
    Values: {data['values']}
    Based on the values data object given above, analyze it and only return me a json object that fits the template defined below with no other text. Make sure the descriptions are strings, max 40 words, friendly, engaging, target senior high school students and speak directly to the user. Make sure the keys are exactly the same. Make sure the scores are not strings.
    {{
        "Work-life Balance": ["work-life balance value score as an integer out of 100 based on the values input", "description of what the score means in terms of their work-life balance value"],
        "Job Stability": ["job stability value score as an integer out of 100 based on the values input", "description of what the score means in terms of their job stability value"],
        "Personal Growth": ["personal growth value score as an integer out of 100 based on the values input", "description of what the score means in terms of their personal growth value"],
        "Purpose Driven": ["purpose driven value score as an integer out of 100 based on the values input", "description of what the score means in terms of their purpose driven value"],
        "Autonomy": ["autonomy value score as an integer out of 100 based on the values input", "description of what the score means in terms of their autonomy value"]
    }}
    """
    response_text = await generate_completion(prompt)
    try:
        response_json = json.loads(response_text)
        return response_json
    except json.JSONDecodeError:
        logging.error(f"Failed to parse JSON response: {response_text}")
        raise HTTPException(status_code=500, detail="Failed to parse JSON response")

@app.post("/generate-careers")
async def generate_careers(data: dict):
    logging.info(f"Received data: {data}")
    prompt = f"""
    Interests: {data['interests']}
    Skills: {data['skills']}
    Values: {data['values']}
    Only return me a JSON object that contains 10 careers that are best suited to the user based on their interests, skills and values from the data objects given above. The target users are senior high school students. The more suitable the career is, the earlier it should be ordered. Each career should be a JSON object that fits the template defined below. Don't add extra text to the career titles, weekly-pay and future-growth. Do not add extra keys, the object must follow this template: 
    {{
        "career title" : {{
            "description": "A two to three sentence description of the career.",
            "education-level": "The education level or experience required for the career.",
            "weekly-pay": "The average weekly pay for the career in Australia given in Australian Dollar in the format decimal number with only a dollar sign in front. For example: $1, 200",
            "pay-rating": "One sentence saying whether the weekly pay is higher, on par or lower compared to the average weekly pay in Australia. For example: "Higher than the average weekly pay in Australia.",
            "future-growth": "The estimated future employment growth rate of the career in the next five years given as either an integer or rounded to two decimal places. No other text.",
            "growth-rating": "One sentence indicating whether the future growth rate provided is very strong, strong, moderate, slow or declining. Also provide reasons as to why."
            "main-tasks": "An array of the five main tasks performed as part of the career.",
            "related-careers": "An array of two to five career titles that are considered to be types of the career or related to it.",
            "links": "An array of up to three reputable web links to resources related to the career and pursuing the career in Australia. No news links." 
        }},
        ...
    }}
    """
    response_text = await generate_completion(prompt)
    try:
        response_json = json.loads(response_text)
        return response_json
    except json.JSONDecodeError:
        logging.error(f"Failed to parse JSON response: {response_text}")
        raise HTTPException(status_code=500, detail="Failed to parse JSON response")


@app.post("/generate-message")
async def generate_message(data: dict):
    logging.info(f"Received data: {data}")
    
    response_text = await generate_message_completion(data['messages'])
    
    return response_text
    

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
