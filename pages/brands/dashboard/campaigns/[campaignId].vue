<script setup lang="ts">
import type { ICampaign, ICampaignRequest, ContentSubmissions } from "types";
import { getCampaign, getSingleCampaignRequest, getSingleCampaignMetrics, getCampaignPosts } from "@/api/brand/campaign/campaign.brand";
import { useToast } from "@/components/ui/toast/use-toast";

// Page Meta
definePageMeta({ layout: "light" });

// Constants
const TABS = [
  { id: 1, name: "Campaign Details" },
  { id: 2, name: "Content Review" },
  { id: 3, name: "Reporting" }
] as const;

const REVIEW_TABS = [
  { id: 1, name: "Review" },
  { id: 2, name: "Approved" },
  { id: 3, name: "Rejected" }
] as const;

// State
const route = useRoute();
const router = useRouter();
const { toast } = useToast();
const userStore = useUserStore();
const API_URL = useRuntimeConfig().public.API_URL;

const selectedTab = ref<string>(TABS[0].name);
const selectedReviewTab = ref<string>(REVIEW_TABS[0].name);
const loading = ref<boolean>(true);
const campaign = ref<ICampaign>();
const requests = ref<ICampaignRequest[]>([]);
const contents = ref<ContentSubmissions[]>([]);
const CampaignResults = ref();
const totalCampaignMetrics = ref();

// Computed
const { campaignId } = route.params;
const accessToken = userStore.accessToken || "";

const approvedContent = computed(() =>
  contents.value?.filter(content => content.campaignDecision === "accept") || []
);

const rejectedContent = computed(() =>
  contents.value?.filter(content => content.campaignDecision === "reject") || []
);

const pendingContent = computed(() =>
  contents.value?.filter(content => content.campaignDecision === "pending") || []
);

// Methods
const fetchContentSubmissions = async () => {
  loading.value = true;
  try {
    const res = await $fetch(`${API_URL}/submission/brand/my-submissions`, {
      params: { campaignId },
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    contents.value = res.data.submissions.data;
  } catch (error: any) {
    toast({
      title: error.data?.message || "Unable to retrieve content list"
    });
  } finally {
    loading.value = false;
  }
};

const fetchCampaignMetrics = async () => {
  try {
    const [metricsRes, postsRes] = await Promise.all([
      getSingleCampaignMetrics({ apiUrl: API_URL, accessToken, campaignId }),
      getCampaignPosts({ apiUrl: API_URL, accessToken, campaignID: campaignId })
    ]);

    totalCampaignMetrics.value = metricsRes;
    CampaignResults.value = postsRes.data;
  } catch (error: any) {
    toast({
      title: error.data?.message || "Error fetching campaign metrics"
    });
  }
};

const fetchCampaignDetails = async () => {
  loading.value = true;
  try {
    const [campaignData, requestsData] = await Promise.all([
      getCampaign({ apiUrl: API_URL, campaignId, accessToken }),
      getSingleCampaignRequest({ apiUrl: API_URL, campaignId, accessToken })
    ]);

    campaign.value = campaignData;
    requests.value = requestsData;
  } catch (error: any) {
    toast({ title: "Error fetching campaign details" });
    router.back();
  } finally {
    loading.value = false;
  }
};

// Lifecycle
onMounted(async () => {
  await fetchCampaignDetails();
  await Promise.all([
    fetchCampaignMetrics(),
    fetchContentSubmissions()
  ]);
});
</script>

<template>
  <div class="overflow-hidden max-w-[100%] flex flex-col gap-4 px-4">
    <!-- Back Navigation -->
    <nuxt-link
      to="/brands/dashboard/campaigns"
      class="mb-2 flex items-center gap-2 text-gray-600 hover:text-gray-900"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z" fill="currentColor"/>
      </svg>
      <span>Back</span>
    </nuxt-link>

    <!-- Main Tabs -->
    <section class="tab-section flex w-full border-b border-gray-200">
      <div
        v-for="tab in TABS"
        :key="tab.id"
        @click="selectedTab = tab.name"
        class="px-4 py-2 cursor-pointer text-sm transition-all"
        :class="[
          'flex-1 text-center max-w-fit',
          tab.name === selectedTab
            ? 'border-b-2 border-purple-500 text-purple-500 font-medium'
            : 'text-gray-500 hover:text-gray-700'
        ]"
      >
        {{ tab.name }}
      </div>
    </section>

    <!-- Campaign Details -->
    <BrandsCampaignDetails
      v-if="selectedTab === 'Campaign Details' && campaign"
      :requests="requests"
      :campaign="campaign"
      :loading="loading"
    />

    <!-- Content Review -->
    <div v-if="selectedTab === 'Content Review'" class="space-y-6">
      <!-- Review Tabs -->
      <section class="flex border-b border-gray-200 py-4">
        <div
          v-for="tab in REVIEW_TABS"
          :key="tab.id"
          @click="selectedReviewTab = tab.name"
          class="px-4 py-2 cursor-pointer text-sm transition-all"
          :class="[
            'flex-1 text-center max-w-fit',
            tab.name === selectedReviewTab
              ? 'border-b-2 border-purple-500 text-purple-500 font-medium'
              : 'text-gray-500 hover:text-gray-700'
          ]"
        >
          {{ tab.name }}
        </div>
      </section>

      <!-- Content Lists -->
      <div v-if="selectedReviewTab === 'Review'" class="space-y-4">
        <template v-if="pendingContent.length">
          <BrandsContentCard
            v-for="content in pendingContent"
            :key="content.id"
            :content="content"
          />
        </template>
        <p v-else class="text-center text-gray-500">No pending content for approval</p>
      </div>

      <div v-if="selectedReviewTab === 'Approved'" class="space-y-4">
        <template v-if="approvedContent.length">
          <BrandsContentCard
            v-for="content in approvedContent"
            :key="content.id"
            :content="content"
          />
        </template>
        <p v-else class="text-center text-gray-500">No approved content</p>
      </div>

      <div v-if="selectedReviewTab === 'Rejected'" class="space-y-4">
        <template v-if="rejectedContent.length">
          <BrandsContentCard
            v-for="content in rejectedContent"
            :key="content.id"
            :content="content"
          />
        </template>
        <p v-else class="text-center text-gray-500">No rejected content</p>
      </div>
    </div>

    <!-- Reporting -->
    <BrandsReporting
      v-if="selectedTab === 'Reporting' && campaign"
      class="py-12"
      :CampaignResults="CampaignResults"
      :totalCampaignMetrics="totalCampaignMetrics"
      :campaign="campaign"
      :campaignId="campaignId"
    />
  </div>
</template>
