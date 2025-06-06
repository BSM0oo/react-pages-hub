import React, { useState } from "react";

const questions = [
  
  {
    q: "What is a 'rim band' or rim joist?",
    options: ["The trim around a roof vent", "The outer edge of a foundation", "The horizontal framing between floor levels", "A type of weatherseal"],
    answer: 2,
    explanation: "Rim joists cap floor joists and often allow infiltration if not sealed, especially in older homes."
  },
  {
    q: "Why do ducts in the attic and crawlspace often leak?",
    options: ["High water pressure", "Expansion from sunlight", "Aging seals and poor installation", "Incorrect pipe diameter"],
    answer: 2,
    explanation: "Joints in HVAC ductwork degrade over time. Leaks can be visually confirmed with IR during a blower door test."
  },
  {
    q: "What’s the function of a vapor barrier?",
    options: ["Block sound", "Retain heat in winter", "Prevent moisture diffusion", "Create fire resistance"],
    answer: 2,
    explanation: "Vapor barriers block water vapor from moving through walls or floors, which prevents condensation and mold growth."
  },
  {
    q: "What is a butt joint in weatherstripping?",
    options: ["Two pieces angled at 45°", "A single piece turned sideways", "Two flat ends pressed together", "A looped compression edge"],
    answer: 2,
    explanation: "Butt joints are simple, effective ways to join weatherseal strips, especially at corners."
  },
  {
    q: "Which seal is best for compression-style sealing at door jambs?",
    options: ["Leafseal", "Brushseal", "Silicone tubeseal", "Sweepseal"],
    answer: 2,
    explanation: "Tubeseals compress well and retain shape. Silicone types are best for longevity and resilience."
  },
  {
    q: "What are exterior penetrations?",
    options: ["Windows", "Gaps in drywall", "Holes where wires or pipes exit the home", "Cracks in sidewalks"],
    answer: 2,
    explanation: "These are prime locations for air leakage and should be sealed with caulk or foam."
  },
  {
    q: "What does 'roofline' refer to in renovation contexts?",
    options: ["Top of interior walls", "The slope of roofing shingles", "Eaves, soffits, fascia, and roof-to-wall junctions", "Solar panel alignment"],
    answer: 2,
    explanation: "The roofline includes any parts of the roof that intersect with vertical walls and are common leak/infiltration zones."
  },
  {
    q: "When should galvanized plumbing lines be replaced?",
    options: ["Every 5 years", "Only if leaking", "When corrosion or low pressure begins", "After 100 years"],
    answer: 2,
    explanation: "Galvanized pipes corrode internally. Reduced flow or leaks indicate end-of-life even if outside looks fine."
  },
  {
    q: "What material is often used today to replace old galvanized piping?",
    options: ["PVC", "PEX or copper", "Lead", "Galvanized steel"],
    answer: 1,
    explanation: "Both PEX and copper are modern, code-compliant, and more durable replacements."
  },
  {
    q: "What is a 'leafseal'?",
    options: ["A flexible flap of plastic", "A rubber circle", "A metallic sweep", "A plant-based insulation"],
    answer: 0,
    explanation: "Leafseals are flexible strips used on sliding surfaces to block air and moisture."
  },
  {
    q: "Why is brushseal ideal for stone thresholds?",
    options: ["It melts into the surface", "It's made of wool", "It conforms to irregular surfaces", "It reflects heat"],
    answer: 2,
    explanation: "Nylon bristles compress and adapt to gaps in stone, brick, or rough wood surfaces."
  },
  {
    q: "How does an automatic door-bottom system work?",
    options: ["Timed mechanical sensor", "Uses magnets", "Lowers when door closes", "Hinges into place manually"],
    answer: 2,
    explanation: "A spring-loaded or scissor-lift mechanism deploys the seal to contact the threshold as the door shuts."
  },
  {
    q: "How can you mitigate humidity from open doors on warm days?",
    options: ["Use air fresheners", "Install storm doors", "Add dehumidifiers and air-sealing", "Lower thermostat"],
    answer: 2,
    explanation: "Managing RH (relative humidity) requires mechanical removal (dehumidifiers) and better envelope control."
  },
  {
    q: "When might you open walls in non-renovation rooms?",
    options: ["To install wallpaper", "If IR shows active moisture or mold risk", "If HVAC is undersized", "To add lighting"],
    answer: 1,
    explanation: "Targeted demo is justified if concealed issues may pose health or structural risks."
  },
  {
    q: "What material should never support copper piping?",
    options: ["Wood", "Foam", "Steel", "Plastic"],
    answer: 2,
    explanation: "Contact between copper and steel causes galvanic corrosion; plastic or copper hangers are preferred."
  },
  {
    q: "What’s a safe discharge rule for a TPR valve on a water heater?",
    options: ["Can aim sideways", "Should be sealed", "Should discharge downward within 6 inches of the floor", "Must connect to drain line only"],
    answer: 2,
    explanation: "Prevents scald risk and water damage; a missing tube is a code violation."
  },
  {
    q: "What’s one benefit of a tubeseal vs a flipperseal?",
    options: ["More flexible", "Handles wide gaps better", "Lower cost", "Compresses more reliably"],
    answer: 3,
    explanation: "Tubeseals work well in tight, consistent gaps with superior compression."
  },
  {
    q: "What does 'face-sealing' refer to?",
    options: ["Applying caulk to drywall", "Weatherseal compresses perpendicular to surface", "Installing screens", "Gluing joint surfaces"],
    answer: 1,
    explanation: "Face seals are more reliable over time than edge seals because they aren’t disrupted by seasonal expansion."
  },
  {
    q: "Why might brushseals be less desirable for swing doors?",
    options: ["Too noisy", "Prone to melting", "Less compressive seal", "Attracts rodents"],
    answer: 2,
    explanation: "Brushseals don’t compress well and allow some airflow; best used for irregular sills, not airtightness."
  },
  {
    q: "What’s the purpose of corner-seals?",
    options: ["Decorative", "For anchoring nails", "Stop air at intersection of vertical and horizontal seals", "Reflect sunlight"],
    answer: 2,
    explanation: "Corners are leak-prone—corner-seals plug that vulnerable intersection."
  },
  {
    q: "What tool cuts grooves into window sashes for weatherseal?",
    options: ["Roller", "Dremel", "WS98 groover", "Sanding disc"],
    answer: 2,
    explanation: "Specialized tool for retrofitting compression seal tracks in wooden sash windows."
  },
  {
    q: "What kind of system is WS25+WS56?",
    options: ["Air venting system", "Adjustable door-bottom sealing system", "Window sash repair kit", "Insulated wall liner"],
    answer: 1,
    explanation: "This system allows retrofitting door-bottom seals that can be finely adjusted."
  },
  {
    q: "What is the typical lifespan of a conventional tank water heater?",
    options: ["3-5 years", "8-10 years", "10-15 years", "20+ years"],
    answer: 2,
    explanation: "After this range, risk of failure or corrosion rises sharply."
  },
  {
    q: "Why is mastic better than tape for duct sealing?",
    options: ["Easier to apply", "Expands when hot", "Long-lasting and adheres to uneven surfaces", "Cheaper"],
    answer: 2,
    explanation: "Mastic stays effective even with minor duct movement and is code-approved."
  },
  {
    q: "What is a sump pump back-up system for?",
    options: ["Extra power supply during outages", "Cleaning air filters", "Lowering ceiling temperature", "Spraying foundation walls"],
    answer: 0,
    explanation: "Battery backups prevent flooding during storms or power failures."
  },
  {
    q: "Why should outlet gaskets be used during weatherization?",
    options: ["Decoration", "Noise insulation", "Air sealing at penetration points", "Circuit protection"],
    answer: 2,
    explanation: "Electrical boxes are common air leak points—gaskets help stop that."
  },
  {
    q: "What does 'ACH50' refer to in blower door results?",
    options: ["Air changes per hour at 50 psi", "Air circulation height", "Annual cooling heat loss", "Average chimney height"],
    answer: 0,
    explanation: "ACH50 measures how often the entire house volume exchanges air through leaks under test pressure."
  }
];

const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    if (selected === questions[current].answer) setScore(score + 1);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setSelected(null);
    setShowExplanation(false);
    setCurrent(current + 1);
  };

  const q = questions[current];
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-xl rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">Home Efficiency & Renovation Quiz</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">{current + 1}. {q.q}</h2>
        <div className="space-y-2 mt-2">
          {q.options.map((opt, idx) => (
            <label key={idx} className="block">
              <input
                type="radio"
                name="option"
                value={idx}
                checked={selected === idx}
                onChange={() => setSelected(idx)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>
      </div>
      {!showExplanation ? (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      ) : (
        <div className="mt-4">
          <p className={`font-semibold ${selected === q.answer ? "text-green-600" : "text-red-600"}`}>
            {selected === q.answer ? "Correct!" : "Incorrect."}
          </p>
          <p className="mt-2 italic">{q.explanation}</p>
          <button
            onClick={handleNext}
            className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
          >
            Next Question
          </button>
        </div>
      )}
      {current === questions.length - 1 && showExplanation && (
        <p className="mt-6 font-bold">Final Score: {score} / {questions.length}</p>
      )}
    </div>
  );
};

export default Quiz;
