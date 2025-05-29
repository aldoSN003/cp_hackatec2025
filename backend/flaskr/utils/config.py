import os

from flask.cli import load_dotenv
class Config:
    ROUTE = os.getenv("ROUTE", "http://localhost:5173/")
    OPEN_AI_KEY = os.getenv("OPEN_AI_KEY")