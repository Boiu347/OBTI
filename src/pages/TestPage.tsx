import { useEffect, useMemo, useState } from "react";
import { Badge, PageShell } from "../components/Layout";
import { calculateResult, type Answers } from "../lib/scoring";
import { addRecord, getPersonas, getQuestions, getStudentProfile, nowText, saveLastResult } from "../lib/storage";
import type { QuestionOption } from "../types";

export function TestPage() {
  const [questions] = useState(getQuestions);
  const [personas] = useState(getPersonas);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const question = questions[index];
  const progress = useMemo(() => ((index + 1) / questions.length) * 100, [index, questions.length]);

  useEffect(() => {
    if (!question) window.location.pathname = "/";
  }, [question]);

  function choose(option: QuestionOption) {
    const next = { ...answers, [question.id]: option };
    setAnswers(next);
    if (index < questions.length - 1) {
      window.setTimeout(() => setIndex((value) => value + 1), 180);
      return;
    }
    const result = calculateResult(next);
    const persona = personas[result.winner];
    const profile = getStudentProfile();
    saveLastResult({ personaCode: result.winner, scores: result.scores });
    addRecord({
      id: `test_${Date.now()}`,
      nickname: profile.nickname || "匿名学生",
      grade: profile.grade || "未填写",
      personaCode: result.winner,
      personaName: persona.name,
      createdAt: nowText(),
    });
    window.location.assign(`/result?type=${result.winner}`);
  }

  if (!question) return null;

  return (
    <PageShell>
      <div className="test-card">
        <div className="test-top">
          <Badge>轻松选一个更像你的</Badge>
          <strong>
            {index + 1} / {questions.length}
          </strong>
        </div>
        <div className="progress">
          <span style={{ width: `${progress}%` }} />
        </div>
        <h2>{question.text}</h2>
        <div className="option-list">
          {question.options.map((option) => (
            <button key={option.text} className="option-button" onClick={() => choose(option)}>
              {option.text}
            </button>
          ))}
        </div>
        <div className="test-actions">
          <button className="ghost-button" disabled={index === 0} onClick={() => setIndex((value) => Math.max(0, value - 1))}>
            上一题
          </button>
          <span>不用想太久，选第一反应就好</span>
        </div>
      </div>
    </PageShell>
  );
}
