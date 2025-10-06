
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  colorMode: "dark"
})


import type { ICampaign, CollabHubCampaign, PaginationMeta, ICampaignRequest, PaginatedAPIResponse } from 'types';
import { 
  Pagination, 
  PaginationList, 
  PaginationListItem, 
  PaginationEllipsis, 
  PaginationFirst, 
  PaginationLast, 
  PaginationNext, 
  PaginationPrev 
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";


const config = useRuntimeConfig()
const API_URL = config.public.API_URL;
const details = ref<CollabHubCampaign[]>([])
const loading = ref(false)
const page = ref<number>(1);
const last_Page = ref<number>(1);
const openedPage = ref<number>(1)
const pageMeta = ref<PaginationMeta>()


const getCollaborationHub = async ()=> {
  loading.value = true
  try {
    const {data: { campaigns: {data, meta}}}= await $fetch<PaginatedAPIResponse<'campaigns', CollabHubCampaign >>(`${API_URL}/campaign/collaboration-hub/listings/`);
    details.value = data
    pageMeta.value = meta
    loading.value = false
    
    
  } catch (error: any) {
    console.error('Error fetching collaboration hub:', error);
    loading.value = false
    return null;
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



    watchEffect(async() => { await getCollaborationHub() })

</script>


<template>
  <div class="">
    <div class="flex flex-col bg-grey1 text-black rounded gap-2 p-8 mb-4 " >
      <h1 class="font-bold text-xl">Collaboration Hub</h1>
      <p class="font-thin">Discover small business partnerships that fit your style! Collaboration Hub connects you with unique, budget-friendly campaigns, where you get to choose the campaigns you want to join. Opt in and grow with brands that value your creativity!</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-4" >
      <!-- {{details}} -->
      <div v-if="loading" v-for="nums in [1,2,3,4]" >
        <CreatorCollabHubLoading />
      </div>
      <div v-if="pageMeta && pageMeta.total === 0" class="flex items-center justify-center text-center" >
        <p> No collaboration hub campaigns available</p>
      </div>
      
      <div v-else  v-for="(detail, index) in details" :key=index >
          <CreatorCollabHubCard :details=detail  />
          
      </div>                   
    </div>
    <div v-if="pageMeta && pageMeta.total > 0" class="flex justify-center mt-2" >
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
  </div>
</template>

