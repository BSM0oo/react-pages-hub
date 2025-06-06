import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const terms = [
  { term: "Joist", definition: "A horizontal structural member used to support floors or ceilings. Typically spaced in parallel and span across walls or beams. Example: Floor joists beneath subflooring." },
  { term: "Rim Joist", definition: "The outermost joist that caps the ends of floor joists and forms the perimeter of the floor frame. Often targeted in insulation upgrades." },
  { term: "Subfloor", definition: "The structural layer under finished flooring (like hardwood or tile), attached to floor joists. Usually plywood or OSB." },
  { term: "Slab Foundation", definition: "A concrete foundation that serves as the floor of the house, with no crawlspace or basement. Common in warm climates." },
  { term: "Pier and Beam Foundation", definition: "A type of foundation using concrete or masonry piers to support beams, creating a crawlspace beneath the home." },
  { term: "Crawlspace", definition: "A shallow, unfinished area beneath a house, often used to access plumbing or wiring. Can be vented or encapsulated." },
  { term: "Batt Insulation", definition: "Pre-cut fiberglass or mineral wool insulation fitted between studs or joists. Common in walls and attics." },
  { term: "Spray Foam Insulation", definition: "Expanding foam sprayed into cavities; creates an air barrier. Comes in open-cell and closed-cell types." },
  { term: "Blown-in Insulation", definition: "Loose insulation (usually cellulose or fiberglass) blown into wall cavities or attics for even coverage." },
  { term: "Thermal Bridging", definition: "When heat moves through building materials (like studs), reducing insulation effectiveness." },
  { term: "Sill Plate", definition: "The bottom horizontal wood member that sits on top of the foundation and connects the house framing to it." },
  { term: "Header", definition: "A beam placed over an opening like a window or door to support the weight above." },
  { term: "Butt Joint", definition: "Where two pieces of material (like wood) meet squarely end to end. Often used in trim, requires fastening." },
  { term: "R-Value", definition: "A rating of how well insulation resists heat flow. Higher R-value = better insulation performance." },
  { term: "Cathedral Ceiling", definition: "A ceiling that follows the slope of the roofline, often requiring special insulation strategies like spray foam." },
  { term: "Drop Ceiling", definition: "A secondary ceiling suspended below the main ceiling, usually for hiding ductwork or wiring." },
  { term: "Vapor Barrier", definition: "A layer (usually plastic or foil) that resists moisture migration through walls, floors, or ceilings." },
  { term: "Thermal Envelope", definition: "The insulated and air-sealed boundary of a home that separates conditioned space from the outside." },
  { term: "Encapsulated Crawlspace", definition: "A sealed crawlspace with vapor barrier and insulation, designed to control moisture and improve energy efficiency." },
  { term: "Gable Roof", definition: "A roof with two sloping sides that meet at a ridge, forming end walls with a triangular extension." },
  { term: "Roof Decking", definition: "Plywood or OSB panels attached to roof framing that support underlayment and shingles or other roof finishes." }
];

export default function HomeBasicsQuiz() {
  const [shownAnswers, setShownAnswers] = useState<boolean[]>(Array(terms.length).fill(false));

  const toggleAnswer = (index: number) => {
    const updated = [...shownAnswers];
    updated[index] = !updated[index];
    setShownAnswers(updated);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Home Building & Systems Basics</h1>
      <div className="space-y-4">
        {terms.map((item, idx) => (
          <Card key={idx}>
            <CardContent className="p-6">
              <p className="text-xl font-semibold">What does "{item.term}" mean?</p>
              {shownAnswers[idx] && <p className="mt-4 text-gray-700">{item.definition}</p>}
              <div className="mt-4">
                <Button onClick={() => toggleAnswer(idx)}>
                  {shownAnswers[idx] ? "Hide Answer" : "Show Answer"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
