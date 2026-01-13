<script setup lang="ts">
import { ref } from "vue";
import type { Collaboration, ICampaign } from "types";
import { getMyCampaigns, getCollaborationHub, getMyCollaborationHubCampaigns } from "../../api/creator/campaign/campaign.creator";
const config = useRuntimeConfig();
import { useToast } from "../ui/toast/use-toast";
import AppEmptyState from "../components/shared/AppEmptyState.vue";
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
const requests = ref<Collaboration[]>([]);
const userStore = useUserStore();
const empty = ref(false);

// const getCampaigns = async () => {
//   try {
//     loading.value = true;
//     const response = await getCollaborationHub({
//       apiUrl: API_URL as string,
//       accessToken: userStore.accessToken as string || "",
//       qs:""
//     });
//     requests.value = response.data;
//     empty.value = requests.value.length === 0;
//   } catch (error: any) {
//     console.error("Failed to fetch campaigns", error);
//     toast({ title: "Error" });
//   } finally {
//     loading.value = false;
//   }
// };


const getApplications =async(privatePage: number = 1)=>{
  loading.value = true;
  const filter = {
    limit: "7",
    page: privatePage?.toString() || "1",
  };
  const qs = new URLSearchParams(filter);
  try {
    loading.value = true;
    const accessToken = userStore.accessToken || "";

    const {
      data,
      meta: { lastPage },
    } = await getMyCollaborationHubCampaigns({
      apiUrl: API_URL as string,
      accessToken,
      qs: qs.toString(),
    });

    requests.value = data;
    empty.value = requests.value.length === 0;
    loading.value = false;

  } catch (error: any) {
    loading.value = false;
    toast({ title: error.data?.message || "Something went wrong" });
  }

}

onMounted(() => {
  getApplications();
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
    <div v-if="empty" class="py-4">
      <AppEmptyState 
        title="No Campaign Requests" 
        description="You currently have no requests to join any campaign. Explore opportunities in the Collaboration Hub."
        actionLabel="Explore Campaigns"
        @action="$router.push('/creator/dashboard/campaigns')"
        icon=""
      />
    </div>
    <div v-if="loading" class="flex gap-4 my-scroll py-2">
      <CreatorLoadinCampaignCard v-for="i in 3" :key="i" />
    </div>
    <div v-else-if="requests.length > 0" ref="scrollContainer" class="flex gap-4 w-full overflow-x-scroll py-2">
      <div v-for="request in requests" :key="request.id">
        <CreatorCampaignCard :campaign="request.campaign" :loadingState="loading" />
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
