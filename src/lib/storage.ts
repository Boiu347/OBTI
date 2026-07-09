import { defaultPersonas } from "../data/personas";
import { defaultQuestions } from "../data/questions";
import type { Persona, PersonaCode, Question, StudentProfile, TestRecord } from "../types";

const KEYS = {
  questions: "onion_questions",
  personas: "onion_personas",
  profile: "onion_student_profile",
  lastResult: "onion_last_result",
  records: "onion_records",
  role: "onion_admin_role",
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getQuestions() {
  return read<Question[]>(KEYS.questions, defaultQuestions);
}

export function saveQuestions(questions: Question[]) {
  write(KEYS.questions, questions);
}

export function getPersonas() {
  return read<Record<PersonaCode, Persona>>(KEYS.personas, defaultPersonas);
}

export function savePersonas(personas: Record<PersonaCode, Persona>) {
  write(KEYS.personas, personas);
}

export function saveStudentProfile(profile: StudentProfile) {
  write(KEYS.profile, profile);
}

export function getStudentProfile() {
  return read<StudentProfile>(KEYS.profile, { nickname: "", grade: "" });
}

export function saveLastResult(result: { personaCode: PersonaCode; scores: Record<PersonaCode, number> }) {
  write(KEYS.lastResult, result);
}

export function getLastResult() {
  return read<{ personaCode: PersonaCode; scores: Record<PersonaCode, number> } | null>(KEYS.lastResult, null);
}

export function getRecords() {
  return read<TestRecord[]>(KEYS.records, [
    {
      id: "test_001",
      nickname: "匿名学生",
      grade: "六年级",
      personaCode: "RUSH",
      personaName: "冲刺葱",
      createdAt: "2026-07-09 10:30",
    },
  ]);
}

export function addRecord(record: TestRecord) {
  write(KEYS.records, [record, ...getRecords()]);
}

export function saveRole(role: "sales" | "admin") {
  write(KEYS.role, role);
}

export function getRole() {
  return read<"sales" | "admin" | null>(KEYS.role, null);
}

export function clearRole() {
  localStorage.removeItem(KEYS.role);
}

export function nowText() {
  const date = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
