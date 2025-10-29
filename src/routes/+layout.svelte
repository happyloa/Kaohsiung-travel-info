<script lang="ts">
  // 引入全域樣式，確保所有頁面共用 Tailwind 設定
  import "../app.css";

  // Svelte 生命週期，用來初始化主題設定
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  // 目前使用的主題（light 或 dark）
  let theme: "light" | "dark" = "light";
  // 是否已有使用者偏好（只要使用者按過切換或儲存過主題就視為 true）
  let hasStoredPreference = false;
  // 用來監聽系統主題變化的媒體查詢物件
  let mediaQuery: MediaQueryList | null = null;

  // 將主題套用到文件節點
  function updateDomTheme(next: "light" | "dark") {
    if (!browser) return;
    const root = document.documentElement;
    const isDark = next === "dark";
    root.classList.toggle("dark", isDark);
    document.body?.classList.toggle("dark", isDark);
  }

  // 安全地讀取 localStorage 中的主題設定
  function readStoredTheme(): "light" | "dark" | null {
    if (!browser) return null;
    try {
      const stored = localStorage.getItem("theme");
      return stored === "dark" || stored === "light" ? stored : null;
    } catch (error) {
      console.warn("無法讀取主題偏好：", error);
      return null;
    }
  }

  // 安全地寫入主題設定
  function persistTheme(next: "light" | "dark") {
    if (!browser) return;
    try {
      localStorage.setItem("theme", next);
    } catch (error) {
      console.warn("無法儲存主題偏好：", error);
    }
  }

  // 套用主題，並視情況儲存偏好
  function applyTheme(next: "light" | "dark", options: { persist?: boolean } = {}) {
    theme = next;
    updateDomTheme(next);
    if (options.persist ?? true) {
      persistTheme(next);
    }
  }

  // 主題切換事件處理：在深色與淺色之間切換
  function toggleTheme() {
    hasStoredPreference = true;
    applyTheme(theme === "dark" ? "light" : "dark");
  }

  // 當系統主題改變且使用者未指定偏好時，同步變更
  function handleSystemThemeChange(event: MediaQueryListEvent) {
    if (!hasStoredPreference) {
      applyTheme(event.matches ? "dark" : "light", { persist: false });
    }
  }

  // 元件掛載後，載入使用者偏好或系統偏好並套用主題
  onMount(() => {
    if (!browser) return;

    const stored = readStoredTheme();
    hasStoredPreference = stored !== null;

    mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const initialTheme = stored ?? (mediaQuery.matches ? "dark" : "light");
    applyTheme(initialTheme, { persist: hasStoredPreference });

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery?.removeEventListener("change", handleSystemThemeChange);
    };
  });
</script>

<svelte:head>
  <title>高雄市旅遊資訊網 | Kaohsiung City Travel Info</title>
  <meta name="description" content="提供高雄市各區景點資訊、開放時間、地址、電話及票價查詢，並可依區域篩選和瀏覽熱門景點。" />
</svelte:head>

<slot />

<!-- 右下角懸浮的主題切換按鈕 -->
<button
  class="fixed bottom-6 right-6 rounded-full bg-blue-600 px-4 py-3 text-white shadow-lg transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-300 cursor-pointer"
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
