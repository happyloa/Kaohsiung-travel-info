<script lang="ts">
  import type { SpotInfo } from "$lib/types";

  // 傳入的景點資料，用於顯示景點卡片內容
  export let info: SpotInfo;
</script>

<!-- 單一景點卡片 -->
<li class="card-gradient" data-aos="fade-up">
  <article
    class="card-inner transition duration-200 hover:-translate-y-1 hover:shadow-xl"
    aria-labelledby="spot-{info.Name.replace(/\s+/g, '-')}"
  >
    <!-- 圖片區域 -->
    <header class="relative h-40 overflow-hidden rounded-t-[1rem]">
      <img
        src={info.Picture1}
        alt="{info.Name} - {info.Zone}景點照片"
        loading="lazy"
        class="h-full w-full object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-indigo-950/85 via-indigo-950/15 to-transparent"
      ></div>
      {#if info.Ticketinfo === "免費參觀"}
        <div
          class="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-medium text-white shadow"
        >
          <i class="fas fa-tags" aria-hidden="true"></i>
          <span>免費</span>
        </div>
      {/if}
      <div
        class="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-2 p-3 text-white"
      >
        <h3
          id="spot-{info.Name.replace(/\s+/g, '-')}"
          class="text-lg font-semibold leading-tight text-shadow drop-shadow-lg"
        >
          {info.Name}
        </h3>
        <span
          class="rounded-full bg-indigo-600/95 px-3 py-1 text-xs font-semibold text-white shadow-sm"
          >{info.Zone}</span
        >
      </div>
    </header>
    <!-- 營業資訊 -->
    <footer
      class="space-y-2 border-t border-indigo-100 bg-white/95 p-4 text-sm text-indigo-950 transition-colors dark:border-indigo-900/50 dark:bg-slate-900/95 dark:text-indigo-100"
    >
      <p class="info-row">
        <i class="fas fa-clock info-icon" aria-hidden="true"></i>
        <span>{info.Opentime || "未提供營業時間"}</span>
      </p>
      <p class="info-row">
        <i class="fas fa-map-marker-alt info-icon" aria-hidden="true"></i>
        <span>{info.Add || "未提供地址"}</span>
      </p>
      <p class="info-row">
        <i class="fas fa-phone-alt info-icon" aria-hidden="true"></i>
        <span>{info.Tel || "未提供電話"}</span>
      </p>
    </footer>
  </article>
</li>
