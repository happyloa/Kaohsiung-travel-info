<script lang="ts">
  import { onMount } from "svelte";
  import AreaSelect from "$lib/components/AreaSelect.svelte";
  import HotButtons from "$lib/components/HotButtons.svelte";
  import AreaCard from "$lib/components/AreaCard.svelte";

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
  let selected = "";
  const hotAreas = ["苓雅區", "三民區", "新興區", "鼓山區"];
  let filtered: Info[] = [];

  onMount(async () => {
    const res = await fetch(
      "https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json"
    );
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

<header
  class="p-8 sm:p-12 text-center text-white bg-[url('/bg.webp')] bg-cover bg-center"
>
  <h1 class="text-shadow text-3xl sm:text-4xl font-bold">高雄市旅遊資訊網</h1>
  <p class="text-shadow text-2xl">Kaohsiung City Travel Info</p>
  <AreaSelect {areas} {selected} onChange={handleSelect} />
</header>
<main class="container mx-auto pb-8">
  <div
    class="-mt-10 bg-white/75 dark:bg-gray-800/75 backdrop-blur mx-2 shadow rounded-3xl text-center py-4 px-6"
  >
    <h2 class="text-gray-500 dark:text-gray-300 mb-2 text-2xl">💯 熱門景點 💯</h2>
    <HotButtons {hotAreas} onSelect={handleSelect} />
  </div>
  <h3 class="text-center my-4 text-2xl font-bold">
    {selected || "全部景點"}
  </h3>
  {#if filtered.length > 0}
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each filtered as item (item.Name)}
        <AreaCard info={item} />
      {/each}
    </ul>
  {:else}
    <p class="text-center my-4 text-2xl">目前沒有任何景點</p>
  {/if}
</main>
