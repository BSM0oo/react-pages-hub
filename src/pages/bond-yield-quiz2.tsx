import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, TrendingUp, TrendingDown, BarChart3, CheckCircle, XCircle, RotateCcw, Trophy, Brain } from 'lucide-react';

const BondYieldQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const questions = [
    {
      id: 1,
      type: 'multiple-choice',
      question: "When interest rates rise, what happens to existing bond prices?",
      options: [
        "Bond prices increase",
        "Bond prices decrease", 
        "Bond prices stay the same",
        "It depends on the bond's maturity"
      ],
      correct: 1,
      explanation: "When interest rates rise, existing bond prices fall. This is because new bonds are issued at higher rates, making existing lower-rate bonds less attractive. Investors demand a discount to buy older bonds.",
      scenario: "interest-rate"
    },
    {
      id: 2,
      type: 'scenario',
      question: "The Federal Reserve raises rates by 0.75%. Drag the economic indicators to show their likely direction:",
      indicators: [
        { name: "10-Year Treasury Yield", id: "treasury" },
        { name: "Corporate Bond Prices", id: "corporate" },
        { name: "USD Strength", id: "dollar" },
        { name: "Mortgage Rates", id: "mortgage" }
      ],
      correct: {
        treasury: "up",
        corporate: "down", 
        dollar: "up",
        mortgage: "up"
      },
      explanation: "Rate hikes typically increase yields across the board, strengthen the dollar due to higher returns, decrease bond prices, and raise mortgage rates as they track treasury yields.",
      scenario: "fed-policy"
    },
    {
      id: 3,
      type: 'multiple-choice',
      question: "In a recession scenario, what typically happens to the yield curve?",
      options: [
        "It steepens significantly",
        "It flattens or inverts",
        "It remains unchanged", 
        "It becomes more volatile"
      ],
      correct: 1,
      explanation: "During recessions, the yield curve often flattens or inverts as the Fed cuts short-term rates and investors flee to long-term bonds for safety, driving down long-term yields.",
      scenario: "recession"
    },
    {
      id: 4,
      type: 'slider',
      question: "If inflation expectations rise from 2% to 4%, by approximately how much should a 10-year bond yield increase?",
      min: 0,
      max: 5,
      step: 0.25,
      correct: 2,
      tolerance: 0.5,
      explanation: "Bond yields typically rise roughly 1:1 with inflation expectations to maintain real returns. A 2% increase in inflation expectations should lead to approximately 2% higher yields.",
      scenario: "inflation"
    },
    {
      id: 5,
      type: 'multiple-choice',
      question: "When the US dollar strengthens significantly, what happens to emerging market debt?",
      options: [
        "Becomes more attractive to investors",
        "Experiences outflows and higher yields",
        "Remains unaffected",
        "Automatically defaults"
      ],
      correct: 1,
      explanation: "A strong dollar makes emerging market debt more expensive for local investors and can trigger capital outflows, leading to higher yields and increased default risk for dollar-denominated debt.",
      scenario: "dollar-strength"
    },
    {
      id: 6,
      type: 'ranking',
      question: "Rank these bonds from LOWEST to HIGHEST yield in a normal economic environment:",
      items: [
        { id: "treasury", name: "10-Year US Treasury", correct: 1 },
        { id: "corporate-ig", name: "AAA Corporate Bond", correct: 2 },
        { id: "corporate-hy", name: "BB High-Yield Bond", correct: 3 },
        { id: "emerging", name: "Emerging Market Bond", correct: 4 }
      ],
      explanation: "Yields reflect risk premiums: Treasuries (safest) < Investment Grade Corporate < High Yield < Emerging Markets (riskiest). Each step up adds credit and/or sovereign risk.",
      scenario: "risk-premium"
    },
    {
      id: 7,
      type: 'multiple-choice',
      question: "During a 'flight to quality', what happens to Treasury bonds?",
      options: [
        "Prices fall, yields rise",
        "Prices rise, yields fall",
        "Both prices and yields rise",
        "Both prices and yields fall"
      ],
      correct: 1,
      explanation: "During crises, investors rush to safe assets like Treasuries. Increased demand drives prices up and yields down. This is the classic 'flight to quality' phenomenon.",
      scenario: "crisis"
    },
    {
      id: 8,
      type: 'true-false',
      question: "True or False: A bond's duration measures how sensitive its price is to interest rate changes.",
      correct: true,
      explanation: "Duration measures interest rate sensitivity. A bond with 5-year duration will lose approximately 5% of its value for each 1% rise in interest rates.",
      scenario: "duration"
    },
    // RAY DALIO QUESTIONS START HERE
    {
      id: 9,
      type: 'multiple-choice',
      question: "According to Ray Dalio's five major forces framework, which force is he MOST concerned about currently?",
      options: [
        "Debt/money cycles and supply/demand imbalances",
        "Internal political order breakdown",
        "External geopolitical conflicts", 
        "Acts of nature and climate change"
      ],
      correct: 0,
      explanation: "While all five forces matter, Dalio emphasizes that debt cycles and supply/demand imbalances are the most pressing concern. He warns that the US deficit at ~7% of GDP far exceeds natural bond demand at ~3% of GDP, creating dangerous imbalances.",
      scenario: "dalio-forces"
    },
    {
      id: 10,
      type: 'slider',
      question: "According to Dalio's deficit analysis, what's the approximate gap between US deficit needs and natural bond demand (as % of GDP)?",
      min: 0,
      max: 8,
      step: 0.5,
      correct: 4,
      tolerance: 1,
      explanation: "Dalio identifies a critical 4% gap: the US needs to finance deficits of about 7% of GDP, but natural demand for US debt is only around 3% of GDP. This mismatch creates dangerous supply/demand imbalances.",
      scenario: "dalio-math"
    },
    {
      id: 11,
      type: 'scenario',
      question: "Ray Dalio's crisis warning signals: When these three move together, it indicates a shift away from the US monetary system:",
      indicators: [
        { name: "30-Year Treasury Bonds", id: "bonds" },
        { name: "US Dollar", id: "dollar" },
        { name: "Gold Prices", id: "gold" }
      ],
      correct: {
        bonds: "down",
        dollar: "down", 
        gold: "up"
      },
      explanation: "Dalio specifically warns: 'Watch when the bond market goes down at the same time as the dollar goes down, at the same time as gold goes up.' This combination signals that investors are losing confidence in the US monetary system and fleeing to alternative stores of value.",
      scenario: "dalio-warning"
    },
    {
      id: 12,
      type: 'multiple-choice',
      question: "What does Dalio's 'three percent solution' refer to?",
      options: [
        "Reducing inflation to 3%",
        "Limiting Fed rate hikes to 3%",
        "Reducing the fiscal deficit to 3% of GDP or lower",
        "Keeping bond yields under 3%"
      ],
      correct: 2,
      explanation: "Dalio advocates that 'everybody should take the three percent pledge' - meaning reduce the fiscal deficit to 3% of GDP to match sustainable demand for US debt. This would help solve the supply/demand imbalance.",
      scenario: "dalio-solution"
    },
    {
      id: 13,
      type: 'true-false',
      question: "True or False: Dalio says current economic and political conditions mirror the 1930s pattern.",
      correct: true,
      explanation: "Dalio explicitly states: 'All of this pattern is very similar to the thirties' - referencing wealth gaps, opportunity gaps, political extremes reaching 'irreconcilable differences,' and great internal conflict, just like the lead-up to WWII.",
      scenario: "dalio-history"
    },
    {
      id: 14,
      type: 'ranking',
      question: "According to Dalio, rank these deficit factors by current importance (most to least important):",
      items: [
        { id: "interest", name: "Interest Payments on Existing Debt", correct: 1 },
        { id: "spending", name: "Government Spending Programs", correct: 2 },
        { id: "taxes", name: "Tax Revenue Collection", correct: 3 }
      ],
      explanation: "Dalio emphasizes: 'Interest rates are now more important than spending or taxes, even because of the size of that debt.' With $1 trillion in annual interest and $9 trillion needing to be rolled over, debt service dominates fiscal dynamics.",
      scenario: "dalio-priority"
    },
    {
      id: 15,
      type: 'multiple-choice',
      question: "What does Dalio say China needs to become to help solve global trade imbalances?",
      options: [
        "A larger manufacturer than it already is",
        "A consumer economy rather than just a manufacturer", 
        "A financial services hub like the US",
        "A commodity exporter like Russia"
      ],
      correct: 1,
      explanation: "Dalio notes China does '33% of all manufacturing in the world, more than the US, Germany and Japan combined' but 'what the world needs now is the Chinese to be consumers.' The US must become less consumption-driven and more production-driven.",
      scenario: "dalio-china"
    },
    {
      id: 16,
      type: 'true-false',
      question: "True or False: According to Dalio, it takes a long time to build market trust but only one or two incidents to lose it.",
      correct: true,
      explanation: "Dalio warns: 'It takes a very long time to build a reputation that the capital markets are free, safe, that there's reasonableness...you know how long it takes to build a reputation, and it only takes one or two times to lose that reputation.' This trust is crucial for capital markets.",
      scenario: "dalio-trust"
    },
    {
      id: 17,
      type: 'multiple-choice',
      question: "According to Dalio, approximately how much US debt needs to be 'rolled over' (re-sold) annually beyond interest payments?",
      options: [
        "About $1 trillion",
        "About $5 trillion", 
        "About $9 trillion",
        "About $15 trillion"
      ],
      correct: 2,
      explanation: "Dalio explains: 'We're dealing with a trillion dollars in interest rates and about nine trillion dollars more than that that has to be rolled over, which means has to be sold again.' This massive refinancing need creates supply pressure on bond markets.",
      scenario: "dalio-rollover"
    },
    {
      id: 18,
      type: 'multiple-choice',
      question: "When there's a debt supply/demand imbalance, what happens to bonds as a store of wealth according to Dalio?",
      options: [
        "They become more attractive as safe havens",
        "They automatically increase in value",
        "They become questionable as a reliable store of wealth",
        "They maintain their value regardless of supply/demand"
      ],
      correct: 2,
      explanation: "Dalio warns: 'There are times in history and this is one of those times...that there's a question of whether bonds are an effective store of wealth because of this supply demand.' When central banks push rates down but supply overwhelms demand, the store-of-wealth function breaks down.",
      scenario: "dalio-wealth"
    }
  ];

  const scenarioColors = {
    'interest-rate': 'bg-blue-500',
    'fed-policy': 'bg-purple-500', 
    'recession': 'bg-red-500',
    'inflation': 'bg-orange-500',
    'dollar-strength': 'bg-green-500',
    'risk-premium': 'bg-indigo-500',
    'crisis': 'bg-gray-600',
    'duration': 'bg-pink-500',
    'dalio-forces': 'bg-amber-600',
    'dalio-math': 'bg-red-600',
    'dalio-warning': 'bg-red-700',
    'dalio-solution': 'bg-emerald-600',
    'dalio-history': 'bg-slate-600',
    'dalio-priority': 'bg-orange-600',
    'dalio-china': 'bg-yellow-600',
    'dalio-trust': 'bg-blue-700',
    'dalio-rollover': 'bg-purple-700',
    'dalio-wealth': 'bg-rose-700'
  };

  const [dragItems, setDragItems] = useState({});
  const [sliderValue, setSliderValue] = useState(2);
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    if (questions[currentQuestion]?.type === 'ranking') {
      setRankings([...questions[currentQuestion].items]);
    }
  }, [currentQuestion]);

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(newAnswers);
    setSelectedAnswer(answer);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setSliderValue(2);
      setDragItems({});
    } else {
      calculateScore();
      setQuizComplete(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || null);
      setShowExplanation(false);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      const userAnswer = answers[index];
      if (q.type === 'multiple-choice' || q.type === 'true-false') {
        if (userAnswer === q.correct) correct++;
      } else if (q.type === 'slider') {
        if (Math.abs(userAnswer - q.correct) <= q.tolerance) correct++;
      } else if (q.type === 'scenario') {
        let scenarioCorrect = true;
        Object.keys(q.correct).forEach(key => {
          if (userAnswer?.[key] !== q.correct[key]) scenarioCorrect = false;
        });
        if (scenarioCorrect) correct++;
      } else if (q.type === 'ranking') {
        let rankingCorrect = true;
        userAnswer?.forEach((item, idx) => {
          if (item.correct !== idx + 1) rankingCorrect = false;
        });
        if (rankingCorrect) correct++;
      }
    });
    setScore(correct);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setQuizComplete(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setDragItems({});
    setSliderValue(2);
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isDalioQuestion = question?.scenario?.includes('dalio');

  const ScenarioIndicator = ({ direction }) => {
    return direction === 'up' ? (
      <TrendingUp className="w-5 h-5 text-green-500" />
    ) : direction === 'down' ? (
      <TrendingDown className="w-5 h-5 text-red-500" />
    ) : (
      <div className="w-5 h-5 rounded-full border-2 border-gray-400" />
    );
  };

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const grade = percentage >= 90 ? 'Excellent' : percentage >= 80 ? 'Very Good' : percentage >= 70 ? 'Good' : percentage >= 60 ? 'Fair' : 'Needs Improvement';
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center">
          <div className="mb-6">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
            <div className="text-6xl font-bold text-blue-600 mb-2">{percentage}%</div>
            <div className="text-xl text-gray-600">{grade}</div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{questions.length - score}</div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Key Takeaways:</h3>
            <div className="text-left space-y-2 text-sm text-gray-600">
              <p>• Bond prices and yields move inversely - when one goes up, the other goes down</p>
              <p>• Interest rate changes affect bonds with longer durations more than shorter ones</p>
              <p>• Economic conditions drive investor sentiment and bond demand</p>
              <p>• Currency strength impacts international bond markets significantly</p>
              <p>• Risk premiums reflect the additional yield investors demand for taking on more risk</p>
              <p><strong>• Dalio's Warning:</strong> US deficit (~7% GDP) far exceeds bond demand (~3% GDP)</p>
              <p><strong>• Crisis Signals:</strong> Bonds down + Dollar down + Gold up = monetary system stress</p>
              <p><strong>• The Three Percent Solution:</strong> Reduce deficit to sustainable 3% of GDP level</p>
              <p><strong>• Trust Crisis:</strong> Takes years to build market confidence, seconds to lose it</p>
            </div>
          </div>
          
          <button
            onClick={resetQuiz}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Bond Markets & Economic Scenarios</h1>
          <p className="text-blue-200">Master the relationships between yields, prices, and economic conditions</p>
          <p className="text-blue-300 text-sm mt-2">Now featuring Ray Dalio's institutional insights</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-blue-200">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm text-blue-200">{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Scenario Badge */}
          <div className={`${scenarioColors[question.scenario]} p-3`}>
            <div className="flex items-center gap-2 text-white">
              {isDalioQuestion ? <Brain className="w-5 h-5" /> : <BarChart3 className="w-5 h-5" />}
              <span className="font-semibold capitalize">
                {isDalioQuestion ? `Ray Dalio: ${question.scenario.replace('dalio-', '').replace('-', ' ')}` : question.scenario.replace('-', ' ')} Scenario
              </span>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h2>

            {/* Multiple Choice */}
            {question.type === 'multiple-choice' && (
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedAnswer === index
                        ? showExplanation && index === question.correct
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : showExplanation && index !== question.correct
                          ? 'border-red-500 bg-red-50 text-red-800'
                          : 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                    disabled={showExplanation}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === index && showExplanation
                          ? index === question.correct
                            ? 'border-green-500 bg-green-500'
                            : 'border-red-500 bg-red-500'
                          : selectedAnswer === index
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswer === index && showExplanation && (
                          index === question.correct ? 
                            <CheckCircle className="w-4 h-4 text-white" /> :
                            <XCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* True/False */}
            {question.type === 'true-false' && (
              <div className="flex gap-4">
                {[true, false].map((option) => (
                  <button
                    key={option.toString()}
                    onClick={() => handleAnswer(option)}
                    className={`flex-1 p-6 rounded-xl border-2 transition-all duration-200 ${
                      selectedAnswer === option
                        ? showExplanation && option === question.correct
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : showExplanation && option !== question.correct
                          ? 'border-red-500 bg-red-50 text-red-800'
                          : 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                    disabled={showExplanation}
                  >
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">
                        {option ? 'TRUE' : 'FALSE'}
                      </div>
                      {selectedAnswer === option && showExplanation && (
                        <div className="mt-2">
                          {option === question.correct ? 
                            <CheckCircle className="w-6 h-6 text-green-500 mx-auto" /> :
                            <XCircle className="w-6 h-6 text-red-500 mx-auto" />
                          }
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Slider */}
            {question.type === 'slider' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{sliderValue}%</div>
                  <div className="text-gray-600">Expected yield increase</div>
                </div>
                <input
                  type="range"
                  min={question.min}
                  max={question.max}
                  step={question.step}
                  value={sliderValue}
                  onChange={(e) => setSliderValue(parseFloat(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{question.min}%</span>
                  <span>{question.max}%</span>
                </div>
                <button
                  onClick={() => handleAnswer(sliderValue)}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
                  disabled={showExplanation}
                >
                  Submit Answer
                </button>
              </div>
            )}

            {/* Scenario Drag & Drop */}
            {question.type === 'scenario' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {question.indicators.map((indicator) => (
                    <div key={indicator.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="text-lg font-semibold text-gray-800 mb-3">{indicator.name}</div>
                      <div className="flex gap-2">
                        {['up', 'down'].map((direction) => (
                          <button
                            key={direction}
                            onClick={() => {
                              const newDragItems = { ...dragItems, [indicator.id]: direction };
                              setDragItems(newDragItems);
                            }}
                            className={`flex-1 p-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                              dragItems[indicator.id] === direction
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            disabled={showExplanation}
                          >
                            <ScenarioIndicator direction={direction} />
                            <span className="capitalize">{direction}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleAnswer(dragItems)}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
                  disabled={showExplanation || Object.keys(dragItems).length < question.indicators.length}
                >
                  Submit Answer
                </button>
              </div>
            )}

            {/* Ranking */}
            {question.type === 'ranking' && (
              <div className="space-y-4">
                <div className="text-gray-600 mb-4">Drag to reorder from lowest to highest yield:</div>
                <div className="space-y-2">
                  {rankings.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200 cursor-move hover:border-blue-300 transition-colors duration-200"
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData('text/plain', index.toString())}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
                        const newRankings = [...rankings];
                        const draggedItem = newRankings[dragIndex];
                        newRankings.splice(dragIndex, 1);
                        newRankings.splice(index, 0, draggedItem);
                        setRankings(newRankings);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-bold text-blue-600">{index + 1}</div>
                        <div className="font-semibold">{item.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleAnswer(rankings)}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
                  disabled={showExplanation}
                >
                  Submit Answer
                </button>
              </div>
            )}

            {/* Explanation */}
            {showExplanation && (
              <div className={`mt-6 p-4 rounded-xl border-l-4 ${isDalioQuestion ? 'bg-amber-50 border-amber-500' : 'bg-blue-50 border-blue-500'}`}>
                <h4 className={`font-semibold mb-2 ${isDalioQuestion ? 'text-amber-800' : 'text-blue-800'}`}>
                  {isDalioQuestion ? 'Ray Dalio Insight:' : 'Explanation:'}
                </h4>
                <p className={isDalioQuestion ? 'text-amber-700' : 'text-blue-700'}>{question.explanation}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="text-blue-200">
            Progress: {currentQuestion + 1} / {questions.length}
          </div>

          <button
            onClick={nextQuestion}
            disabled={!showExplanation}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BondYieldQuiz;