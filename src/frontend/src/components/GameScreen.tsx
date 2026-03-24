import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Level, Question } from "../gameData";
import {
  playCorrectSound,
  playLevelComplete,
  playWrongSound,
} from "../soundEngine";
import FeedbackOverlay from "./FeedbackOverlay";
import FractionVisual from "./svgs/FractionVisual";

interface GameScreenProps {
  level: Level;
  questions: Question[];
  startingQuestionIndex: number;
  score: number;
  onAnswer: (isCorrect: boolean) => void;
  onLevelComplete: (levelScore: number) => void;
}

const OPTION_COLORS = [
  { bg: "linear-gradient(135deg, #2ECC71, #27AE60)", border: "#1a7a41" },
  { bg: "linear-gradient(135deg, #FF9A2F, #FFCC4D)", border: "#8B5E00" },
  { bg: "linear-gradient(135deg, #2E7BFF, #53C6FF)", border: "#1B4FA0" },
  { bg: "linear-gradient(135deg, #7A4CFF, #B06BFF)", border: "#4B2BA0" },
];

function isFractionString(s: string): boolean {
  const parts = s.split("/");
  return (
    parts.length === 2 &&
    !Number.isNaN(Number(parts[0])) &&
    !Number.isNaN(Number(parts[1]))
  );
}

function FractionText({ text }: { text: string }) {
  const parts = text.split("/");
  if (isFractionString(text)) {
    return (
      <span className="fraction-display text-2xl" style={{ color: "#1B2352" }}>
        <span className="fraction-num">{parts[0]}</span>
        <span className="fraction-den">{parts[1]}</span>
      </span>
    );
  }
  return (
    <span
      className="font-nunito font-bold text-xl"
      style={{ color: "#1B2352" }}
    >
      {text}
    </span>
  );
}

function Level2QuestionDisplay({ text }: { text: string }) {
  const match = text.match(/(.+?)\s*\u2610\s*(.+)/);
  if (match) {
    return (
      <div className="flex items-center justify-center gap-4 my-4">
        <FractionText text={match[1].trim()} />
        <span className="font-fredoka text-3xl" style={{ color: "#1B2352" }}>
          ☐
        </span>
        <FractionText text={match[2].trim()} />
      </div>
    );
  }
  const simpMatch = text.match(/Simplify.+:\s*(.+?)\s*=/);
  if (simpMatch) {
    return (
      <div className="flex items-center justify-center gap-3 my-4">
        <FractionText text={simpMatch[1].trim()} />
        <span className="font-fredoka text-3xl" style={{ color: "#1B2352" }}>
          = ?
        </span>
      </div>
    );
  }
  return null;
}

function Level3QuestionDisplay({ text }: { text: string }) {
  const match = text.match(/Calculate:\s*(.+?)\s*([+\-])\s*(.+?)\s*=/);
  if (match) {
    return (
      <div className="flex items-center justify-center gap-3 my-4 flex-wrap">
        <FractionText text={match[1].trim()} />
        <span className="font-fredoka text-3xl" style={{ color: "#1B2352" }}>
          {match[2]}
        </span>
        <FractionText text={match[3].trim()} />
        <span className="font-fredoka text-3xl" style={{ color: "#1B2352" }}>
          = ?
        </span>
      </div>
    );
  }
  return null;
}

export default function GameScreen({
  level,
  questions,
  startingQuestionIndex,
  score,
  onAnswer,
  onLevelComplete,
}: GameScreenProps) {
  const [questionIndex, setQuestionIndex] = useState(startingQuestionIndex);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [levelScore, setLevelScore] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setQuestionIndex(startingQuestionIndex);
  }, [startingQuestionIndex]);

  const question = questions[questionIndex];
  const isLastQuestion = questionIndex === questions.length - 1;

  const handleOptionClick = (option: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
    const isCorrect = option === question.correct;
    if (isCorrect) {
      playCorrectSound();
      setLevelScore((prev) => prev + 10);
    } else {
      playWrongSound();
    }
    onAnswer(isCorrect);
    setTimeout(() => setShowFeedback(true), 300);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (isLastQuestion) {
      playLevelComplete();
      setTimeout(
        () =>
          onLevelComplete(
            levelScore + (selectedOption === question.correct ? 10 : 0),
          ),
        200,
      );
    } else {
      setTimeout(() => {
        setSelectedOption(null);
        setQuestionIndex((prev) => prev + 1);
        setAnimKey((k) => k + 1);
      }, 150);
    }
  };

  const getButtonStyle = (option: string, idx: number) => {
    const colors = OPTION_COLORS[idx % 4];
    if (selectedOption === null) {
      return {
        background: colors.bg,
        border: `3px solid ${colors.border}`,
        boxShadow: `3px 3px 0 ${colors.border}`,
      };
    }
    if (option === question.correct) {
      return {
        background: "linear-gradient(135deg, #2ECC71, #27AE60)",
        border: "3px solid #1a7a41",
        boxShadow: "3px 3px 0 #1a7a41",
      };
    }
    if (option === selectedOption) {
      return {
        background: "linear-gradient(135deg, #e74c3c, #c0392b)",
        border: "3px solid #7b241c",
        boxShadow: "3px 3px 0 #7b241c",
      };
    }
    return {
      background: "#ddd",
      border: "3px solid #aaa",
      boxShadow: "3px 3px 0 #aaa",
      opacity: 0.5,
    };
  };

  const getButtonAnim = (option: string) => {
    if (!selectedOption) return "";
    if (option === question.correct && selectedOption !== null)
      return "animate-bounce-in";
    if (option === selectedOption && option !== question.correct)
      return "animate-shake";
    return "";
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        background:
          "linear-gradient(180deg, #53C6FF 0%, #e8f8ff 35%, #f7f0ff 100%)",
      }}
    >
      {/* Top bar */}
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{
          background: `linear-gradient(135deg, ${level.color}, ${level.headerColor})`,
          borderBottom: "4px solid #1B2352",
        }}
      >
        <div
          className="font-fredoka text-white text-lg"
          style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.3)" }}
        >
          {level.name}: {level.theme}
        </div>
        <div className="font-fredoka text-white text-lg">
          Q {questionIndex + 1}/{questions.length}
        </div>
        <div
          className="font-fredoka text-xl px-4 py-1 rounded-full"
          style={{
            background: "rgba(255,204,77,0.3)",
            border: "2px solid #FFCC4D",
            color: "white",
            textShadow: "1px 1px 0 rgba(0,0,0,0.3)",
          }}
        >
          ⭐ {score} pts
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="h-2 bg-white/30"
        style={{ borderBottom: "2px solid rgba(27,35,82,0.2)" }}
      >
        <motion.div
          className="h-full"
          style={{ background: level.color }}
          animate={{ width: `${(questionIndex / questions.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={animKey}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {/* Question card */}
            <div
              className="bg-white rounded-3xl p-6 mb-5 shadow-xl"
              style={{
                border: "4px solid #1B2352",
                boxShadow: "6px 6px 0 #1B2352",
              }}
            >
              {/* Question header */}
              <div
                className="rounded-2xl px-4 py-2 mb-4 text-center"
                style={{
                  background: "linear-gradient(135deg, #2E7BFF, #7A4CFF)",
                }}
              >
                <p className="font-fredoka text-white text-xl">QUIZ TIME! 🎯</p>
              </div>

              {/* SVG Illustration for Level 1 */}
              {level.id === 1 && question.svgType && question.svgProps && (
                <div className="flex justify-center mb-4">
                  <FractionVisual
                    svgType={question.svgType}
                    svgProps={question.svgProps}
                    size={160}
                  />
                </div>
              )}

              {/* Question text */}
              <p
                className="font-nunito font-bold text-lg text-center mb-2"
                style={{ color: "#1B2352" }}
              >
                {question.text}
              </p>

              {level.id === 2 && <Level2QuestionDisplay text={question.text} />}
              {level.id === 3 && <Level3QuestionDisplay text={question.text} />}
            </div>

            {/* Answer buttons 2x2 grid */}
            <div className="grid grid-cols-2 gap-3">
              {question.options.map((option, idx) => (
                <motion.button
                  key={option}
                  whileHover={selectedOption === null ? { scale: 1.04 } : {}}
                  whileTap={selectedOption === null ? { scale: 0.96 } : {}}
                  onClick={() => handleOptionClick(option)}
                  disabled={selectedOption !== null}
                  type="button"
                  className={`py-4 px-3 rounded-2xl font-fredoka text-xl text-white text-center transition-all ${getButtonAnim(option)}`}
                  style={getButtonStyle(option, idx)}
                  data-ocid={`game.button.${idx + 1}`}
                >
                  {isFractionString(option) ? (
                    <span className="fraction-display text-xl">
                      <span className="fraction-num">
                        {option.split("/")[0]}
                      </span>
                      <span className="fraction-den">
                        {option.split("/")[1]}
                      </span>
                    </span>
                  ) : (
                    option
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Feedback overlay */}
      {showFeedback && selectedOption && (
        <FeedbackOverlay
          isCorrect={selectedOption === question.correct}
          explanation={question.explanation}
          wrongExplanation={
            selectedOption !== question.correct
              ? question.wrongExplanations[selectedOption]
              : undefined
          }
          correctAnswer={
            selectedOption !== question.correct ? question.correct : undefined
          }
          onNext={handleNext}
          isLastQuestion={isLastQuestion}
        />
      )}
    </div>
  );
}
