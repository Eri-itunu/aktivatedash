<script>


</script>


<template>
  <!-- Campaigns  -->
  <div class="">
    <div class="flex justify-between text-sm py-4 pr-3 text-grey1">
      <div class="flex gap-5 items-center">
        <p> Campaigns</p>
        <div>
          <button class="px-2 py-1 text-xs bg-[#3A3846] rounded-full">Active</button>
          <button class="px-2 py-1 text-xs rounded-full">Requests</button>
        </div>
      </div>
      <div class="flex gap-3">
        <p class="underline">See all</p>
        <div class="flex gap-2">
          <img class="object-contain" src="/assets/icons/arrow-circle-left.svg" alt="">
          <img class="object-contain" src="/assets/icons/arrow-circle-right.svg" alt="">
        </div>
      </div>
    </div>
    <div class="flex gap-3 overflow-hidden">
      <CampaignCard />
      <CampaignCard />
      <CampaignCard />
    </div>
  </div>
  <!-- END Campaigns -->
</template>