import { motion } from "motion/react";
import {
  Sparkles,
  Phone,
  MessageCircle,
  Wind,
  Heart,
  ArrowLeft,
} from "lucide-react";

interface EmergencyScreenProps {
  onBack: () => void;
}

export function EmergencyScreen({ onBack }: EmergencyScreenProps) {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50 px-6 py-12">
      {/* ⬅️ Back Button (Top Left) */}
      <motion.button
        onClick={onBack}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="
          absolute top-6 left-6
          p-3
          bg-white/80 backdrop-blur-sm
          rounded-full
          shadow
          hover:shadow-md
          text-purple-700
          hover:text-purple-900
          transition-all
        "
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5" />
      </motion.button>

      <div className="max-w-3xl mx-auto">
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
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-gray-800">
            You Are Not Alone
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Help is available, and people care about you. Reaching out is a sign
            of strength.
          </p>
        </motion.div>

        {/* Main Support Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl mb-6"
        >
          {/* Emergency Help Button */}
          <motion.a
            href="tel:988"
            className="w-full mb-6 px-8 py-6 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02] block"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Phone className="w-6 h-6" />
            <div className="text-left">
              <div className="text-sm opacity-90">24/7 Crisis Lifeline</div>
              <div className="text-xl">988</div>
            </div>
          </motion.a>

          <div className="text-center mb-6">
            <p className="text-sm text-gray-600">
              Available 24/7 for anyone in emotional distress or suicidal crisis
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8" />

          <h3 className="text-xl mb-6 text-gray-800 text-center">
            Other Ways to Get Support
          </h3>

          <div className="space-y-4">
            {/* Text Support */}
            <SupportCard
              icon={<MessageCircle className="w-6 h-6 text-purple-600" />}
              title="Text Support"
              description="Crisis Text Line - Text HOME to 741741"
              footer="Free, 24/7 support via text message"
              gradient="from-purple-50 to-pink-50"
            />

            {/* Grounding */}
            <SupportCard
              icon={<Wind className="w-6 h-6 text-teal-600" />}
              title="5-4-3-2-1 Grounding"
              description="Quick exercise to calm your mind"
              footer="5 see • 4 touch • 3 hear • 2 smell • 1 taste"
              gradient="from-teal-50 to-cyan-50"
            />

            {/* Trusted Contact */}
            <SupportCard
              icon={<Heart className="w-6 h-6 text-orange-600" />}
              title="Reach Out to a Friend"
              description="Talk to someone you trust"
              footer="Sometimes just talking helps more than you think"
              gradient="from-orange-50 to-amber-50"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* Small helper component (optional, clean) */
function SupportCard({
  icon,
  title,
  description,
  footer,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  footer: string;
  gradient: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`w-full p-6 bg-gradient-to-r ${gradient} rounded-2xl border border-gray-200 hover:shadow-lg transition-all`}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-white rounded-xl shadow-sm">{icon}</div>
        <div>
          <h4 className="text-lg mb-1 text-gray-800">{title}</h4>
          <p className="text-sm text-gray-600 mb-1">{description}</p>
          <p className="text-xs text-gray-500">{footer}</p>
        </div>
      </div>
    </motion.div>
  );
}
