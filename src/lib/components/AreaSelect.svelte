<script lang="ts">
  export let areas: string[] = [];
  export let selected: string = '';
  export let onChange: (value: string) => void;
  function handleChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    onChange?.(target.value);
  }
</script>

<select
  class="w-full mt-4 mb-5 border rounded p-2 bg-white/80 backdrop-blur text-gray-700"
  on:change={handleChange}
  bind:value={selected}
>
  <option disabled selected value=""> - 請選擇一個區域 - </option>
  {#each areas as area}
    <option value={area}>{area}</option>
  {/each}
</select>

