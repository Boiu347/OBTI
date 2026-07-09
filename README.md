# OBTI

洋葱圈学习人格测试 MVP。项目使用 Vite + React + TypeScript，本地 mock 数据和 localStorage 持久化，适合后续部署到 Render Static Site。

## Local Development

```bash
pnpm install --no-frozen-lockfile
pnpm dev
```

## Build

```bash
pnpm build
```

## Render

Render 可按仓库内 `render.yaml` 创建 Static Site：

- Build command: `pnpm install --no-frozen-lockfile && pnpm build`
- Publish directory: `dist`

## Admin Accounts

- Sales: `sales / onion123`
- Admin: `admin / admin123`
