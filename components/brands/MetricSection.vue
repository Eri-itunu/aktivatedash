<script setup lang="ts">
    import type { Metrics } from "types";
    import { getMetrics } from "../../api/brand/campaign/campaign.brand"

    const userStore = useUserStore()
    const API_URL = useRuntimeConfig().public.API_URL
    const metric = ref<Metrics>()
    const toast = useToast()

    const getMetric = async ()=>{
        const accessToken = userStore.accessToken || ""
        try {
            const camp= await getMetrics({
                apiUrl: API_URL,
                accessToken,
            })
            
            metric.value = camp
            console.log(metric.value)

        } catch (error: any) {

            toast.add({ title: "error getting campaign"})
            console.log(error)
        }

    }

    onMounted(async() => await getMetric());

</script>


<template>
    <div class="flex">
        <div class="w-1/3">
            <BrandsCampaignSpend  :value = "metric?.totalActiveCampaignSpend  || '0' " />
        </div>
        <div class="w-1/3">
            <BrandsTotalCampaigns :value = "metric?.totalActiveCampaigns || '0' " />
        </div>
        <div class="w-1/3">
            <BrandsActiveCampaigns :value = "metric?.totalActiveCampaignsNow || '0'" />
        </div>
    </div>
</template>