import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import EndScreen from "./components/EndScreen";
import GameScreen from "./components/GameScreen";
import LevelSelectScreen from "./components/LevelSelectScreen";
import StartScreen from "./components/StartScreen";
import { LEVELS, POINTS_PER_QUESTION } from "./gameData";

type ScreenType = "start" | "levelSelect" | "game" | "levelComplete" | "end";

interface GameState {
  screen: ScreenType;
  currentLevel: 1 | 2 | 3;
  score: number;
  unlockedLevels: number[];
  levelScores: Record<number, number>;
}

const INITIAL_STATE: GameState = {
  screen: "start",
  currentLevel: 1,
  score: 0,
  unlockedLevels: [1],
  levelScores: {},
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [levelCompleteData, setLevelCompleteData] = useState<{
    level: 1 | 2 | 3;
    levelScore: number;
  } | null>(null);

  const currentLevelData = LEVELS.find((l) => l.id === gameState.currentLevel)!;
  const totalPossible = LEVELS.reduce(
    (acc, l) => acc + l.questions.length * POINTS_PER_QUESTION,
    0,
  );

  const handleStartGame = () => {
    setGameState((prev) => ({ ...prev, screen: "levelSelect" }));
  };

  const handleSelectLevel = (level: 1 | 2 | 3) => {
    setGameState((prev) => ({ ...prev, currentLevel: level, screen: "game" }));
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setGameState((prev) => ({
        ...prev,
        score: prev.score + POINTS_PER_QUESTION,
      }));
    }
  };

  const handleLevelComplete = (levelScore: number) => {
    const level = gameState.currentLevel;
    const newLevelScores = { ...gameState.levelScores, [level]: levelScore };
    const newUnlocked = [...gameState.unlockedLevels];
    if (level === 1 && !newUnlocked.includes(2)) newUnlocked.push(2);
    if (level === 2 && !newUnlocked.includes(3)) newUnlocked.push(3);

    setLevelCompleteData({ level, levelScore });
    setGameState((prev) => ({
      ...prev,
      screen: "levelComplete",
      levelScores: newLevelScores,
      unlockedLevels: newUnlocked,
    }));
  };

  const handleLevelCompleteContinue = () => {
    setLevelCompleteData(null);
    setGameState((prev) => ({ ...prev, screen: "levelSelect" }));
  };

  const handleFinish = () => {
    setGameState((prev) => ({ ...prev, screen: "end" }));
  };

  const handlePlayAgain = () => {
    setGameState(INITIAL_STATE);
  };

  const handleBackToStart = () => {
    setGameState((prev) => ({ ...prev, screen: "start" }));
  };

  const getStars = (levelScore: number, totalQ: number) => {
    const pct = (levelScore / (totalQ * POINTS_PER_QUESTION)) * 100;
    if (pct >= 80) return 3;
    if (pct >= 50) return 2;
    if (pct > 0) return 1;
    return 0;
  };

  const STAR_KEYS = ["star-1", "star-2", "star-3"];

  return (
    <div className="font-nunito">
      <AnimatePresence mode="wait">
        {gameState.screen === "start" && (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StartScreen onStart={handleStartGame} onLevels={handleStartGame} />
          </motion.div>
        )}

        {gameState.screen === "levelSelect" && (
          <motion.div
            key="levelSelect"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LevelSelectScreen
              unlockedLevels={gameState.unlockedLevels}
              levelScores={gameState.levelScores}
              score={gameState.score}
              onSelectLevel={handleSelectLevel}
              onFinish={handleFinish}
              onBack={handleBackToStart}
            />
          </motion.div>
        )}

        {gameState.screen === "game" && (
          <motion.div
            key={`game-${gameState.currentLevel}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GameScreen
              level={currentLevelData}
              questions={currentLevelData.questions}
              startingQuestionIndex={0}
              score={gameState.score}
              onAnswer={handleAnswer}
              onLevelComplete={handleLevelComplete}
            />
          </motion.div>
        )}

        {gameState.screen === "levelComplete" && levelCompleteData && (
          <motion.div
            key="levelComplete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="min-h-screen flex items-center justify-center p-6"
            style={{
              background:
                "linear-gradient(160deg, #53C6FF 0%, #79F0D6 50%, #FFCC4D 100%)",
            }}
          >
            <div
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
              style={{
                border: "5px solid #1B2352",
                boxShadow: "8px 8px 0 #1B2352",
              }}
              data-ocid="levelcomplete.card"
            >
              <div className="text-6xl mb-3">🎉</div>
              <h2
                className="font-fredoka text-4xl mb-2"
                style={{ color: "#1B2352" }}
              >
                LEVEL COMPLETE!
              </h2>
              <p
                className="font-nunito font-bold text-xl mb-1"
                style={{ color: currentLevelData.color }}
              >
                Level {levelCompleteData.level}: {currentLevelData.theme}
              </p>
              <p className="font-nunito text-lg mb-4" style={{ color: "#555" }}>
                You scored {levelCompleteData.levelScore} /{" "}
                {currentLevelData.questions.length * POINTS_PER_QUESTION} points
              </p>
              <div className="flex justify-center gap-3 mb-6">
                {STAR_KEYS.map((key, i) => (
                  <motion.span
                    key={key}
                    className="text-5xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.2 + i * 0.25,
                      type: "spring",
                      damping: 8,
                    }}
                    style={{
                      filter:
                        i <
                        getStars(
                          levelCompleteData.levelScore,
                          currentLevelData.questions.length,
                        )
                          ? "none"
                          : "grayscale(1) opacity(0.3)",
                    }}
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLevelCompleteContinue}
                type="button"
                className="w-full py-4 rounded-2xl font-fredoka text-2xl text-white"
                style={{
                  background: "linear-gradient(135deg, #FF9A2F, #FFCC4D)",
                  border: "4px solid #1B2352",
                  boxShadow: "4px 4px 0 #1B2352",
                }}
                data-ocid="levelcomplete.confirm_button"
              >
                CONTINUE 🚀
              </motion.button>
            </div>
          </motion.div>
        )}

        {gameState.screen === "end" && (
          <motion.div
            key="end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <EndScreen
              score={gameState.score}
              totalPossible={totalPossible}
              onPlayAgain={handlePlayAgain}
              onLevelSelect={() =>
                setGameState((prev) => ({ ...prev, screen: "levelSelect" }))
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
