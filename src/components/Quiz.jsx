"use client";
import useQuizStore from "@/store/useQuizStore";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Radio,
  RadioGroup
} from "@heroui/react";
import { useEffect } from "react";
import Result from "./Result";
import ShowHistory from "./ShowHistory";

const QuizPlatform = () => {
  const {
    quizData,
    currentQuestion,
    selectedAnswers,
    numberAnswers,
    timeLeft,
    quizActive,
    showResults,
    quizHistory,
    showHistory,
    feedbackMessage,
    feedbackVisible,
    isMCQ,
    getCorrectAnswer,
    calculateScore,

    startQuiz,
    setSelectedAnswer,
    setNumberAnswer,
    decrementTimer,
    submitAnswer,
    nextQuestion,
    toggleHistory,
  } = useQuizStore();

  useEffect(() => {
    if (!quizActive) return;

    if (timeLeft <= 0) {
      nextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      decrementTimer();
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, quizActive, nextQuestion, decrementTimer]);

  const currentQuestionData = quizData[currentQuestion];
  const score = calculateScore();

  return (
    <div className="w-full max-w-3xl mx-auto p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Interactive Quiz Platform</h1>

      {/* Quiz Control Buttons */}
      <div className="w-full flex justify-between mb-6">
        <Button color="primary" onPress={startQuiz} disabled={quizActive}>
          Start New Quiz
        </Button>

        <Dropdown>
          <DropdownTrigger>
            <Button variant="outlined">Options</Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem onPress={toggleHistory} className="text-black">
              {showHistory ? "Hide History" : "Show Attempt History"}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Attempt History */}
      <ShowHistory showHistory={showHistory} quizHistory={quizHistory} />

      {/* Active Quiz Section */}
      {quizActive && !showResults && (
        <div className="w-full">
          {/* Timer */}
          <div className="mb-4 flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              ></div>
            </div>
            <span className="ml-3 font-medium">{timeLeft}s</span>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-between text-sm mb-5">
            <span>
              Question {currentQuestion + 1} of {quizData.length}
            </span>
            <span>Score: {score.correct} correct</span>
          </div>

          {/* Question Display */}
          <div className="border rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">
              {currentQuestionData.id}. {currentQuestionData.question}
            </h3>

            {isMCQ(currentQuestionData) ? (
              <RadioGroup
                label="Select your answer:"
                value={selectedAnswers[currentQuestionData.id] || ""}
                onChange={(e) =>
                  setSelectedAnswer(currentQuestionData.id, e.target.value)
                }
              >
                {currentQuestionData.answers.map((answer) => (
                  <Radio key={answer.id} value={answer.id}>
                    {answer.id}. {answer.answer}
                  </Radio>
                ))}
              </RadioGroup>
            ) : (
              <div>
                <label className="block mb-2">Enter your answer:</label>
                <Input
                  type="number"
                  className="w-full"
                  placeholder="Type your answer"
                  value={numberAnswers[currentQuestionData.id] || ""}
                  onChange={(e) =>
                    setNumberAnswer(currentQuestionData.id, e.target.value)
                  }
                />
              </div>
            )}
          </div>

          {/* Feedback Message */}
          {feedbackVisible && (
            <div
              className={`p-4 mb-4 rounded-lg text-center ${
                feedbackMessage.startsWith("Correct")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {feedbackMessage}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              color="primary"
              onPress={submitAnswer}
              disabled={
                isMCQ(currentQuestionData)
                  ? !selectedAnswers[currentQuestionData.id]
                  : numberAnswers[currentQuestionData.id] === undefined ||
                    numberAnswers[currentQuestionData.id] === null
              }
            >
              Submit Answer
            </Button>
            <Button variant="outlined" onPress={nextQuestion}>
              Skip Question
            </Button>
          </div>
        </div>
      )}

      {/* Results Screen */}
      <Result showResults={showResults} score={score} quizData={quizData} startQuiz={startQuiz} />

      {/* Quiz Instructions (shown when not active) */}
      {!quizActive && !showResults && (
        <div className="w-full border rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-3">Quiz Instructions</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              This quiz contains {quizData.length} questions (multiple choice
              and numeric answers).
            </li>
            <li>You have 30 seconds to answer each question.</li>
            <li>
              You'll receive instant feedback after submitting each answer.
            </li>
            <li>
              Your performance history will be tracked across multiple attempts.
            </li>
            <li>Click "Start New Quiz" when you're ready to begin!</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuizPlatform;
