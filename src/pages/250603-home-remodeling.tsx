import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const terms = [
  {
    term: "Stucco",
    definition:
      "A cement-based exterior plaster applied over walls for texture and weather resistance. Often used on wood-framed walls with lath. Context: Used on exterior loggia walls in the architectural drawings."
  },
  {
    term: "Metal Lath",
    definition:
      "A mesh material (often galvanized steel) attached to framing to hold stucco or plaster. Common in stucco or plaster assemblies. Context: Shown beneath stucco finishes on exterior wall assemblies."
  },
  {
    term: "Drop Ceiling",
    definition:
      "A secondary ceiling hung below the main ceiling, often to conceal ductwork, wiring, or piping. Context: Indicated in RCP (Reflected Ceiling Plan) sections."
  },
  {
    term: "Gypsum Wall Board",
    definition:
      "Also known as drywall; used for interior wall and ceiling finishes. Context: Mentioned in interior wall partition assemblies."
  },
  {
    term: "Cementitious Backer Board",
    definition:
      "Moisture-resistant panel used behind tile in wet areas like showers. Context: Specified at tile locations."
  },
  {
    term: "Sound-Attenuation Batting",
    definition:
      "Fiberglass insulation used to reduce sound transfer between rooms. Context: Noted for use in bedrooms and bathrooms."
  },
  {
    term: "2x4 Studs @ 16\" O.C.",
    definition:
      "Standard framing pattern: 2-inch by 4-inch lumber placed 16 inches on center. Context: Typical wall framing layout in the plans."
  },
  {
    term: "Weather Barrier Sheathing",
    definition:
      "A sheathing panel that blocks moisture and air but allows vapor transmission. Context: Under exterior stucco finish."
  },
  {
    term: "Standing Seam Copper Roof",
    definition:
      "Durable metal roofing with raised interlocking seams, common in high-end designs. Context: Existing roof type preserved in design."
  },
  {
    term: "CDX Plywood",
    definition:
      "Plywood with exterior glue (X) used in construction; C-grade front, D-grade back. Context: Used as roof sheathing under TPO and copper."
  },
  {
    term: "TPO Roof Membrane",
    definition:
      "Thermoplastic polyolefin roofing, common for flat roofs; white, reflective, and heat-welded. Context: Indicated for unconditioned roof areas."
  },
  {
    term: "Open-Cell Spray Foam",
    definition:
      "Insulation sprayed into cavities, expands and hardens. Provides air barrier and insulation. Context: Filling cathedral ceiling cavities to achieve R-38."
  },
  {
    term: "Thermal/Ignition Barrier",
    definition:
      "A protective layer (e.g., drywall) placed over foam insulation to reduce fire risk. Context: Required above foam insulation per code."
  },
  {
    term: "R-Value",
    definition:
      "Measure of insulation's resistance to heat flow. Higher = better insulation. Context: Used in reference to achieving R-38 in cathedral ceiling."
  },
  {
    term: "Concrete Stoop",
    definition:
      "Small entry platform with steps, made of poured concrete. Context: Described in keynotes and exterior features."
  },
  {
    term: "Crown Molding",
    definition:
      "Decorative trim at the wall-ceiling junction, often used to enhance aesthetics. Context: Referenced in reflected ceiling plans."
  },
  {
    term: "Beadboard",
    definition:
      "Wood paneling with vertical grooves, often used on ceilings or wainscoting. Context: Used in porch ceiling detailing."
  },
  {
    term: "Sloped Dimensional Lumber",
    definition:
      "Framing members cut to create pitched roofs or slopes. Context: Part of roof framing system."
  },
  {
    term: "Board Sheathing",
    definition:
      "Old-style sheathing made of wood boards, used before plywood or OSB. Context: Found under existing copper roofing."
  },
  {
    term: "French Casement Window",
    definition:
      "A pair of side-hinged windows that open outward from the center. Context: Specified in window schedule."
  },
  {
    term: "Tempered Glass",
    definition:
      "Heat-treated safety glass that breaks into small blunt pieces. Context: Listed in door schedule for safety glazing."
  },
  {
    term: "Demolition Plan",
    definition:
      "Architectural drawing showing what existing elements will be removed. Context: Spanning multiple pages for first, second, and third floors."
  },
  {
    term: "Finish Schedule",
    definition:
      "A table specifying surface materials (paint, tile, wood, etc.) used in rooms. Context: Outlined across floor plan legend."
  },
  {
    term: "Reflected Ceiling Plan (RCP)",
    definition:
      "Plan view drawing showing ceiling features like lighting, vents, and beams. Context: Provides ceiling light and fixture placement."
  },
  {
    term: "Non-shrink Acoustic Sealant",
    definition:
      "Sealant that remains flexible, doesn’t shrink, and helps block sound. Context: Specified at interior partitions."
  },
  {
    term: "Wall Base",
    definition:
      "Trim at the base of walls, protecting them from damage and concealing gaps. Context: Referenced in typical detail notes."
  },
  {
    term: "Butler’s Pantry",
    definition:
      "Transition space between kitchen and dining for staging meals and storing service ware. Context: Shown in enlarged interior elevations."
  },
  {
    term: "Loggia",
    definition:
      "A covered outdoor corridor or gallery, typically with open sides. Context: New loggia structure with stucco, decorative beams, and screens."
  },
  {
    term: "Furring Wall",
    definition:
      "A secondary frame (e.g., for insulation or plumbing) attached to an existing wall. Context: Wall furring assemblies noted as F1/F1A/F1B."
  },
  {
    term: "Porch Beam Cover",
    definition:
      "Aesthetic wood or metal piece covering the structural beam in porches or loggias. Context: Part of loggia and porch detail drawings."
  },
  {
    term: "ERV",
    definition:
      "Energy Recovery Ventilator – transfers heat and humidity between incoming and outgoing air. Used in airtight homes for balanced ventilation."
  },
  {
    term: "HRV",
    definition:
      "Heat Recovery Ventilator – exchanges heat between fresh air and exhaust without moisture transfer. Best in colder, dryer climates."
  },
  {
    term: "DOAS",
    definition:
      "Dedicated Outdoor Air System – HVAC system dedicated to delivering outdoor ventilation air, often paired with ERV/HRV and local zone conditioning."
  },
  {
    term: "Joists",
    definition:
      "Horizontal framing members supporting floors or ceilings. Context: Mentioned in discussions about air sealing and rim joist insulation."
  }
];

export default function RemodelingQuiz() {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const next = () => {
    setShowAnswer(false);
    setIndex((prev) => (prev + 1) % terms.length);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Remodeling & Building Vocab Quiz</h1>
      <Card className="mb-4">
        <CardContent className="p-6">
          <p className="text-xl font-semibold">What does "{terms[index].term}" mean?</p>
          {showAnswer && <p className="mt-4 text-gray-700">{terms[index].definition}</p>}
        </CardContent>
      </Card>
      <div className="flex justify-center gap-4">
        <Button onClick={() => setShowAnswer(true)}>Show Answer</Button>
        <Button variant="secondary" onClick={next}>Next</Button>
      </div>
    </div>
  );
}