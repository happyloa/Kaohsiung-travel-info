<script lang="ts">
  export let info: any;
</script>

<li class="p-2 rounded-lg">
  <article class="shadow rounded-lg bg-white dark:bg-gray-800 flex flex-col">
    <header
      class="relative rounded-lg p-3 flex justify-between items-end bg-cover bg-center h-40"
      style="background-image:url({info.Picture1})"
    >
      {#if info.Ticketinfo === "免費參觀"}
        <div
          class="absolute top-3 left-3 rounded text-sm text-white bg-green-600 px-2 py-1"
        >
          <i class="fas fa-tags"></i> 免費
        </div>
      {/if}
      <p class="mt-4 text-white text-shadow">{info.Name}</p>
      <span
        class="bg-red-500 text-white whitespace-nowrap px-2 py-1 rounded text-sm"
        >{info.Zone}</span
      >
    </header>
    <footer class="text-sm p-3 text-gray-800 dark:text-gray-200 space-y-2">
      <p><i class="fas fa-clock"></i> {info.Opentime}</p>
      <p><i class="fas fa-home"></i> {info.Add}</p>
      <p><i class="fas fa-phone-alt"></i> {info.Tel}</p>
    </footer>
  </article>
</li>
