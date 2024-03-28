
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <div class="flex gap-3 pl-8">
    <CollabCard />
    <CollabCard />
    <CollabCard />
  </div>
  <br />
  <div class="flex gap-3 pl-8">
    <CampaignCard />
    <CampaignCard />
    <CampaignCard />
  </div>
</template>
