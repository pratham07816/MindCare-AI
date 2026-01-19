from dotenv import load_dotenv
from pathlib import Path
import os

# 🔑 Load .env (Windows safe)
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

print("ENV PATH USED:", env_path)
print("OPENAI_API_KEY FOUND IN AGENT:", bool(os.getenv("OPENAI_API_KEY")))

# 👇 IMPORTANT: set base URL via ENV, not constructor
os.environ["OPENAI_BASE_URL"] = "https://openrouter.ai/api/v1"

from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIChatModel
from schemas import AIInsight

# ✅ CORRECT for your version
model = OpenAIChatModel(
    model_name="openai/gpt-4o-mini"
)

agent = Agent(
    model=model,
    system_prompt=(
        "You are MindCare AI, a calm and empathetic emotional wellness assistant. "
        "Do not provide medical, diagnostic, or therapeutic advice. "
        "Respond gently and supportively."
    ),
    output_type=AIInsight
)
