
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
const userStore = useUserStore()
const name = userStore.userProfile?.first_name
</script>

<template>
  <div class="text-white">
    <!-- Hello Akin -->
    <div>
      <div class="flex items-center gap-1 pl-1 py-4">
        <p class="text-lg text-nowrap"> Hello {{ name || '' }}</p>

        <img class="object-contain h-6" src="/assets/icons/wink-emoji.svg" alt="">
      </div>
      <DashboardMetricsSection />
    </div>
    <!-- END Hello Akin -->
    <br />

    <DashboardCollabSection />

    <br />

    <DashboardCampaignSection />

  </div>
</template>
