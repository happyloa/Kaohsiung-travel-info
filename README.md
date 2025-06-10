![](https://raw.githubusercontent.com/happyloa/Kaohsiung-travel-info/refs/heads/master/static/thumbnail.webp)

# 高雄市旅遊資訊網 (SvelteKit)

本專案將原始的 HTML/CSS/JS 版本重構為 [SvelteKit](https://kit.svelte.dev/) 並整合 [Tailwind CSS](https://tailwindcss.com/)。

## 使用技術

- SvelteKit (TypeScript)
- Tailwind CSS 4

## 開發環境

```bash
npm install
npm run dev
```

開啟 <http://localhost:5173> 便可預覽。

## 專案結構

- `src/lib/components`：元件 (選單、熱門按鈕、景點卡片)
- `src/routes`：頁面路由
- `static`：靜態資源，如 `favicon.webp`

## 部署

根目錄提供 `vercel.json`，已設定快取標頭，直接推送即可於 Vercel 部署。

## 參考

- [SvelteKit Docs](https://kit.svelte.dev/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
