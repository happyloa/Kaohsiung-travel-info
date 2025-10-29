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
  // 熱門區域列表，方便快速切換
  const hotAreas = ["苓雅區", "三民區", "新興區", "鼓山區"];
  // 根據選擇篩出的資料
  let filtered: Info[] = [];
  // 分頁設定：一頁顯示 12 張卡片
  const pageSize = 12;
  // 目前顯示的頁碼
  let currentPage = 1;
  // 目前頁面要顯示的卡片資料
  let pageItems: Info[] = [];
  // 全部頁數
  let totalPages = 0;

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
    currentPage = 1;
    updatePagination();
  }

  // 處理區域選擇
  function handleSelect(area: string) {
    selected = area;
    updateFiltered();
  }

  // 根據目前頁碼計算應顯示的資料與總頁數
  function updatePagination() {
    totalPages = Math.ceil(filtered.length / pageSize);
    const safePage = Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1));
    if (currentPage !== safePage) {
      currentPage = safePage;
    }
    const start = (safePage - 1) * pageSize;
    pageItems = filtered.slice(start, start + pageSize);
  }

  // 切換頁碼時觸發，並重新整理列表
  function goToPage(page: number) {
    currentPage = page;
    updatePagination();
  }

  // 當篩選結果改變時更新分頁內容
  $: updatePagination();
</script>

<!-- 頁面頂部 -->
<header
  class="bg-[url('/bg.webp')] bg-cover bg-center p-8 sm:p-12 text-center text-white dark:bg-gray-800/90"
>
  <h1 class="text-shadow text-3xl sm:text-4xl font-bold">高雄市旅遊資訊網</h1>
  <p class="text-shadow text-2xl">Kaohsiung City Travel Info</p>
  <AreaSelect {areas} {selected} onChange={handleSelect} />
</header>
<!-- 主要內容 -->
<main class="container mx-auto pb-8">
  <div
    class="-mt-10 mx-2 text-center rounded-3xl shadow bg-white/75 backdrop-blur py-4 px-6 dark:bg-gray-800/80"
  >
    <h2 class="mb-2 text-2xl text-gray-500 dark:text-gray-200">💯 熱門景點 💯</h2>
    <HotButtons {hotAreas} onSelect={handleSelect} />
  </div>
  <h3 class="my-4 text-center text-2xl font-bold">
    {selected || "全部景點"}
  </h3>
  {#if pageItems.length > 0}
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each pageItems as item (item.Name)}
        <AreaCard info={item} />
      {/each}
    </ul>
    {#if totalPages > 1}
      <nav class="mt-6 flex flex-wrap items-center justify-center gap-2">
        <button
          class="rounded-full border border-blue-600 px-3 py-1 text-sm text-blue-600 transition cursor-pointer hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-400 dark:hover:text-gray-900"
          on:click={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          上一頁
        </button>
        {#each Array.from({ length: totalPages }) as _, index}
          {@const page = index + 1}
          <button
            class={`rounded-full px-3 py-1 text-sm transition cursor-pointer ${
              page === currentPage
                ? "bg-blue-600 text-white dark:bg-blue-400 dark:text-gray-900"
                : "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-400 dark:hover:text-gray-900"
            }`}
            on:click={() => goToPage(page)}
          >
            {page}
          </button>
        {/each}
        <button
          class="rounded-full border border-blue-600 px-3 py-1 text-sm text-blue-600 transition cursor-pointer hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-400 dark:hover:text-gray-900"
          on:click={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          下一頁
        </button>
      </nav>
    {/if}
  {:else}
    <p class="my-4 text-center text-2xl dark:text-gray-200">目前沒有任何景點</p>
  {/if}
</main>
