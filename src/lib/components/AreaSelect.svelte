<script lang="ts">
  import type { Writable } from 'svelte/store';
  export let areas: string[] = [];
  export let selected: string = '';
  export let onChange: (value: string) => void;
  function handleChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    onChange?.(target.value);
  }
</script>

<select class="areaList custom-select bg-opacity mt-4 mb-5" on:change={handleChange} bind:value={selected}>
  <option disabled selected value=""> - 請選擇一個區域 - </option>
  {#each areas as area}
    <option value={area}>{area}</option>
  {/each}
</select>