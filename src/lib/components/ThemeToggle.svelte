<script lang="ts">
  import { createEventDispatcher } from "svelte";

  type Theme = "light" | "dark";
  export let theme: Theme = "light";

  const dispatch = createEventDispatcher();
  $: label = theme === "dark" ? "切換為淺色" : "切換為深色";
</script>

<button
  class="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300 dark:bg-indigo-500 dark:hover:bg-indigo-400 cursor-pointer"
  type="button"
  aria-pressed={theme === "dark"}
  aria-label={label}
  on:click={() => dispatch("toggle")}
>
  <span class="text-lg" aria-hidden="true">{theme === "dark" ? "☀️" : "🌙"}</span>
  <span class="hidden sm:inline">{theme === "dark" ? "淺色模式" : "深色模式"}</span>
</button>
