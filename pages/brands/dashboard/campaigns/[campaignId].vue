<script setup lang="ts">

//imports 
import type { ICampaign, ICampaignRequest, CampaignMetrics, APIResponse, IUserProfile } from "types";
import {
  getCampaign,
  getSingleCampaignRequest,
  getSingleCampaignMetrics,
} from "../../../../api/brand/campaign/campaign.brand";

import { useToast } from "../../../../components/ui/toast/use-toast";

definePageMeta({
  layout: "brands",
  colorMode: "dark",
});


//variable decalrations
const selectedTab = ref('Campaign Details');
const tabs = ref([
   { id: 1, tabs: 'Campaign Details',  },
   { id: 2, tabs: 'Content Review', },
   { id: 3, tabs: 'Reporting',  },
]);
const route = useRoute();
const router = useRouter();
const campaign = ref<ICampaign>();
const requests = ref<ICampaignRequest[]>([]);
const metrics = ref<CampaignMetrics>();
const createBrandCampaignStore = useCreateBrandCampaignStore();
const { toast } = useToast();
const userStore = useUserStore();
const API_URL = useRuntimeConfig().public.API_URL;
const loading = ref(true);
const brief = ref<string>("");
const isAccept = ref(false);
const {campaignId} = route.params;
const topCreators = ref<IUserProfile[]>([]);

//api calls
const SingleCampaignMetrics = async () => {
  const { campaignId } = route.params;
  const accessToken = userStore.accessToken || "";

  try {
    const res = await getSingleCampaignMetrics({
      apiUrl: API_URL,
      campaignId,
      accessToken,
    });

    metrics.value = res;
    loading.value = false;
  } catch (error: any) {
    loading.value = false;
    toast({ title: error.data?.message || "Something went wrong" });
  }
};

const Creators = async (campaignId) => {
  const accessToken = userStore.accessToken || "";
   
   try {
       const res = await $fetch<APIResponse<'profiles', IUserProfile[] >>(`${API_URL}/campaign/brand/${campaignId}/creators`, {
           headers: { Authorization: `Bearer ${accessToken}`}
       });
       topCreators.value = res.data.profiles


   } catch (error: any) {
       toast({ title: error.message });
   }
};

const SingleCampaign = async () => {
  const { campaignId } = route.params;
  const accessToken = userStore.accessToken || "";
  loading.value = true;
  try {
    const platform = await getSingleCampaignRequest({
      apiUrl: API_URL,
      campaignId,
      accessToken,
    });
    requests.value = platform;
    loading.value = false;
  } catch (error: any) {
    loading.value = false;
    toast({ title: error.data?.message || "Something went wrong" });
  }
};

const loadCampaign = async () => {
  const { campaignId } = route.params;
  const accessToken = userStore.accessToken || "";
  try {
    const camp = await getCampaign({
      apiUrl: API_URL,
      campaignId,
      accessToken,
    });

    campaign.value = camp;

    SingleCampaign();
    SingleCampaignMetrics();
    Creators(campaignId)
  } catch (error: any) {
    router.back();
    toast({ title: "error getting campaign" });
  }
};

const openBrief = (link: string) => {
  navigateTo(link, {
    open: {
      target: "_blank",
      windowFeatures: {
        width: 500,
        height: 500,
      },
    },
    external: true,
  });
};
onMounted(async () => await loadCampaign());
</script>

<template>
  <div class="overflow-hidden max-w-[100%] flex flex-col gap-4 px-4">
    <nuxt-link class="mb-2 flex" to="/brands/dashboard/campaigns">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z"
          fill="currentColor"
        />
      </svg>
      <p>Back</p>
    </nuxt-link>
    <!-- Tab switching section -->
    <!-- <section class="tab-section text-white flex w-full ">
        <div
            v-for="tab in tabs"
            :key="tab.id"
            :class="[
            ' basis-1/3 cursor-pointer text-center  p-4  flex max-w-fit text-sm' ,
            tab.tabs === selectedTab ? ' border-b-purple1 border-b-[2px] text-purple1' : 'border-b-[1px] border-b-[#D9D9D9]/50  text-[#D9D9D9]'
            ]"
            @click="selectedTab = tab.tabs"
        >
            {{ tab.tabs }}

        </div>
        <div class="   border-b-[#D9D9D9]/50  border-b-[1px] w-full" >

        </div>
    </section> -->

    <!--Campaign Details section-->
    <!-- <div v-if="selectedTab === 'Campaign Details'  && campaign" class="flex flex-col gap-2 max-w-full"> -->
      <BrandsCampaignDetails v-if="campaign" :requests="requests" :campaign="campaign" :loading="loading" />
    <!-- </div> -->

    <!--Content Review Section-->
    <!-- <div v-if="selectedTab === 'Content Review' " >
      <p>Hello</p>
    </div> -->

    <!--Reporting-->
    <!-- <div v-if="selectedTab === 'Reporting' && campaign" >
      <BrandsReporting  :campaign="campaign" :creators="topCreators" />
    </div> -->

  </div>
</template>
