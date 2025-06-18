import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, CornerDownLeft, CornerDownRight, Repeat, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 20-question deck drawn from the post-WWII financial-repression lesson
const questions = [
  { q: "What was the U.S. debt-to-GDP ratio in 1946 and roughly in Q1 2025?", a: "≈ 119 % in 1946; ≈ 121 % in Q1 2025." },
  { q: "Which two policy levers drove real interest rates negative in the late 1940s?", a: "A Treasury–Fed rate peg that kept nominal yields low, plus post-war inflation that ran above those yields." },
  { q: "What yields did the Fed target on short-term bills and 10-year bonds during WWII?", a: "About 0 % on 3-month bills and 2.5 % on 10-year Treasuries." },
  { q: "Name the 1951 event that restored Federal Reserve independence.", a: "The Treasury–Federal Reserve Accord of March 1951." },
  { q: "Which international framework legitimised U.S. capital controls post-WWII?", a: "The Bretton Woods system." },
  { q: "How did Regulation Q reinforce repression domestically?", a: "By capping the interest banks could pay on deposits, steering savings into low-yield Treasuries." },
  { q: "Complete the chain: Yield peg → inflation → ____ → debt shrinks in real terms.", a: "Negative real rates (debt is inflated away)." },
  { q: "Give two modern ‘soft’ capital-control tools that could appear today.", a: "1) Liquidity or capital-weight rules favouring Treasuries; 2) Taxes/fees on outward portfolio flows or FX swaps." },
  { q: "Name two principal winners of mid-century financial repression.", a: "The federal government and other large debtors such as leveraged homeowners or corporates." },
  { q: "Name two principal losers of mid-century repression.", a: "Savers/bondholders (including pensions) and foreign creditors holding dollar debt." },
  { q: "Why must a 2020s replay relax the Fed’s 2 % inflation target?", a: "Because real yields turn negative only if inflation exceeds the capped nominal bond yield for several years." },
  { q: "Give one political obstacle to modern yield-curve control.", a: "Sacrificing Fed independence could provoke Congressional and market backlash." },
  { q: "Why do globally mobile capital flows complicate repression versus 1950?", a: "Investors can move funds abroad instantly, so trapping domestic savings requires more intrusive measures." },
  { q: "Roughly how much does a –2 % real yield shrink the real value of $1 T of debt over a decade?", a: "About 18 % (≈ $180 B)." },
  { q: "What framing helped 1940s savers accept low yields?", a: "Patriotic duty—Victory Bonds and civic-sacrifice messaging." },
  { q: "Name one chart that visually proves repression’s success.", a: "Debt-to-GDP vs. Real 10-Year Yield dual-axis line chart (1940-2025)." },
  { q: "Why might banks welcome a renewed repression regime?", a: "Cheap deposits plus higher-coupon legacy assets widen net-interest margins." },
  { q: "What risk do innovation-driven start-ups face under heavy repression?", a: "Credit could be crowded out if banks load balance sheets with low-risk government bonds." },
  { q: "How do negative real yields act as an ‘invisible tax’?", a: "They transfer purchasing power from savers to the government without explicit legislation." },
  { q: "State one reason foreign central banks might cut Treasury holdings if repression returns.", a: "Expectation of weaker real returns and a structurally softer U.S. dollar." }
];

export default function FinancialRepressionQuiz() {
  // queue of indices allows “Again” button to re-enqueue current card
  const [queue, setQueue] = useState(questions.map((_, i) => i));
  const [current, setCurrent] = useState(queue[0]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);

  const advance = (nextIdx) => {
    setShowAnswer(false);
    if (nextIdx < queue.length) {
      setCurrent(queue[nextIdx]);
    }
  };

  const handleNext = () => {
    const idx = queue.indexOf(current);
    if (idx < queue.length - 1) {
      advance(idx + 1);
    }
  };

  const handlePrev = () => {
    const idx = queue.indexOf(current);
    if (idx > 0) {
      advance(idx - 1);
    }
  };

  const handleAgain = () => {
    setQueue((q) => [...q, current]);
    handleNext();
  };

  const handleSelfGrade = (correct) => {
    setAttempted((a) => a + 1);
    if (correct) setScore((s) => s + 1);
    handleNext();
  };

  const handleReset = () => {
    setQueue(questions.map((_, i) => i));
    setCurrent(0);
    setScore(0);
    setAttempted(0);
    setShowAnswer(false);
  };

  const card = questions[current];
  const progress = `${attempted}/${questions.length}`;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Financial-Repression Quiz</h2>
        <div className="text-sm">Score: {score}/{attempted}</div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className="shadow-xl rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <p className="text-base leading-relaxed font-medium">
                {card.q}
              </p>
              {showAnswer && (
                <p className="text-teal-700 font-semibold">{card.a}</p>
              )}
              <div className="flex flex-wrap gap-2 pt-4">
                <Button size="sm" variant="outline" onClick={() => setShowAnswer(!showAnswer)}>
                  {showAnswer ? <EyeOff className="h-4 w-4 mr-1"/> : <Eye className="h-4 w-4 mr-1"/>}
                  {showAnswer ? "Hide" : "Show"} Answer
                </Button>
                <Button size="sm" onClick={handlePrev} disabled={queue.indexOf(current) === 0}>
                  <CornerDownLeft className="h-4 w-4 mr-1"/>Prev
                </Button>
                <Button size="sm" onClick={handleNext} disabled={queue.indexOf(current) === queue.length - 1}>
                  Next<CornerDownRight className="h-4 w-4 ml-1"/>
                </Button>
                <Button size="sm" variant="secondary" onClick={handleAgain}>
                  <Repeat className="h-4 w-4 mr-1"/>Again
                </Button>
                <Button size="sm" variant="destructive" onClick={handleReset}>
                  <RefreshCw className="h-4 w-4 mr-1"/>Reset
                </Button>
              </div>
              {showAnswer && (
                <div className="flex gap-2 pt-2">
                  <Button size="sm" onClick={() => handleSelfGrade(true)}>
                    I was right
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleSelfGrade(false)}>
                    I was wrong
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
      <div className="text-center text-xs text-gray-500">Progress: {progress}</div>
    </div>
  );
}