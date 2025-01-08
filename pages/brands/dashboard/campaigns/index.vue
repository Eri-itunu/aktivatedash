<script setup lang="ts">
definePageMeta({
  layout: "light",

});
import { Plus, Info } from 'lucide-vue-next';

import type { ICampaign, ResponseMessage } from "types";
import { useToast } from "../../../../components/ui/toast/use-toast";

const config = useRuntimeConfig();
const API_URL = config.public.API_URL;
const { toast } = useToast();
const getBrandCampaignStore = useGetBrandCampaignStore();
const campaigns = ref<ICampaign[]>([]);
const isPublished = ref(false);
const loading = ref(true);
const openMenu = ref(null); // Tracks the ID of the currently open menu
const router = useRouter();

const toggleMenu = (id) => {
  openMenu.value = openMenu.value === id ? null : id;
};

const viewDetails = (id) => {
  router.push(`/brands/dashboard/campaigns/${id}`);
};

const editCampaign = (id) => {
  router.push(`/brands/dashboard/campaigns/edit/${id}`);
};

const deleteCampaign = (id) => {
  console.log(`Delete campaign with ID: ${id}`);
};

const page = ref<number>(1);
const last_Page = ref<number>(1);

const getCampaigns = async (page?: number) => {
  const filter = {
    limit: "7",
    page: page?.toString() || "1",
  };
  const qs = new URLSearchParams(filter);
  try {
    const {
      data,
      meta: { lastPage },
    } = await getBrandCampaignStore.getBrandCampaigns(qs.toString());

    campaigns.value = [];
    campaigns.value.push(...data);
    last_Page.value = lastPage;
    loading.value = false;
  } catch (error: any) {
    toast({ title: error.message });
  }
};

watchEffect(async () => {
  await getCampaigns(page.value);
});

async function handlePayment(id: string) {
  try {
    const res = await getBrandCampaignStore.payForCampaign(id);
    navigateTo(res.url, {
      open: {
        target: "_blank",
        windowFeatures: {
          width: 500,
          height: 500,
        },
      },
    });
    await getCampaigns();
  } catch (error: any) {
    toast({ title: error.message });
  }
}

const userStore = useUserStore();
async function publishCampaign(campaignId: string): Promise<void> {
  try {
    const res = await $fetch<ResponseMessage>(
      `${API_URL}/campaign/publish-campaign/${campaignId}`,
      {
        headers: { Authorization: `Bearer ${userStore.accessToken}` },
      }
    );
    toast({ title: "Published successfully" });
    await getCampaigns();
  } catch (error: any) {
    toast({ title: error.data?.message || "Something went wrong" });
  }
}
</script>

<template>
  <div class="flex gap-5 items-center justify-end mt-5 text-grey1 px-2 mb-2">
    <Sheet>
      <div class="flex gap-4">
          <SheetTrigger> <Info/> </SheetTrigger>
      </div>
            
        <SheetContent class="dark:bg-vDarkBlue bg-[#F7F5FF] text-black pt-14" side="left">
            <SheetHeader>
                <SheetTitle> Steps fo campaign creation</SheetTitle>
                <div class="flex gap-8 flex-col text-black dark:text-white pt-5">
                    <p> 1. You must publish your campaign to make it available for creators to join.</p>
                    <p> 2. Once creators have joined and you are satisfied you can then proceed to make payments for the campaign. Be careful also to allow for all the creators to join as this determines the cost of the campaign and what you would eventually pay.</p>
                    <p>3. Once a campaign has been paid creators can then begin to make content. Please review content from the campaign you initiated and either approve or reject.</p>
                </div>
            </SheetHeader>
        </SheetContent>
    </Sheet>
    <nuxt-link to="/brands/dashboard/campaigns/create-campaign">
      <button class="rounded-lg flex gap-2 p-2 text-white bg-purple1 text-sm items-center "><Plus /> Create Campaign</button>
    </nuxt-link>
  </div>

  <div v-if="!loading && campaigns.length === 0">
    <p class="text-center">No campaigns created</p>
  </div>
  <div v-else class="mx-4 mt-5">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-white  dark:bg-darkBlue dark:text-purplebg"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Campaign Headline</th>
          <th scope="col" class="max-lg:hidden px-6 py-3">Cost</th>
          <th scope="col" class="max-lg:hidden px-6 py-3">Budget</th>
          <th scope="col" class="max-lg:hidden px-6 py-3">Status</th>
          <th scope="col" class="px-6 py-3">Pay</th>
          <th scope="col" class="px-6 py-3">Publish</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="campaign in campaigns"
          :key="campaign.id"
          class="bg-white border-b dark:bg-[#090618] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-darkBlue"
        >
          <th
            scope="row"
            class="pl-6 py-4 font-medium text-gray-900 text-wrap dark:text-white"
          >
            <p class="max-w-[100px] break-words">
              {{ campaign.headline }}
            </p>
          </th>
          <td class="max-lg:hidden pl-6 py-4">
            {{ campaign.cost?.toLocaleString() }}
          </td>
          <td class="pl-6 max-lg:hidden py-4">
            {{ campaign.budget?.toLocaleString() }}
          </td>
          <td class="max-lg:hidden pl-6 py-4">
            <UBadge
              size="xs"
              :label="campaign.isPaid ? 'Paid' : 'Not Paid'"
              :color="campaign.isPaid ? 'emerald' : 'orange'"
              variant="subtle"
            />
          </td>
          <td class="pl-6 py-4">
            <UButton
              v-if="campaign.isPaid"
              icon="i-heroicons-check"
              size="2xs"
              color="emerald"
              variant="outline"
              :ui="{ rounded: 'rounded-full' }"
              square
              :disabled="true"
            />
            <UButton
              v-else
              icon="i-heroicons-arrow-path"
              size="2xs"
              color="orange"
              variant="outline"
              :ui="{ rounded: 'rounded-full' }"
              square
              @click="handlePayment(campaign.id)"
            >
              Pay Now
            </UButton>
          </td>
          <td class="pl-6 py-4">
            <UButton
              v-if="campaign.isPublished"
              icon="i-heroicons-check"
              size="2xs"
              color="emerald"
              variant="outline"
              :ui="{ rounded: 'rounded-full' }"
              square
              :disabled="true"
            />
            <UButton
              v-else
              icon="i-heroicons-arrow-path"
              size="2xs"
              color="orange"
              variant="outline"
              :ui="{ rounded: 'rounded-full' }"
              square
              @click="publishCampaign(campaign.id)"
            >
              Publish Campaign
            </UButton>
          </td>
          <td class="relative">
            <button
              class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
              @click="toggleMenu(campaign.id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </button>
            <div
              v-if="openMenu === campaign.id"
              class="absolute right-0 z-10 mt-2 w-40 bg-white dark:bg-gray-900 rounded-md shadow-lg"
            >
              <ul class="py-1 text-sm text-gray-700 dark:text-gray-300">
                <li>
                  <button
                    class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    @click="viewDetails(campaign.id)"
                  >
                    View Details
                  </button>
                </li>
                <li>
                  <button
                    class="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    @click="editCampaign(campaign.id)"
                  >
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    class="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                    @click="deleteCampaign(campaign.id)"
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
  <div class="flex items-center justify-center py-6">
    <UButton
      v-if="page < last_Page"
      @click="page++"
      color="purple"
      variant="outline"
    >
      Load More
    </UButton>
  </div>
</template>
