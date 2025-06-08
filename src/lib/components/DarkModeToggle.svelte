<script lang="ts">
  import { isDark } from '../stores/theme';
  const toggle = () => {
    isDark.update(v => !v);
  };
</script>

<button
  class="fixed bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800 shadow-lg"
  on:click={toggle}
  aria-label="Toggle color scheme"
>
  {#if $isDark}
    <i class="fas fa-sun"></i>
  {:else}
    <i class="fas fa-moon"></i>
  {/if}
</button>
