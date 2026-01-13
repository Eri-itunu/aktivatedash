<script setup lang="ts">
//imports
import { getMyCollaborationHubCampaigns } from "../../../../api/creator/campaign/campaign.creator";
import { ref } from "vue";
import type { ICampaign, APIResponse,Collaboration, CollabHubCampaign } from "types";
import { useToast } from "../../../../components/ui/toast/use-toast";
import AppEmptyState from "../../../../components/shared/AppEmptyState.vue";
definePageMeta({
  layout: "dashboard",
  colorMode: "dark",
});

//variable declarations
const device = useDevice()
const config = useRuntimeConfig();
const showSpinner = ref(false)
const API_URL = config.public.API_URL || "http://localhost:3333/api/v2";

const CollabHubCampaign = ref<Collaboration[]>([])
const userStore = useUserStore();
const collabStore = useCollabStore();
const loading = ref(false);
const empty = ref(false);
const collabempty =ref(false)
const { toast } = useToast();
const page = ref<number>(1);
const last_Page = ref<number>(1);
const privatePage = ref<number>(1)
const private_last_Page = ref<number>(1);
const campaignType = ref('public')

//utility functions
const setLoading = () => {
  loading.value = false;
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  //@ts-expect-error
  return new Date(dateString).toLocaleDateString(undefined, options);
};


//api calls


const getApplications =async(privatePage: number)=>{
  showSpinner.value = true
  const filter = {
    limit: "7",
    page: privatePage?.toString() || "1",
  };
  const qs = new URLSearchParams(filter);
  try {
    loading.value = true;
    const accessToken = userStore.accessToken || "";

    const {
      data,
      meta: { lastPage },
    } = await getMyCollaborationHubCampaigns({
      apiUrl: API_URL as string,
      accessToken,
      qs: qs.toString(),
    });

    CollabHubCampaign.value.push(...data);
    private_last_Page.value = lastPage;
    loading.value = false;
    showSpinner.value = false
    setTimeout(setLoading, 1000);
    console.log(CollabHubCampaign.value.length)
    if (CollabHubCampaign.value.length === 0) {
      collabempty.value = true;
    }
  } catch (error: any) {
    loading.value = false;
    toast({ title: error.data?.message || "Something went wrong" });
  }

}



watchEffect(async () => {

  await getApplications(privatePage.value);
});
</script>

<template>
  
  <div class="" >
    <div  class="mx-4 mt-8 flex flex-col gap-5">
      <div class="flex gap-4" >
        <h1 class="dark:text-white text-black">List of Campaigns</h1>

  
      </div>


      <div >
        <div v-if="collabempty || CollabHubCampaign.length === 0" class="py-10">
          <AppEmptyState 
            title="No Collaboration Hub Campaigns" 
            description="There are currently no collaboration hub applications available for you. Explore other campaigns and apply."
            icon=""
          />
        </div>
        <div v-else class="relative overflow-x-auto shadow-md rounded-lg">
          <table
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-darkBlue dark:bg-darkBlue dark:text-purplebg"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Campaign Headline</th>
                <th scope="col" class="max-lg:hidden px-6 py-3">
                  Content Submission Deadline
                </th>
                <th scope="col" class="max-lg:hidden px-6 py-3">Acceptance Status</th>
                <th scope="col" class=" px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="loading && CollabHubCampaign.length === 0">
                <tr v-for="i in 5" :key="i" class="bg-white border-b dark:bg-[#090618] dark:border-gray-700">
                  <td class="px-6 py-4">
                    <USkeleton class="h-4 w-[120px]" />
                  </td>
                  <td class="px-6 py-4">
                    <USkeleton class="max-lg:hidden h-4 w-[120px]" />
                  </td>
                  <td class="px-6 py-4">
                    <USkeleton class="max-lg:hidden h-4 w-[120px]" />
                  </td>
                  <td class="px-6 py-4">
                    <USkeleton class="h-4 w-[120px]" />
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr
                  v-for="request in CollabHubCampaign"
                  :key="request.id"
                  class="bg-white border-b dark:bg-[#090618] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-darkBlue"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                 
                  {{ request.campaign.headline }}
                   
                    
                  </th>
                  <td class="max-lg:hidden px-6 py-4">
                    {{ formatDate(request.campaign.submissionDueDate)}}
                  </td>
                  <td class="max-lg:hidden px-6 py-4">
                    {{ request.campaignDecision }}
                  </td>
                  <td class="px-6 py-4">
                    <button
                      @click="$router.push(`/creator/dashboard/campaigns/hub/${request.campaignId}`)"
                    >
                      View more
                    </button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <div>
         
        </div>
       
      </div>
    </div>

    <div class="flex items-center justify-center py-6">
      <UButton v-if="page < last_Page && campaignType === 'public' && CollabHubCampaign.length > 0" @click="page++" color="purple" variant="outline">
        Load More
      </UButton>

    </div>
  </div>

  <div v-if="showSpinner" class="md:hidden  w-[100%] h-[100%] fixed top-0 right-0 left-0 bottom-0 z-50 bg-[#000000]/ flex justify-center items-center">
    <LoadSpinner />
  </div>

 
</template>
