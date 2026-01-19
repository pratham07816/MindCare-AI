export interface AIInsight {
  crisisDetected: boolean;
  emotionDetected: string;
  emotionalIntensity: "low" | "medium" | "high";
  supportiveMessage: string;
  keywords: string[];
  possibleTriggers: string[];
  gentleSuggestions: string[];
}

const API_BASE_URL = "http://127.0.0.1:8000";

export async function submitReflection(
  mood: number,
  text: string
): Promise<{
  success: boolean;
  data?: { insights: AIInsight };
  error?: string;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/reflect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood, text }),
    });

    if (!res.ok) {
      throw new Error("API request failed");
    }

    const insights = await res.json();

    return {
      success: true,
      data: { insights },
    };
  } catch (err) {
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "Unable to connect to backend",
    };
  }
}
