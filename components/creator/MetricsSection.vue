<script setup lang="ts">
defineProps<{
  loading?: boolean;
}>();
</script>

<template>
  <div class="flex w-full gap-4">
    <template v-if="loading">
      <div v-for="i in 3" :key="i" class="basis-1/3">
        <CreatorLoadingMetricsCard />
      </div>
    </template>
    <template v-else>
      <div class="basis-1/3">
        <CreatorRevenueMetricsCard />
      </div>
      <div class="basis-1/3">
        <CreatorCampaignMetricsCard />
      </div>
      <div class="basis-1/3">
        <CreatorMentionsMetricsCard /> 
      </div>
    </template>
  </div>
</template>