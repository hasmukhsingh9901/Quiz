
import { create } from 'zustand';
import data from "@/constants/data.json";

const processQuizData = () => {
  return data?.map((item) => ({
    id: item.id,
    type: item.type,
    question: item.question,
    answers: item.answers
      ? item.answers.map((answer) => ({
          id: answer.id,
          answer: answer.answer,
        }))
      : [],
    correctAnswer: item.correctAnswer || item.answer
  })) || [];
};

const useQuizStore = create((set, get) => ({
  // Quiz data
  quizData: processQuizData(),
  
  // Quiz state
  currentQuestion: 0,
  selectedAnswers: {},
  numberAnswers: {},
  timeLeft: 30,
  quizActive: false,
  showResults: false,
  quizHistory: [],
  showHistory: false,
  feedbackMessage: "",
  feedbackVisible: false,
  
  // Helper functions
  isMCQ: (question) => question.type.toLowerCase() === "mcq",
  
  getCorrectAnswer: (questionId) => {
    const question = data.find(q => q.id === questionId);
    if (!question) return null;
    
    return question.type.toLowerCase() === "mcq"
      ? question.correctAnswer
      : question.answer;
  },
  
  // Actions
  startQuiz: () => set({
    currentQuestion: 0,
    selectedAnswers: {},
    numberAnswers: {},
    showResults: false,
    timeLeft: 30,
    quizActive: true,
    feedbackVisible: false
  }),
  
  setSelectedAnswer: (questionId, value) => set(state => ({
    selectedAnswers: {
      ...state.selectedAnswers,
      [questionId]: value
    }
  })),
  
  setNumberAnswer: (questionId, value) => set(state => ({
    numberAnswers: {
      ...state.numberAnswers,
      [questionId]: value ? parseInt(value) : null
    }
  })),
  
  decrementTimer: () => set(state => ({
    timeLeft: state.timeLeft - 1
  })),
  
  resetTimer: () => set({
    timeLeft: 30
  }),
  
  submitAnswer: () => {
    const state = get();
    const currentQ = state.quizData[state.currentQuestion];
    let isCorrect = false;
    
    if (state.isMCQ(currentQ)) {
      const selected = state.selectedAnswers[currentQ.id];
      isCorrect = selected === state.getCorrectAnswer(currentQ.id);
      
      set({
        feedbackMessage: isCorrect 
          ? "Correct! Well done." 
          : `Incorrect. The correct answer is ${state.getCorrectAnswer(currentQ.id)}.`,
        feedbackVisible: true
      });
    } else {
      const userAnswer = state.numberAnswers[currentQ.id];
      const correctAnswer = state.getCorrectAnswer(currentQ.id);
      isCorrect = userAnswer === correctAnswer;
      
      set({
        feedbackMessage: isCorrect 
          ? "Correct! Well done." 
          : `Incorrect. The correct answer is ${correctAnswer}.`,
        feedbackVisible: true
      });
    }
    
    setTimeout(() => {
      set({ feedbackVisible: false });
      get().nextQuestion();
    }, 2000);
  },
  
  nextQuestion: () => {
    const state = get();
    if (state.currentQuestion < state.quizData.length - 1) {
      set(state => ({
        currentQuestion: state.currentQuestion + 1,
        timeLeft: 30,
        feedbackVisible: false
      }));
    } else {
      get().finishQuiz();
    }
  },
  
  finishQuiz: () => {
    const state = get();
    const score = get().calculateScore();
    const percentage = (score.correct / state.quizData.length) * 100;
    
    const newAttempt = {
      id: state.quizHistory.length + 1,
      date: new Date().toLocaleString(),
      score: score.correct,
      total: state.quizData.length,
      percentage: percentage.toFixed(1)
    };
    
    set(state => ({
      quizHistory: [newAttempt, ...state.quizHistory],
      showResults: true,
      quizActive: false
    }));
  },
  
  calculateScore: () => {
    const state = get();
    let correct = 0;
    let incorrect = 0;
    
    state.quizData.forEach(question => {
      if (state.isMCQ(question)) {
        if (state.selectedAnswers[question.id] === state.getCorrectAnswer(question.id)) {
          correct++;
        } else {
          incorrect++;
        }
      } else {
        if (state.numberAnswers[question.id] === state.getCorrectAnswer(question.id)) {
          correct++;
        } else {
          incorrect++;
        }
      }
    });
    
    return { correct, incorrect };
  },
  
  toggleHistory: () => set(state => ({
    showHistory: !state.showHistory
  }))
}));

export default useQuizStore;