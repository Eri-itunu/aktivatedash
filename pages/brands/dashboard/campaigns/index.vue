<script setup lang="ts">
definePageMeta({
  layout: "brands",
  colorMode: "dark",
});

import type { ICampaign, ResponseMessage } from "types";
const config = useRuntimeConfig();
const API_URL = config.public.API_URL;
const toast = useToast();
const getBrandCampaignStore = useGetBrandCampaignStore();
const campaigns = ref<ICampaign[]>([]);
const isPublished = ref(false);
const loading = ref(true);

const page = ref<number>(1);
const lastPage = ref<number>(1);

const getCampaigns = async (page?: number) => {
  const filter = {
    limit: "7",
    page: page?.toString() || "1",
  };
  const qs = new URLSearchParams(filter);
  try {
    const {
      data,
      meta: { last_page },
    } = await getBrandCampaignStore.getBrandCampaigns(qs.toString());

    campaigns.value.push(...data);
    lastPage.value = last_page;
    loading.value = false;
  } catch (error: any) {
    toast.add({ title: error.message });
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
    toast.add({ title: error.message });
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
    toast.add({ title: "Published successfully" });
    await getCampaigns();
  } catch (error: any) {
    toast.add({ title: error.data?.message || "Something went wrong" });
  }
}
</script>

<template>
  <div class="flex gap-5 items-center justify-end mt-5 text-grey1 px-2 mb-2">
    <nuxt-link to="/brands/dashboard/campaigns/create-campaign">
      <button class="rounded-[100px] bg">Create New Campaign</button>
    </nuxt-link>
  </div>

  <!-- <div v-if="campaigns.length == 0">
  No campaigns created
</div> -->
  <div class="mx-4 mt-10">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-darkBlue dark:bg-darkBlue dark:text-purplebg"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Campagin Headline</th>

            <th scope="col" class="px-6 py-3">Cost</th>
            <th scope="col" class="px-6 py-3">Budget</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3">Pay</th>
            <th scope="col" class="px-6 py-3">Publish</th>

            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td class="px-6 py-4">
              <USkeleton class="h-4 w-[250px]" />
            </td>
            <td class="px-6 py-4">
              <USkeleton class="h-4 w-[250px]" />
            </td>
            <td class="px-6 py-4">
              <USkeleton class="h-4 w-[250px]" />
            </td>
            <td class="px-6 py-4">
              <USkeleton class="h-4 w-[250px]" />
            </td>
            <td class="px-6 py-4">
              <USkeleton class="h-4 w-[250px]" />
            </td>
            <td class="px-6 py-4">
              <USkeleton class="h-4 w-[250px]" />
            </td>
            <td class="px-6 py-4">
              <USkeleton class="h-4 w-[250px]" />
            </td>
          </tr>
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

            <td class="pl-6 py-4">
              {{ campaign.cost?.toLocaleString() }}
            </td>
            <td class="pl-6 py-4">
              {{ campaign.budget?.toLocaleString() }}
            </td>
            <td class="pl-6 py-4">
              <UBadge
                size="xs"
                :label="campaign.is_paid ? 'Paid' : 'Not Paid'"
                :color="campaign.is_paid ? 'emerald' : 'orange'"
                variant="subtle"
              />
            </td>
            <td class="pl-6 py-4">
              <UButton
                v-if="campaign.is_paid"
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
                v-if="campaign.is_published"
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

            <td>
              <button @click="$router.push(`/brands/dashboard/campaigns/${campaign.id}`)">
                View Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="flex items-center justify-center py-6">
    <UButton v-if="page < lastPage" @click="page++" color="purple" variant="outline">
      Load More
    </UButton>
  </div>
</template>
