<script lang="ts">
  // 傳入的景點資料，用於顯示景點卡片內容
  export let info: any;
</script>

<!-- 單一景點卡片 -->
<li class="rounded-lg p-2">
  <article class="flex flex-col rounded-lg border border-transparent bg-white shadow transition dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
    <!-- 圖片與區域標籤 -->
    <header
      class="relative flex justify-between items-end h-40 p-3 rounded-lg bg-cover bg-center"
      style="background-image:url({info.Picture1})"
    >
      {#if info.Ticketinfo === "免費參觀"}
        <div
          class="absolute top-3 left-3 rounded bg-green-700 px-2 py-1 text-sm text-white"
        >
          <i class="fas fa-tags"></i> 免費
        </div>
      {/if}
      <p class="mt-4 text-white text-shadow">{info.Name}</p>
      <span
        class="rounded bg-red-700 px-2 py-1 text-sm text-white whitespace-nowrap"
        >{info.Zone}</span
      >
    </header>
    <!-- 營業資訊 -->
    <footer class="space-y-2 p-3 text-sm text-gray-800 dark:text-gray-100">
      <p><i class="fas fa-clock"></i> {info.Opentime}</p>
      <p><i class="fas fa-home"></i> {info.Add}</p>
      <p><i class="fas fa-phone-alt"></i> {info.Tel}</p>
    </footer>
  </article>
</li>
