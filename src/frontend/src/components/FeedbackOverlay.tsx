import { AnimatePresence, motion } from "motion/react";

interface FeedbackOverlayProps {
  isCorrect: boolean;
  explanation: string;
  wrongExplanation?: string;
  correctAnswer?: string;
  onNext: () => void;
  isLastQuestion: boolean;
}

export default function FeedbackOverlay({
  isCorrect,
  explanation,
  wrongExplanation,
  correctAnswer,
  onNext,
  isLastQuestion,
}: FeedbackOverlayProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          background: "rgba(27,35,82,0.6)",
          backdropFilter: "blur(4px)",
        }}
      >
        <motion.div
          initial={{ scale: 0.7, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 18, stiffness: 280 }}
          className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl"
          style={{
            border: "4px solid #1B2352",
            boxShadow: "8px 8px 0px #1B2352",
          }}
          data-ocid="feedback.dialog"
        >
          {/* Banner */}
          <div
            className="px-6 py-5 text-center"
            style={{
              background: isCorrect
                ? "linear-gradient(135deg, #2ECC71, #27AE60)"
                : "linear-gradient(135deg, #e74c3c, #c0392b)",
            }}
          >
            <div className="text-5xl mb-2">{isCorrect ? "✅" : "❌"}</div>
            <h2 className="text-white font-fredoka text-3xl tracking-wide drop-shadow">
              {isCorrect ? "GREAT JOB!" : "OOPS!"}
            </h2>
            {isCorrect && (
              <p className="text-white font-nunito font-bold text-lg mt-1">
                +10 Points! 🎉
              </p>
            )}
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            {!isCorrect && correctAnswer && (
              <div
                className="rounded-2xl p-3 text-center"
                style={{ background: "#fff3cd", border: "2px solid #FFB800" }}
              >
                <p
                  className="font-nunito font-bold text-lg"
                  style={{ color: "#1B2352" }}
                >
                  Correct Answer:{" "}
                  <span style={{ color: "#27AE60" }}>{correctAnswer}</span>
                </p>
              </div>
            )}

            {!isCorrect && wrongExplanation && (
              <div
                className="rounded-2xl p-3"
                style={{ background: "#fdecea", border: "2px solid #e74c3c" }}
              >
                <p
                  className="font-nunito font-semibold text-sm"
                  style={{ color: "#c0392b" }}
                >
                  ⚠️ Why your answer was wrong:
                </p>
                <p
                  className="font-nunito text-sm mt-1"
                  style={{ color: "#1B2352" }}
                >
                  {wrongExplanation}
                </p>
              </div>
            )}

            <div
              className="rounded-2xl p-4"
              style={{
                background: isCorrect ? "#e9f9f1" : "#f0f4ff",
                border: `2px solid ${isCorrect ? "#2ECC71" : "#2E7BFF"}`,
              }}
            >
              <p
                className="font-nunito font-bold text-sm mb-1"
                style={{ color: isCorrect ? "#27AE60" : "#2E7BFF" }}
              >
                💡 Explanation:
              </p>
              <p
                className="font-nunito text-sm leading-relaxed"
                style={{ color: "#1B2352" }}
              >
                {explanation}
              </p>
            </div>

            <button
              type="button"
              onClick={onNext}
              className="w-full py-4 rounded-2xl font-fredoka text-xl text-white transition-transform hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #2E7BFF, #7A4CFF)",
                border: "3px solid #1B2352",
                boxShadow: "4px 4px 0px #1B2352",
              }}
              data-ocid="feedback.confirm_button"
            >
              {isLastQuestion ? "See Results 🏆" : "NEXT ➡️"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
