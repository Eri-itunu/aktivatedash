
<script setup lang="ts">
import  collabs from "../../../../mock/collabs";

import { ref } from 'vue';
import type { ICampaignRequest, APIResponse } from 'types';

const config = useRuntimeConfig()

const API_URL = config.public.API_URL || "http://localhost:3333/api/v2"

  definePageMeta({
  layout: 'dashboard',
  colorMode: 'dark'
})

const posts = [
{
    id: "New Pepsi flavour",
    date: "12-05-2024",
    time: "12:00"
},
{
    id: "Itel Phones",
    date: "12-10-2024",
    time: "12:00"
},
{
    id: "Mavin Artist",
    date: "01-07-2024",
    time: "12:00"
},
]

//TODO make get campaign call and fill table

const requests = ref<ICampaignRequest[]>([])
const userStore = useUserStore()
const collabStore = useCollabStore()
const { anything } = storeToRefs(collabStore);
const loading = ref(false)
const toast = useToast()

const getCampaignRequests = async(_?: boolean): Promise<void> => {
    try {
      loading.value = true;

      const res = await $fetch<APIResponse<'requests', ICampaignRequest[]>>(`${API_URL}/campaign/get-campaign-requests`, {
        headers: { Authorization: `Bearer ${userStore.accessToken}`}
      });
      loading.value = false;
      requests.value.push(...res.data.requests)
      console.log(_);

    } catch(error: any){
        loading.value = false
        console.log(error)
        toast.add( {title: error.data?.message || "Something went wrong"} )
    }
}

watchEffect(async() => {
  await getCampaignRequests()
})

</script>


<template>
  <div class="">
        <!-- <div class="flex flex-wrap items-center lg:justify-between justify-center">
          <div v-for="collab,i in collabs" :key="i"
            class="w-[49%] md:min-w-min min-w-full pb-2">
            <CampaignCard />
          </div>
        </div> -->
  </div>

  <!-- <div class="flex flex-wrap justify-center align-center gap-4">
    <CampaignCard />
    <CampaignCard />
    <CampaignCard />
    <CampaignCard />
    <CampaignCard />
  </div> -->

  

<div class="mx-4 mt-8 flex flex-col gap-5">
    <h1>List of Campaign Requests</h1>
  <div class="relative overflow-x-auto shadow-md rounded-lg">
    
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-darkBlue dark:bg-darkBlue dark:text-purplebg">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    Campaign Headline
                </th>
                <th scope="col" class="px-6 py-3">
                    Date Posted
                </th>
                <th scope="col" class="px-6 py-3">
                    Time
                </th>
                
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="request in requests" :key="request.id" class="bg-white border-b dark:bg-[#090618] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-darkBlue">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {{request.campaign.headline}}
                </th>
                <td class="px-6 py-4">
                    {{request.created_at}}
                </td>
                <td class="px-6 py-4">
                    {{request.id}}
                </td>
                
                <td class="px-6 py-4">
                    <button @click="$router.push(`/creator/dashboard/campaigns/${request.campaign.id}`)">View more</button>
                   
                </td>
            </tr>
            
            
        </tbody>
    </table>
</div>
</div>

  <div class="flex items-center justify-center py-6">
    <UButton color="purple" variant="outline">Load More</UButton>
  </div>
</template>

