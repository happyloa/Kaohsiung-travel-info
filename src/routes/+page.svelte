<script lang="ts">
  import { onMount } from 'svelte';
  import AreaSelect from '$lib/components/AreaSelect.svelte';
  import HotButtons from '$lib/components/HotButtons.svelte';
  import AreaCard from '$lib/components/AreaCard.svelte';

  interface Info {
    Name: string;
    Zone: string;
    Picture1: string;
    Opentime: string;
    Add: string;
    Tel: string;
    Ticketinfo: string;
  }

  let data: Info[] = [];
  let areas: string[] = [];
  let selected = '';
  const hotAreas = ['苓雅區', '三民區', '新興區', '鼓山區'];
  let filtered: Info[] = [];

  onMount(async () => {
    const res = await fetch('https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json');
    const json = await res.json();
    data = json.result.records;
    areas = Array.from(new Set(data.map((d: Info) => d.Zone)));
    updateFiltered();
  });

  function updateFiltered() {
    filtered = selected ? data.filter((d) => d.Zone === selected) : data;
  }

  function handleSelect(area: string) {
    selected = area;
    updateFiltered();
  }
</script>

<div class="p-5 bg-gray-700 text-center text-white">
  <h1 class="text-2xl font-bold">高雄市旅遊資訊網</h1>
  <p class="text-xl">Kaohsiung City Travel Info</p>
  <AreaSelect {areas} {selected} onChange={handleSelect} />
</div>
<div class="container mx-auto my-4">
  <div class="text-center text-gray-700">
    <p class="text-gray-500 mb-2">💯 熱門景點 💯</p>
    <HotButtons hotAreas={hotAreas} onSelect={handleSelect} />
  </div>
  <h3 class="text-info text-center mb-4">{selected || '全部景點'}</h3>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each filtered as item (item.Name)}
      <AreaCard info={item} />
    {/each}
  </div>
</div>