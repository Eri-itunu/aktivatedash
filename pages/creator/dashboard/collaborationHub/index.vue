
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  colorMode: "dark"
})


import type { ICampaign, CollabHubCampaign, APIResponse, ICampaignRequest, PaginatedAPIResponse } from 'types';


const config = useRuntimeConfig()
const API_URL = config.public.API_URL;
const details = ref<CollabHubCampaign[]>([])
const loading = ref(false)


const getCollaborationHub = async ()=> {
  loading.value = true
  try {
    const res= await $fetch<PaginatedAPIResponse<'campaigns', CollabHubCampaign >>(`${API_URL}/campaign/collaboration-hub/get/`);
    details.value = res.data.campaigns.data
    loading.value = false
    return res;
    
  } catch (error: any) {
    console.error('Error fetching collaboration hub:', error);
    loading.value = false
    return null;
  }
};



    watchEffect(async() => { await getCollaborationHub() })

</script>


<template>
  <div class="">
    <div class="flex flex-col bg-vDarkBlue  gap-2 p-8 " >
      <h1>Collaboration Hub</h1>
      <p>Discover small business partnerships that fit your style! Collaboration Hub connects you with unique, budget-friendly campaigns, where you get to choose the campaigns you want to join. Opt in and grow with brands that value your creativity!</p>
    </div>


    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-4" >
            <div v-if="loading" v-for="nums in [1,2,3,4]" >
              <CreatorCollabHubLoading />
            </div>
            <div v-else  v-for="detail in details" :key=detail._id >
                <CreatorCollabHubCard :details=detail  />
               
            </div>
       
    </div>
  </div>
</template>

