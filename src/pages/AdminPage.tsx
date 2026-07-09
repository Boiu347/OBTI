import { useMemo, useState } from "react";
import { Badge, Disclaimer, PageShell } from "../components/Layout";
import { personaOrder } from "../data/personas";
import {
  clearRole,
  getPersonas,
  getQuestions,
  getRecords,
  getRole,
  savePersonas,
  saveQuestions,
  saveRole,
} from "../lib/storage";
import type { Persona, PersonaCode, Question, Role, ScoreMap } from "../types";

type Tab = "sales" | "questions" | "personas" | "dashboard";

export function AdminPage() {
  const [role, setRole] = useState<Role | null>(getRole());
  const [tab, setTab] = useState<Tab>(role === "admin" ? "questions" : "sales");

  if (!role) return <LoginPage onLogin={setRole} />;

  function logout() {
    clearRole();
    setRole(null);
  }

  return (
    <PageShell wide>
      <header className="admin-header">
        <div>
          <Badge>{role === "admin" ? "管理员" : "销售"}</Badge>
          <h1>{role === "admin" ? "洋葱圈管理后台" : "销售话术中心"}</h1>
        </div>
        <button className="ghost-button" onClick={logout}>
          退出
        </button>
      </header>
      <p className="admin-note">
        这个测试不是给孩子贴标签，而是帮助我们理解孩子更容易被什么方式激发。和家长沟通时，先解释孩子特点，再解释家长感受到的问题，最后再连接洋葱的学习方案。
      </p>
      <p className="admin-note muted">
        对家长沟通时，不要说孩子就是某种固定类型。建议表达为：根据孩子填写的学习偏好，他目前可能更适合某种学习方式。
      </p>
      {role === "admin" && (
        <nav className="tabs">
          <button className={tab === "questions" ? "active" : ""} onClick={() => setTab("questions")}>
            题目管理
          </button>
          <button className={tab === "personas" ? "active" : ""} onClick={() => setTab("personas")}>
            人格管理
          </button>
          <button className={tab === "dashboard" ? "active" : ""} onClick={() => setTab("dashboard")}>
            数据看板
          </button>
          <button className={tab === "sales" ? "active" : ""} onClick={() => setTab("sales")}>
            话术中心
          </button>
        </nav>
      )}
      {(role === "sales" || tab === "sales") && <SalesCenter />}
      {role === "admin" && tab === "questions" && <QuestionManager />}
      {role === "admin" && tab === "personas" && <PersonaManager />}
      {role === "admin" && tab === "dashboard" && <Dashboard />}
      <Disclaimer />
    </PageShell>
  );
}

function LoginPage({ onLogin }: { onLogin: (role: Role) => void }) {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function login() {
    const nextRole = account === "sales" && password === "onion123" ? "sales" : account === "admin" && password === "admin123" ? "admin" : null;
    if (!nextRole) {
      setError("账号或密码不正确");
      return;
    }
    saveRole(nextRole);
    onLogin(nextRole);
  }

  return (
    <PageShell>
      <div className="login-card">
        <Badge>ADMIN</Badge>
        <h1>后台登录</h1>
        <label>
          账号
          <input value={account} onChange={(event) => setAccount(event.target.value)} placeholder="sales 或 admin" />
        </label>
        <label>
          密码
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="请输入密码" />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="primary-button" onClick={login}>
          登录
        </button>
        <p className="hint">销售：sales / onion123；管理员：admin / admin123</p>
      </div>
    </PageShell>
  );
}

function SalesCenter() {
  const [personas] = useState(getPersonas);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const list = personaOrder
    .map((code) => personas[code])
    .filter((persona) => `${persona.code}${persona.name}${persona.subtitle}`.toLowerCase().includes(query.toLowerCase()));

  async function copy(text: string) {
    await navigator.clipboard?.writeText(text);
    setToast("已复制话术");
    window.setTimeout(() => setToast(""), 1400);
  }

  return (
    <section>
      <div className="toolbar">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索人格类型，例如 RUSH / 冲刺葱" />
        {toast && <span className="toast">{toast}</span>}
      </div>
      <div className="persona-grid">
        {list.map((persona) => (
          <article key={persona.code} className="admin-card">
            <img src={persona.image} alt={persona.name} />
            <div>
              <Badge>{persona.code}</Badge>
              <h2>{persona.name}</h2>
              <Field title="孩子画像" text={persona.sales.childProfile} />
              <Field title="家长常见感受" text={persona.sales.parentFeeling} />
              <Field title="沟通重点" text={persona.sales.communicationFocus} />
              <Field title="推荐话术" text={persona.sales.salesScript} />
              <Field title="不建议说的话" text={persona.sales.avoid} />
              <div className="tag-row">{persona.sales.productPoints.map((point) => <span key={point}>{point}</span>)}</div>
              <button className="primary-button compact" onClick={() => copy(persona.sales.salesScript)}>
                复制话术
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function QuestionManager() {
  const [questions, setQuestions] = useState<Question[]>(getQuestions);
  const [saved, setSaved] = useState("");

  function updateQuestion(index: number, next: Question) {
    setQuestions((items) => items.map((item, itemIndex) => (itemIndex === index ? next : item)));
  }

  function persist() {
    saveQuestions(questions);
    setSaved("已保存题目");
    window.setTimeout(() => setSaved(""), 1400);
  }

  return (
    <section className="manager-panel">
      <div className="panel-title">
        <h2>题目管理</h2>
        <button className="primary-button compact" onClick={persist}>
          保存题目
        </button>
        {saved && <span className="toast">{saved}</span>}
      </div>
      {questions.map((question, questionIndex) => (
        <article key={question.id} className="editor-card">
          <label>
            题目 {question.id}
            <input value={question.text} onChange={(event) => updateQuestion(questionIndex, { ...question, text: event.target.value })} />
          </label>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="option-editor">
              <input
                value={option.text}
                onChange={(event) => {
                  const options = question.options.map((item, itemIndex) => (itemIndex === optionIndex ? { ...item, text: event.target.value } : item));
                  updateQuestion(questionIndex, { ...question, options });
                }}
              />
              <ScoreEditor
                scores={option.scores}
                onChange={(scores) => {
                  const options = question.options.map((item, itemIndex) => (itemIndex === optionIndex ? { ...item, scores } : item));
                  updateQuestion(questionIndex, { ...question, options });
                }}
              />
            </div>
          ))}
        </article>
      ))}
    </section>
  );
}

function ScoreEditor({ scores, onChange }: { scores: ScoreMap; onChange: (scores: ScoreMap) => void }) {
  return (
    <div className="score-editor">
      {personaOrder.map((code) => (
        <label key={code}>
          {code}
          <input
            type="number"
            min="0"
            max="3"
            value={scores[code] ?? 0}
            onChange={(event) => {
              const value = Number(event.target.value);
              const next = { ...scores };
              if (value <= 0) delete next[code];
              else next[code] = value;
              onChange(next);
            }}
          />
        </label>
      ))}
    </div>
  );
}

function PersonaManager() {
  const [personas, setPersonas] = useState(getPersonas);
  const [saved, setSaved] = useState("");

  function update(code: PersonaCode, patch: Partial<Persona>) {
    setPersonas((items) => ({ ...items, [code]: { ...items[code], ...patch } }));
  }

  function updateSales(code: PersonaCode, patch: Partial<Persona["sales"]>) {
    setPersonas((items) => ({ ...items, [code]: { ...items[code], sales: { ...items[code].sales, ...patch } } }));
  }

  function persist() {
    savePersonas(personas);
    setSaved("已保存人格内容");
    window.setTimeout(() => setSaved(""), 1400);
  }

  return (
    <section className="manager-panel">
      <div className="panel-title">
        <h2>人格管理</h2>
        <button className="primary-button compact" onClick={persist}>
          保存人格
        </button>
        {saved && <span className="toast">{saved}</span>}
      </div>
      {personaOrder.map((code) => {
        const persona = personas[code];
        return (
          <article key={code} className="editor-card persona-editor">
            <img src={persona.image} alt={persona.name} />
            <div>
              <h3>{persona.name}</h3>
              <label>
                图片路径
                <input value={persona.image} onChange={(event) => update(code, { image: event.target.value })} />
              </label>
              <TextEdit label="一句话画像" value={persona.studentSummary} onChange={(value) => update(code, { studentSummary: value })} />
              <TextEdit label="学习超能力" value={persona.superPower} onChange={(value) => update(code, { superPower: value })} />
              <TextEdit label="隐藏卡点" value={persona.hiddenBlock} onChange={(value) => update(code, { hiddenBlock: value })} />
              <TextEdit label="学习开关" value={persona.learningSwitch} onChange={(value) => update(code, { learningSwitch: value })} />
              <TextEdit label="销售话术" value={persona.sales.salesScript} onChange={(value) => updateSales(code, { salesScript: value })} />
            </div>
          </article>
        );
      })}
    </section>
  );
}

function Dashboard() {
  const records = getRecords();
  const distribution = useMemo(
    () =>
      personaOrder.map((code) => ({
        code,
        count: records.filter((record) => record.personaCode === code).length,
      })),
    [records],
  );
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = records.filter((record) => record.createdAt.startsWith(today)).length;
  const max = Math.max(...distribution.map((item) => item.count), 1);

  function exportCsv() {
    const rows = [["id", "nickname", "grade", "personaCode", "personaName", "createdAt"], ...records.map((r) => [r.id, r.nickname, r.grade, r.personaCode, r.personaName, r.createdAt])];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "onion-test-records.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="dashboard">
      <div className="stat-row">
        <div className="stat-card">
          <span>总测试人数</span>
          <strong>{records.length}</strong>
        </div>
        <div className="stat-card">
          <span>今日测试人数</span>
          <strong>{todayCount}</strong>
        </div>
        <button className="primary-button compact" onClick={exportCsv}>
          导出测试记录 CSV
        </button>
      </div>
      <div className="chart-card">
        <h2>各人格出现次数</h2>
        {distribution.map((item) => (
          <div key={item.code} className="bar-row">
            <span>{item.code}</span>
            <div>
              <i style={{ width: `${(item.count / max) * 100}%` }} />
            </div>
            <strong>{item.count}</strong>
          </div>
        ))}
      </div>
      <div className="table-card">
        <h2>最近测试记录</h2>
        <div className="record-table">
          {records.slice(0, 12).map((record) => (
            <div key={record.id} className="record-row">
              <span>{record.nickname}</span>
              <span>{record.grade}</span>
              <span>{record.personaName}</span>
              <span>{record.createdAt}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Field({ title, text }: { title: string; text: string }) {
  return (
    <p className="field">
      <strong>{title}</strong>
      {text}
    </p>
  );
}

function TextEdit({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label>
      {label}
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={3} />
    </label>
  );
}
