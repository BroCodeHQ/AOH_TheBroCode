from fastapi import FastAPI, Query, __version__
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import os
import time
from dotenv import load_dotenv
from openai import OpenAI
from fastapi.responses import HTMLResponse
import uvicorn
import json

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load environment variables from .env file
load_dotenv()

from openai import OpenAI

client = OpenAI(
  api_key=os.environ['OPENAI_API_KEY'],  # this is also the default, it can be omitted
)

json_start={
  "story": [
    {
      "story_line": "storyline",
      "dall_e_prompt": "string"
    },
    {
      "story_line": "storyline",
      "dall_e_prompt": "string"
    },
    {
      "story_line": "storyline",
      "dall_e_prompt": "string"
    }
  ]
}



@app.post("/interactive-1")
async def create_story_json(character1: str = Query(..., min_length=1, max_length=20),
                       character2: str = Query(..., min_length=1, max_length=20),
                       moral: str = Query(...)):
    """
    Creates an interactive short story with provided characters and moral using OpenAI API.

    Args:
        character1: The first character name (length 1-20).
        character2: The second character name (length 1-20).
        moral: The moral of the story.

    Returns:
        JSON containing the story lines, Dall-E prompts and Images for each line.
    """
    thread = client.beta.threads.create()
    prompt1= f"""- Create a short story suitable for children aged 2 to 5 years old.
- The story features two characters, "{character1.upper()}" and "{character2.upper()}".
- The central theme of the story should convey the Moral: "{moral.upper()}".
- Present the story in a step-by-step manner.
- Format the output as JSON, with each object containing the storyline and a descriptive prompt for generating digital art images using DALL-E.
- The dall_e_prompt should contain detailed information about the characters and how to draw them.
- The dall_e_prompt should contain the common name of the animal not the story-specific name (For example, instead of Ellie it should mention Elephant and instead of Manny it should mention Monkey)
- THERE SHOULD ONLY BE 5 LINES IN THE STORY.
- STRICTLY FOLLOW JSON RESPONSE FORMAT.
{json_start}
    
"""
    message = client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content=prompt1
        )
    run = client.beta.threads.runs.create(
        thread_id=thread.id,
        assistant_id=os.environ['ASSISTANT_ID']
        )
  
    while run.status in ['queued', 'in_progress', 'cancelling']:
        time.sleep(1) # Wait for 1 second
        run = client.beta.threads.runs.retrieve(
            thread_id=thread.id,
            run_id=run.id
        )

    if run.status == 'completed': 
        messages = client.beta.threads.messages.list(thread_id=thread.id)
        for answer in messages:
            response_text = answer.content[0].text.value
            print(response_text)
            break
    else:
        print(run.status)

    # Find the index of the first '{' character
    start_index = response_text.find('{')

    # Find the index of the last '}' character
    end_index = response_text.rfind('}') + 1  # Adding 1 to include the last '}' character

    # Extract JSON string
    json_str = response_text[start_index:end_index]

    # Load JSON data
    json_data = json.loads(json_str)

    for i, story in enumerate(json_data["story"]):
        if "dall_e_prompt" in story:
            response = client.images.generate(
                model="dall-e-2",
                prompt=story["dall_e_prompt"],
                size="1024x1024",
                quality="standard",
                n=1,
            )

            image_url = response.data[0].url
            print(image_url)
            story["image_url"] = image_url

    
    return {"story_data": json_data, "thread_id": thread.id}


html = f"""
<!DOCTYPE html>
<html>
    <head>
        <title>Iterative Story Generation</title>
    </head>
    <body>
        <div class="bg-gray-200 p-4 rounded-lg shadow-lg">
            <h1>Iterative Story Generation with Action FastAPI@{__version__}</h1>
            <ul>
                <li><h1><a href="/docs">/docs</a></h1></li>
                <li><h1><a href="/redoc">/redoc</a></h1></li>
            </ul>
        </div>
    </body>
</html>
"""

@app.get("/")
async def root():
    return HTMLResponse(html)

PORT = int(os.getenv('PORT', 8000))
HOST = '127.0.0.1'

if __name__ == '__main__':
    uvicorn.run('main_new:app', host=HOST, port=PORT, reload=True)
