<script setup lang="ts">
definePageMeta({
  layout: "light",
  middleware:"public"
});
import type { CollabHubCampaign, PaginatedAPIResponse , PaginationMeta, ResponseMessage} from "@/types";
import { Plus, ChevronRight, ChevronLeft } from "lucide-vue-next";
import {formatDate} from '@/utils/index'
import { useToast } from "@/components/ui/toast/use-toast";


const {toast}  = useToast();
const config = useRuntimeConfig();
const loading = ref(false)
const API_URL = config.public.API_URL ;
const details = ref<CollabHubCampaign[]>([])
const userStore = useUserStore();
const activeDetails = ref<CollabHubCampaign[]>([])
const inactiveDetails = ref<CollabHubCampaign[]>([])
const stateRef = ref('inactive')
const openedPage = ref<number>(1)
const headers = { Authorization: `Bearer ${userStore.accessToken}` };
const pageMeta = ref<PaginationMeta>()

const publishCampaign = async (id: string) => {
  try {
    await $fetch<ResponseMessage>(`${API_URL}/campaign/publish-campaign/${id}`, { headers });
    toast({ title: "Campaign now live!" });
    getCollaborationHub(openedPage.value, stateRef.value)
  } catch (error: any) {
    toast({ title: error.data?.message || "Publishing failed" });
  }
};

const toPage = (pageNumber: number) => {
  // console.log(pageNumber)
  // if(pageNumber < 1) {
  //   pageNumber = 1
  // }
  // if(pageMeta.value && pageNumber > pageMeta.value?.lastPage) {
  //   pageNumber = pageMeta.value.lastPage
  //   openedPage.value = pageNumber
  //   console.log(pageNumber)

  // }
  openedPage.value = pageNumber

}

const getCollaborationHub = async (page:number, stateRef:string)=> {
  loading.value = true
  const type = ref(0)
  if(stateRef === 'active') {
    type.value = 1
  } else {
    type.value = 0
  }
  try {
    const {data: { campaigns: {data, meta}}} = await $fetch<PaginatedAPIResponse<'campaigns', CollabHubCampaign >>(`${API_URL}/campaign/collaboration-hub/my-campaigns?is_published=${type.value}&page=${page}`,
      {
      headers
    });
    details.value = data
    pageMeta.value = meta

   
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

watchEffect(async() => { await getCollaborationHub(openedPage.value, stateRef.value) })
</script>

<template>
  <div class="text-black dark:text-white mt-6 px-8 flex flex-col gap-4 min-h-screen">
    <header class="mt-8">
      <h1 class="font-bold text-xl">My campaigns</h1>
      <p class="text-sm text-[#6D6B76] ">
        Create a campaign and connect with creators who will deliver the content
        you need
      </p>
    </header>

    <div class="w-full flex justify-end h-10 gap-3">
      <!-- <input
        type="text"
        class="bg-white text-black dark:text-white  dark:bg-[#090618] border-[#F7F7F7} dark:border-[#1D192F] rounded-sm
         w-full focus:outline-none focus:ring p-2"
        placeholder="Search Campaigns"
      /> -->
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
        <Select v-model="stateRef" >
          <SelectTrigger class="w-[180px]">
            <SelectValue  />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="inactive">
                Inactive
              </SelectItem>
              <SelectItem value="active">
                Active
              </SelectItem>
             
            </SelectGroup>
          </SelectContent>
        </Select>
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
            <div @click="$router.push(`/brands/dashboard/collaborationHub/${detail.id}`)"
             class="flex md:flex-row flex-col gap-2 items-left md:items-center">
                <img v-if="detail.images[0]" :src="detail.images[0]" alt="" class="h-24 w-32 rounded shadow-lg" />
                <div>
                  <h1>{{ detail.headline }}</h1>  
                  <h2 class="text-[#6D6B76]">{{ detail.cost.toLocaleString() }}</h2>
                  <button v-if="!detail.isPublished" @click="publishCampaign(detail.id)" class="rounded-[25px] border border-purplelabel text-purplelabel px-2 py-1">
                    Publish Campaign
                  </button>
                </div>
            </div>
            <div class="flex items-center text-[#6D6B76]">
              
              {{ formatDate(detail.updatedAt.split("T")[0]) }}
            </div>
          </div>
        </div>

      

        <div class="flex justify-center mt-2 mb-4" >
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
    </section>

  </div>
</template>
