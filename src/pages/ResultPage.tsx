import { useMemo } from "react";
import { Badge, Disclaimer, PageShell } from "../components/Layout";
import { getLastResult, getPersonas } from "../lib/storage";
import type { PersonaCode } from "../types";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

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
    const name = escapeXml(persona.name);
    const subtitle = escapeXml(persona.subtitle);
    const summary = escapeXml(persona.studentSummary);
    const shareText = escapeXml(persona.shareText);
    const method = escapeXml(persona.onionMethod);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#EAF7FF"/>
          <stop offset="0.55" stop-color="#F5FBFF"/>
          <stop offset="1" stop-color="#FFFFFF"/>
        </linearGradient>
        <linearGradient id="blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#19B8FF"/>
          <stop offset="1" stop-color="#0578FF"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="24" stdDeviation="24" flood-color="#006EDC" flood-opacity="0.16"/>
        </filter>
      </defs>
      <rect width="900" height="1200" rx="64" fill="url(#bg)"/>
      <circle cx="760" cy="150" r="190" fill="#D9F2FF" opacity="0.78"/>
      <circle cx="105" cy="990" r="230" fill="#EAF6FF" opacity="0.9"/>
      <path d="M0 300 C210 250 290 365 455 325 C625 282 690 176 900 210 L900 0 L0 0Z" fill="#D7F0FF" opacity="0.72"/>

      <g transform="translate(70 66)">
        <g transform="translate(0 0)">
          <path d="M32 12c20 9 32 27 32 48 0 26-18 45-43 45S-22 86-22 60C-22 39-10 21 10 12c3-1 19-1 22 0z" transform="translate(36 24) scale(.46)" fill="url(#blue)"/>
          <circle cx="30" cy="51" r="4" fill="#47270F"/>
          <circle cx="51" cy="51" r="4" fill="#47270F"/>
        </g>
        <text x="72" y="44" font-size="34" font-family="PingFang SC, Microsoft YaHei, Arial" font-weight="900" fill="#15233B">洋葱学园</text>
        <text x="72" y="76" font-size="19" font-family="PingFang SC, Microsoft YaHei, Arial" fill="#5986A8">洋葱圈学习人格测试</text>
      </g>

      <g filter="url(#shadow)">
        <rect x="70" y="180" width="760" height="830" rx="44" fill="#FFFFFF"/>
      </g>
      <g transform="translate(0 0)">
        <path d="M180 272 C245 210 348 220 407 294 C460 210 576 207 637 278 C693 343 672 454 585 511 C515 557 405 562 326 520 C224 466 128 363 180 272Z" fill="#E7F6FF"/>
        <path d="M278 260c100 43 162 130 162 242 0 124-73 209-171 209S98 626 98 502c0-112 62-199 162-242 5-2 13-2 18 0z" transform="translate(220 14)" fill="url(#blue)"/>
        <path d="M473 295 C507 276 553 280 582 311 C614 345 608 398 574 428" fill="none" stroke="#0B73DE" stroke-width="30" stroke-linecap="round" opacity=".7"/>
        <circle cx="429" cy="481" r="34" fill="#fff"/>
        <circle cx="546" cy="481" r="34" fill="#fff"/>
        <circle cx="439" cy="488" r="18" fill="#48280F"/>
        <circle cx="556" cy="488" r="18" fill="#48280F"/>
        <circle cx="445" cy="480" r="6" fill="#fff"/>
        <circle cx="562" cy="480" r="6" fill="#fff"/>
        <path d="M445 575 C475 600 518 600 551 575" fill="none" stroke="#0B62C7" stroke-width="14" stroke-linecap="round"/>
      </g>

      <text x="450" y="710" text-anchor="middle" font-size="32" font-family="PingFang SC, Microsoft YaHei, Arial" font-weight="800" fill="#0578FF">${persona.code}</text>
      <text x="450" y="790" text-anchor="middle" font-size="78" font-family="PingFang SC, Microsoft YaHei, Arial" font-weight="900" fill="#15233B">${name}</text>
      <text x="450" y="846" text-anchor="middle" font-size="31" font-family="PingFang SC, Microsoft YaHei, Arial" font-weight="700" fill="#547895">${subtitle}</text>
      <foreignObject x="132" y="895" width="636" height="165">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:27px;line-height:1.55;color:#344A5E;font-family:PingFang SC,Microsoft YaHei,Arial;text-align:center;font-weight:650;">${summary}</div>
      </foreignObject>
      <rect x="120" y="1040" width="660" height="86" rx="28" fill="#EAF7FF"/>
      <foreignObject x="152" y="1057" width="596" height="56">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:22px;line-height:1.35;color:#2D6FAE;font-family:PingFang SC,Microsoft YaHei,Arial;text-align:center;font-weight:700;">${method}</div>
      </foreignObject>
      <text x="450" y="1160" text-anchor="middle" font-size="20" font-family="PingFang SC, Microsoft YaHei, Arial" fill="#7EA5C4">${shareText}</text>
    </svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${persona.code}-onion-result-card.svg`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <PageShell>
      <div className="result-hero result-hero-onion">
        <div className="result-brand">洋葱学园 · 洋葱圈学习人格</div>
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
      <div className="share-card share-card-onion">
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
