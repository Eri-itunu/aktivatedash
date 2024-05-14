
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
const userStore = useUserStore()
</script>

<template>
  <div class="text-white pl-3">
    <!-- Hello Akin -->
    <div class="flex items-center gap-1 pl-1 py-4">
      <p class="text-lg text-nowrap"> Hello {{ userStore.userProfile?.first_name }}</p>
      <img class="object-contain h-6" src="/assets/icons/wink-emoji.svg" alt="">
    </div>
    <br />
    <!-- <CreatorMetricsSection /> -->
    <!-- END Hello Akin -->
    <br/>
    <br/>

    <!-- <CreatorCollabSection /> -->

    <br />

    <CreatorCampaignSection />

  </div>
</template>
