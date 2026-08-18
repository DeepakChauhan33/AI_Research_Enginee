import os
from pathlib import Path

from dotenv import load_dotenv
from google import genai

from ai.llm.base import LLM


# Load environment variables from the AI service .env file
env_path = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(env_path)


api_key = os.getenv("GOOGLE_API_KEY")

if not api_key:
    raise ValueError("GOOGLE_API_KEY is not set")


class GeminiLLM(LLM):

    def __init__(self):
        self.client = genai.Client(api_key=api_key)
        self.model_name = "gemini-3.5-flash-lite"

    def generate(self, prompt: str) -> str:
        response = self.client.models.generate_content(
            model=self.model_name,
            contents=prompt
        )

        return response.text