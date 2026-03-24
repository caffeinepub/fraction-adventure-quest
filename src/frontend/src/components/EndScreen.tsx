import { motion } from "motion/react";
import { useEffect } from "react";
import { stopBackgroundMusic } from "../soundEngine";

interface EndScreenProps {
  score: number;
  totalPossible: number;
  onPlayAgain: () => void;
  onLevelSelect: () => void;
}

const BG_STARS = Array.from({ length: 20 }, (_, i) => ({
  key: `bgstar-${i}`,
  left: `${(i * 17 + 5) % 100}%`,
  top: `${(i * 13 + 7) % 100}%`,
  size: `${((i % 3) * 0.5 + 0.6).toFixed(1)}rem`,
  duration: 2 + (i % 3),
  delay: (i % 4) * 0.5,
}));

const STAR_KEYS = ["star-x", "star-y", "star-z"];

export default function EndScreen({
  score,
  totalPossible,
  onPlayAgain,
  onLevelSelect,
}: EndScreenProps) {
  const pct = Math.round((score / totalPossible) * 100);

  useEffect(() => {
    stopBackgroundMusic();
  }, []);

  const getMessage = () => {
    if (pct >= 80)
      return {
        emoji: "🌟",
        title: "Excellent!",
        sub: "You're a Fraction Master!",
        color: "#FF9A2F",
      };
    if (pct >= 50)
      return {
        emoji: "👍",
        title: "Good Job!",
        sub: "Keep Practicing!",
        color: "#2E7BFF",
      };
    return {
      emoji: "💪",
      title: "Try Again!",
      sub: "You Can Do It!",
      color: "#7A4CFF",
    };
  };

  const msg = getMessage();
  const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : 1;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #1B2352 0%, #2E7BFF 40%, #7A4CFF 100%)",
      }}
    >
      {/* Floating stars background */}
      {BG_STARS.map((star) => (
        <motion.div
          key={star.key}
          className="absolute text-yellow-300 pointer-events-none select-none"
          style={{ left: star.left, top: star.top, fontSize: star.size }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: star.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: star.delay,
          }}
        >
          ✨
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Main card */}
        <div
          className="bg-white rounded-3xl overflow-hidden"
          style={{
            border: "5px solid #FFCC4D",
            boxShadow: "8px 8px 0 #1B2352",
          }}
        >
          {/* Header */}
          <div
            className="px-6 py-6 text-center"
            style={{
              background: `linear-gradient(135deg, ${msg.color}, #FFCC4D)`,
            }}
          >
            <motion.div
              className="text-7xl mb-2"
              animate={{ rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              {msg.emoji}
            </motion.div>
            <h1
              className="font-fredoka text-4xl text-white"
              style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.3)" }}
            >
              ADVENTURE COMPLETE!
            </h1>
            <p className="font-nunito font-bold text-xl text-white mt-1">
              {msg.title} {msg.sub}
            </p>
          </div>

          {/* Body */}
          <div className="p-8 space-y-6">
            {/* Stars */}
            <div className="flex justify-center gap-3">
              {STAR_KEYS.map((key, i) => (
                <motion.span
                  key={key}
                  className="text-5xl"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.3 + i * 0.2,
                    type: "spring",
                    damping: 10,
                  }}
                  style={{
                    filter: i < stars ? "none" : "grayscale(1) opacity(0.3)",
                  }}
                >
                  ⭐
                </motion.span>
              ))}
            </div>

            {/* Score display */}
            <div
              className="rounded-2xl p-5 text-center"
              style={{
                background: "linear-gradient(135deg, #e8f4ff, #f0e8ff)",
                border: "3px solid #2E7BFF",
              }}
              data-ocid="end.card"
            >
              <p
                className="font-nunito font-semibold text-lg"
                style={{ color: "#1B2352" }}
              >
                Your Score
              </p>
              <p
                className="font-fredoka text-5xl mt-1"
                style={{ color: "#2E7BFF" }}
              >
                {score}
                <span className="text-2xl text-gray-400">/{totalPossible}</span>
              </p>
              <div className="mt-3 h-4 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${msg.color}, #FFCC4D)`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                />
              </div>
              <p
                className="font-fredoka text-2xl mt-2"
                style={{ color: msg.color }}
              >
                {pct}%
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onPlayAgain}
                className="w-full py-4 rounded-2xl font-fredoka text-2xl text-white"
                style={{
                  background: "linear-gradient(135deg, #FF9A2F, #FFCC4D)",
                  border: "4px solid #1B2352",
                  boxShadow: "4px 4px 0 #1B2352",
                }}
                data-ocid="end.primary_button"
              >
                🚀 PLAY AGAIN
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onLevelSelect}
                className="w-full py-4 rounded-2xl font-fredoka text-2xl text-white"
                style={{
                  background: "linear-gradient(135deg, #11C7B8, #53C6FF)",
                  border: "4px solid #1B2352",
                  boxShadow: "4px 4px 0 #1B2352",
                }}
                data-ocid="end.secondary_button"
              >
                🗺️ LEVEL SELECT
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
