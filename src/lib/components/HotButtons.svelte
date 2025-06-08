<script lang="ts">
  // 常用熱門區域
  export let hotAreas: string[] = [];
  // 點擊按鈕後回傳選擇的區域
  export let onSelect: (value: string) => void;
</script>

<!-- 熱門區域快速按鈕 -->
<nav
  class="max-w-3xl mx-auto my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2"
>
  {#each hotAreas as area}
    <button
      class="w-full sm:w-auto rounded-full px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white"
      on:click={() => onSelect?.(area)}
    >
      {area}
    </button>
  {/each}
</nav>
