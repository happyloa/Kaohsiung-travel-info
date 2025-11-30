<script lang="ts">
  export let count = 12;

  const placeholders = Array.from({ length: count });
</script>

<ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
  {#each placeholders as _, index (index)}
    <li class="rounded-xl bg-gradient-to-br from-indigo-50/70 via-white to-violet-50/60 p-0.5">
      <div class="flex h-full flex-col rounded-[1rem] border border-indigo-100/80 bg-white shadow-md">
        <div class="relative flex h-40 items-end overflow-hidden rounded-t-[1rem] bg-slate-200/80">
          <div class="absolute inset-0 animate-[shimmer_1.6s_infinite] bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.6)_50%,rgba(255,255,255,0)_100%)] bg-[length:200%_100%]"></div>
          <div class="relative z-10 flex w-full items-end justify-between gap-2 px-3 pb-3">
            <div class="h-4 w-2/3 rounded-full bg-slate-300/80"></div>
            <div class="h-6 w-16 rounded-full bg-slate-300/80"></div>
          </div>
        </div>
        <div class="space-y-3 border-t border-indigo-50 bg-white/90 p-4">
          <div class="h-4 w-3/4 rounded-full bg-slate-200"></div>
          <div class="h-4 w-5/6 rounded-full bg-slate-200"></div>
          <div class="h-4 w-1/2 rounded-full bg-slate-200"></div>
        </div>
      </div>
    </li>
  {/each}
</ul>

<style>
  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
</style>
