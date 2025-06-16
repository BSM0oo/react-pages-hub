import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const vocab = [
  { en: "the baby", es: "el bebé" },
  { en: "the diaper", es: "el pañal" },
  { en: "the wet diaper", es: "el pañal mojado" },
  { en: "the crib", es: "la cuna" },
  { en: "the bottle", es: "el biberón" },
  { en: "the nap", es: "la siesta" },
  { en: "the stroller", es: "el carrito" },
  { en: "Did she fall today?", es: "¿Se cayó hoy?" },
  { en: "Did she have any falls today?", es: "¿Tuvo alguna caída hoy?" },
  { en: "awake", es: "despierto / despierta" },
  { en: "asleep", es: "dormido / dormida" },
  { en: "tired", es: "cansado / cansada" },
  { en: "happy", es: "contento / contenta" },
  { en: "to cry", es: "llorar" },
  { en: "to laugh", es: "reír" },
  { en: "the toy", es: "el juguete" },
  { en: "the toys", es: "los juguetes" },
  { en: "to play", es: "jugar" },
  { en: "to run", es: "correr" },
  { en: "to play with the ball", es: "jugar a la pelota" },
  { en: "the swing (playground)", es: "el columpio" },
  { en: "the walk / stroll", es: "el paseo" },
  { en: "the breakfast", es: "el desayuno" },
  { en: "the lunch", es: "el almuerzo" },
  { en: "the dinner", es: "la cena" },
  { en: "the food / meal", es: "la comida" },
  { en: "What did the baby do today?", es: "¿Qué hizo el bebé hoy?" },
  { en: "Did she nap?", es: "¿Tomó una siesta?" },
  { en: "Did she play with her toys?", es: "¿Jugó con sus juguetes?" },
  { en: "How has she been doing with walking?", es: "¿Cómo le ha ido con sus pasos?" },
  { en: "Is she awake?", es: "¿Está despierta?" },
  { en: "Has she fallen asleep?", es: "¿Se ha dormido?" },
  { en: "the park", es: "el parque" },
  { en: "the swings", es: "los columpios" },
  { en: "the grass (lawn)", es: "el césped" }
];

const modes = ["EN→ES", "ES→EN", "Fill in the Blank"];

export default function VocabQuiz() {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState("EN→ES");
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewQueue, setReviewQueue] = useState([]);
  const [known, setKnown] = useState(new Set());

  const current = vocab[index];
  const prompt = mode === "EN→ES" ? current.en : mode === "ES→EN" ? current.es : (mode === "Fill in the Blank" && Math.random() > 0.5 ? current.en : current.es);
  const answer = mode === "EN→ES" ? current.es : mode === "ES→EN" ? current.en : (prompt === current.en ? current.es : current.en);

  const handleNext = () => {
    if (!showAnswer) {
      setReviewQueue([...reviewQueue, index]);
    }
    setShowAnswer(false);
    let nextIndex = (index + 1) % vocab.length;
    while (known.has(nextIndex) && known.size < vocab.length) {
      nextIndex = (nextIndex + 1) % vocab.length;
    }
    setIndex(nextIndex);
  };

  const handlePrev = () => {
    setShowAnswer(false);
    let prevIndex = index === 0 ? vocab.length - 1 : index - 1;
    while (known.has(prevIndex) && known.size < vocab.length) {
      prevIndex = prevIndex === 0 ? vocab.length - 1 : prevIndex - 1;
    }
    setIndex(prevIndex);
  };

  const handleReset = () => {
    setIndex(0);
    setScore(0);
    setReviewQueue([]);
    setKnown(new Set());
    setShowAnswer(false);
  };

  const handleReveal = () => {
    setShowAnswer(true);
    setScore(score + 1);
  };

  const markKnown = () => {
    const updated = new Set(known);
    updated.add(index);
    setKnown(updated);
    handleNext();
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-xl font-bold">Score: {score}</div>
      <div className="flex gap-2 flex-wrap">
        {modes.map(m => (
          <Button key={m} onClick={() => setMode(m)} variant={mode === m ? "default" : "outline"}>{m}</Button>
        ))}
        <Button onClick={handleReset} variant="destructive">Reset</Button>
      </div>
      <Card className="text-center p-6">
        <CardContent>
          <div className="text-lg font-semibold mb-2">{prompt}</div>
          {showAnswer ? (
            <div className="text-green-600 text-xl">{answer}</div>
          ) : (
            <Button onClick={handleReveal}>Show Answer</Button>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button onClick={handlePrev}>⟵ Back</Button>
        <Button onClick={markKnown} variant="outline">Mark as Known</Button>
        <Button onClick={handleNext}>Next ⟶</Button>
      </div>
    </div>
  );
}