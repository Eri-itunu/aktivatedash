
<script  >
import  collabs from "../../mock/collabs";


  definePageMeta({
  layout: 'dashboard'
})


</script>
 


<template>
  

  <div class="flex flex-wrap justify-center align-center gap-4">
    <CampaignCard />
    <CampaignCard />
    <CampaignCard />
    <CampaignCard />
    <CampaignCard />
  </div>

  <div class="flex items-center justify-center py-6">
    <UButton color="purple" variant="outline">Load More</UButton>
  </div>
</template>

