![](https://raw.githubusercontent.com/happyloa/Kaohsiung-travel-info/refs/heads/master/static/thumb.webp)

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

- 以 [Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-site/) 部署，`npm run build` 即可，由 `@sveltejs/adapter-auto` 自動切換為 Cloudflare 介面。
- 靜態快取標頭放在專案根目錄的 `_headers`，部署時會隨產物一併上傳到 Cloudflare Pages。

## 參考

- [SvelteKit Docs](https://kit.svelte.dev/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
