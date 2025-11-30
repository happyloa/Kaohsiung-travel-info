<script lang="ts">
  // Svelte 生命週期
  import { onMount } from "svelte";
  // 自訂元件
  import AreaSelect from "$lib/components/AreaSelect.svelte";
  import HotButtons from "$lib/components/HotButtons.svelte";
  import AreaCard from "$lib/components/AreaCard.svelte";
  import LoadingSkeleton from "$lib/components/LoadingSkeleton.svelte";

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
  // 載入狀態與錯誤訊息
  let isLoading = true;
  let errorMessage: string | null = null;
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
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json"
      );
      if (!res.ok) {
        throw new Error("無法取得旅遊資訊，請稍後再試。");
      }
      const json = await res.json();
      data = json.result.records;
      areas = Array.from(new Set(data.map((d: Info) => d.Zone)));
      updateFiltered();
    } catch (error) {
      errorMessage =
        error instanceof Error ? error.message : "載入資料時發生未知錯誤。";
    } finally {
      isLoading = false;
    }
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
  class="relative overflow-hidden bg-[url('/bg.webp')] bg-cover bg-center p-8 sm:p-12 text-center text-white"
>
  <div class="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-indigo-900/60 to-slate-900/70"></div>
  <div class="relative mx-auto flex max-w-3xl flex-col items-center gap-3">
    <h1 class="text-shadow text-3xl sm:text-4xl font-bold tracking-wide">高雄市旅遊資訊網</h1>
    <p class="text-shadow text-2xl font-medium text-indigo-100">Kaohsiung City Travel Info</p>
    <AreaSelect {areas} {selected} onChange={handleSelect} />
  </div>
</header>
<!-- 主要內容 -->
<main class="container mx-auto pb-12">
  <div class="-mt-10 mx-2 rounded-3xl border border-indigo-100 bg-white/90 py-5 px-6 text-center shadow-lg backdrop-blur">
    <h2 class="mb-2 text-2xl font-semibold text-indigo-600">💯 熱門景點 💯</h2>
    <HotButtons {hotAreas} onSelect={handleSelect} />
  </div>
  <h3 class="my-6 text-center text-2xl font-bold text-slate-700">
    {selected || "全部景點"}
  </h3>
  {#if isLoading}
    <section class="my-12 space-y-5" role="status" aria-live="polite">
      <div class="text-center text-indigo-600">
        <p class="text-lg font-semibold">資料載入中，請稍候…</p>
        <p class="text-sm text-slate-500">正在取得高雄各區景點資訊</p>
      </div>
      <LoadingSkeleton />
      <span class="sr-only">載入中</span>
    </section>
  {:else if errorMessage}
    <p class="my-4 text-center text-xl font-semibold text-rose-500">{errorMessage}</p>
  {:else if pageItems.length > 0}
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each pageItems as item (item.Name)}
        <AreaCard info={item} />
      {/each}
    </ul>
    {#if totalPages > 1}
      <nav class="mt-8 flex justify-center" aria-label="景點分頁">
        <ul class="inline-flex items-stretch overflow-hidden rounded-full border border-indigo-200 bg-white shadow">
          <li>
            <button
              class="flex items-center gap-1 px-4 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50
                cursor-pointer disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed"
              on:click={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              type="button"
            >
              <span class="hidden sm:inline">上一頁</span>
              <span aria-hidden="true">«</span>
            </button>
          </li>
          {#each Array.from({ length: totalPages }) as _, index}
            {@const page = index + 1}
            <li>
              <button
                class={`px-4 py-2 text-sm font-semibold transition cursor-pointer focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-indigo-500 ${
                  page === currentPage
                    ? "bg-indigo-600 text-white shadow-inner"
                    : "text-indigo-600 hover:bg-indigo-50"
                }`}
                type="button"
                aria-current={page === currentPage ? "page" : undefined}
                on:click={() => goToPage(page)}
              >
                {page}
              </button>
            </li>
          {/each}
          <li>
            <button
              class="flex items-center gap-1 px-4 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50
                cursor-pointer disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed"
              on:click={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              type="button"
            >
              <span aria-hidden="true">»</span>
              <span class="hidden sm:inline">下一頁</span>
            </button>
          </li>
        </ul>
      </nav>
    {/if}
  {:else}
    <p class="my-4 text-center text-2xl text-slate-500">目前沒有任何景點</p>
  {/if}
</main>
