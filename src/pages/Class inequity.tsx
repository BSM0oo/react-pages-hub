/* ---------------------------------------------------------------------------
   Class Inequity Quiz – ClassInequityQuiz.tsx
   20-question interactive multiple-choice quiz that teaches & tests
   U.S. class disparities and their political / policy implications.

   ✓  Radio buttons per question
   ✓  “Check” button shows instant feedback + explanation
   ✓  All questions independent (order doesn’t matter)
   ✓  RESET QUIZ button clears every answer/score

   ───────────────  Setup  ───────────────
   npm i react
   (optionally add a UI lib or your own CSS – basic inline styles included)

   Drop this file into your React-TS project and import:

     import ClassInequityQuiz from './ClassInequityQuiz';
     …
     <ClassInequityQuiz />
--------------------------------------------------------------------------- */

import React, { useState } from 'react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;          // 0-based index of correct option
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: 'Roughly what share of U.S. adults 25 + do NOT hold a bachelor’s degree (2023)?',
    options: ['One-third', 'About half', 'Nearly two-thirds', 'Over 80 %'],
    correct: 2,
    explanation:
      'ACS 2023 shows 63.8 % of adults 25 + lack a 4-year degree – close to two-thirds.',
  },
  {
    id: 2,
    text:
      'Which Census region has the highest percentage of adults without a bachelor’s degree?',
    options: ['Northeast', 'Midwest', 'South', 'West'],
    correct: 2,
    explanation:
      'Both educational attainment and wages lag in the South; ~68 % of adults lack a BA.',
  },
  {
    id: 3,
    text:
      'Which region boasts the LOWEST share of residents without a bachelor’s degree?',
    options: ['Midwest', 'South', 'West', 'Northeast'],
    correct: 3,
    explanation:
      'The Northeast has the densest cluster of college towns and graduate-level industries.',
  },
  {
    id: 4,
    text:
      'Nation-wide, what proportion of households live on LESS than $50 k a year?',
    options: ['18 %', '28 %', '38 %', '48 %'],
    correct: 2,
    explanation:
      'CPS/ASEC 2024 (reporting 2023 income) puts the < $50 k share at ~38 %.',
  },
  {
    id: 5,
    text:
      'Which TWO brackets each make up about one-third of households?',
    options: [
      '<$50 k & $50-100 k',
      '$50-100 k & >$100 k',
      '<$50 k & >$100 k',
      'None – only one bracket is that large',
    ],
    correct: 1,
    explanation:
      'Middle ($50-100 k) and upper income (>$100 k) each sit near 31 %.',
  },
  {
    id: 6,
    text:
      'In the South, about what share of households fall under the $50 k line?',
    options: ['25 %', '35 %', '45 %', '55 %'],
    correct: 2,
    explanation:
      'Regional CPS tables show ~45 % in the South—highest of any region.',
  },
  {
    id: 7,
    text:
      'Which region contains the LARGEST share of $100 k-plus households?',
    options: ['Northeast', 'Midwest', 'South', 'West'],
    correct: 3,
    explanation:
      'Tech-driven coastal metros (CA, WA, CO) push the West to ~35 % high-income households.',
  },
  {
    id: 8,
    text:
      'Among working-class Americans (non-college), which issue is most likely to be a “top priority”?',
    options: [
      'Climate change',
      'Economy & jobs',
      'Gun control',
      'Foreign policy',
    ],
    correct: 1,
    explanation:
      'Pew Feb 2024: 85 % of non-college workers flag the economy/jobs as #1.',
  },
  {
    id: 9,
    text:
      'Coastal elites (BA + and >$100 k) most often place which topic at the top of their priority list?',
    options: ['Inflation', 'Immigration', 'Climate change', 'Crime'],
    correct: 2,
    explanation:
      '72 % of the coastal-elite cohort call climate change a top issue—double the working class.',
  },
  {
    id: 10,
    text:
      'Which single issue shows the WIDEST priority gap (≈40 points) between elites and working class?',
    options: [
      'Immigration',
      'Inflation',
      'Climate change',
      'Health-care costs',
    ],
    correct: 2,
    explanation:
      'Climate change: 72 % vs 32 % → 40-point spread.',
  },
  {
    id: 11,
    text:
      'The working class rate inflation a top priority at roughly ______.',
    options: ['59 %', '69 %', '79 %', '89 %'],
    correct: 2,
    explanation:
      '79 % of non-college adults list inflation as top-tier.',
  },
  {
    id: 12,
    text: 'Working-class Americans are most likely to identify with which party?',
    options: ['Democratic', 'Republican', 'Green', 'Independent'],
    correct: 1,
    explanation:
      '49 % lean Republican vs 32 % Democratic, reflecting a rightward shift.',
  },
  {
    id: 13,
    text:
      'Coastal elites are most likely to identify with which party?',
    options: ['Republican', 'Democratic', 'Libertarian', 'Independent'],
    correct: 1,
    explanation:
      '58 % of high-income, college-educated coastal residents are Democrats.',
  },
  {
    id: 14,
    text:
      'Approximately what share of working-class adults call themselves Republican?',
    options: ['30-35 %', '40-45 %', '45-55 %', '>60 %'],
    correct: 2,
    explanation:
      'About half—Pew reports 49 %.',
  },
  {
    id: 15,
    text:
      'Which group has a slightly HIGHER fraction of independents/others?',
    options: ['Working class', 'Coastal elites', 'They’re identical'],
    correct: 0,
    explanation:
      '19 % of working-class vs 16 % of elites are independent.',
  },
  {
    id: 16,
    text:
      'A campaign centered on climate policy and social equity messaging would most effectively target:',
    options: [
      'Southern working-class voters',
      'Midwestern agrarian voters',
      'Coastal professional elites',
      'Rural Mountain West voters',
    ],
    correct: 2,
    explanation:
      'Climate & equity resonate strongly with the BA + >$100 k coastal bloc.',
  },
  {
    id: 17,
    text:
      'A pledge to reshore manufacturing jobs and curb illegal immigration primarily appeals to:',
    options: [
      'College-educated suburban women',
      'Working-class non-college voters',
      'Silicon Valley engineers',
      'Upper-income retirees',
    ],
    correct: 1,
    explanation:
      'Pocket-book & immigration issues rank highest for non-college workers.',
  },
  {
    id: 18,
    text:
      'Based on income distribution, which region stands to gain MOST from refundable tax credits for low-income households?',
    options: ['Northeast', 'Midwest', 'South', 'West'],
    correct: 2,
    explanation:
      'The South’s 45 % sub-$50 k share means it benefits disproportionately from low-income credits.',
  },
  {
    id: 19,
    text:
      'Which region shows the NARROWEST gap between <$50 k and >$100 k households?',
    options: ['Northeast', 'Midwest', 'South', 'West'],
    correct: 3,
    explanation:
      'In the West, high-income tech hubs offset lower-income interiors → 36 % vs 35 %.',
  },
  {
    id: 20,
    text:
      'Why does educational attainment so strongly correlate with party preference in recent elections?',
    options: [
      'College graduates are geographically clustered in blue states',
      'Higher education shifts social attitudes toward diversity & climate action',
      'Student-loan debt makes voters anti-tax',
      'Both A and B',
    ],
    correct: 3,
    explanation:
      'Location clustering + value shifts combine to pull college grads toward Democrats.',
  },
];

type AnswerState = {
  selected: number | null;
  submitted: boolean;
};

export default function ClassInequityQuiz() {
  const [answers, setAnswers] = useState<AnswerState[]>(
    questions.map(() => ({ selected: null, submitted: false })),
  );

  const handleSelect = (qIdx: number, optionIdx: number) => {
    if (answers[qIdx].submitted) return; // lock after submit
    const newAns = [...answers];
    newAns[qIdx].selected = optionIdx;
    setAnswers(newAns);
  };

  const handleSubmit = (qIdx: number) => {
    const newAns = [...answers];
    newAns[qIdx].submitted = true;
    setAnswers(newAns);
  };

  const resetQuiz = () =>
    setAnswers(questions.map(() => ({ selected: null, submitted: false })));

  const totalCorrect = answers.filter(
    (a, i) => a.submitted && a.selected === questions[i].correct,
  ).length;

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>
        U.S. Class Inequity Quiz&nbsp;
        <small>
          ({totalCorrect}/{answers.filter((a) => a.submitted).length} correct)
        </small>
      </h1>

      {questions.map((q, qIdx) => {
        const aState = answers[qIdx];
        const isCorrect = aState.selected === q.correct;

        return (
          <div
            key={q.id}
            style={{
              marginBottom: 24,
              padding: 16,
              border: '1px solid #ccc',
              borderRadius: 6,
            }}
          >
            <p style={{ fontWeight: 600 }}>
              {qIdx + 1}. {q.text}
            </p>

            {q.options.map((opt, optIdx) => (
              <label key={optIdx} style={{ display: 'block', margin: '5px 0' }}>
                <input
                  type="radio"
                  name={`q${q.id}`}
                  checked={aState.selected === optIdx}
                  onChange={() => handleSelect(qIdx, optIdx)}
                  disabled={aState.submitted}
                />{' '}
                {opt}
              </label>
            ))}

            {!aState.submitted && (
              <button
                onClick={() => handleSubmit(qIdx)}
                disabled={aState.selected === null}
                style={{ marginTop: 8 }}
              >
                Check
              </button>
            )}

            {aState.submitted && (
              <div
                style={{
                  marginTop: 8,
                  padding: 8,
                  background: isCorrect ? '#d4edda' : '#f8d7da',
                  border: `1px solid ${isCorrect ? '#c3e6cb' : '#f5c6cb'}`,
                  borderRadius: 4,
                }}
              >
                {isCorrect ? '✅ Correct!' : '❌ Incorrect.'}{' '}
                <strong>Explanation:</strong> {q.explanation}
              </div>
            )}
          </div>
        );
      })}

      <button
        onClick={resetQuiz}
        style={{
          marginTop: 32,
          padding: '8px 16px',
          fontSize: 16,
          borderRadius: 4,
        }}
      >
        RESET QUIZ
      </button>
    </div>
  );
}
