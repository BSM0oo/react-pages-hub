import React, { useState } from "react";

type Question = {
  question: string;
  answer: string;
  explanation: string;
};

const quizData: Question[] = [
  {
    question: "Q1. Your amp is only rated stable at 8 ohms. Can you use it with a 4 ohm speaker? Why or why not?",
    answer: "No, it's unsafe. A 4 ohm speaker draws more current than the amp is rated for, potentially causing overheating or shutdown.",
    explanation: "Amps not rated for 4 ohms can overheat or clip when driving low-impedance loads."
  },
  {
    question: "Q2. A speaker has 85 dB sensitivity and your amp puts out 40W. Would this setup likely struggle in a medium-sized room?",
    answer: "Yes. Low sensitivity means more power is needed for loud output. 40W may not provide enough headroom.",
    explanation: "85 dB is inefficient. 40W may be adequate for small rooms but not ideal for medium ones."
  },
  {
    question: "Q3. A 91 dB speaker with a 100W amp—what’s a rough estimate of SPL at 3 meters?",
    answer: "Around 101.5 dB SPL.",
    explanation: "91 dB + 20 dB (from 100W) - 9.5 dB (distance loss) = ~101.5 dB."
  },
  {
    question: "Q4. A speaker is rated 88 dB @1W/1m. How much power do you need to hit 95 dB SPL at 1 meter?",
    answer: "About 5W.",
    explanation: "To increase SPL by 7 dB: 10^(7/10) ≈ 5 W."
  },
  {
    question: "Q5. A 6 ohm speaker is rated 30–100W. Your amp puts out 90W into 6 ohms. Is this a safe pairing?",
    answer: "Yes. Power is within range, and impedance matches.",
    explanation: "90W is near the upper end of the range but safe with responsible volume."
  },
  {
    question: "Q6. What sensitivity level is considered 'easy to drive'?",
    answer: "C) 90+ dB",
    explanation: "High-sensitivity speakers require less power to reach target SPL."
  },
  {
    question: "Q7. Each time you double the amp power, how much louder does the speaker get (in dB)?",
    answer: "3 dB",
    explanation: "SPL increases by 3 dB with each doubling of power."
  },
  {
    question: "Q8. You want reference movie levels (~105 dB peaks) at 3m. What’s the minimum SPL a speaker must reach at 1W/1m if you have a 150W amp?",
    answer: "At least 92.5 dB.",
    explanation: "150W gives +21.8 dB boost; need 105 + 9.5 - 21.8 = 92.7 dB base sensitivity."
  },
  {
    question: "Q9. You’re using an 86 dB speaker with a 60W amp. What kind of music or volume goals would make this a bad match?",
    answer: "Loud movies or parties in big rooms.",
    explanation: "Low sensitivity and limited power mean the system may clip at high SPL."
  },
  {
    question: "Q10. What’s more dangerous to a speaker: A) Too much power or B) Too little power with volume maxed?",
    answer: "B) Too little power with volume maxed.",
    explanation: "Clipping from underpowered amps causes distorted signals that can damage drivers."
  },
  {
    question: "Q11. Speaker: 8 ohms, 96 dB, 15–200W | Amp: 50W @ 8 ohms. What SPL approx. at 3m?",
    answer: "About 103 dB SPL.",
    explanation: "96 + 17 (power) - 9.5 (distance) = ~103.5 dB."
  },
  {
    question: "Q12. Speaker: 4 ohms, 84 dB, 40–150W | Amp: 100W @ 4 ohms. Will this struggle?",
    answer: "Borderline. Amp has power, but low sensitivity speaker eats headroom.",
    explanation: "100W - 9.5dB distance + 84 dB = ~94.5 dB. Fine for medium listening, not ideal for loud peaks."
  },
  {
    question: "Q13. Speaker: 6 ohms, 90 dB, 30–100W | Amp: 180W @ 4 ohms. Safe?",
    answer: "Yes, but don't crank it.",
    explanation: "Amp has headroom. Just be careful not to exceed the speaker's limits."
  },
  {
    question: "Q14. Speaker dips to 3 ohms at 100 Hz; amp only rated to 4 ohms. Safe?",
    answer: "No, risky.",
    explanation: "Amp may not tolerate impedance dips to 3 ohms. Could overheat or shut down."
  },
  {
    question: "Q15. You want 105 dB peaks at 3m; speaker is 92 dB. Minimum amp power?",
    answer: "About 181W.",
    explanation: "92 + x - 9.5 = 105 → x = 22.5 dB → 10^(22.5/10) ≈ 181W."
  }
];

export default function SpeakerAmpQuiz() {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const next = () => {
    setIndex((index + 1) % quizData.length);
    setShowAnswer(false);
  };

  const prev = () => {
    setIndex((index - 1 + quizData.length) % quizData.length);
    setShowAnswer(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", fontFamily: "Arial" }}>
      <h2>Speaker-Amp Matching Quiz</h2>
      <p><strong>{quizData[index].question}</strong></p>
      {showAnswer && (
        <div style={{ backgroundColor: "#eef", padding: "10px", borderRadius: "6px" }}>
          <p><strong>Answer:</strong> {quizData[index].answer}</p>
          <p><em>{quizData[index].explanation}</em></p>
        </div>
      )}
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setShowAnswer(!showAnswer)}>{showAnswer ? "Hide Answer" : "Show Answer"}</button>
        <button onClick={prev} style={{ marginLeft: "10px" }}>Prev</button>
        <button onClick={next} style={{ marginLeft: "10px" }}>Next</button>
      </div>
      <p style={{ marginTop: "10px" }}>Progress: {index + 1} / {quizData.length}</p>
    </div>
  );
}
