<script setup lang="ts">
import collabs from "../../../../mock/collabs";
import { getMyCampaigns } from "../../../../api/creator/campaign/campaign.creator";
import { ref } from "vue";
import type { ICampaign, APIResponse } from "types";
import { useToast } from "../../../../components/ui/toast/use-toast";


const config = useRuntimeConfig();
const showSpinner = ref(false)
const API_URL = config.public.API_URL || "http://localhost:3333/api/v2";

definePageMeta({
  layout: "dashboard",
  colorMode: "dark",
});

//TODO make get campaign call and fill table

const campaigns = ref<ICampaign[]>([]);
const userStore = useUserStore();
const collabStore = useCollabStore();
const loading = ref(false);
const empty = ref(false);
const { toast } = useToast();

const page = ref<number>(1);
const lastPage = ref<number>(1);

const setLoading = () => {
  loading.value = false;
};

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
      meta: { last_page },
    } = await getMyCampaigns({
      apiUrl: API_URL,
      accessToken,
      qs: qs.toString(),
    });

    campaigns.value.push(...data);
    lastPage.value = last_page;
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
  await getCampaigns(page.value);
});
</script>

<template>
  
  <div class="hidden md:block" >
    <div  class="mx-4 mt-8 flex flex-col gap-5">
      <h1 class="text-purplebg">List of Campaigns</h1>

      <div>
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
                  {{ request.submission_due_date.split("T")[0] }}
                </td>
                <td class="max-lg:hidden px-6 py-4">
                  <UBadge
                    size="xs"
                    :label="request.is_paid ? 'Paid' : 'Not Paid'"
                    :color="request.is_paid ? 'emerald' : 'orange'"
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
    </div>

    <div class="flex items-center justify-center py-6">
      <UButton v-if="page < lastPage" @click="page++" color="purple" variant="outline">
        Load More
      </UButton>
    </div>
  </div>

  <div v-if="showSpinner" class="md:hidden  w-[100%] h-[100%] fixed top-0 right-0 left-0 bottom-0 z-50 bg-[#000000]/ flex justify-center items-center">
    <LoadSpinner />
  </div>

  <div v-else class="text-black md:hidden h-full pb-5 flex flex-col">
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
          <div v-if="campaigns.length === 0" >
            No campaigns available yet
          </div>
          <div v-else v-for="request in campaigns" :key="request.id">
            <MobileCampaignCard :headline="request.headline" :request="request"  :socials="request?.deliverables?.platform" />
          </div>
        </div>

    </div>
  </div>
</template>
