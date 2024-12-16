<script setup lang="ts">
definePageMeta({
  layout: "light",
});
import type { CollabHubCampaign, PaginatedAPIResponse } from "@/types";
import { Plus } from "lucide-vue-next";


const config = useRuntimeConfig();
const loading = ref(false)
const API_URL = config.public.API_URL ;
const details = ref<CollabHubCampaign[]>([])
const userStore = useUserStore();

const getCollaborationHub = async ()=> {
  loading.value = true
  try {
    const res= await $fetch<PaginatedAPIResponse<'campaigns', CollabHubCampaign >>(`${API_URL}/campaign/collaboration-hub/my-campaigns`,
      {
      headers: { Authorization: `Bearer ${userStore.accessToken}`}
    });
    details.value = res.data.campaigns.data
    loading.value = false
    return res;
    
  } catch (error: any) {
    console.error('Error fetching collaboration hub:', error);
    loading.value = false
    return null;
  }
};

const openDetails = () => {
  navigateTo("collaborationHub/details");
};

watchEffect(async() => { await getCollaborationHub() })
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
      <div class="p-4 bg-[#F7F7F7 dark:bg-darkBlue flex justify-between w-full">
        <h1>Pending</h1>
        <h1>Last updated</h1>
      </div>

      <div v-for="detail in details" :key="detail.id" >
       
        <div
          @click="openDetails"
          class="cursor-pointer p-4 bg-white border-b dark:bg-vDarkBlue flex justify-between w-full"
        >
          <div>
            <h1>{{detail.headline}}</h1>
            <h2>{{detail.cost}}</h2>
          </div>
          <div class="flex items-center">{{detail.applicationCloseDate.split("T")[0]}}</div>
        </div>

  
      </div>
    </section>
  </div>
</template>
