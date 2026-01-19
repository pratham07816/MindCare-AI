from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import MoodInput, AIInsight
from app.agent import agent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/reflect", response_model=AIInsight)
async def reflect(mood_input: MoodInput):
    result = await agent.run(
        f"Mood level: {mood_input.mood}\n"
        f"Reflection: {mood_input.text}"
    )

    # ✅ result.output is already AIInsight
    return result.output
