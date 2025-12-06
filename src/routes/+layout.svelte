<script lang="ts">
  // 全域樣式
  import "../app.css";

  import { onMount } from "svelte";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";

  type Theme = "light" | "dark";

  const STORAGE_KEY = "kaohsiung-travel-theme";
  let theme: Theme = "light";

  /**
   * 套用主題到 documentElement，並持久化設定。
   * 使用 Svelte 推薦的 onMount 觸發，避免在 SSR 階段觸碰瀏覽器 API。
   */
  const applyTheme = (value: Theme) => {
    theme = value;
    const root = document.documentElement;
    root.classList.toggle("dark", value === "dark");
    root.dataset.theme = value;
    localStorage.setItem(STORAGE_KEY, value);
  };

  const toggleTheme = () => applyTheme(theme === "light" ? "dark" : "light");

  onMount(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(stored ?? (prefersDark ? "dark" : "light"));
  });
</script>

<svelte:head>
  <title>高雄市旅遊資訊網 | Kaohsiung City Travel Info</title>
  <meta name="description" content="提供高雄市各區景點資訊、開放時間、地址、電話及票價查詢，並可依區域篩選和瀏覽熱門景點。" />
</svelte:head>

<div
  class="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-slate-50 text-slate-900 transition-colors duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 dark:text-slate-100"
>
  <slot />
  <ThemeToggle {theme} on:toggle={toggleTheme} />
</div>
