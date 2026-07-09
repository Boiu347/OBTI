import { useState } from "react";
import { Badge, Disclaimer, PageShell } from "../components/Layout";
import { saveStudentProfile } from "../lib/storage";

const grades = ["", "三年级", "四年级", "五年级", "六年级", "初一", "初二", "初三"];

export function HomePage() {
  const [nickname, setNickname] = useState("");
  const [grade, setGrade] = useState("");
  const [agreed, setAgreed] = useState(false);

  function start() {
    if (!agreed) return;
    saveStudentProfile({ nickname: nickname.trim(), grade });
    window.location.assign("/test");
  }

  return (
    <PageShell>
      <div className="hero-card">
        <div className="onion-orbit">
          <span />
          <span />
          <span />
        </div>
        <Badge>ONION LEARNING TYPE</Badge>
        <h1>测测你是哪种「学习葱」</h1>
        <p className="subtitle">12 道题，看看你的学习人格和隐藏学习开关</p>
        <div className="form-grid">
          <label>
            昵称 <small>可选</small>
            <input value={nickname} onChange={(event) => setNickname(event.target.value)} placeholder="匿名也可以" />
          </label>
          <label>
            年级 <small>可选</small>
            <select value={grade} onChange={(event) => setGrade(event.target.value)}>
              {grades.map((item) => (
                <option key={item || "empty"} value={item}>
                  {item || "未填写"}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="agree">
          <input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} />
          我知道这个测试只是学习偏好小测试，不代表心理诊断
        </label>
        <button className="primary-button" disabled={!agreed} onClick={start}>
          开始测试
        </button>
        <Disclaimer />
      </div>
    </PageShell>
  );
}
