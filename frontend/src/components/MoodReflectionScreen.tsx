import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { submitReflection } from "../utils/api-client";
import type { AIInsight } from "../utils/api-client";

interface MoodReflectionScreenProps {
  onSuccess: (reflection: string, insights: AIInsight) => void;
  onError?: (error: string) => void;
}

const moods = [
  { emoji: "😄", label: "Great", value: 5 },
  { emoji: "🙂", label: "Good", value: 4 },
  { emoji: "😐", label: "Okay", value: 3 },
  { emoji: "😔", label: "Low", value: 2 },
  { emoji: "😢", label: "Sad", value: 1 },
  { emoji: "😣", label: "Struggling", value: 0 },
];

const moodLabels = ["struggling", "sad", "low", "okay", "good", "great"];

export function MoodReflectionScreen({
  onSuccess,
  onError,
}: MoodReflectionScreenProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [reflection, setReflection] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (selectedMood === null || !reflection.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await submitReflection(selectedMood, reflection);

      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to get AI insights");
      }

      onSuccess(reflection, response.data.insights);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setError(message);
      onError?.(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 px-6 py-12">
      {/* Floating background shapes */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-teal-200/30 rounded-full blur-3xl"
        animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-purple-900">MindCare AI</span>
          </div>
          <h1 className="text-4xl md:text-5xl mb-3 text-gray-800 font-semibold">
            How are you feeling today?
          </h1>
          <p className="text-gray-600">
            Select your mood and share what’s on your mind
          </p>
        </motion.div>

        {/* Mood Selector */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-6 mb-12">
          {moods.map((mood, index) => (
            <motion.button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`relative p-6 rounded-3xl transition-all duration-300
                ${
                  selectedMood === mood.value
                    ? "bg-white shadow-2xl scale-105"
                    : "bg-white/70 backdrop-blur-sm hover:bg-white hover:shadow-xl hover:scale-105"
                }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-4xl mb-2">{mood.emoji}</div>
              <div className="text-xs text-gray-600">{mood.label}</div>
              {selectedMood === mood.value && (
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-purple-400"
                  layoutId="mood-selected"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Reflection Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
        >
          <h2 className="text-2xl mb-2 text-gray-800">
            What made you feel this way today?
          </h2>
          {selectedMood !== null && (
            <p className="text-sm text-gray-500 mb-4">
              You’re feeling {moodLabels[selectedMood]} today
            </p>
          )}

          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="I feel this way because..."
            disabled={isLoading}
            className="w-full h-40 px-6 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl resize-none focus:outline-none focus:border-purple-300 focus:bg-white transition-all duration-300"
          />

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <motion.button
            onClick={handleSubmit}
            disabled={
              selectedMood === null || !reflection.trim() || isLoading
            }
            className={`w-full mt-6 px-8 py-4 rounded-full text-lg flex items-center justify-center gap-2
              ${
                selectedMood !== null && reflection.trim() && !isLoading
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            whileHover={
              selectedMood !== null && reflection.trim() && !isLoading
                ? { scale: 1.02 }
                : {}
            }
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing with AI...
              </>
            ) : (
              <>
                Reflect with AI
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Your thoughts are processed privately and securely
          </p>
        </motion.div>
      </div>
    </div>
  );
}
