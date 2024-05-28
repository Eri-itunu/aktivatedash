<script setup lang="ts">

    import type { BrandsDashMetrics } from "types";
    const props = defineProps<{ metric: BrandsDashMetrics }>();
     
    


</script>


<template>
    <div class="flex w-full">
        <div class="basis-1/3">
            <BrandsCampaignSpend  :value = "metric?.totalActiveCampaignSpend  || '0' " />
        </div>
        <div class="basis-1/3">
            <BrandsTotalCampaigns :value = "metric?.totalActiveCampaigns || '0' " />
        </div>
        <div class="basis-1/3">
            <BrandsActiveCampaigns :value = "metric?.totalActiveCampaignsNow || '0'" />
        </div>
    </div>
</template>