import React, { useState } from "react";

const questions = [
  {
    question: "Which group of plants includes all flowering and fruit-producing species? (Think: oak trees, tomatoes, roses)",
    options: ["Pinophyta (Conifers)", "Pteridophyta (Ferns)", "Magnoliophyta (Flowering plants)", "Bryophyta (Mosses)"],
    answer: "Magnoliophyta (Flowering plants)",
    explanation: "Magnoliophyta, or flowering plants, include all plants that make flowers and fruits. This is the most familiar group."
  },
  {
    question: "Which plant group includes cone-bearing trees like pines and cypresses? (Think: evergreens, Christmas trees)",
    options: ["Gnetophyta (Weird desert plants)", "Pinophyta (Conifers)", "Lycopodiophyta (Club mosses)", "Ginkgophyta (Ginkgo tree)"],
    answer: "Pinophyta (Conifers)",
    explanation: "Pinophyta includes all conifers—trees with cones and needle- or scale-like leaves like pines, firs, and cypresses."
  },
  {
    question: "Which group includes leafy, moisture-loving plants that reproduce with spores? (Think: forest ferns)",
    options: ["Pteridophyta (Ferns)", "Bryophyta (Mosses)", "Gnetophyta (Desert plants)", "Cycadophyta (Palm-like cone trees)"],
    answer: "Pteridophyta (Ferns)",
    explanation: "Pteridophyta includes ferns, which have fronds and reproduce using spores instead of seeds."
  },
  {
    question: "Which group contains mosses—tiny, soft green plants found in moist, shady areas?",
    options: ["Lycopodiophyta (Club mosses)", "Bryophyta (Mosses)", "Anthocerotophyta (Hornworts)", "Pteridophyta (Ferns)"],
    answer: "Bryophyta (Mosses)",
    explanation: "Bryophyta includes mosses—non-vascular, soft plants often growing like carpets on logs and rocks."
  },
  {
    question: "Which tree is the only surviving member of its entire division? (Hint: fan-shaped leaves, planted in cities)",
    options: ["Ginkgo biloba (Ginkgophyta)", "Taxus baccata (Yew)", "Sequoia sempervirens (Redwood)", "Ephedra sinica (Desert shrub)"],
    answer: "Ginkgo biloba (Ginkgophyta)",
    explanation: "Ginkgo biloba is the only living species in the Ginkgophyta division. It's known for fan-shaped leaves and urban resilience."
  },
  {
    question: "Which plant group looks like palm trees but actually produces cones? (Common in tropical gardens)",
    options: ["Cycadophyta (Cycads)", "Gnetophyta (Desert plants)", "Magnoliophyta (Flowering plants)", "Bryophyta (Mosses)"],
    answer: "Cycadophyta (Cycads)",
    explanation: "Cycads are ancient, palm-like plants that bear cones. They're popular in landscaping but are not true palms."
  },
  {
    question: "Which group includes most of the world’s plant species, including fruits, vegetables, and trees like oak and maple?",
    options: ["Pinophyta (Conifers)", "Magnoliophyta (Flowering plants)", "Bryophyta (Mosses)", "Pteridophyta (Ferns)"],
    answer: "Magnoliophyta (Flowering plants)",
    explanation: "With over 300,000 species, Magnoliophyta includes all flowering plants—everything from grass to apple trees."
  },
  {
    question: "How do gymnosperms differ from flowering plants (angiosperms)?",
    options: ["Gymnosperms have flowers", "Angiosperms produce cones", "Gymnosperms have naked seeds (no fruit)", "Angiosperms lack vascular tissue"],
    answer: "Gymnosperms have naked seeds (no fruit)",
    explanation: "Gymnosperms like pine trees produce seeds without protective fruit. Angiosperms make seeds inside fruits."
  },
  {
    question: "Which group includes mosses that grow like sponges on forest floors and rocks?",
    options: ["Bryophyta (Mosses)", "Pinophyta (Conifers)", "Pteridophyta (Ferns)", "Cycadophyta (Cycads)"],
    answer: "Bryophyta (Mosses)",
    explanation: "Bryophyta includes non-vascular mosses that thrive in wet, shaded environments and don't grow tall."
  },
  {
    question: "What group includes strange desert-adapted plants like Ephedra?",
    options: ["Gnetophyta (Desert oddballs)", "Magnoliophyta (Flowering plants)", "Cycadophyta (Cone palms)", "Lycopodiophyta (Club mosses)"],
    answer: "Gnetophyta (Desert oddballs)",
    explanation: "Gnetophyta includes rare, ancient plants like Ephedra, often found in deserts or arid zones."
  },
  // The rest of the questions continue with the same style...
];

export default function PlantDivisionQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const question = questions[current];

  const handleAnswer = (option) => {
    setSelected(option);
    setShowFeedback(true);
  };

  const next = () => {
    setSelected(null);
    setShowFeedback(false);
    setCurrent(current + 1);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Plant Divisions Quiz (Layman's Edition)</h1>
      <div className="mb-4">
        <p className="font-medium">{question.question}</p>
        {question.options.map((option) => (
          <button
            key={option}
            className={`block w-full text-left px-4 py-2 mt-2 rounded border ${
              selected === option
                ? option === question.answer
                  ? "bg-green-200 border-green-600"
                  : "bg-red-200 border-red-600"
                : "bg-white border-gray-300"
            }`}
            onClick={() => handleAnswer(option)}
            disabled={showFeedback}
          >
            {option}
          </button>
        ))}
        {showFeedback && (
          <div className="mt-2 text-sm italic text-gray-700">
            {selected === question.answer ? "Correct!" : "Incorrect."} {question.explanation}
          </div>
        )}
      </div>
      {showFeedback && current < questions.length - 1 && (
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={next}
        >
          Next Question
        </button>
      )}
      {showFeedback && current === questions.length - 1 && (
        <p className="text-green-700 font-semibold">Quiz complete!</p>
      )}
    </div>
  );
}
