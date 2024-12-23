<script setup lang="ts">
//imports
import { getMyCampaigns, getMyCollaborationHubCampaigns } from "../../../../api/creator/campaign/campaign.creator";
import { ref } from "vue";
import type { ICampaign, APIResponse,Collaboration, CollabHubCampaign } from "types";
import { useToast } from "../../../../components/ui/toast/use-toast";

definePageMeta({
  layout: "dashboard",
  colorMode: "dark",
});

//variable declarations
const device = useDevice()
const config = useRuntimeConfig();
const showSpinner = ref(false)
const API_URL = config.public.API_URL || "http://localhost:3333/api/v2";
const campaigns = ref<ICampaign[]>([]);
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


//api calls
const getCampaigns = async (page?: number) => {
  showSpinner.value = true
  const filter = {
    limit: "7",
    page: page?.toString() || "1",
  };
  const qs = new URLSearchParams(filter);
  try {
    loading.value = true;
    const accessToken = userStore.accessToken || "";

    const {
      data,
      meta: { lastPage },
    } = await getMyCampaigns({
      apiUrl: API_URL,
      accessToken,
      qs: qs.toString(),
    });

    campaigns.value.push(...data);
    last_Page.value = lastPage;
    loading.value = false;
    showSpinner.value = false
    setTimeout(setLoading, 1000);

    if (campaigns.value.length === 0) {
      empty.value = true;
    }
  } catch (error: any) {
    loading.value = false;
    toast({ title: error.data?.message || "Something went wrong" });
  }
};

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
      apiUrl: API_URL,
      accessToken,
      qs: qs.toString(),
    });

    CollabHubCampaign.value.push(...data);
    private_last_Page.value = lastPage;
    loading.value = false;
    showSpinner.value = false
    setTimeout(setLoading, 1000);

    if (CollabHubCampaign.value.length === 0) {
      collabempty.value = true;
    }
  } catch (error: any) {
    loading.value = false;
    toast({ title: error.data?.message || "Something went wrong" });
  }

}



// const getCampaigns = async(_?: boolean): Promise<void> => {
//     try {
//       loading.value = true;

//       const res = await $fetch<APIResponse<'campaigns', ICampaignRequest[]>>(`${API_URL}/campaign/creator-get-campaign/`, {
//         headers: { Authorization: `Bearer ${userStore.accessToken}`}
//       });

//       campaigns.value.push(...res.data.campaigns)

//       setTimeout(setLoading, 2000);
//       if(campaigns.value.length === 0){
//         empty.value = true
//       }
//     } catch(error: any){
//         loading.value = false
//         toast( {title: error.data?.message || "Something went wrong"} )
//     }
// }

watchEffect(async () => {
  await getCampaigns(page.value),
  await getApplications(privatePage.value);
});
</script>

<template>
  
  <div v-if="!device.isMobile"class="" >
    <div  class="mx-4 mt-8 flex flex-col gap-5">
      <div class="flex gap-4" >
        <h1 class="dark:text-white text-black">List of Campaigns</h1>

        <div class="flex gap-1" >
          <button @click="campaignType = 'public'" :class="['rounded-full  px-2' , campaignType === 'public' ? 'bg-[#3A3846] text-[#CDC2FF]' : 'bg-none' ] "  >
            Public (collaboration hub)
          </button>

          <button @click="campaignType = 'private'" :class="['rounded-full  px-2' , campaignType === 'private' ? 'bg-[#3A3846] text-[#CDC2FF]' : 'bg-none' ] "  >
            Private
          </button>
        </div>
      </div>

      <div v-if="campaignType === 'private' " >
        <div v-if="empty">No Campaigns Available</div>
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
                <th scope="col" class="max-lg:hidden px-6 py-3">Status</th>
                <th scope="col" class="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
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
              <tr
                v-else
                v-for="request in campaigns"
                :key="request.id"
                class="bg-white border-b dark:bg-[#090618] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-darkBlue"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ request.headline }}
                </th>
                <td class="max-lg:hidden px-6 py-4">
                  {{ request.submissionDueDate.split("T")[0] }}
                </td>
                <td class="max-lg:hidden px-6 py-4">
                  <UBadge
                    size="xs"
                    :label="request.isPaid ? 'Paid' : 'Not Paid'"
                    :color="request.isPaid ? 'emerald' : 'orange'"
                    variant="subtle"
                  />
                </td>

                <td class="px-6 py-4">
                  <button
                    @click="$router.push(`/creator/dashboard/campaigns/${request.id}`)"
                  >
                    View more
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="campaignType === 'public' " >
        <div v-if="collabempty">No Collaboration Hub applications available</div>
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
              <tr v-if="loading">
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
              <tr
                v-else
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
                  {{ request.campaign.submissionDueDate.split("T")[0]}}
                </td>
                <td class="max-lg:hidden px-6 py-4">
                  {{ request.isShorlisted }}
                </td>
                <td class="px-6 py-4">
                  <button
                    @click="$router.push(`/creator/dashboard/campaigns/hub/${request.id}`)"
                  >
                    View more
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
         
        </div>
       
      </div>
    </div>

    <div class="flex items-center justify-center py-6">
      <UButton v-if="page < last_Page && campaignType === 'public'" @click="page++" color="purple" variant="outline">
        Load More
      </UButton>

      <UButton v-if="privatePage < private_last_Page && campaignType === 'private'" @click="privatePage++" color="purple" variant="outline">
        Load More
      </UButton>
    </div>
  </div>

  <div v-if="showSpinner" class="md:hidden  w-[100%] h-[100%] fixed top-0 right-0 left-0 bottom-0 z-50 bg-[#000000]/ flex justify-center items-center">
    <LoadSpinner />
  </div>

  <div v-if="device.isMobile" class="text-black md:hidden h-full pb-5 flex flex-col">
    <div  class="sticky top-0">
      <MobileHeader/>
    </div>
    <!-- <div class="basis-1/5 pt-4 px-4">
      <Input
        type="search"
        placeholder="Search here..."
        class=" bg-[#F8F7FF]  w-full rounded-lg p-2"
      />
    </div> -->
    <div class=" px-4">

        <div class="flex flex-col gap-2 pt-5">
          <div v-if="!showSpinner && campaigns.length === 0" >
            No campaigns available yet
          </div>
          <div v-else v-for="request in campaigns" :key="request.id">
            <MobileCampaignCard :headline="request.headline" :request="request"  :socials="request?.deliverables?.platform" />
          </div>
        </div>

    </div>
  </div>
</template>
