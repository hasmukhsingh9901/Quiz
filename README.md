# 📚 Quiz App 🎯  

A **dynamic, interactive** quiz application built with **Next.js**, styled with **Tailwind CSS**, and managed with **Zustand** for state management. The app uses a `data.json` file to store quiz questions and allows users to attempt **MCQ** and **Fill-up (Integer)** type questions.  

## 🚀 Features  
✅ **MCQ & Fill-up Questions**: Choose from multiple-choice questions or enter integer values.  
✅ **Dynamic Question Listing**: Filter questions based on type selection.  
✅ **State Management with Zustand**: Efficient state handling without unnecessary re-renders.  
✅ **Tailwind CSS Styling**: Beautiful and responsive design.  
✅ **Optimized Data Fetching**: Uses memoization (`useMemo`) for efficient data processing.  

---

## 🛠️ Tech Stack  

| Tech       | Description                           |
|------------|---------------------------------------|
| **Next.js** | React-based framework for SSR & SEO |
| **Tailwind CSS** | Utility-first CSS framework |
| **Zustand** | Lightweight state management |
| **JSON** | Static quiz data storage |

---

## 📸 Screenshots  

### 🎨 Quiz UI  
![Quiz UI](https://via.placeholder.com/800x400?text=Quiz+App+Screenshot)  

### 🏆 MCQ Selection  
![MCQ UI](https://via.placeholder.com/800x400?text=MCQ+Question)  

---

## 📦 Installation  

### 1️⃣ Clone the repository  
```sh
git clone https://github.com/your-username/quiz-app.git
cd quiz-app
```

### 2️⃣ Install dependencies  
```sh
npm install
# or
yarn install
```

### 3️⃣ Run the development server  
```sh
npm run dev
# or
yarn dev
```

📌 **Open [http://localhost:3000](http://localhost:3000) in your browser** 🚀  

---

## 📂 Folder Structure  

```
📦 quiz-app
 ┣ 📂 public        # Static assets
 ┣ 📂 src
 ┃ ┣ 📂 components  # Reusable UI components
 ┃ ┣ 📂 hooks       # Custom React hooks
 ┃ ┣ 📂 pages       # Next.js pages
 ┃ ┣ 📂 store       # Zustand store
 ┃ ┣ 📜 data.json   # Quiz questions
 ┣ 📜 README.md
 ┣ 📜 package.json
```

---

## 🔥 Code Overview  

### 📌 Zustand Store (`store/useQuizStore.js`)  
```js
import { create } from "zustand";

const useQuizStore = create((set) => ({
  selectedType: "MCQ",
  setSelectedType: (type) => set({ selectedType: type }),
}));

export default useQuizStore;
```

### 📌 Fetching Data (`hooks/useFetchData.js`)  
```js
import { useMemo } from "react";
import data from "@/constants/data.json";

const useFetchData = () => {
  const refineData = useMemo(() => {
    return data.map((item) => ({
      id: item.id,
      type: item.type,
      question: item.question,
      answers: item.answers || [],
    }));
  }, []);

  const isMCQ = (question) => question.type.toLowerCase() === "mcq";
  return { refineData, isMCQ };
};

export default useFetchData;
```

---

## ✨ Contributing  

🚀 Want to improve the quiz app? Feel free to **fork** the repo, make changes, and submit a **pull request**!  

---

## 📜 License  

This project is **open-source** and available under the **MIT License**.  

💡 **Built with ❤️ using Next.js, Tailwind CSS & Zustand!** 🚀
