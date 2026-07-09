import { useMemo } from "react";
import { Badge, Disclaimer, PageShell } from "../components/Layout";
import { getLastResult, getPersonas } from "../lib/storage";
import type { PersonaCode } from "../types";

export function ResultPage() {
  const personas = getPersonas();
  const params = new URLSearchParams(window.location.search);
  const last = getLastResult();
  const code = (params.get("type") as PersonaCode | null) ?? last?.personaCode ?? "RUSH";
  const persona = personas[code] ?? personas.RUSH;
  const advice = useMemo(
    () => [
      { title: "学习超能力", text: persona.superPower },
      { title: "隐藏卡点", text: persona.hiddenBlock },
      { title: "学习开关", text: persona.learningSwitch },
      { title: "适合的洋葱学习方式", text: persona.onionMethod },
    ],
    [persona],
  );

  function downloadShareCard() {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200"><rect width="900" height="1200" rx="48" fill="#fff9e8"/><circle cx="760" cy="130" r="150" fill="#dff3b6"/><circle cx="120" cy="1060" r="190" fill="#f5d36d"/><text x="70" y="150" font-size="44" font-family="Arial" fill="#2f5f3a">${persona.code}</text><text x="70" y="245" font-size="72" font-family="Arial" fill="#203422">${persona.name}</text><text x="70" y="325" font-size="38" font-family="Arial" fill="#5f6f55">${persona.subtitle}</text><foreignObject x="70" y="410" width="760" height="380"><div xmlns="http://www.w3.org/1999/xhtml" style="font-size:34px;line-height:1.65;color:#304136;font-family:Arial">${persona.studentSummary}<br/><br/>${persona.shareText}</div></foreignObject><text x="70" y="1080" font-size="28" font-family="Arial" fill="#6b765f">洋葱圈学习人格测试</text></svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${persona.code}-share-card.svg`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <PageShell>
      <div className="result-hero">
        <img src={persona.image} alt={persona.name} />
        <Badge>{persona.code}</Badge>
        <h1>{persona.name}</h1>
        <p className="subtitle">{persona.subtitle}</p>
        <p>{persona.studentSummary}</p>
      </div>
      <div className="insight-grid">
        {advice.map((item) => (
          <article key={item.title} className="insight-card">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      <div className="share-card">
        <strong>分享文案</strong>
        <p>{persona.shareText}</p>
      </div>
      <div className="button-row">
        <button className="ghost-button" onClick={() => (window.location.pathname = "/")}>
          重新测试
        </button>
        <button className="primary-button compact" onClick={downloadShareCard}>
          保存图片 / 生成分享卡片
        </button>
        <button className="ghost-button" onClick={() => document.querySelector(".insight-grid")?.scrollIntoView({ behavior: "smooth" })}>
          查看我的学习建议
        </button>
      </div>
      <Disclaimer />
    </PageShell>
  );
}
