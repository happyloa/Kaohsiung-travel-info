<script lang="ts">
  // Svelte 生命週期
  import { onMount } from "svelte";
  // 自訂元件
  import AreaSelect from "$lib/components/AreaSelect.svelte";
  import HotButtons from "$lib/components/HotButtons.svelte";
  import AreaCard from "$lib/components/AreaCard.svelte";

  // 景點資訊型別
  interface Info {
    Name: string;
    Zone: string;
    Picture1: string;
    Opentime: string;
    Add: string;
    Tel: string;
    Ticketinfo: string;
  }

  // 從 API 取得的全部資料
  let data: Info[] = [];
  // 所有區域名稱
  let areas: string[] = [];
  // 目前選取的區域
  let selected = "";
  // 熱門區域列表
  const hotAreas = ["苓雅區", "三民區", "新興區", "鼓山區"];
  // 根據選擇篩出的資料
  let filtered: Info[] = [];

  // 初始化載入資料
  onMount(async () => {
    const res = await fetch(
      "https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json"
    );
    const json = await res.json();
    data = json.result.records;
    areas = Array.from(new Set(data.map((d: Info) => d.Zone)));
    updateFiltered();
  });

  // 依選取區域更新篩選結果
  function updateFiltered() {
    filtered = selected ? data.filter((d) => d.Zone === selected) : data;
  }

  // 處理區域選擇
  function handleSelect(area: string) {
    selected = area;
    updateFiltered();
  }
</script>

<!-- 頁面頂部 -->
<header
  class="bg-[url('/bg.webp')] bg-cover bg-center p-8 sm:p-12 text-center text-white"
>
  <h1 class="text-shadow text-3xl sm:text-4xl font-bold">高雄市旅遊資訊網</h1>
  <p class="text-shadow text-2xl">Kaohsiung City Travel Info</p>
  <AreaSelect {areas} {selected} onChange={handleSelect} />
</header>
<!-- 主要內容 -->
<main class="container mx-auto pb-8">
  <div
    class="-mt-10 mx-2 text-center rounded-3xl shadow bg-white/75 backdrop-blur py-4 px-6"
  >
    <h2 class="mb-2 text-2xl text-gray-500">💯 熱門景點 💯</h2>
    <HotButtons {hotAreas} onSelect={handleSelect} />
  </div>
  <h3 class="my-4 text-center text-2xl font-bold">
    {selected || "全部景點"}
  </h3>
  {#if filtered.length > 0}
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each filtered as item (item.Name)}
        <AreaCard info={item} />
      {/each}
    </ul>
  {:else}
    <p class="my-4 text-center text-2xl">目前沒有任何景點</p>
  {/if}
</main>
