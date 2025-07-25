import React, { useState } from 'react';

const cards = [
  { term: 'Base Cabinet', definition: 'Full-height cabinets that sit on the floor and support countertops.', examples: ['Kitchen sink cabinet', 'Under-counter storage cabinets'] },
  { term: 'Wall Cabinet', definition: 'Cabinets mounted on the wall above countertops or appliances.', examples: ['Over-the-range microwave cabinet', 'Kitchen upper storage'] },
  { term: 'Tall Cabinet', definition: 'Floor-to-ceiling cabinets used for pantry storage or as broom closets.', examples: ['Pull-out pantry', 'Utility closet cabinetry'] },
  { term: 'Kitchen Island', definition: 'A freestanding or built-in cabinet unit placed in the center of a kitchen for additional workspace and storage.', examples: ['Prep island with sink', 'Buffet-height island'] },
  { term: 'Peninsula', definition: 'An extension of base cabinetry that protrudes from a wall or cabinet run, creating an attached island-like area.', examples: ['Breakfast bar peninsula', 'Seating peninsula'] },
  { term: 'Face-Frame Cabinet', definition: 'Cabinets constructed with a face-frame—sturdy front structure of rails and stiles—that the doors and drawers attach to.', examples: ['Traditional American-made cabinets'] },
  { term: 'Frameless Cabinet', definition: 'Cabinet boxes without a front frame; doors attach directly to the sides of the cabinet carcass.', examples: ['Modern shaker cabinets', 'European kitchens'] },
  { term: 'Inset Door', definition: 'Cabinet doors that fit flush inside the face-frame opening, creating a clean, built-in look.', examples: ['High-end traditional kitchens', 'Classic furniture-style cabinets'] },
  { term: 'Full Overlay Door', definition: 'Doors that cover nearly the entire face-frame, leaving a small reveal around the edges.', examples: ['Contemporary kitchens', 'Shaker-style with minimal gaps'] },
  { term: 'Partial Overlay Door', definition: 'Doors that cover only part of the face-frame, leaving wider gaps between doors and drawer fronts.', examples: ['Some budget-friendly shaker lines'] },
  { term: 'Drawer Dovetail Joint', definition: 'Interlocking wedge-shaped wood joints that secure drawer fronts and sides for strength and durability.', examples: ['Soft-close dovetail drawers in premium cabinets'] },
  { term: 'Soft-Close Hinges', definition: 'Hinges that slow the door’s movement in the last few degrees of closing to prevent slamming.', examples: ['Kitchen and bathroom cabinet doors'] },
  { term: 'Toe Kick', definition: 'The recessed space at the bottom front of base cabinets that provides room for the toes when standing close.', examples: ['4" high by 3" deep recessed area under base cabinets'] },
  { term: 'RTA (Ready-to-Assemble)', definition: 'Cabinets shipped flat-packed for on-site assembly, often budget-friendly.', examples: ['IKEA SEKTION', 'Lower-cost online cabinet kits'] },
  { term: 'Shaker Style', definition: 'A simple door style featuring a flat center panel and square-edged frame.', examples: ['Classic Shaker breakfast nook cabinets'] },

  { term: 'Casing', definition: 'Trim molding that surrounds windows and doors to cover the gap between framing and wall finish.', examples: ['Flat stock casing around interior doors', 'Window jamb casings'] },
  { term: 'Baseboard', definition: 'Trim installed at the junction of the wall and floor to conceal gaps and protect walls.', examples: ['5" tall roped baseboard in a living room'] },
  { term: 'Crown Molding', definition: 'Decorative molding installed at the intersection of walls and ceiling.', examples: ['4" tall ogee-profile crown in dining room'] },
  { term: 'Chair Rail', definition: 'Horizontal molding placed partway up a wall to protect it from chair backs.', examples: ['3" tall chair rail delimiting wainscoting in a hallway'] },
  { term: 'Picture Rail', definition: 'A narrow horizontal molding near the ceiling used for hanging artwork without nails.', examples: ['1" picture rail in an office'] },
  { term: 'Wainscoting', definition: 'Wall covering with panels (raised or flat) applied to the lower portion of a wall.', examples: ['Beadboard wainscoting in a bathroom', 'Raised-panel wainscoting in foyer'] },
  { term: 'Beadboard', definition: 'Paneling featuring vertical grooves (beads) that give a classic cottage look.', examples: ['4" beadboard panels in laundry room'] },
  { term: 'Panel Molding', definition: 'Thin strips of molding arranged to form rectangular or square frames on walls or cabinet faces.', examples: ['Decorative wall panels in a dining room'] },
  { term: 'Corbel', definition: 'Decorative bracket used to support weight or purely for ornamentation under shelves, mantels, or counters.', examples: ['Kitchen countertop support corbels'] },
  { term: 'Newel Post', definition: 'The main vertical post at the start or end of a staircase handrail.', examples: ['Turned wooden newel in a foyer staircase'] },
  { term: 'Baluster', definition: 'Vertical spindles that support the handrail on a staircase or balcony.', examples: ['Traditional square-profile balusters'] },
  { term: 'Mantel', definition: 'Decorative framework around a fireplace opening, often including a shelf.', examples: ['Classic wood mantel in living room'] },
  { term: 'Dentil Molding', definition: 'Repeating small rectangular blocks used as ornamental trim, often beneath crown molding.', examples: ['Dentil detail under a 5" crown in library'] },
  { term: 'Ogee Profile', definition: 'S-shaped molding profile combining a concave and convex curve.', examples: ['Ogee edge on crown molding'] },
  { term: 'Cove Molding', definition: 'Concave-profile molding used to create smooth transitions between surfaces.', examples: ['Cove trim at ceiling-to-wall joints'] },
  { term: 'Quarter Round', definition: 'Concave molding that covers gaps between floor and baseboard.', examples: ['¾" quarter round at baseboard'] },
  { term: 'Base Shoe', definition: 'Similar to quarter round but slimmer, used to finish the bottom of baseboards.', examples: ['½" base shoe in hardwood floors'] },
];

export default function CabinetryQuiz() {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [starred, setStarred] = useState(new Set());
  const [viewStars, setViewStars] = useState(false);

  const card = cards[index];

  const toggleStar = () => {
    const newSet = new Set(starred);
    if (starred.has(index)) newSet.delete(index);
    else newSet.add(index);
    setStarred(newSet);
  };

  const changeIndex = (delta) => {
    setShowAnswer(false);
    setIndex((i) => (i + delta + cards.length) % cards.length);
  };

  const starredList = [...starred].map((i) => cards[i].term).join(', ');

  return (
    <div className="p-6 bg-white text-gray-800 max-w-lg mx-auto">
      {!viewStars ? (
        <>
          <h2 className="text-xl font-bold mb-2">{card.term}</h2>
          <button
            className="mb-4 p-2 border rounded"
            onClick={() => setShowAnswer((s) => !s)}
          >
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>
          {showAnswer && (
            <div className="mb-4">
              <p className="italic mb-2">{card.definition}</p>
              <ul className="list-disc list-inside">
                {card.examples.map((ex, idx) => (
                  <li key={idx}>{ex}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex space-x-2 mb-4">
            <button className="p-2 border rounded" onClick={() => changeIndex(-1)}>
              Previous
            </button>
            <button className="p-2 border rounded" onClick={() => changeIndex(1)}>
              Next
            </button>
            <button className="p-2 border rounded" onClick={toggleStar}>
              {starred.has(index) ? '★ Unstar' : '☆ Star'}
            </button>
            <button className="p-2 border rounded" onClick={() => setViewStars(true)}>
              View Starred
            </button>
          </div>
        </>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-2">Starred Terms</h2>
          <textarea
            className="w-full h-32 p-2 border rounded mb-4"
            readOnly
            value={starredList}
          />
          <button
            className="p-2 border rounded mr-2"
            onClick={() => navigator.clipboard.writeText(starredList)}
          >
            Copy List
          </button>
          <button className="p-2 border rounded" onClick={() => setViewStars(false)}>
            Back to Quiz
          </button>
        </div>
      )}
    </div>
  );
}
