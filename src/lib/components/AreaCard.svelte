<script lang="ts">
  // 傳入的景點資料，用於顯示景點卡片內容
  export let info: any;
</script>

<!-- 單一景點卡片 -->
<li class="card-gradient">
  <article
    class="card-inner transition duration-200 hover:-translate-y-1 hover:shadow-xl"
  >
    <!-- 圖片與區域標籤 -->
    <header
      class="relative flex h-40 items-end justify-between overflow-hidden rounded-t-[1rem] bg-cover bg-center p-3"
      style="background-image:url({info.Picture1})"
    >
      <div
        class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent"
      ></div>
      {#if info.Ticketinfo === "免費參觀"}
        <div
          class="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-medium text-white shadow"
        >
          <i class="fas fa-tags"></i>
          免費
        </div>
      {/if}
      <div
        class="relative z-10 flex w-full items-end justify-between gap-2 text-white"
      >
        <p
          class="text-lg font-semibold leading-tight text-shadow drop-shadow-lg"
        >
          {info.Name}
        </p>
        <span
          class="rounded-full bg-indigo-500/90 px-3 py-1 text-xs font-semibold text-white"
          >{info.Zone}</span
        >
      </div>
    </header>
    <!-- 營業資訊 -->
    <footer
      class="space-y-2 border-t border-indigo-50 bg-white/90 p-4 text-sm text-slate-700 transition-colors dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-300"
    >
      <p class="info-row">
        <i class="fas fa-clock info-icon"></i>
        <span>{info.Opentime}</span>
      </p>
      <p class="info-row">
        <i class="fas fa-home info-icon"></i>
        <span>{info.Add}</span>
      </p>
      <p class="info-row">
        <i class="fas fa-phone-alt info-icon"></i>
        <span>{info.Tel}</span>
      </p>
    </footer>
  </article>
</li>
