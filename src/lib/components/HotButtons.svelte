<script lang="ts">
  export let hotAreas: string[] = [];
  export let onSelect: (value: string) => void;
</script>

<nav
  class="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 my-4"
>
  {#each hotAreas as area}
    <button
      class="rounded-full px-4 py-1 bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 w-full sm:w-auto"
      on:click={() => onSelect?.(area)}
    >
      {area}
    </button>
  {/each}
</nav>
