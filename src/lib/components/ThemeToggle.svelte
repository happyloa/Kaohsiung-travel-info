<script lang="ts">
  import { onMount } from 'svelte';
  let dark = false;

  onMount(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      dark = true;
    }
    updateTheme();
  });

  function updateTheme() {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  function toggle() {
    dark = !dark;
    updateTheme();
  }
</script>

<button
  class="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg dark:bg-blue-700"
  on:click={toggle}
  aria-label="Toggle theme"
>
  {#if dark}
    🌙
  {:else}
    ☀️
  {/if}
</button>

