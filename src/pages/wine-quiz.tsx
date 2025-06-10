import React, { useState } from 'react';

const questions = [
  {
    question: "What does the acronym 'SATBFF' stand for in wine tasting?",
    options: [
      "Sweetness, Acidity, Tannin, Balance, Flavor, Finesse",
      "Structure, Alcohol, Tannin, Body, Fruit, Finish",
      "Savor All The Bold Flavors Fully",
      "Sweetness, Acidity, Tannin, Body, Flavor, Finish"
    ],
    answer: 3
  },
  {
    question: "Which acronym helps you remember the key tasting components in order?",
    options: [
      "BFAST",
      "SATBFF",
      "FRESH",
      "WINE"
    ],
    answer: 1
  },
  {
    question: "What does the acronym 'BFAST' represent in wine tasting structure?",
    options: [
      "Body, Finish, Acidity, Sweetness, Tannin",
      "Balance, Fruit, Alcohol, Structure, Tannin",
      "Boldness, Finish, Acid, Sugar, Texture",
      "Brilliance, Fullness, Aroma, Structure, Tannin"
    ],
    answer: 0
  },
  {
    question: "What sensation best indicates high acidity in wine?",
    options: ["Sweetness on tongue", "Heat in chest", "Mouth-watering after sip", "Dryness in cheeks"],
    answer: 2
  },
  {
    question: "Which component gives wine a drying or astringent feel?",
    options: ["Sugar", "Acid", "Tannin", "Alcohol"],
    answer: 2
  },
  {
    question: "A wine with high alcohol is most likely to feel:",
    options: ["Tart and thin", "Warm and full-bodied", "Sweet and crisp", "Short in finish"],
    answer: 1
  },
  {
    question: "What’s the best predictor of wine body?",
    options: ["Tannin", "Alcohol", "Acidity", "Color"],
    answer: 1
  },
  {
    question: "Residual sugar contributes most directly to:",
    options: ["Sweetness and fullness", "Alcohol and dryness", "Tannin and structure", "Crispness"],
    answer: 0
  },
  {
    question: "A long finish usually means:",
    options: ["The wine is sweet", "The wine has good balance and complexity", "It has low alcohol", "The wine is off-dry"],
    answer: 1
  },
  {
    question: "Which is not part of the SATBFF framework?",
    options: ["Sweetness", "Color", "Tannin", "Finish"],
    answer: 1
  },
  {
    question: "Which of these wines would likely be the lightest-bodied?",
    options: ["11% Pinot Noir", "14.5% Zinfandel", "13.5% Chardonnay with oak", "13% Syrah"],
    answer: 0
  },
  {
    question: "A wine that feels \"grippy\" is likely high in:",
    options: ["Tannins", "Acidity", "Glycerol", "Residual sugar"],
    answer: 0
  },
  {
    question: "A crisp white wine with tart fruit flavors likely has:",
    options: ["Low acid and high sugar", "High acid and low sugar", "High tannin and high alcohol", "Low alcohol and high tannin"],
    answer: 1
  }
  // More questions can be added here following the same format...
];

export default function WineTastingQuiz() {
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (index, optionIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Wine Tasting Quiz</h1>
      {questions.map((q, index) => (
        <div key={index} className="p-4 border rounded-xl shadow">
          <p className="font-medium">{index + 1}. {q.question}</p>
          <div className="space-y-2 mt-2">
            {q.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={optionIndex}
                  checked={userAnswers[index] === optionIndex}
                  onChange={() => handleChange(index, optionIndex)}
                  disabled={submitted}
                />
                <label>{option}</label>
              </div>
            ))}
            {submitted && (
              <p className={`mt-1 text-sm ${userAnswers[index] === q.answer ? 'text-green-600' : 'text-red-600'}`}>
                {userAnswers[index] === q.answer ? 'Correct!' : `Incorrect. Correct answer: ${q.options[q.answer]}`}
              </p>
            )}
          </div>
        </div>
      ))}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Submit Answers
        </button>
      ) : (
        <p className="text-xl font-semibold">Your score: {userAnswers.filter((a, i) => a === questions[i].answer).length} / {questions.length}</p>
      )}
    </div>
  );
}
