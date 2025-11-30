<script lang="ts">
  // 所有區域名稱清單，作為下拉選單選項
  export let areas: string[] = [];
  // 目前選取的區域值
  export let selected: string = '';
  // 區域變更事件，父層會傳入 callback
  export let onChange: (value: string) => void;

  // 下拉選單值改變時觸發，並將選取結果回傳給父層
  function handleChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    onChange?.(target.value);
  }
</script>

<!-- 區域選擇下拉選單 -->
<label class="sr-only" for="area-select">選擇行政區域</label>
<select
  id="area-select"
  class="w-full mt-4 mb-5 rounded-lg border border-indigo-200 bg-white/80 p-2 text-slate-700 shadow-sm backdrop-blur-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
  on:change={handleChange}
  bind:value={selected}
>
  <option disabled selected value=""> - 請選擇一個區域 - </option>
  {#each areas as area}
    <option value={area}>{area}</option>
  {/each}
</select>

