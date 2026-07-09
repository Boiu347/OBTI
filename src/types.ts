export type PersonaCode =
  | "RUSH"
  | "SPARK"
  | "ROOT"
  | "RADAR"
  | "CORE"
  | "TEAM"
  | "PATH"
  | "CHARGE";

export type ScoreMap = Partial<Record<PersonaCode, number>>;

export interface QuestionOption {
  text: string;
  scores: ScoreMap;
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

export interface Persona {
  code: PersonaCode;
  name: string;
  subtitle: string;
  image: string;
  studentSummary: string;
  superPower: string;
  hiddenBlock: string;
  learningSwitch: string;
  onionMethod: string;
  shareText: string;
  sales: {
    childProfile: string;
    parentFeeling: string;
    communicationFocus: string;
    salesScript: string;
    avoid: string;
    productPoints: string[];
  };
}

export interface StudentProfile {
  nickname: string;
  grade: string;
}

export interface TestRecord {
  id: string;
  nickname: string;
  grade: string;
  personaCode: PersonaCode;
  personaName: string;
  createdAt: string;
}

export type Role = "sales" | "admin";
