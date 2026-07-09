import type { ReactNode } from "react";

export function PageShell({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <main className="app-shell">
      <div className="bg-ring ring-a" />
      <div className="bg-ring ring-b" />
      <section className={wide ? "page page-wide" : "page"}>{children}</section>
    </main>
  );
}

export function Disclaimer() {
  return (
    <p className="disclaimer">
      本测试仅用于了解学生的学习偏好和学习状态，不代表心理诊断、能力评估或固定人格标签。
    </p>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return <span className="badge">{children}</span>;
}
