import React, { useState, useEffect } from 'react';

// Force voice preloading
window.speechSynthesis.getVoices();

const routine = [
  { label: "TFL & Glute Med Release (Foam Roll)", duration: 60, instruction: "Lie on your side with a foam roller under your TFL (just below the hip bone). Roll slowly back and forth. Focus on trigger points. Keep your core engaged." },
  { label: "Switch Side: TFL & Glute Med Release", duration: 60, instruction: "Switch to the other side and repeat the foam rolling technique on your TFL and glute medius." },
  { label: "Hip Flexor Stretch: Half-Kneeling Lunge + Reach", duration: 60, instruction: "Kneel on one knee. Tuck your pelvis under (posterior tilt), squeeze the glute of the rear leg, and reach the same-side arm overhead. Gently lean away." },
  { label: "Switch Side: Hip Flexor Stretch", duration: 60, instruction: "Switch legs and repeat. Keep pelvis tucked and stretch through the front of the hip and thigh." },
  { label: "Standing Hip Abduction + Internal Rotation", duration: 90, instruction: "Stand with feet hip-width apart. Lift one leg out to the side while slightly rotating it inward. Use a band around ankles if available. Control the movement. Repeat both sides." },
  { label: "Anterior Compartment Glide: Dorsiflex + Inversion/Eversion", duration: 60, instruction: "Sit with legs extended. Pull toes up toward shins, then slowly roll ankles inward and outward. Alternate slouching and sitting tall to glide anterior compartment nerves." },
  { label: "Lateral Compartment / MDCN Glide: Seated Eversion Rolls", duration: 60, instruction: "Sit upright, legs extended. Slowly circle ankles, emphasizing outward (eversion) motion. Avoid stretching to discomfort. Keep motion smooth and controlled." },
  { label: "Posterior Compartment Stretch: Gastroc + Soleus", duration: 30, instruction: "Stand and press one foot back against the floor or a wall. Keep knee straight to stretch gastrocnemius. Lean forward gently." },
  { label: "Switch Side: Posterior Compartment Stretch", duration: 30, instruction: "Switch legs and repeat. Focus on maintaining a firm heel contact with the ground or wall." },
  { label: "MDCN Flossing: Seated Leg Raise + Ankle Movement", duration: 30, instruction: "Sit tall, extend one leg straight. Flex and point the foot while gently adding ankle rolls. Keep spine neutral and motion fluid." },
  { label: "Switch Side: MDCN Flossing", duration: 30, instruction: "Switch legs and repeat. Focus on nerve gliding, not deep stretching. Smooth, pain-free motion is key." }
];

export default function StretchTimerRoutine() {
  const [step, setStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(routine[0].duration);

  useEffect(() => {
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(routine[step].instruction);
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        utterance.voice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) || voices[0];
      }
      utterance.rate = 1.1;
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    }, 150);
  }, [step]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (step < routine.length - 1) {
        setStep(prev => prev + 1);
        setTimeLeft(routine[step + 1].duration);
      }
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, step]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">10-Minute Stretch Routine</h1>
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">{routine[step].label}</h2>
        <div className="text-4xl font-bold text-blue-600 mb-2">{timeLeft}s</div>
        <p className="text-sm text-gray-500 mb-2">
          {routine[step].instruction}
        </p>
        <p className="text-sm text-gray-400">
          Step {step + 1} of {routine.length}
        </p>
      </div>
      <div className="mt-4 text-gray-600 text-sm">Next: {routine[step + 1]?.label || "Done!"}</div>
    </div>
  );
}
