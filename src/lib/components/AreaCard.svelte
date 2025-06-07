<script lang="ts">
  export let info: any;
</script>

<div class="col-12 sm:col-6 lg:col-4 mb-3">
  <div class="card-place rounded overflow-hidden shadow bg-white">
    <div class="p-3 pt-5 flex justify-between items-end bg-cover bg-center" style="background-image:url({info.Picture1})">
      <p class="m-0 mt-4 text-white text-shadow">{info.Name}</p>
      <span class="badge bg-red-500 text-white">{info.Zone}</span>
    </div>
    <div class="text-sm p-3 text-gray-800">
      <p class="m-0 pb-2"><i class="fas fa-clock"></i> {info.Opentime}</p>
      <p class="m-0 pb-2"><i class="fas fa-home"></i> {info.Add}</p>
      <p class="m-0"><i class="fas fa-phone-alt"></i> {info.Tel}</p>
    </div>
    {#if info.Ticketinfo === '免費參觀'}
      <div class="bagde-free text-center text-blue-500"><i class="fas fa-tags"></i>免費</div>
    {/if}
  </div>
</div>
