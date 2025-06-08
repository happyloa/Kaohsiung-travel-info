<script lang="ts">
  export let hotAreas: string[] = [];
  export let onSelect: (value: string) => void;
</script>

<div class="flex flex-wrap justify-center gap-2 my-4">
  {#each hotAreas as area}
    <button
      class="rounded-full px-4 py-1 bg-blue-500 text-white hover:bg-blue-600 w-full sm:w-auto"
      on:click={() => onSelect?.(area)}
    >
      {area}
    </button>
  {/each}
</div>

