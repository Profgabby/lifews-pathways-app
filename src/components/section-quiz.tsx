"use client";

import { useMemo, useState } from "react";

type Question = { question: string; options: string[]; answer: number };

export function SectionQuiz({ questions }: { questions: Question[] }) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const complete = useMemo(() => answers.every((answer) => answer !== null), [answers]);
  const score = submitted ? answers.reduce<number>((total, answer, index) => total + (answer === questions[index].answer ? 1 : 0), 0) : 0;
  return <div className="section-quiz">
    <div className="section-quiz-heading"><div><span className="eyebrow">Knowledge check</span><h3>10 questions · choose one answer</h3></div><span className="section-quiz-score">{submitted ? `${score}/10` : "10 MCQs"}</span></div>
    <div className="section-quiz-grid">{questions.map((question, index) => <fieldset className="section-quiz-card" key={`${question.question}-${index}`}><legend><span>{String(index + 1).padStart(2, "0")}</span><strong>{question.question}</strong></legend>{question.options.map((option, optionIndex) => <label key={option}><input type="radio" name={`section-q-${index}`} checked={answers[index] === optionIndex} onChange={() => setAnswers((current) => current.map((value, i) => i === index ? optionIndex : value))}/><span>{option}</span></label>)}</fieldset>)}</div>
    <div className="section-quiz-footer"><button className="module-nav-button" type="button" disabled={!complete} onClick={() => setSubmitted(true)}>Check answers</button>{submitted && <strong className={score >= 8 ? "quiz-pass" : "quiz-retry"}>{score >= 8 ? "Section passed — keep building." : "Review the section and try again."}</strong>}</div>
  </div>;
}
