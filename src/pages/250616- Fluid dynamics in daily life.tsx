import React, { useState } from 'react';

const concepts = [
  {
    title: "Ideal Gas Law",
    reveal: [
      "Equation: PV = nRT",
      "P = Pressure (Pa or mmHg)",
      "V = Volume (m³ or L)",
      "n = Number of moles of gas (mol)",
      "R = Universal gas constant (8.314 J/mol·K)",
      "T = Temperature in Kelvin (K)",
      "Gases naturally spread due to random molecular motion.",
      "Higher pressure → more molecular collisions → spreading.",
      "Used in anesthesia, respiration, and gas leakage scenarios."
    ]
  },
  {
    title: "Fick’s First Law of Diffusion",
    reveal: [
      "Equation: J = -D ∇C",
      "J = Diffusive flux (mol/m²·s)",
      "D = Diffusion coefficient (m²/s)",
      "∇C = Concentration gradient (mol/m³ per m)",
      "Describes how solutes or gases spread through a medium.",
      "Relevant in gas exchange across alveoli, drug delivery."
    ]
  },
  {
    title: "Mean Free Path",
    reveal: [
      "Equation: λ = kT / (√2 π d² P)",
      "λ = Mean free path (m)",
      "k = Boltzmann constant (1.38 × 10⁻²³ J/K)",
      "T = Temperature (K)",
      "d = Molecular diameter (m)",
      "P = Pressure (Pa)",
      "Longer mean free path → faster gas spread.",
      "Important in vacuum environments, high-altitude physiology."
    ]
  },
  {
    title: "Bernoulli’s Equation",
    reveal: [
      "Equation: P + ½ρv² + ρgh = constant",
      "P = Static pressure (Pa)",
      "ρ = Fluid density (kg/m³)",
      "v = Flow velocity (m/s)",
      "g = Gravitational acceleration (9.81 m/s²)",
      "h = Height above reference (m)",
      "Speed ↑ → Pressure ↓",
      "Used in airplane lift, pitot tubes, suction devices.",
      "Applies only along streamlines, in steady, frictionless, incompressible flow."
    ]
  },
  {
    title: "Venturi Effect",
    reveal: [
      "Equation: A₁v₁ = A₂v₂ + Bernoulli’s",
      "Narrow throat → speed up → pressure drop",
      "Used in Venturi masks, atomizers, carburetors",
      "Can entrain secondary fluids (e.g., room air, medication).",
      "No pump needed—relies on fluid dynamics alone."
    ]
  },
  {
    title: "Entrainment",
    reveal: [
      "Fast fluid jets pull slower surrounding fluid.",
      "Mechanisms: Bernoulli low-pressure & viscous shear",
      "Used in jet ventilation, nebulizers, bladeless fans.",
      "Requires only a directed high-speed flow."
    ]
  },
  {
    title: "Wall Friction & Velocity Profile",
    reveal: [
      "No-slip condition: velocity = 0 at wall",
      "Velocity increases parabolically to center",
      "Shear stress: τ = μ dv/dr",
      "Greatest shear near the walls.",
      "Important in capillary flow, blood vessel dynamics."
    ]
  },
  {
    title: "Poiseuille’s Law",
    reveal: [
      "Equation: Q = πr⁴ΔP / 8μL",
      "Q = Volumetric flow rate",
      "r = Radius of tube",
      "μ = Viscosity",
      "ΔP = Pressure gradient",
      "L = Length of tube",
      "Flow ∝ r⁴ — radius has huge impact on flow",
      "Used in IV catheter sizing, airway resistance in asthma."
    ]
  },
  {
    title: "Reynolds Number",
    reveal: [
      "Equation: Re = ρvD / μ or vD / ν",
      "Re < 2000 → laminar, >4000 → turbulent",
      "Describes transition to chaotic flow",
      "Higher Re → more mixing, noise, energy loss",
      "Used in vessel murmur prediction, pipe design."
    ]
  },
  {
    title: "Blasius Formula",
    reveal: [
      "Equation: f = 0.316 Re⁻⁰·²⁵",
      "Applies to smooth turbulent pipe flow",
      "Used in calculating friction losses in flow systems."
    ]
  }
];

export default function FluidDynamicsConcepts() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleReveal = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">📘 Core Fluid Dynamics Concepts</h1>
      <p className="text-sm text-gray-500 mb-8">Click on any concept below to test yourself. Reveal the equation, definitions, examples, and applications when ready.</p>

      {concepts.map((item, index) => (
        <div key={index} className="mb-4 border rounded-lg overflow-hidden shadow-sm">
          <button
            onClick={() => toggleReveal(index)}
            className="w-full text-left bg-blue-50 hover:bg-blue-100 px-4 py-3 font-semibold text-lg"
          >
            {item.title}
          </button>
          {openIndex === index && (
            <div className="bg-white px-4 py-3 space-y-1">
              {item.reveal.map((line, i) => (
                <p key={i} className="text-sm">{line}</p>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="mt-10 border-t pt-6 text-sm text-gray-600">
        <p>Next: Try applying these concepts to quiz problems and clinical scenarios in physiology and fluid dynamics.</p>
      </div>
    </div>
  );
}