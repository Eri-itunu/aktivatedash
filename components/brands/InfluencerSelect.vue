<script setup lang="ts">
import type { PaginationMeta, IUserProfile } from 'types';
import {getSingleProfile} from "../../api/brand/campaign/campaign.brand"
import { scaleUp } from '../../utils';
import { useToast } from '../ui/toast/use-toast'
import {ChevronRight,ChevronLeft, Filter, CircleUserRound } from 'lucide-vue-next'
// import creatorSignupPost from '@/server/api/creator-signup.post';
const { toast } = useToast();

const createBrandCampaignStore = useCreateBrandCampaignStore();

const loading = ref(false)
const page = ref(1)
const last_Page = ref(0)
const userStore = useUserStore()
const totalInfluencers = ref(0)
const current_page = ref(1)
const openedPage = ref<number>(1)
const pageMeta = ref<PaginationMeta>()

const { rateObject, engagement, audience, price, budget, creators } = storeToRefs(createBrandCampaignStore);

const isOpen = ref(false)
const accessToken = userStore.accessToken || "";

// slider filters


const MIN_PRICE = 10_000;
const MAX_PRICE = 10_000_000;

const MIN_AUDIENCE = 200;
const MAX_AUDIENCE= 5_000_000;

const MIN_ENGAGEMENT = 1;
const MAX_ENGAGEMENT = 20;

const maxPrice = ref(MIN_PRICE);
const minEngagement = ref(MIN_ENGAGEMENT);
const minAudience = ref(MIN_AUDIENCE);

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
    const { data, meta} = await createBrandCampaignStore.getProfiles(page)
    pageMeta.value = meta
    // profiles.value.push(...data)
    profiles.value = data
    loading.value = false
  } catch (error: any) {
    loading.value = false
    toast({ title: error.message})
  }
}


const toPage = (pageNumber: number) => {
  page.value = pageNumber

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
  maxPrice.value = MIN_PRICE;
  minEngagement.value = MIN_ENGAGEMENT;
  minAudience.value = MIN_AUDIENCE;
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
    <div>
      <p>{{totalInfluencers}} results</p>
    </div>
    <div class="flex justify-between">
      <Dialog class="w-fit" >
        <DialogTrigger>
          <button class="text-black dark:text-white flex gap-2 items-center" >
            Filter
            <Filter/>
          </button>
        </DialogTrigger>
        
        <DialogContent class="min-w-fit" >
          <div class="md:w-[500px] flex flex-col gap-5">
            <h1 class="text-center ">Filter Content</h1>
              <!-- 1 -->
              <p>Engagement Rate</p>
              <input
                type="range"
                class="w-full"
                v-model="minEngagement"
                :min="MIN_ENGAGEMENT"
                :max="MAX_ENGAGEMENT"
                step="1"
              />
              <!-- {{ minEngagement }} -->
              <div class="flex justify-between gap-8">
                <div class="basis-1/2 bg-transparent rounded-lg h-16 text-left border-2 p-2  border-darkBlue">
                  <p class="text-sm">Min engagement rate</p>
                 <p>1%</p>
                </div>

                <div class="basis-1/2 bg-transparent rounded-lg h-16 text-left border-2 p-2 items-center border-darkBlue">
                  <p class="text-sm">Max engagement rate</p>
                  <p>{{ minEngagement.toLocaleString() }}%</p>
                </div>
              </div>
            <!--  -->
              <!-- 2 -->
              <p>Follower Count</p>
              <input
                type="range"
                class="w-full"
                v-model="minAudience"
                :min="MIN_AUDIENCE"
                :max="MAX_AUDIENCE"
                step="10000"
              />
              <div class="flex justify-between gap-10">
                <div class="basis-1/2 bg-transparent rounded-lg h-16 text-left border-2 p-2 border-darkBlue">
                  <p class="text-sm"> Min Follower Count </p>
                  <p>200</p>
                </div>

                <div class="basis-1/2 bg-transparent rounded-lg h-16 text-left border-2 p-2 border-darkBlue">
                  <p class="text-sm"> Max Follower Count </p>
                  <p>{{ minAudience.toLocaleString() }}</p>
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
        </DialogContent>
      </Dialog>
      

   

      <div>
        <p class="font-bold">Budget so far</p>
        <p>{{ budget.toLocaleString() }}</p>
      </div>



    </div>

    <div v-if="creators.length > 0" class="w-full">
      <Sheet class="w-full" >
              <SheetTrigger class="w-full">
                <div class="rounded-[10px] border-[0.5px] border-[#CDC2FF] w-full flex justify-between px-4 py-2" >
                  <p>Selected creators and rates</p>
                  <ChevronRight />
                </div>
              </SheetTrigger>
              <SheetContent  class=" text-black py-8 w-[700px] flex flex-col gap-2">
                <SheetHeader>
                  <SheetTitle><h1 class='text-black dark:text-white' > Selected creators and rates</h1></SheetTitle>
                
                </SheetHeader>
                <ScrollArea>
                  <div v-for="creator in creators" class="text-black dark:text-white flex flex-col gap-2 p-2" >
                    <div class="flex gap-2 items-center" >
                      <CircleUserRound />
                      <p class="break-words" >{{ creator.firstName }} {{ creator.lastName }} </p>
                    </div>
                    <div class="border-l-[#231E37] border-l-4 bg-white dark:bg-[#100C21] p-4" > 
                      <p class="font-bold" >{{ creator.platform }}</p>
                      <span class="flex justify-between" >
                        <p class="font-semibold">{{ creator.rates.description }}</p>
                      <p class="font-semibold" > {{ creator.rates.currency }} {{creator.rates.price.toLocaleString()}}</p>
                      </span>
                    </div>
                  </div>
                </ScrollArea>

                
                <SheetFooter>
                 
                  
                </SheetFooter>
              </SheetContent>
            </Sheet>
    </div>
    
    


    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Spinner :loading="loading" />
        <div v-for="profile in profiles" :key="profile.id" class="">
            <!-- <CreatorprofileCard :profile="profile" /> -->
            <BrandsInfluencerCard :profile="profile"  />
        </div>
    </div>
    <!-- <div class="my-auto flex items-center justify-center">
        <button v-if="page < last_Page" class="p-3 border border-purple1 text-purple1 h-min" @click="page++">
            Load more
        </button>
    </div> -->

 
    <div class="flex justify-center mt-2" >
      <Pagination v-slot="{ page }" :total="pageMeta?.total" :sibling-count="1" show-edges :default-page="pageMeta?.currentPage">
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationFirst @click="toPage(1)" />
          <PaginationPrev @click="openedPage--" />

          <template v-for="(item, index) in items">
            <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
              <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'" @click="toPage(item.value)">
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <PaginationNext @click="openedPage++" />
          <PaginationLast @click="toPage(pageMeta?.lastPage ?? 0  )"/>
        </PaginationList>
      </Pagination>
    </div>

  
</template>