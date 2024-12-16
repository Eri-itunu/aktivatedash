<script setup lang="ts">
definePageMeta({
  layout: "light",
});
import type { CollabHubCampaign, PaginatedAPIResponse } from "@/types";
import { Plus, ChevronRight, ChevronLeft } from "lucide-vue-next";


const config = useRuntimeConfig();
const loading = ref(false)
const API_URL = config.public.API_URL ;
const details = ref<CollabHubCampaign[]>([])
const userStore = useUserStore();
const currentPage = ref(1)
const page = ref<number>(1)
const firstPage = ref(0)
const lastPage = ref(0)

const getCollaborationHub = async (page:number)=> {
  loading.value = true
  try {
    const res = await $fetch<PaginatedAPIResponse<'campaigns', CollabHubCampaign >>(`${API_URL}/campaign/collaboration-hub/my-campaigns?page=${page}`,
      {
      headers: { Authorization: `Bearer ${userStore.accessToken}`}
    });
    details.value = res.data.campaigns.data
    currentPage.value = res.data.campaigns.meta.currentPage
    lastPage.value = res.data.campaigns.meta.lastPage
    firstPage.value = res.data.campaigns.meta.firstPage
    loading.value = false
    
  } catch (error: any) {
    console.error('Error fetching collaboration hub:', error);
    loading.value = false
    return null;
  }
};

const openDetails = (campaignID:string) => {
  navigateTo(`collaborationHub/${campaignID}`);
};

watchEffect(async() => { await getCollaborationHub(page.value) })
</script>

<template>
  <div class="text-black dark:text-white  px-8 flex flex-col gap-4 min-h-screen">
    <header>
      <h1 class="font-bold">My campaigns</h1>
      <p>
        Create a campaign and connect with creators who will deliver the content
        you need
      </p>
    </header>

    <div class="w-full flex gap-3">
      <input
        type="text"
        class="bg-white text-black dark:text-white  dark:bg-[#090618] border-[#F7F7F7} dark:border-[#1D192F] rounded-sm
         w-full focus:outline-none focus:ring p-2"
        placeholder="Search Campaigns"
      />
      <nuxt-link
        to="collaborationHub/campaign"
        class="flex gap-2 items-center bg-[#5D43CB] px-2 text-xs rounded-[8px] min-w-fit text-white"
      >
        <Plus />
        New Campaign
      </nuxt-link>
    </div>

    <section class="flex flex-col">
  <div class="p-4 bg-[#F7F7F7] dark:bg-darkBlue flex justify-between w-full">
    <h1>Pending</h1>
    <h1>Last updated</h1>
  </div>

  <!-- Loading State -->
  <template v-if="loading">
    <div v-for="i in 5" :key="i" class="animate-pulse p-4 bg-white border-b dark:bg-vDarkBlue flex justify-between w-full">
      <div>
        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-32"></div>
        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
      </div>
      <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
    </div>
  </template>

  <!-- Data State -->
  <template v-else>
    <div v-for="detail in details" :key="detail.id">
      <div
        @click="$router.push(`/brands/dashboard/collaborationHub/${detail.id}`)"
        class="cursor-pointer p-4 bg-white border-b dark:bg-vDarkBlue flex justify-between w-full"
      >
        <div>
          <h1>{{ detail.headline }}</h1>
          <h2>{{ detail.cost }}</h2>
        </div>
        <div class="flex items-center">{{ detail.applicationCloseDate.split("T")[0] }}</div>
      </div>
    </div>

    <div class="w-full flex items-center justify-center gap-2 mt-4" >
          <Button class="w-10 h-10 p-0" variant="outline" @click="page--" :disabled="page === firstPage">
            <ChevronLeft/>
          </Button>

          <Button class="w-10 h-10 p-0" :variant="page === page ? 'default' : 'outline'">
            {{currentPage}}
          </Button>

          <Button class="w-10 h-10 p-0" variant="outline" @click="page++" :disabled="page === lastPage" >
            <ChevronRight/>
          </Button>
          

          <!-- <Button class="w-10 h-10 p-0" variant="outline" @click="page = last_Page" :disabled="current_page = last_Page" >
            <ChevronsRight/>
          </Button> -->
    </div>
  </template>
</section>

  </div>
</template>
