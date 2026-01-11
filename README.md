![](https://raw.githubusercontent.com/happyloa/Kaohsiung-travel-info/refs/heads/master/static/thumb.webp)

# 高雄市旅遊資訊網 (SvelteKit)

本專案將原始的 HTML/CSS/JS 版本重構為 [SvelteKit](https://svelte.dev/) 並整合 [Tailwind CSS](https://tailwindcss.com/)。

## 功能特色

- 🌙 **深淺色模式**：支援一鍵切換淺色/深色主題，偏好設定會自動儲存
- 🔍 **區域篩選**：可依行政區篩選高雄各區景點
- ⚡ **熱門景點快速按鈕**：快速查看苓雅、三民、新興、鼓山等熱門區域
- 📄 **分頁瀏覽**：景點以分頁方式呈現，每頁顯示 12 筆

## 使用技術

- [SvelteKit](https://svelte.dev/) 2.x (Svelte 5)
- [Tailwind CSS](https://tailwindcss.com/) 4.x
- [Vite](https://vite.dev/) 7.x
- TypeScript

## 開發環境

```bash
npm install
npm run dev
```

開啟 <http://localhost:5173> 便可預覽。

## 專案結構

```
src/
├── app.css                 # 全域樣式與 Tailwind CSS 設定
├── app.html                # HTML 模板
├── hooks.server.ts         # 安全標頭設定
├── lib/
│   └── components/         # 元件
│       ├── AreaCard.svelte       # 景點卡片
│       ├── AreaSelect.svelte     # 區域下拉選單
│       ├── HotButtons.svelte     # 熱門區域按鈕
│       ├── LoadingSkeleton.svelte # 載入骨架
│       └── ThemeToggle.svelte    # 深淺色模式切換
└── routes/
    ├── +layout.svelte      # 全域佈局
    └── +page.svelte        # 主頁面
static/                      # 靜態資源
```

## 部署

- 以 [Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-site/) 部署，`npm run build` 即可，由 `@sveltejs/adapter-auto` 自動切換為 Cloudflare 介面。
- 靜態快取標頭放在專案根目錄的 `_headers`，部署時會隨產物一併上傳到 Cloudflare Pages。

## 參考

- [SvelteKit Docs](https://svelte.dev/docs/kit)
- [Svelte 5 Docs](https://svelte.dev/docs/svelte)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
