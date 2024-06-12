<script setup lang="ts">
import type { IPlatformProfile } from 'types';
import {getSingleProfile} from "../../api/brand/campaign/campaign.brand"
const toast = useToast();

const createBrandCampaignStore = useCreateBrandCampaignStore();

const loading = ref(false)
const page = ref(1)
const lastPage = ref(0)
const userStore = useUserStore()
const { rateObject, engagement, price, audience,  } = storeToRefs(createBrandCampaignStore);
const isOpen = ref(false)

const accessToken = userStore.accessToken || "";
const platformProfiles = ref<IPlatformProfile[]>([]);
    const API_URL = useRuntimeConfig().public.API_URL

const getPlatformProfiles = async(page?: number) => {
    try {
        isOpen.value=false
        loading.value = true
        const res = await createBrandCampaignStore.getPlatformProfiles(page)
        // lastPage.value = last_page
        platformProfiles.value = []
        platformProfiles.value.push(...res)
        loading.value = false
        console.log(platformProfiles.value)
    } catch (error: any) {
        loading.value = false
        toast.add({ title: error.message})
    }
}

// const getSingle = async()=>{

//     try{
//         const res = await getSingleProfile({
//             apiUrl: API_URL,
//             accessToken
//         })
//         console.log(res)
//     }catch (error: any) {
//         console.log(error)
//         toast.add({ title: error.message})
//     }
// }



watchEffect(async() => { await getPlatformProfiles(page.value) })
// watchEffect(async() => { await getSingle() })
</script>

<template>
    <button @click="isOpen=true">filter</button>
    <Popup title = "Filter Content" v-if="isOpen" :togglePopup="()=> isOpen = false" :header="true">
          <div class="md:w-[500px] flex flex-col gap-5">
            <p>Engagement Rate</p>
            <input 
            type="range"
              class="w-full"
              v-model="engagement"
            >
            <div class="flex justify-between gap-8">
              <div class="basis-1/2 bg-transparent rounded-lg h-16 text-left border-2 p-2  border-darkBlue">
                <p class="text-sm">Min engagement rate</p>
                <p>1%</p>
              </div>

              <div class="basis-1/2 bg-transparent rounded-lg h-16 text-left border-2 p-2 items-center border-darkBlue">
                <p class="text-sm">Max engagement rate</p>
                <p>{{engagement}}%</p>
              </div>
            </div>
            <p>Audience Size</p>
            <input type="range"
              class="w-full"
              v-model="audience"

              max="100000000"
              
            >
            <div class="flex justify-between gap-10">

              <div class="basis-1/2 bg-transparent rounded-lg h-16 text-left border-2 p-2 border-darkBlue">
                <p class="text-sm">Min audience size</p>
                <p>{{audience}}</p>
              </div>
            </div>
            <p>Price Range</p>
            <input type="range"
              class="w-full"
              v-model="price"
              max="1000000"
            >
            <div class="flex justify-between gap-10">
              <div class=" basis-1/2 bg-transparent rounded-lg h-16 text-left border-2 p-2 border-darkBlue">
                <p class="text-sm">Min price</p>
                <p>10,000</p>
              </div>

              <div class="basis-1/2 bg-transparent rounded-lg h-16 text-left border-2 p-2 border-darkBlue">
                <p class="text-sm">Max price</p>
                <p>{{price.toLocaleString()}}</p>
              </div>
            </div>

            <div class="flex gap-10 justify-between py-4 border-t-2">
                <button  class="bg-transparent border-2 border-purple1 rounded-lg px-4 py-2 text-purplelabel">
                    Reset all filters
                </button>

                <button  class="bg-purple1 text-white rounded-lg px-4 py-2">
                    Apply filters
                </button>
            </div>
          </div>
    </Popup>

   
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Spinner :loading="loading" />
        <div v-for="platformProfile in platformProfiles" :key="platformProfile.id" class="">
            <!-- <CreatorPlatformProfileCard :platformProfile="platformProfile" /> -->
            <BrandsInfluencerCard :platformProfile="platformProfile"  />
        </div>
      
    </div>
    <div class="my-auto flex items-center justify-center">
        <button v-if="page<lastPage" class="p-3 border border-purple1 text-purple1 h-min" @click="page++">
            Load more
        </button>
    </div>
</template>