import os

from flask.cli import load_dotenv
class Config:
    ROUTE = os.getenv("ROUTE", "http://localhost:5173/")
    OPEN_AI_KEY = os.getenv("OPEN_AI_KEY", "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")