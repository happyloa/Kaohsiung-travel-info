<script lang="ts">
  export let hotAreas: string[] = [];
  export let onSelect: (value: string) => void;
</script>

<div class="hotBtn flex flex-wrap justify-center gap-2 my-4">
  {#each hotAreas as area}
    <button class="btn rounded-full px-4 py-1 bg-blue-500 text-white" on:click={() => onSelect?.(area)}>
      {area}
    </button>
  {/each}
</div>
