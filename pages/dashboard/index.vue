
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <div class="text-white">
    <!-- Hello Akin -->
    <div>
      <div class="flex items-center gap-1 pl-1 py-4">
        <p class="text-lg text-nowrap"> Hello Akin</p>
        <img class="object-contain h-6" src="/assets/icons/wink-emoji.svg" alt="">
      </div>
      <MetricSection />
    </div>
    <!-- END Hello Akin -->
    <br />

    <CollabSection />

    <br />

    <CampaignSection />

  </div>
</template>
