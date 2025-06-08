<script lang="ts">
  // 所有區域名稱
  export let areas: string[] = [];
  // 目前選取的區域
  export let selected: string = '';
  // 區域變更事件
  export let onChange: (value: string) => void;

  // 下拉選單值改變時觸發
  function handleChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    onChange?.(target.value);
  }
</script>

<!-- 區域選擇下拉選單 -->
<select
  class="w-full mt-4 mb-5 p-2 border rounded bg-white/80 backdrop-blur text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
  on:change={handleChange}
  bind:value={selected}
>
  <option disabled selected value=""> - 請選擇一個區域 - </option>
  {#each areas as area}
    <option value={area}>{area}</option>
  {/each}
</select>

