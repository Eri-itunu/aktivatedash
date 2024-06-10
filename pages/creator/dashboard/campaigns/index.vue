<script setup lang="ts">
import collabs from "../../../../mock/collabs";
import { getMyCampaigns } from "../../../../api/creator/campaign/campaign.creator";
import { ref } from "vue";
import type { ICampaign, APIResponse } from "types";

const config = useRuntimeConfig();

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
const toast = useToast();

const page = ref<number>(1);
const lastPage = ref<number>(1);

const setLoading = () => {
  loading.value = false;
};

const getCampaigns = async (page?: number) => {
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
    setTimeout(setLoading, 1000);

    if (campaigns.value.length === 0) {
      empty.value = true;
    }
  } catch (error: any) {
    loading.value = false;
    console.log(error);
    toast.add({ title: error.data?.message || "Something went wrong" });
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
//         console.log(error)
//         toast.add( {title: error.data?.message || "Something went wrong"} )
//     }
// }

watchEffect(async () => {
  await getCampaigns(page.value);
});
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

  <div v-if="$nuxt.isOffline">You are offline</div>
  <div v-else class="mx-4 mt-8 flex flex-col gap-5">
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
              <th scope="col" class="px-6 py-3">Content Submission Deadline</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td class="px-6 py-4">
                <USkeleton class="h-4 w-[120px]" />
              </td>
              <td class="px-6 py-4">
                <USkeleton class="h-4 w-[120px]" />
              </td>
              <td class="px-6 py-4">
                <USkeleton class="h-4 w-[120px]" />
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
              <td class="px-6 py-4">
                {{ request.submission_due_date.split("T")[0] }}
              </td>
              <td class="px-6 py-4">
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
</template>
