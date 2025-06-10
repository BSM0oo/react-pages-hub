// Intermittent Fasting Quiz - React TSX
// Shows all questions at once, instant feedback

import React, { useState } from "react";

const questions = [
  {
    question: "What is the minimum fasting duration associated with a measurable metabolic benefit?",
    options: ["10 hours", "12 hours", "13 hours", "16 hours"],
    answer: "13 hours",
  },
  {
    question: "Which of the following fasting windows is associated with the best adherence and good metabolic return?",
    options: ["12 hours", "14–15 hours", "16–18 hours", "20+ hours"],
    answer: "14–15 hours",
  },
  {
    question: "At approximately what fasting hour does the 'metabolic switch' typically occur?",
    options: ["8 hours", "10 hours", "12–13 hours", "18 hours"],
    answer: "12–13 hours",
  },
  {
    question: "What physiological change defines the 'metabolic switch'?",
    options: [
      "Increase in blood glucose",
      "Liver glycogen depletion and onset of fat oxidation",
      "Elevation in cortisol",
      "Decrease in core body temperature"
    ],
    answer: "Liver glycogen depletion and onset of fat oxidation",
  },
  {
    question: "Which eating pattern is most misaligned with circadian biology?",
    options: ["eTRF (early time-restricted feeding)", "14:10 TRE", "16:8 TRE starting late", "Alternate-day fasting"],
    answer: "16:8 TRE starting late",
  },
  {
    question: "Which fasting protocol offers the most weight loss on average but has high drop-out rates?",
    options: ["16:8 TRE", "14:10 TRE", "Alternate-day fasting (ADF)", "12-hour fast"],
    answer: "Alternate-day fasting (ADF)",
  },
  {
    question: "What is the approximate additional weight loss benefit when extending a fast from 14 to 16 hours?",
    options: ["1–2% more weight loss", "No difference", "4–5% more weight loss", "0.5% more weight loss"],
    answer: "1–2% more weight loss",
  },
  {
    question: "What fasting duration was linked to a 36% reduction in breast cancer recurrence?",
    options: ["10 hours", "13 hours", "16 hours", "20 hours"],
    answer: "13 hours",
  },
  {
    question: "Which drink does NOT break a fast for autophagy-focused benefits?",
    options: ["Espresso", "Bulletproof coffee", "Milk latte", "Oat milk flat white"],
    answer: "Espresso",
  },
  {
    question: "Which milk alternative is best during a fast due to minimal carbs/protein?",
    options: ["Oat milk", "Coconut milk", "Unsweetened almond milk", "Cow's milk"],
    answer: "Unsweetened almond milk",
  },
  {
    question: "Why does oat milk break a fast more than almond milk?",
    options: ["Higher protein content", "Higher sugar content", "Lower fat", "Lack of caffeine"],
    answer: "Higher sugar content",
  },
  {
    question: "Which of the following does NOT interfere with fasting glucose or postprandial lipids?",
    options: ["2 cups black coffee", "Whole milk", "Protein powder", "Bulletproof coffee"],
    answer: "2 cups black coffee",
  },
  {
    question: "How many kcal is the upper limit for an add-in to coffee that maintains a near-fast state?",
    options: ["< 50 kcal", "< 30 kcal", "< 20 kcal", "< 15 kcal"],
    answer: "< 15 kcal",
  },
  {
    question: "Which compound in coffee may upregulate fat oxidation enzymes?",
    options: ["Lactose", "Polyphenols", "Sucrose", "Casein"],
    answer: "Polyphenols",
  },
  {
    question: "Which fasting benefit is likely lost by adding 200 kcal of butter to coffee?",
    options: ["Ketosis", "Insulin suppression", "Autophagy", "Fat oxidation"],
    answer: "Autophagy",
  },
  {
    question: "Which milk has the **least** insulin response per tablespoon?",
    options: ["Heavy cream", "Whole milk", "Skim milk", "Oat milk"],
    answer: "Heavy cream",
  },
  {
    question: "Which sweetener has the most neutral impact on insulin and gut microbiome?",
    options: ["Aspartame", "Stevia", "Sucralose", "Xylitol"],
    answer: "Stevia",
  },
  {
    question: "How much whole milk is considered borderline for maintaining fasting benefits?",
    options: ["10 mL", "30 mL", "50 mL", "100 mL"],
    answer: "30 mL",
  },
  {
    question: "What’s the main downside to 16–18 h fasts for most people?",
    options: ["Worse glucose control", "Higher drop-out", "No fat loss", "Too many meals"],
    answer: "Higher drop-out",
  },
  {
    question: "What benefit was **still observed** in a 16:8 fast even without calorie reduction?",
    options: ["Weight gain", "No metabolic change", "Lower HbA1c and BP", "Muscle loss"],
    answer: "Lower HbA1c and BP",
  },
  {
    question: "What’s the ideal morning drink to preserve fasting benefits but stay alert?",
    options: ["Espresso", "Oat milk latte", "Protein shake", "Orange juice"],
    answer: "Espresso",
  },
  {
    question: "What hormone rises with liver glycogen depletion?",
    options: ["Insulin", "Cortisol", "AMPK", "IGF-1"],
    answer: "AMPK",
  },
  {
    question: "What kind of schedule is most sustainable for you (given late eating)?",
    options: ["16:8 ending at 6pm", "14:10 from 9:30pm–11:30am", "OMAD lunch-only", "Alternate day"],
    answer: "14:10 from 9:30pm–11:30am",
  },
  {
    question: "What defines a ‘dirty fast’?",
    options: ["Fatigue in the morning", "High protein intake during fast", "Energy intake without carbs/protein", "High-carb meal at night"],
    answer: "Energy intake without carbs/protein",
  },
  {
    question: "How long should you try a fasting window before evaluating lab changes?",
    options: ["3 days", "1 week", "2–4 weeks", "8–12 weeks"],
    answer: "8–12 weeks",
  },
  {
    question: "Which of the following **most** disrupts autophagy during a fast?",
    options: ["Stevia", "Black coffee", "Butter", "Unsweetened almond milk"],
    answer: "Butter",
  },
  {
    question: "Which metabolic pathway is **most** triggered by 14+ hour fasting?",
    options: ["mTOR activation", "Fatty acid synthesis", "Ketogenesis", "Glucose uptake"],
    answer: "Ketogenesis",
  },
  {
    question: "What’s the main mechanism behind insulin suppression during fasting?",
    options: ["Elevated cortisol", "No food intake", "Protein absorption", "Increased ghrelin"],
    answer: "No food intake",
  },
  {
    question: "Which option most closely preserves a ‘clean’ fast:",
    options: ["1 tbsp oat milk", "2 tbsp half-and-half", "Black cold brew", "1 tbsp butter coffee"],
    answer: "Black cold brew",
  },
  {
    question: "What makes eTRF (early TRE) more favorable for BP and TG?",
    options: ["Lower calorie intake", "Better insulin sensitivity in the morning", "Higher fiber intake", "More exercise"],
    answer: "Better insulin sensitivity in the morning",
  }
];

export default function IntermittentFastingQuiz() {
  const [selected, setSelected] = useState({});
  const [score, setScore] = useState(0);

  const handleChange = (qIndex, option) => {
    const correct = questions[qIndex].answer === option;
    setSelected({ ...selected, [qIndex]: option });
    setScore(Object.keys(selected).reduce((acc, i) => acc + (questions[i].answer === selected[i] ? 1 : 0), correct ? 1 : 0));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Intermittent Fasting Quiz</h1>
      {questions.map((q, i) => (
        <div key={i} className="mb-6">
          <p className="font-semibold">{i + 1}. {q.question}</p>
          <div className="mt-2 space-y-1">
            {q.options.map((opt, j) => (
              <button
                key={j}
                className={`block px-4 py-2 rounded border w-full text-left ${selected[i] ? (opt === q.answer ? 'bg-green-100 border-green-400' : (opt === selected[i] ? 'bg-red-100 border-red-400' : 'border-gray-300')) : 'border-gray-200 hover:bg-gray-100'}`}
                onClick={() => handleChange(i, opt)}
                disabled={selected[i]}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="text-xl font-medium text-right">Score: {score} / {questions.length}</div>
    </div>
  );
}