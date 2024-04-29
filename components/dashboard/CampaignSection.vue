<script setup lang="ts">

import { ref, computed } from 'vue';
import type { ICampaignRequest, APIResponse } from 'types';

const config = useRuntimeConfig()

const API_URL = config.public.API_URL || "http://localhost:3333/api/v2"


const scrollContainer = ref();
const isAtStart = ref(true);
const toast = useToast()
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

const loading = ref(false)

const requests = ref<ICampaignRequest[]>([])
const userStore = useUserStore()
const collabStore = useCollabStore()
const getCampaignRequests = async(_): Promise<void> => {
  // anything.value = !anything.value
    try {
      loading.value = true;
      
      const res = await $fetch<APIResponse<'requests', ICampaignRequest[]>>(`${API_URL}/campaign/get-campaign-requests`, {
        headers: { Authorization: `Bearer ${userStore.accessToken}`}
      });
      loading.value = false;
      requests.value.push(...res.data.requests)
      console.log(requests.value)

    } catch(error: any){
        loading.value = false
        console.log(error)
        toast.add( {title: error.data?.message || "Something went wrong"} )
    }
}

watchEffect(async() => { await getCampaignRequests(collabStore.anything) })

</script>


<template>
  <!-- Campaigns  -->
  <div class="">
    <div class="flex justify-between text-sm py-4 pr-3 text-grey1">
      <div class="flex gap-5 items-center">
        <p> Campaigns</p>
        <!-- <div>
          <button class="px-2 py-1 text-xs bg-[#3A3846] rounded-full">Active</button>
          <button class="px-2 py-1 text-xs rounded-full">Requests</button>
        </div> -->
      </div>
      <div class="flex gap-3">
        <nuxt-link to="/dashboard/campaigns" >
          <p class="underline">See all</p>
        </nuxt-link>
        <div class="flex gap-2">
            <!-- Active left -->
            <img @click="scrollLeft" class="object-contain rotate-180" src="/assets/icons/arrow-circle-right.svg" alt="">
            <!-- Active right -->
            <img  @click="scrollRight" class="object-contain" src="/assets/icons/arrow-circle-right.svg" alt="">
        </div>
      </div>
    </div>
    <div v-if="requests.length === 0">
        <p>Hello</p>
    </div>
    <div ref="scrollContainer" class="flex gap-2 md:gap-3 my-scroll">
      <div  class=""  v-for="request in requests" :key="request.id">
        <CreatorCampaignCard
          :request = "request"
        />
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
    display: none
  }
</style>