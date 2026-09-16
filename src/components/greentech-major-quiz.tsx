"use client";

import Link from "next/link";
import { useState } from "react";

const questions = [
  ["What connects the FEW systems in GreenTech?", ["Evidence-based system thinking", "Guesswork", "Branding alone", "Unverified AI"]],
  ["What is the first priority before technical practice?", ["Safety and authorization", "Speed", "Sales", "Skipping the briefing"]],
  ["What makes a measurement useful?", ["A clear method, units and record", "A plausible guess", "A photo without context", "An unlabelled number"]],
  ["What should a technician do when a result is unexpected?", ["Investigate evidence and isolate the cause", "Hide it", "Continue without checking", "Invent a result"]],
  ["How should AI support technical learning?", ["As a checked support tool", "As the final authority", "As a replacement for supervision", "As a way around safety"]],
  ["What is a responsible GreenTech solution?", ["Safe, useful, maintainable and resource-aware", "The cheapest claim", "A guaranteed-income promise", "A system with no records"]],
  ["Why document practical work?", ["To make decisions and competence traceable", "To replace practice", "To avoid maintenance", "To make equipment look new"]],
  ["What should happen if equipment is unfamiliar?", ["Stop and ask an authorized facilitator", "Connect it immediately", "Guess the rating", "Let anyone operate it"]],
  ["What does integration mean in FEW work?", ["Understanding how food, energy and water affect one another", "Using one tool only", "Ignoring users", "Removing all checks"]],
  ["What earns progression to the next GreenTech module?", ["At least 80% on the major quiz", "Attendance only", "A confident guess", "Skipping the quiz"]],
] as const;

export function GreenTechMajorQuiz({ nextCode, language }: { nextCode: string; language: string }) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [result, setResult] = useState<number | null>(null);
  const complete = answers.every((answer) => answer !== null);
  function submit() {
    if (!complete) return;
    const score = answers.reduce((total, answer, index) => total + (answer === 0 ? 1 : 0), 0) * 10;
    setResult(score);
    if (score >= 80) localStorage.setItem("lifews-greentech-gate", "passed");
    else { localStorage.removeItem("lifews-greentech-gate"); localStorage.removeItem("lifews-greentech-progress"); }
  }
  return <section className="major-quiz"><div className="eyebrow">GreenTech progression checkpoint</div><h2>Major quiz after the first three modules</h2><p>Score 80% or higher to unlock the next module. A lower score restarts the GreenTech sequence at GF-01.</p><div className="major-quiz-grid">{questions.map((item, index) => <fieldset key={item[0]}><legend><span>{String(index + 1).padStart(2, "0")}</span><strong>{item[0]}</strong></legend>{item[1].map((option, optionIndex) => <label key={option}><input type="radio" name={`major-${index}`} checked={answers[index] === optionIndex} onChange={() => setAnswers((current) => current.map((value, i) => i === index ? optionIndex : value))}/>{option}</label>)}</fieldset>)}</div><button className="module-nav-button" type="button" disabled={!complete} onClick={submit}>Submit major quiz</button>{result !== null && <div className="major-quiz-result">{result >= 80 ? <><strong>Passed: {result}%</strong><Link className="module-nav-button" href={`/learner/modules/${nextCode}?lang=${language}&step=1`}>Continue to {nextCode}</Link></> : <><strong>Not passed: {result}%</strong><Link className="module-nav-button secondary" href={`/learner/modules/GF-01?lang=${language}&step=1`}>Restart at GF-01</Link></>}</div>}</section>;
}
