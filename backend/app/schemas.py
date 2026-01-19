from pydantic import BaseModel
from typing import List, Literal

class MoodInput(BaseModel):
    mood: int
    text: str

class AIInsight(BaseModel):
    crisisDetected: bool
    emotionDetected: str
    emotionalIntensity: Literal["low", "medium", "high"]
    supportiveMessage: str
    keywords: List[str]
    possibleTriggers: List[str]
    gentleSuggestions: List[str]
