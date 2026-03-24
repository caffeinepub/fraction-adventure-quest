import { motion } from "motion/react";
import type { Level } from "../gameData";
import { LEVELS } from "../gameData";
import CakeSVG from "./svgs/CakeSVG";
import PizzaSVG from "./svgs/PizzaSVG";
import ShapeSVG from "./svgs/ShapeSVG";

interface LevelSelectScreenProps {
  unlockedLevels: number[];
  levelScores: Record<number, number>;
  score: number;
  onSelectLevel: (level: 1 | 2 | 3) => void;
  onFinish: () => void;
  onBack: () => void;
}

const STAR_KEYS = ["star-a", "star-b", "star-c"];

function StarsDisplay({ earned, max = 3 }: { earned: number; max?: number }) {
  return (
    <div className="flex gap-1 justify-center">
      {STAR_KEYS.slice(0, max).map((key, i) => (
        <span
          key={key}
          className="text-2xl"
          style={{ filter: i < earned ? "none" : "grayscale(1) opacity(0.4)" }}
        >
          ⭐
        </span>
      ))}
    </div>
  );
}

function getStarsForLevel(score: number, totalQuestions: number) {
  const pct = (score / (totalQuestions * 10)) * 100;
  if (pct >= 80) return 3;
  if (pct >= 50) return 2;
  if (pct > 0) return 1;
  return 0;
}

function LevelIllustration({ level }: { level: Level }) {
  if (level.id === 1)
    return <PizzaSVG numerator={3} denominator={8} size={120} />;
  if (level.id === 2)
    return <CakeSVG numerator={2} denominator={4} size={120} />;
  return (
    <ShapeSVG shapeType="circle" numerator={3} denominator={4} size={120} />
  );
}

export default function LevelSelectScreen({
  unlockedLevels,
  levelScores,
  score,
  onSelectLevel,
  onFinish,
  onBack,
}: LevelSelectScreenProps) {
  const completedAll = LEVELS.every(
    (l) =>
      unlockedLevels.includes(l.id + 1) ||
      (l.id === 3 && levelScores[3] !== undefined),
  );

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #53C6FF 0%, #e8f8ff 40%, #f0fff8 100%)",
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{
          background: "linear-gradient(135deg, #2E7BFF, #7A4CFF)",
          borderBottom: "4px solid #1B2352",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          className="font-fredoka text-white text-lg px-4 py-2 rounded-xl hover:scale-105 transition-transform"
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "2px solid rgba(255,255,255,0.5)",
          }}
          data-ocid="levelselect.secondary_button"
        >
          ← Back
        </button>
        <h1
          className="font-fredoka text-2xl text-white"
          style={{ textShadow: "2px 2px 0 #1B2352" }}
        >
          🗺️ Fraction Adventure Quest
        </h1>
        <div
          className="font-fredoka text-xl text-white px-4 py-2 rounded-xl"
          style={{
            background: "rgba(255,204,77,0.3)",
            border: "2px solid #FFCC4D",
          }}
        >
          ⭐ {score} pts
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-fredoka text-4xl text-center mb-8"
          style={{
            color: "#1B2352",
            textShadow: "2px 2px 0 rgba(255,255,255,0.8)",
          }}
        >
          SELECT YOUR LEVEL
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LEVELS.map((level, idx) => {
            const isUnlocked = unlockedLevels.includes(level.id);
            const isCompleted = levelScores[level.id] !== undefined;
            const stars = isCompleted
              ? getStarsForLevel(levelScores[level.id], 6)
              : 0;

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                className="rounded-3xl overflow-hidden"
                style={{
                  border: "4px solid #1B2352",
                  boxShadow: "6px 6px 0px #1B2352",
                  opacity: isUnlocked ? 1 : 0.75,
                }}
                data-ocid={`levelselect.item.${level.id}`}
              >
                {/* Card header */}
                <div
                  className="px-4 py-3 text-center"
                  style={{ background: level.headerColor }}
                >
                  <p
                    className="font-fredoka text-2xl text-white"
                    style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.3)" }}
                  >
                    Level {level.id}: {level.name}
                  </p>
                  <p className="font-nunito font-bold text-white text-sm opacity-90">
                    {level.theme}
                  </p>
                </div>

                {/* Card body */}
                <div className="bg-white p-4 flex flex-col items-center gap-3">
                  <LevelIllustration level={level} />

                  {isCompleted && <StarsDisplay earned={stars} />}

                  {isCompleted && (
                    <p
                      className="font-nunito font-bold text-sm"
                      style={{ color: "#27AE60" }}
                    >
                      Score: {levelScores[level.id]} / 60
                    </p>
                  )}

                  {isUnlocked ? (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => onSelectLevel(level.id as 1 | 2 | 3)}
                      className="w-full py-3 rounded-2xl font-fredoka text-xl text-white"
                      style={{
                        background: `linear-gradient(135deg, ${level.color}, ${level.headerColor})`,
                        border: "3px solid #1B2352",
                        boxShadow: "3px 3px 0 #1B2352",
                      }}
                      data-ocid={`levelselect.primary_button.${level.id}`}
                    >
                      {isCompleted ? "REPLAY ▶" : "PLAY ▶"}
                    </motion.button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="w-full py-3 rounded-2xl font-fredoka text-xl text-white cursor-not-allowed"
                      style={{
                        background: "linear-gradient(135deg, #aaa, #888)",
                        border: "3px solid #666",
                        boxShadow: "3px 3px 0 #666",
                      }}
                      data-ocid={`levelselect.toggle.${level.id}`}
                    >
                      🔒 LOCKED
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {completedAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onFinish}
              className="font-fredoka text-2xl text-white px-12 py-4 rounded-full"
              style={{
                background: "linear-gradient(135deg, #FF9A2F, #FFCC4D)",
                border: "4px solid #1B2352",
                boxShadow: "5px 5px 0 #1B2352",
              }}
              data-ocid="levelselect.submit_button"
            >
              🏆 SEE FINAL RESULTS
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Grass */}
      <svg
        className="fixed bottom-0 left-0 w-full pointer-events-none"
        viewBox="0 0 1200 50"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 25 Q200 5 400 25 Q600 45 800 25 Q1000 5 1200 25 L1200 50 L0 50 Z"
          fill="#39C96B"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}
