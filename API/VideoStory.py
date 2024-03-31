from fastapi import FastAPI, Query, __version__
from fastapi.responses import FileResponse
from typing import List, Dict
import os
import uvicorn
from dotenv import load_dotenv
import json
import requests
import uuid
from gtts import gTTS
from moviepy.editor import *
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
import concurrent
from pymongo import MongoClient
from gridfs import GridFS

# Load environment variables from .env file
load_dotenv()

from openai import OpenAI

client = OpenAI(
    api_key=os.environ['OPENAI_API_KEY'],  # this is also the default, it can be omitted
)

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
image_id = str(uuid.uuid4())[:8]  # Generate a random ID

prompt_full = """
- Create a 5 line short story.
- Format the output as JSON, with each object containing the storyline and a descriptive prompt for generating digital art images using DALL-E.
- STRICTLY HAVE 5 JSON OBJECTS.
- Ensure that consecutive DALL-E prompts are cohesive and align with the storyline.
- The dall_e_prompt should contain detailed information about the characters and how to draw them.
- The dall_e_prompt should contain the common name of the animal not the story specific name (For example, 
instead of Ellie it should mention Elephant and instead of Manny it should mention Monkey)
- Mention that the images are of cartoon digital art type
- JSON Format
{
  "story": [
    {
      "story_line": "string",
      "dall_e_prompt": "string"
    }
  ]
}
"""


@app.post("/story")
async def create_story_json(character1: str = Query(..., min_length=1, max_length=20),
                            character2: str = Query(..., min_length=1, max_length=20),
                            moral: str = Query(...)):
    """
    Creates a short story with provided characters and moral using OpenAI API.

    Args:
        character1: The first character name (length 1-20).
        character2: The second character name (length 1-20).
        moral: The moral of the story.

    Returns:
        JSON containing the story lines and DALL-E prompts for each line.
    """

    prompt = f"""
- Craft a short narrative suitable for children aged 2 to 5 years old.
- The story features two characters, "{character1.upper()}" and "{character2.upper()}".
- The central theme of the story should convey the Moral: "{moral.upper()}".
  """ + prompt_full

    response = client.completions.create(
        model="gpt-3.5-turbo-instruct",
        prompt=prompt,
        max_tokens=1000,
        n=1,
        stop=None,
        temperature=0.7,
    )

    story = response.choices[0].text
    # print(response.choices[0].text)
    print(story)
    # Find the index of the first '{' character
    start_index = story.find('{')

    # Find the index of the last '}' character
    end_index = story.rfind('}') + 1  # Adding 1 to include the last '}' character

    # Extract JSON string
    json_str = story[start_index:end_index]

    # Load JSON data
    json_data = json.loads(json_str)

    json_new = create_story_images(json_data)

    video_filename = create_story_video(json_new)

    return video_filename
    # return json_data


def generate_image(prompt, image_id):
    response = client.images.generate(
        model="dall-e-2",
        prompt=prompt,
        size="1024x1024",
        quality="standard",
        n=1,
    )
    image_url = response.data[0].url
    image_name = f"image_{image_id}.jpg"
    image_path = os.path.join("tmp", image_name)
    with open(image_path, 'wb') as img_file:
        img_file.write(requests.get(image_url).content)
    return image_path


def create_story_images(story_json):
    # Create tmp folder if it doesn't exist
    if not os.path.exists("tmp"):
        os.makedirs("tmp")

    with concurrent.futures.ThreadPoolExecutor() as executor:
        # Submit image generation tasks concurrently
        future_to_story = {executor.submit(generate_image, story['dall_e_prompt'], i): story for i, story in
                           enumerate(story_json["story"])}
        for future in concurrent.futures.as_completed(future_to_story):
            story = future_to_story[future]

            image_path = future.result()
            # Add the generated image path to the current story object
            story["image_path"] = image_path

    print(story_json)
    return story_json


def generate_speech(text, filename):
    tts = gTTS(text=text, lang='en')
    tts.save(filename)


def get_audio_duration(filename):
    audio = AudioFileClip(filename)
    duration = audio.duration
    audio.close()
    return duration


def create_story_video(story_json):
    temp_video_filename = "tmp/video.mp4"

    # Create a list to store video clips for each story line
    video_clips = []

    # Iterate over each story in the story JSON
    for i, story in enumerate(story_json["story"]):
        # Add the image to the video clip
        image_clip = ImageClip(story["image_path"])

        # Generate speech for the story line
        audio_filename = f"tmp/audio_{image_id}_{i}.mp3"
        generate_speech(story["story_line"], audio_filename)

        # Get the duration of the audio
        audio_duration = get_audio_duration(audio_filename)

        # Set duration for the image clip based on audio duration
        image_duration = audio_duration + 1  # Minimum duration of 5 seconds
        image_clip = image_clip.set_duration(image_duration)

        # Add the audio to the video clip
        audio_clip = AudioFileClip(audio_filename)
        audio_clip = audio_clip.set_duration(audio_duration)
        video_clip = image_clip.set_audio(audio_clip)
        video_clips.append(video_clip)

    # Concatenate all video clips to create the final video
    final_clip = concatenate_videoclips(video_clips, method="compose")

    # Write the final video to a file
    final_clip.write_videofile(temp_video_filename, fps=24)  # Adjust FPS as needed

    # Cloudinary Code for image in the cloud

    import cloudinary

    cloudinary.config(
        cloud_name="dabhqiouv",
        api_key="679637592934899",
        api_secret="QCJ707Apj4IranNNoJajV4mtvqY",
        secure=True
    )
    import cloudinary.uploader

    response = cloudinary.uploader.upload_large(temp_video_filename, resource_type="video")

    return response['secure_url']


html = f"""
<!DOCTYPE html>
<html>
    <head>
        <title>Story Video Generation</title>
    </head>
    <body>
        <div class="bg-gray-200 p-4 rounded-lg shadow-lg">
            <h1>Story Video Generation FastAPI@{__version__}</h1>
            <ul>
                <li><a href="/docs">/docs</a></li>
                <li><a href="/redoc">/redoc</a></li>
            </ul></div>
    </body>
</html>
"""


@app.get("/")
async def root():
    return HTMLResponse(html)


PORT = int(os.getenv('PORT', 8000))
HOST = '127.0.0.1'

if __name__ == '__main__':
    uvicorn.run('main:app', host=HOST, port=PORT, reload=True)
