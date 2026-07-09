import { personaOrder } from "../data/personas";
import type { PersonaCode, QuestionOption, ScoreMap } from "../types";

export type Answers = Record<number, QuestionOption>;

export function createEmptyScores(): Record<PersonaCode, number> {
  return personaOrder.reduce(
    (acc, code) => ({ ...acc, [code]: 0 }),
    {} as Record<PersonaCode, number>,
  );
}

export function addScores(base: Record<PersonaCode, number>, scores: ScoreMap) {
  const next = { ...base };
  Object.entries(scores).forEach(([code, value]) => {
    next[code as PersonaCode] += value ?? 0;
  });
  return next;
}

export function calculateResult(answers: Answers): {
  scores: Record<PersonaCode, number>;
  winner: PersonaCode;
} {
  const scores = createEmptyScores();
  Object.values(answers).forEach((option) => {
    Object.entries(option.scores).forEach(([code, value]) => {
      scores[code as PersonaCode] += value ?? 0;
    });
  });

  const maxScore = Math.max(...Object.values(scores));
  const tied = personaOrder.filter((code) => scores[code] === maxScore);
  if (tied.length === 1) return { scores, winner: tied[0] };

  const lastQuestionId = Math.max(...Object.keys(answers).map(Number));
  const lastScores = answers[lastQuestionId]?.scores ?? {};
  const lastMax = Math.max(...tied.map((code) => lastScores[code] ?? 0));
  const lastTied = tied.filter((code) => (lastScores[code] ?? 0) === lastMax);
  const winner = personaOrder.find((code) => lastTied.includes(code)) ?? "RUSH";
  return { scores, winner };
}
