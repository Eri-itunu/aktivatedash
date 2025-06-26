<script setup lang="ts">
import { ref } from "vue";
import type { ICampaign } from "types";
import { getMyCampaigns } from "../../api/creator/campaign/campaign.creator";
const config = useRuntimeConfig();
import { useToast } from "../ui/toast/use-toast";

const API_URL = config.public.API_URL || "http://localhost:3333/api/v2";

const scrollContainer = ref();
const isAtStart = ref(true);
const { toast } = useToast();
const scrollRight = () => {
  scrollContainer.value.scrollBy({
    left: 200, // Adjust as needed
    behavior: "smooth",
  });
};

const scrollLeft = () => {
  scrollContainer.value.scrollBy({
    left: -200, // Adjust as needed
    behavior: "smooth",
  });
};

const loading = ref(false);

const requests = ref<ICampaign[]>([]);
const userStore = useUserStore();
const empty = ref(false);
const setLoading = () => {
  loading.value = false;
};
const getCampaignRequests = async () => {
     try {
    loading.value = true;
    const accessToken = userStore.accessToken || "";

    // Add error handling for missing token
    if (!accessToken) {
      throw new Error('Authentication required');
    }

    const response = await getMyCampaigns({
      apiUrl: API_URL as string,
      accessToken,
    });

    // Add type safety and error handling for response
    if (!response?.data) {
      throw new Error('Invalid response format');
    }

    requests.value = response.data;
    empty.value = response.data.length === 0;

    // Use more reliable loading state management
    loading.value = false;
  } catch (error: any) {
    loading.value = false;
    empty.value = true;
    toast({
      title: 'Error fetching campaigns',
      description: error.message || 'Something went wrong',
      variant: 'destructive'
    });
  }
};

watchEffect(async () => {
  await getCampaignRequests();
});
</script>

<template>
  <!-- Campaigns  -->
  <div class="">
    <div class="flex justify-between text-sm py-4 pr-3 text-grey1">
      <div class="flex gap-5 items-center">
        <p>Campaigns</p>
        <!-- <div>
          <button class="px-2 py-1 text-xs bg-[#3A3846] rounded-full">Active</button>
          <button class="px-2 py-1 text-xs rounded-full">Requests</button>
        </div> -->
      </div>
      <div class="flex gap-3">
        <nuxt-link to="/creator/dashboard/campaigns">
          <p class="underline">See all</p>
        </nuxt-link>
        <div class="flex gap-2">
          <!-- Active left -->
          <img
            @click="scrollLeft"
            class="object-contain rotate-180"
            src="/icons/arrow-circle-right.svg"
            alt=""
          />
          <!-- Active right -->
          <img
            @click="scrollRight"
            class="object-contain"
            src="/icons/arrow-circle-right.svg"
            alt=""
          />
        </div>
      </div>
    </div>
    <div v-if="empty" class="">
      <p>You currently have no request to join any campaign</p>
    </div>
    <div v-if="loading" class="flex gap-3 my-scroll">
      <CreatorLoadinCampaignCard />
      <CreatorLoadinCampaignCard />
    </div>
    <div v-else ref="scrollContainer" class="flex gap-3 w-full overflow-x-scroll">
      <div v-for="request in requests" :key="request.id">
        <CreatorCampaignCard :campaign="request" :loadingState="loading" />
      </div>
    </div>
  </div>
  <!-- END Campaigns -->
</template>

<style scoped>
.my-scroll {
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.my-scroll::-webkit-scrollbar {
  display: none;
}
</style>
