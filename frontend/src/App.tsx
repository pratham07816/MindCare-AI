import { useState } from "react";
import { MoodReflectionScreen } from "./components/MoodReflectionScreen";
import { InsightScreen } from "./components/InsightScreen";
import { EmergencyScreen } from "./components/EmergencyScreen";
import type { AIInsight } from "./utils/api-client";

type Screen = "input" | "insight" | "emergency";

export default function App() {
  const [screen, setScreen] = useState<Screen>("input");
  const [reflection, setReflection] = useState("");
  const [insights, setInsights] = useState<AIInsight | null>(null);

  const handleSuccess = (text: string, aiInsights: AIInsight) => {
    setReflection(text);
    setInsights(aiInsights);

    if (aiInsights.crisisDetected) {
      setScreen("emergency");
    } else {
      setScreen("insight");
    }
  };

  const handleBackFromEmergency = () => {
    setScreen("input");
    setInsights(null);
    setReflection("");
  };

  return (
    <div className="min-h-screen">
      {screen === "input" && (
        <MoodReflectionScreen onSuccess={handleSuccess} />
      )}

      {screen === "insight" && insights && (
        <InsightScreen
          mood={0}
          reflection={reflection}
          insights={insights}
          onContinue={() => {}}
          onBack={handleBackFromEmergency}
        />
      )}

      {screen === "emergency" && (
        <EmergencyScreen onBack={handleBackFromEmergency} />
      )}
    </div>
  );
}
