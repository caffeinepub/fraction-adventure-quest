import { motion } from "motion/react";
import { startBackgroundMusic } from "../soundEngine";

interface StartScreenProps {
  onStart: () => void;
  onLevels: () => void;
}

function FloatingFraction({
  symbol,
  x,
  y,
  delay,
}: { symbol: string; x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute font-fredoka text-white select-none pointer-events-none"
      style={{
        left: x,
        top: y,
        fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
        textShadow: "2px 2px 0px rgba(27,35,82,0.4)",
        opacity: 0.7,
      }}
      animate={{ y: [0, -16, 0], rotate: [-5, 5, -5] }}
      transition={{
        duration: 3 + delay,
        repeat: Number.POSITIVE_INFINITY,
        delay,
      }}
    >
      {symbol}
    </motion.div>
  );
}

const CLOUD_POSITIONS = [
  "top-20 left-1/3",
  "top-32 right-1/3",
  "top-12 left-2/3",
];
const INSTRUCTIONS = [
  "🍕 Answer fraction questions in 3 fun levels",
  "⭐ Earn points for correct answers",
  "🔓 Complete each level to unlock the next!",
];

export default function StartScreen({ onStart, onLevels }: StartScreenProps) {
  const handleStart = () => {
    startBackgroundMusic();
    onStart();
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-6"
      style={{
        background:
          "linear-gradient(160deg, #53C6FF 0%, #79F0D6 40%, #7A4CFF 100%)",
      }}
    >
      {/* Floating decorative elements */}
      <FloatingFraction symbol="½" x="5%" y="10%" delay={0} />
      <FloatingFraction symbol="¼" x="88%" y="8%" delay={0.7} />
      <FloatingFraction symbol="¾" x="92%" y="60%" delay={1.2} />
      <FloatingFraction symbol="⅓" x="3%" y="70%" delay={0.4} />
      <FloatingFraction symbol="⅔" x="80%" y="30%" delay={1.5} />
      <FloatingFraction symbol="⅛" x="10%" y="45%" delay={0.9} />

      {/* Clouds */}
      <svg
        className="absolute top-8 left-16 opacity-60"
        width="120"
        height="60"
        viewBox="0 0 120 60"
        aria-hidden="true"
      >
        <ellipse cx="60" cy="40" rx="55" ry="25" fill="white" />
        <ellipse cx="40" cy="30" rx="35" ry="22" fill="white" />
        <ellipse cx="80" cy="28" rx="28" ry="18" fill="white" />
      </svg>
      <svg
        className="absolute top-16 right-24 opacity-50"
        width="90"
        height="45"
        viewBox="0 0 90 45"
        aria-hidden="true"
      >
        <ellipse cx="45" cy="30" rx="40" ry="18" fill="white" />
        <ellipse cx="28" cy="22" rx="25" ry="16" fill="white" />
        <ellipse cx="62" cy="20" rx="22" ry="14" fill="white" />
      </svg>

      {/* Stars */}
      {CLOUD_POSITIONS.map((pos, i) => (
        <motion.div
          key={pos}
          className={`absolute ${pos} text-yellow-300 text-2xl pointer-events-none`}
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.6,
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Main content card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-2xl w-full"
      >
        {/* Title */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
        >
          <h1
            className="font-fredoka leading-tight"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              color: "white",
              textShadow: "4px 4px 0px #1B2352, -1px -1px 0px #1B2352",
              lineHeight: 1.1,
            }}
          >
            FRACTION
            <br />
            <span
              style={{
                color: "#FFCC4D",
                textShadow: "4px 4px 0px #8B5E00, -1px -1px 0px #8B5E00",
              }}
            >
              ADVENTURE
            </span>
            <br />
            QUEST
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-nunito font-bold text-xl mt-3 mb-6"
          style={{
            color: "#1B2352",
            textShadow: "1px 1px 0 rgba(255,255,255,0.5)",
          }}
        >
          🎓 A Math Adventure for Class 5
        </motion.p>

        {/* Mascot + instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-6 mb-8 text-left shadow-xl"
          style={{
            border: "4px solid #1B2352",
            boxShadow: "6px 6px 0px #1B2352",
          }}
        >
          <div className="flex items-start gap-4">
            {/* Mascot SVG */}
            <svg
              width="80"
              height="100"
              viewBox="0 0 80 100"
              className="flex-shrink-0"
              aria-hidden="true"
            >
              <ellipse
                cx="40"
                cy="70"
                rx="22"
                ry="26"
                fill="#FF9A2F"
                stroke="#1B2352"
                strokeWidth="2"
              />
              <circle
                cx="40"
                cy="30"
                r="22"
                fill="#FFDAB9"
                stroke="#1B2352"
                strokeWidth="2"
              />
              <circle
                cx="33"
                cy="27"
                r="4"
                fill="white"
                stroke="#1B2352"
                strokeWidth="1.5"
              />
              <circle
                cx="47"
                cy="27"
                r="4"
                fill="white"
                stroke="#1B2352"
                strokeWidth="1.5"
              />
              <circle cx="34" cy="27" r="2" fill="#1B2352" />
              <circle cx="48" cy="27" r="2" fill="#1B2352" />
              <path
                d="M 33 36 Q 40 42 47 36"
                stroke="#1B2352"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <ellipse
                cx="40"
                cy="10"
                rx="18"
                ry="8"
                fill="#7B3F00"
                stroke="#1B2352"
                strokeWidth="1.5"
              />
              <line
                x1="18"
                y1="60"
                x2="6"
                y2="75"
                stroke="#FFDAB9"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <line
                x1="62"
                y1="60"
                x2="74"
                y2="75"
                stroke="#FFDAB9"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M 68 68 L 78 58 L 80 72 Z"
                fill="#FFCC4D"
                stroke="#8B5E00"
                strokeWidth="1.5"
              />
              <circle cx="74" cy="65" r="1.5" fill="#e74c3c" />
            </svg>
            <div>
              <p
                className="font-nunito font-bold text-lg mb-2"
                style={{ color: "#1B2352" }}
              >
                How to Play:
              </p>
              <ul className="space-y-2">
                {INSTRUCTIONS.map((tip) => (
                  <li
                    key={tip}
                    className="font-nunito text-base"
                    style={{ color: "#1B2352" }}
                  >
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleStart}
            type="button"
            className="font-fredoka text-2xl text-white px-10 py-5 rounded-full"
            style={{
              background: "linear-gradient(135deg, #FF9A2F, #FFCC4D)",
              border: "4px solid #1B2352",
              boxShadow: "5px 5px 0px #1B2352",
            }}
            data-ocid="start.primary_button"
          >
            PLAY GAME 🚀
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            onClick={onLevels}
            type="button"
            className="font-fredoka text-2xl text-white px-10 py-5 rounded-full"
            style={{
              background: "linear-gradient(135deg, #11C7B8, #53C6FF)",
              border: "4px solid #1B2352",
              boxShadow: "5px 5px 0px #1B2352",
            }}
            data-ocid="start.secondary_button"
          >
            LEVELS 🗺️
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Grass bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 40 Q100 10 200 40 Q300 70 400 40 Q500 10 600 40 Q700 70 800 40 Q900 10 1000 40 Q1100 70 1200 40 L1200 80 L0 80 Z"
          fill="#39C96B"
        />
        <path
          d="M0 55 Q150 30 300 55 Q450 80 600 55 Q750 30 900 55 Q1050 80 1200 55 L1200 80 L0 80 Z"
          fill="#27AE60"
        />
      </svg>
    </div>
  );
}
