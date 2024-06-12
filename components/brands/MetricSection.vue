<script setup lang="ts">
import type { BrandsDashMetrics } from "types";
const props = defineProps<{ metric: BrandsDashMetrics | undefined }>();
</script>

<template>
  <div class="flex w-full h-40">
    <div class="basis-1/3">
      <BrandsCampaignSpend :value="metric?.totalActiveCampaignSpend.toLocaleString() || '0'" />
    </div>
    <div class="basis-1/3">
      <BrandsTotalCampaigns :value="metric?.totalActiveCampaigns.toString() || '0'" />
    </div>
    <div class="basis-1/3">
      <BrandsActiveCampaigns :value="metric?.totalActiveCampaignsNow.toString() || '0'" />
    </div>
  </div>
</template>
