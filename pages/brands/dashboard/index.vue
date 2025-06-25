<script setup lang="ts">
definePageMeta({
  layout: "light",

});

import type { BrandsDashMetrics, ICampaign, ResponseMessage, PaginatedAPIResponse,CollabHubCampaign } from "types";
import { getMetrics } from "../../../api/brand/campaign/campaign.brand";
import { useToast } from "../../../components/ui/toast/use-toast";


const scrollContainer = ref();
const isAtStart = ref(true);

const scrollRight = () => {
  scrollContainer.value.scrollBy({
    left: 200, // Adjust as needed
    behavior: 'smooth'
  });
};

const scrollLeft = () => {
  scrollContainer.value.scrollBy({
    left: -200, // Adjust as needed
    behavior: 'smooth'
  });
};

const active = ref(true)
const userStore = useUserStore();
const API_URL = useRuntimeConfig().public.API_URL;
const metric = ref<BrandsDashMetrics>();
const { toast } = useToast();
const getBrandCampaignStore = useGetBrandCampaignStore();
const campaigns = ref<ICampaign[]>([]);
const isPublished = ref(false);
const loading = ref(true);
const empty = ref(false);
const details = ref<CollabHubCampaign[]>([])
const headers = { Authorization: `Bearer ${userStore.accessToken}` };
// const getCampaigns = async () => {
//   try {
//     const { data } = await getBrandCampaignStore.getBrandCampaigns();
//     campaigns.value = data;
//     loading.value = false;

//     if (campaigns.value.length === 0) {
//       empty.value = true;
//     }
//   } catch (error: any) {
//     toast({ title: error.message });
//   }
// };

const getMetric = async () => {
  const accessToken = userStore.accessToken || "";
  try {
    const camp = await getMetrics({
      apiUrl: API_URL as string,
      accessToken,
    });
    metric.value = camp;
  } catch (error: any) {
    toast({ title: "error getting campaign" });
  }
};

const getCollaborationHub = async ()=> {
  loading.value = true
  
  try {
    const {data: { campaigns: {data, meta}}} = await $fetch<PaginatedAPIResponse<'campaigns', CollabHubCampaign >>(`${API_URL}/campaign/collaboration-hub/my-campaigns?is_published=1}`,
      {
      headers
    });
    details.value = data
    loading.value = false
    
  } catch (error: any) {
    console.error('Error fetching collaboration hub:', error);
    loading.value = false
    return null;
  }
};
watchEffect(async () => await getMetric());
watchEffect(async () => await getCollaborationHub());
</script>

<template>
  <div class="p-6">
    <div class=" flex items-center gap-1 pl-1 py-4">
      <p class="text-2xl text-nowrap font-bold"> Welcome, {{ userStore.userProfile?.firstName }}!</p>
    </div>
    <BrandsMetricSection :metric="metric" />
    <br />

    <Suspense>  
      <template #default >  
        <div v-if="empty" class="">
          <p>You currently have no created campaigns yet</p>
        </div>
        <BrandsCampaignSection v-else :campaigns="details" :loading="loading" :empty="empty" />
      </template>
      <template #fallback >
        <SkeletonsDashboardCard />
        <SkeletonsDashboardCard />
      </template>
    </Suspense>
  </div>
</template>


<style scoped>
  .my-scroll {
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .my-scroll::-webkit-scrollbar {
    display: none
  }
</style>