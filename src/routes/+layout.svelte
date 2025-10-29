<script lang="ts">
  // 引入全域樣式，確保所有頁面共用 Tailwind 設定
  import "../app.css";
</script>

<svelte:head>
  <title>高雄市旅遊資訊網 | Kaohsiung City Travel Info</title>
  <meta name="description" content="提供高雄市各區景點資訊、開放時間、地址、電話及票價查詢，並可依區域篩選和瀏覽熱門景點。" />
</svelte:head>

<slot />
