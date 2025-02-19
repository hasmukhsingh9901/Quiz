import { Button } from "@heroui/react";
import React from "react";

const Result = ({ showResults, score, quizData,startQuiz }) => {
  return (
    <div>
      {showResults && (
        <div className="w-full border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Quiz Completed!
          </h2>

          <div className="flex justify-center items-center mb-6">
            <div className="w-48 h-48 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">
                  {Math.round((score.correct / quizData.length) * 100)}%
                </span>
              </div>
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#eee"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#4299e1"
                  strokeWidth="3"
                  strokeDasharray={`${
                    (score.correct / quizData.length) * 100
                  }, 100`}
                />
              </svg>
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-lg mb-2">
              You answered <span className="font-bold">{score.correct}</span>{" "}
              out of <span className="font-bold">{quizData.length}</span>{" "}
              questions correctly.
            </p>
            <p className="text-md text-gray-600">
              {score.correct / quizData.length >= 0.7
                ? "Great job! You've mastered this quiz."
                : score.correct / quizData.length >= 0.5
                ? "Good effort! Keep practicing to improve."
                : "Keep studying and try again to improve your score."}
            </p>
          </div>

          <div className="flex justify-center">
            <Button color="primary" onPress={startQuiz}>
              Take Quiz Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
