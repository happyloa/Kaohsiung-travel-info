<script lang="ts">
  // 常用熱門區域，供使用者快速切換
  export let hotAreas: string[] = [];
  // 點擊按鈕後回傳選擇的區域
  export let onSelect: (value: string) => void;
</script>

<!-- 熱門區域快速按鈕 -->
<nav
  class="mx-auto my-4 grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4"
>
  {#each hotAreas as area}
    <button
      class="w-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-medium text-white shadow transition hover:from-indigo-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 focus:ring-offset-white"
      on:click={() => onSelect?.(area)}
      data-aos="zoom-in"
      data-aos-delay={100 * (hotAreas.indexOf(area) + 1)}
    >
      {area}
    </button>
  {/each}
</nav>
