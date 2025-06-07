<script lang="ts">
  export let info: any;
</script>

<div class="w-full sm:w-1/2 lg:w-1/3 mb-3 p-2">
  <div class="rounded overflow-hidden shadow bg-white">
    <div
      class="p-3 pt-5 flex justify-between items-end bg-cover bg-center h-40"
      style="background-image:url({info.Picture1})"
    >
      <p class="m-0 mt-4 text-white drop-shadow">{info.Name}</p>
      <span class="bg-red-500 text-white px-2 py-1 rounded text-sm">{info.Zone}</span>
    </div>
    <div class="text-sm p-3 text-gray-800 space-y-2">
      <p><i class="fas fa-clock"></i> {info.Opentime}</p>
      <p><i class="fas fa-home"></i> {info.Add}</p>
      <p><i class="fas fa-phone-alt"></i> {info.Tel}</p>
    </div>
    {#if info.Ticketinfo === '免費參觀'}
      <div class="text-center text-blue-500 py-2">
        <i class="fas fa-tags"></i> 免費
      </div>
    {/if}
  </div>
</div>

