<script setup lang="ts">
import type { IPlatformProfile, IUserProfile } from 'types';
import {getSingleProfile} from "../../api/brand/campaign/campaign.brand"
import { scaleUp } from '../../utils';
import { useToast } from '../ui/toast/use-toast'
const { toast } = useToast();

const createBrandCampaignStore = useCreateBrandCampaignStore();

const loading = ref(false)
const page = ref(1)
const lastPage = ref(0)
const userStore = useUserStore()
const { rateObject, engagement, audience, price, budget } = storeToRefs(createBrandCampaignStore);

const isOpen = ref(false)
const accessToken = userStore.accessToken || "";

// slider filters
const maxPrice = ref(price.value);
const minEngagement = ref(engagement.value);
const minAudience = ref(audience.value);

const MIN_PRICE = 10_000;
const MAX_PRICE = 100_000_000;

const MIN_AUDIENCE = 200;
const MAX_AUDIENCE= 30_000_000;

const MIN_ENGAGEMENT = 1;
const MAX_ENGAGEMENT = 100;

const profiles = ref<IUserProfile[]>([]);
const API_URL = useRuntimeConfig().public.API_URL;

const actualPriceValue = (a: number | null): number => {
  if(!a) {
    return MIN_PRICE
  }
  return scaleUp({ a, max_val: MAX_PRICE, min_val: MIN_PRICE })
}

const actualAudienceValue = (a: number | null): number => {
  if(!a) {
    return MIN_AUDIENCE
  }
  return scaleUp({ a, max_val: MAX_AUDIENCE, min_val: MIN_AUDIENCE })
}

const actualEngagementValue = (a: number | null): number => {
  if(!a) {
    return MIN_ENGAGEMENT 
  }
  return scaleUp({ a, max_val: MAX_ENGAGEMENT, min_val: MIN_ENGAGEMENT })
}

const getProfiles = async(page?: number) => {
  try {
    isOpen.value = false
    loading.value = true
    const { data, meta: { last_page } } = await createBrandCampaignStore.getProfiles(page)
    lastPage.value = last_page;
    profiles.value.push(...data)
    loading.value = false
  } catch (error: any) {
    loading.value = false
    toast({ title: error.message})
  }
}

/*NOTE- call this fuction to apply filters */
const applyFilters = async() => {
  price.value = actualPriceValue(maxPrice.value);
  engagement.value = actualEngagementValue(minEngagement.value);
  audience.value = actualAudienceValue(minAudience.value);

  isOpen.value = false
  profiles.value = [];
  page.value = 1; // triggers watchEffect below
}

/* NOTE- call this function to reset the filters */
const resetFilters = async() => {
  price.value = null;
  audience.value = null;
  engagement.value = null;
  maxPrice.value = null;
  minEngagement.value = null;
  minAudience.value = null;
}



// const getSingle = async()=>{

//     try{
//         const res = await getSingleProfile({
//             apiUrl: API_URL,
//             accessToken
//         })
//     }catch (error: any) {
//         toast({ title: error.message})
//     }
// }

watchEffect(async() => { await getProfiles(page.value) })
// watchEffect(async() => { await getSingle() })
</script>

<template>
    <div class="flex justify-between">
      <button class="text-white flex gap-2 items-center" @click="isOpen=true">
        Filter
        <img src="/assets/icons/empty-filter.png" alt="">
      </button>

   

      <div>
        <p class="font-bold">Budget so far</p>
        
        <p>{{ budget.toLocaleString() }}</p>
      </div>


    </div>
    <Popup title = "Filter Content" v-if="isOpen" :togglePopup="()=> isOpen = !isOpen" :header="true">
          <div class="md:w-[500px] flex flex-col gap-5">
            <!-- 1 -->
            <p>Engagement Rate</p>
            <input
            type="range"
              class="w-full"
              v-model="minEngagement"
            >
            <div class="flex justify-between gap-8">
              <div class="basis-1/2 bg-transparent rounded-lg h-16 text-left border-2 p-2  border-darkBlue">
                <p class="text-sm">Min engagement rate</p>
                <p>{{ actualEngagementValue(minEngagement).toLocaleString() }}%</p>
              </div>

              <div class="basis-1/2 bg-transparent rounded-lg h-16 text-left border-2 p-2 items-center border-darkBlue">
                <p class="text-sm">Max engagement rate</p>
                <p>100%</p>
              </div>
            </div>
           <!--  -->
            <!-- 2 -->
            <p>Audience Size</p>
            <input type="range"
              class="w-full"
              v-model="minAudience"
            >
            <div class="flex justify-between gap-10">
              <div class="basis-1/2 bg-transparent rounded-lg h-16 text-left border-2 p-2 border-darkBlue">
                <p class="text-sm"> Min Audience size </p>
                <p>{{ actualAudienceValue(minAudience).toLocaleString() }}</p>
              </div>

              <div class="basis-1/2 bg-transparent rounded-lg h-16 text-left border-2 p-2 border-darkBlue">
                <p class="text-sm"> Max Audience size </p>
                <p>{{ MAX_AUDIENCE.toLocaleString() }}</p>
              </div>
            </div>
           <!--  -->
            <!-- 3 -->
            <p>  Price Range </p>
            <input type="range"
              class="w-full"
              v-model="maxPrice"
            >
            <div class="flex justify-between gap-10">
              <div class="basis-1/2 bg-transparent rounded-lg h-16 text-left border-2 p-2 border-darkBlue">
                <p class="text-sm">Min Price</p>
                <p> {{ MIN_PRICE.toLocaleString() }} </p>
              </div>

              <div class="basis-1/2 bg-transparent rounded-lg h-16 text-left border-2 p-2 border-darkBlue">
                <p class="text-sm">Max price</p>
                <p>{{ actualPriceValue(maxPrice).toLocaleString() }}</p>
              </div>
            </div>
           <!--  -->

            <div class="flex gap-10 justify-between py-4 border-t-2">
                <button @click="resetFilters" class="bg-transparent border-2 border-purple1 rounded-lg px-4 py-2 text-purplelabel">
                    Reset all filters
                </button>

                <button @click="applyFilters" class="bg-purple1 text-white rounded-lg px-4 py-2">
                    Apply filters
                </button>
            </div>
          </div>
    </Popup>


    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Spinner :loading="loading" />
        <div v-for="profile in profiles" :key="profile.id" class="">
            <!-- <CreatorprofileCard :profile="profile" /> -->
            <BrandsInfluencerCard :profile="profile"  />
        </div>
    </div>
    <div class="my-auto flex items-center justify-center">
        <button v-if="page < lastPage" class="p-3 border border-purple1 text-purple1 h-min" @click="page++">
            Load more
        </button>
    </div>
</template>