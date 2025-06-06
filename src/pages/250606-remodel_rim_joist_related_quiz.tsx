import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const quizData = [
  {
    question: "What is the function of a rim joist in floor framing?",
    options: [
      "It supports the roof structure.",
      "It forms the outer edge of the floor system, capping the ends of floor joists.",
      "It connects the foundation to the walls.",
      "It serves as a decorative element."
    ],
    answer: 1
  },
  {
    question: "Which component runs perpendicular to the rim joist and supports the floor's weight?",
    options: ["Sill plate", "Header", "Floor joist", "Stud"],
    answer: 2
  },
  {
    question: "Where is the sill plate located in a building's structure?",
    options: [
      "At the top of the roof",
      "Between the foundation and the floor framing",
      "In the center of the floor",
      "Above the windows"
    ],
    answer: 1
  },
  {
    question: "What is the primary purpose of the subfloor?",
    options: [
      "To provide insulation",
      "To serve as the finished flooring",
      "To distribute loads across floor joists and support the finished flooring",
      "To act as a moisture barrier"
    ],
    answer: 2
  },
  {
    question: "What is another term commonly used for a band joist?",
    options: ["Header", "Rim joist", "Sill plate", "Ledger board"],
    answer: 1
  },
  {
    question: "In framing, what is the role of a header?",
    options: [
      "It supports the ends of floor joists.",
      "It forms the base of the wall.",
      "It spans openings like doors and windows to support loads above.",
      "It connects the roof trusses."
    ],
    answer: 2
  },
  {
    question: "What is a key characteristic of closed-cell spray foam insulation?",
    options: [
      "It remains soft and flexible after curing.",
      "It has a lower R-value compared to open-cell foam.",
      "It provides both insulation and structural support due to its rigidity.",
      "It is primarily used for soundproofing."
    ],
    answer: 2
  },
  {
    question: "Where is rigid foam board insulation commonly installed?",
    options: [
      "Inside plumbing pipes",
      "On the exterior of foundation walls and rim joists",
      "Between roof shingles",
      "Underneath carpet padding"
    ],
    answer: 1
  },
  {
    question: "What does the term 'thermal bridging' refer to in building construction?",
    options: [
      "The use of bridges in thermal power plants.",
      "The transfer of heat through materials that are poor insulators, creating a path of least resistance.",
      "The process of connecting two heating systems.",
      "The method of measuring thermal conductivity."
    ],
    answer: 1
  },
  {
    question: "What does a higher R-value indicate in insulation materials?",
    options: [
      "Lower resistance to heat flow",
      "Higher resistance to heat flow",
      "Greater moisture absorption",
      "Increased weight"
    ],
    answer: 1
  },
  {
    question: "What is the purpose of a joist hanger in construction?",
    options: [
      "To hang drywall sheets",
      "To support and connect joists to beams or ledgers",
      "To suspend lighting fixtures",
      "To attach roofing materials"
    ],
    answer: 1
  },
  {
    question: "Why is blocking installed between floor joists?",
    options: [
      "To provide a pathway for electrical wiring",
      "To allow for expansion and contraction",
      "To provide lateral support and prevent joist rotation",
      "To increase the floor height"
    ],
    answer: 2
  },
  {
    question: "What causes condensation to form on building materials?",
    options: [
      "High wind speeds",
      "Cold surfaces coming into contact with warm, moist air",
      "Excessive sunlight exposure",
      "Low humidity levels"
    ],
    answer: 1
  },
  {
    question: "What is a common consequence of air leakage in a building?",
    options: [
      "Improved indoor air quality",
      "Reduced energy efficiency and increased heating/cooling costs",
      "Enhanced structural integrity",
      "Decreased noise levels"
    ],
    answer: 1
  }
];

export default function RimJoistQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(quizData.length).fill(null));

  const handleSelect = (qIndex: number, oIndex: number) => {
    const newSelected = [...selected];
    newSelected[qIndex] = oIndex;
    setSelected(newSelected);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Rim Joist & Framing Concepts Quiz</h1>
      <div className="space-y-6">
        {quizData.map((q, qIdx) => (
          <Card key={qIdx}>
            <CardContent className="p-6">
              <p className="text-lg font-semibold mb-4">{qIdx + 1}. {q.question}</p>
              <ul className="space-y-2">
                {q.options.map((opt, oIdx) => {
                  const isSelected = selected[qIdx] === oIdx;
                  const isCorrect = oIdx === q.answer;
                  const isAnswered = selected[qIdx] !== null;

                  return (
                    <li key={oIdx}>
                      <Button
                        variant={isSelected ? "default" : "outline"}
                        className={`w-full text-left ${
                          isAnswered && isSelected && isCorrect ? "bg-green-100" :
                          isAnswered && isSelected && !isCorrect ? "bg-red-100" : ""
                        }`}
                        onClick={() => handleSelect(qIdx, oIdx)}
                      >
                        {opt}
                      </Button>
                    </li>
                  );
                })}
              </ul>
              {selected[qIdx] !== null && (
                <p className="mt-4 text-sm text-gray-600">
                  {selected[qIdx] === q.answer ? "✅ Correct" : `❌ Incorrect. Correct answer: ${q.options[q.answer]}`}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
