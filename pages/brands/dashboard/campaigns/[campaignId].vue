<script setup lang="ts">
//imports
import type {
  ICampaign,
  ICampaignRequest,
  CampaignMetrics,
  APIResponse,
  IUserProfile,
  PaginatedAPIResponse,
  ContentSubmissions,
} from "types";
import {
  getCampaign,
  getSingleCampaignRequest,
  getSingleCampaignMetrics,
  getCampaignPosts,
} from "../../../../api/brand/campaign/campaign.brand";

import { useToast } from "../../../../components/ui/toast/use-toast";

definePageMeta({
  layout: "light",

});

//variable decalrations
const selectedTab = ref("Campaign Details");
const tabs = ref([
  { id: 1, tabs: "Campaign Details" },
  { id: 2, tabs: "Content Review" },
  { id: 3, tabs: "Reporting" },
]);
const selectedReviewTab = ref("Review");
const reviewTabs = ref([
  { id: 1, tabs: "Review" },
  { id: 2, tabs: "Approved" },
  { id: 3, tabs: "Rejected" },
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
const { campaignId } = route.params;
const topCreators = ref<IUserProfile[]>([]);
const accessToken = userStore.accessToken || "";
const CampaignResults = ref();
const totalCampaignMetrics = ref();
const contents = ref<ContentSubmissions[]>([]);
const empty = ref(false);
const approvedContent = ref<ContentSubmissions[]>([]);
const rejectedContent = ref<ContentSubmissions[]>([]);
const pendingContent = ref<ContentSubmissions[]>([]);
//api calls
// const SingleCampaignMetrics = async () => {
//   const { campaignId } = route.params;

//   try {
//     const res = await getSingleCampaignMetrics({
//       apiUrl: API_URL,
//       campaignId,
//       accessToken,
//     });

//     metrics.value = res;
//     loading.value = false;
//   } catch (error: any) {
//     loading.value = false;
//     toast({ title: error.data?.message || "Something went wrong" });
//   }
// };

const ContentSubmissions = async () => {
  loading.value = true;
  const apiUrl = API_URL;
  try {
    const res = await $fetch<
      PaginatedAPIResponse<"submissions", ContentSubmissions>
    >(`${apiUrl}/submission/brand/my-submissions?${campaignId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    contents.value = res.data.submissions.data;
    loading.value = false;
    approvedContent.value = contents.value.filter(
      (element) => element.campaignDecision === "accept"
    );
    rejectedContent.value = contents.value.filter(
      (element) => element.campaignDecision === "reject"
    );
    pendingContent.value = contents.value.filter(
      (element) => element.campaignDecision === "pending"
    );
  } catch (error: any) {
    toast({
      title:
        error.data?.messsage ||
        "Unable to retrieve content list. Try again later",
    });
  }
};

const totalMaterics = async () => {
  try {
    const res = await getSingleCampaignMetrics({
      apiUrl: API_URL,
      accessToken,
      campaignId: campaignId,
    });
    totalCampaignMetrics.value = res;
  } catch (error: any) {
    toast({ title: error.data?.message || "Something went wrong" });
  }
};

const getCampaignMetrics = async () => {
  try {
    const {
      data
    } = await getCampaignPosts({
      apiUrl: API_URL,
      accessToken,
      campaignID: campaignId,
    });
    CampaignResults.value = data;
  } catch (error: any) {
    toast({ title: error || "Something went wrong WITH CAMPAIGN METRICS" });
  }
};

// const Creators = async (campaignId) => {
//   const accessToken = userStore.accessToken || "";

//    try {
//        const res = await $fetch<APIResponse<'profiles', IUserProfile[] >>(`${API_URL}/campaign/brand/${campaignId}/creators`, {
//            headers: { Authorization: `Bearer ${accessToken}`}
//        });
//        topCreators.value = res.data.profiles

//    } catch (error: any) {
//        toast({ title: error.message });
//    }
// };

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
    toast({ title: error.data?.message || "Something went wrong WITH SINGLE CAMPAIGN METRICS" });
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
    getCampaignMetrics();
    ContentSubmissions();
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
    <section class="tab-section text-white flex w-full">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        :class="[
          ' basis-1/3 cursor-pointer text-center  p-4  flex max-w-fit text-sm',
          tab.tabs === selectedTab
            ? ' border-b-purple1 border-b-[2px] text-purple1'
            : 'border-b-[1px] border-b-[#D9D9D9]/50  text-black dark:text-[#D9D9D9]',
        ]"
        @click="selectedTab = tab.tabs"
      >
        {{ tab.tabs }}
      </div>
      <div class="border-b-[#D9D9D9]/50 border-b-[1px] w-full"></div>
    </section>

    <!--Campaign Details section-->
    <div
      v-if="selectedTab === 'Campaign Details' && campaign"
      class="flex flex-col gap-2 max-w-full"
    >
      <BrandsCampaignDetails
        v-if="campaign"
        :requests="requests"
        :campaign="campaign"
        :loading="loading"
      />
    </div>

    <!--Content Review Section-->
    <div v-if="selectedTab === 'Content Review'">
      <!--Tab swithcing section for content review-->
      <section class="tab-section text-white flex w-full py-8">
        <div
          v-for="tab in reviewTabs"
          :key="tab.id"
          :class="[
            ' basis-1/3 cursor-pointer text-center  p-4  flex max-w-fit text-sm',
            tab.tabs === selectedReviewTab
              ? ' border-b-purple1 border-b-[2px] text-purple1'
              : 'border-b-[1px] border-b-[#D9D9D9]/50  text-[#D9D9D9]',
          ]"
          @click="selectedReviewTab = tab.tabs"
        >
          {{ tab.tabs }}
        </div>
        <div class="border-b-[#D9D9D9]/50 border-b-[1px] w-full"></div>
      </section>

      <div v-if="selectedReviewTab === 'Review'">
        <div
          v-if="pendingContent.length > 0"
          v-for="content in pendingContent"
          :key="content.id"
        >
          <BrandsContentCard :content="content" />
        </div>
        <div v-else>
          <p class="text-center">No pending content for approval</p>
        </div>
      </div>

      <div v-if="selectedReviewTab === 'Rejected'">
        <div
          v-if="rejectedContent.length > 0"
          v-for="content in rejectedContent"
          :key="content.id"
        >
          <BrandsContentCard :content="content" />
        </div>
        <div v-else>
          <p class="text-center">No content rejected</p>
        </div>
      </div>

      <div v-if="selectedReviewTab === 'Approved'">
        <div
          v-if="approvedContent.length > 0"
          v-for="content in approvedContent"
          :key="content.id"
        >
          <BrandsContentCard :content="content" />
        </div>
        <div v-else>No content approved</div>
      </div>
    </div>

    <!--Reporting-->
    <div v-if="selectedTab === 'Reporting' && campaign" class="py-12">
      <BrandsReporting
        :CampaignResults="CampaignResults"
        :totalCampaignMetrics="totalCampaignMetrics"
        :campaign="campaign"
      />
    </div>
  </div>
</template>
