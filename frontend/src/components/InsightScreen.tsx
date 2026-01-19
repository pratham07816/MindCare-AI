import { motion } from "motion/react";
import {
  Sparkles,
  Heart,
  Lightbulb,
  TrendingUp,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import type { AIInsight } from "../utils/api-client";

interface InsightScreenProps {
  mood: number;
  reflection: string;
  insights: AIInsight;
  onContinue: () => void;
  onBack: () => void; // ✅ ADD
}

const moodLabels = ["struggling", "sad", "low", "okay", "good", "great"];

export function InsightScreen({
  mood,
  reflection,
  insights,
  onContinue,
  onBack,
}: InsightScreenProps) {
  const intensityColors = {
    low: "from-green-100 to-emerald-100 border-green-200",
    medium: "from-yellow-100 to-amber-100 border-yellow-200",
    high: "from-orange-100 to-red-100 border-orange-200",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 px-6 py-12">
      {/* ⬅️ Back Button */}
      <motion.button
        onClick={onBack}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow hover:shadow-md transition-all text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back</span>
      </motion.button>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-purple-900">MindCare AI</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-3 text-gray-800">
            Your Emotional Insight
          </h1>
          <p className="text-lg text-gray-600">
            Here's what we've learned from your reflection
          </p>
        </motion.div>

        {/* Crisis Alert */}
        {insights.crisisDetected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-6 p-6 bg-gradient-to-r from-blue-100 to-teal-100 rounded-3xl border-2 border-blue-200"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg mb-2 text-gray-800">
                  We're Here for You
                </h3>
                <p className="text-gray-700 mb-3">
                  It sounds like you're going through a difficult time.
                </p>
                <p className="text-sm text-gray-600">
                  Crisis support available 24/7: <strong>Call or text 988</strong>
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Insight Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl mb-6"
        >
          {/* Emotion */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Emotion Detected</p>
              <p className="text-xl text-gray-800">
                {insights.emotionDetected}
              </p>
            </div>
            <div
              className={`px-4 py-2 bg-gradient-to-r ${
                intensityColors[insights.emotionalIntensity]
              } rounded-full text-sm border`}
            >
              {insights.emotionalIntensity} intensity
            </div>
          </div>

          {/* Summary */}
          <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-purple-100">
            <p className="text-gray-700 leading-relaxed">
              {insights.supportiveMessage}
            </p>
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2 mb-6">
            {insights.keywords.map((k) => (
              <span
                key={k}
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm"
              >
                {k}
              </span>
            ))}
          </div>

          {/* Triggers */}
          {insights.possibleTriggers.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg mb-3 text-gray-800">
                Possible Triggers
              </h3>
              {insights.possibleTriggers.map((t) => (
                <div key={t} className="p-3 bg-gray-50 rounded-xl mb-2">
                  {t}
                </div>
              ))}
            </div>
          )}

          {/* Suggestions */}
          {insights.gentleSuggestions.length > 0 && (
            <div>
              <h3 className="text-lg mb-3 text-gray-800">
                Gentle Suggestions
              </h3>
              {insights.gentleSuggestions.map((s, i) => (
                <div
                  key={s}
                  className="p-3 bg-pink-50 rounded-xl mb-2"
                >
                  {i + 1}. {s}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Disclaimer */}
        <div className="p-4 bg-gray-100 rounded-2xl text-center">
          <p className="text-xs text-gray-600">
            💜 MindCare AI provides emotional support, not medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}
