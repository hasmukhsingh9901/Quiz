import { useMemo } from "react";
import data from "@/constants/data.json";

const useFetchData = () => {
  const refineData = useMemo(() => {
    return (
      data?.map((item) => ({
        id: item.id,
        type: item.type,
        question: item.question,
        answers: item.answers
          ? item.answers.map((answer) => ({
              id: answer.id,
              answer: answer.answer,
            }))
          : [],
        correctAnswer: item.currectAnswer || item.answer,
      })) || []
    );
  }, []);

    console.log(refineData)
  const isMCQ = (question) => question.type.toLowerCase() === "mcq";

  const getCorrectAnswer = (questionId) => {
    const question = data.find((q) => q.id === questionId);
    if (!question) return null;

    return question.type.toLowerCase() === "mcq"
      ? question.correctAnswer
      : question.answer;
  };
  return { refineData, isMCQ ,getCorrectAnswer};
};

export default useFetchData;
