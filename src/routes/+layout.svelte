<script lang="ts">
  // 引入全域樣式，確保所有頁面共用 Tailwind 設定
  import "../app.css";

  // Svelte 生命週期，用來初始化主題設定
  import { onMount } from "svelte";

  // 目前使用的主題（light 或 dark）
  let theme: "light" | "dark" = "light";

  // 根據傳入的主題名稱套用到 <html> 節點，並記錄於 localStorage
  function applyTheme(next: "light" | "dark") {
    theme = next;
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  }

  // 主題切換事件處理：在深色與淺色之間切換
  function toggleTheme() {
    applyTheme(theme === "dark" ? "light" : "dark");
  }

  // 元件掛載後，載入使用者偏好或系統偏好並套用主題
  onMount(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      applyTheme(stored);
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  });
</script>

<svelte:head>
  <title>高雄市旅遊資訊網 | Kaohsiung City Travel Info</title>
  <meta name="description" content="提供高雄市各區景點資訊、開放時間、地址、電話及票價查詢，並可依區域篩選和瀏覽熱門景點。" />
</svelte:head>

<slot />

<!-- 右下角懸浮的主題切換按鈕 -->
<button
  class="fixed bottom-6 right-6 rounded-full bg-blue-600 px-4 py-3 text-white shadow-lg transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-300"
  type="button"
  on:click={toggleTheme}
  aria-label={`切換至${theme === "dark" ? "淺色" : "深色"}模式`}
>
  {#if theme === "dark"}
    ☀️
  {:else}
    🌙
  {/if}
</button>
