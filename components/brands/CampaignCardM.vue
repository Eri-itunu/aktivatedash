<script setup lang="ts">
import { format } from 'date-fns';
import type { ICampaign } from "types";
import { calcProgress } from "../../utils";
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  campaign: ICampaign
}>();

const router = useRouter();
const progress = computed(() => calcProgress(props.campaign.startDate, props.campaign.endDate));

const navigateToCampaign = () => {
  router.push({
    path: '/brands/dashboard/campaigns/' + props.campaign.id
  });
};

const formatDate = (date: string) => {
  return format(new Date(date), 'MMM dd, yyyy');
};

const socialPlatforms = computed(() => [
  { name: 'facebook', icon: '/icons/collab/facebook.svg' },
  { name: 'instagram', icon: '/icons/collab/instagram.svg' },
  { name: 'tiktok', icon: '/icons/collab/tiktok.svg' },
  { name: 'x', icon: '/icons/collab/twitter.svg' },
  { name: 'whatsapp', icon: '/icons/collab/whatsapp.svg' },
  { name: 'snapchat', icon: '/icons/collab/snapchat.svg' },
  { name: 'linkedin', icon: '/icons/collab/linkedin.svg' },
  { name: 'youtube', icon: '/icons/collab/youtube.svg' }
].filter(platform => props.campaign?.deliverables?.platform.includes(platform.name)));
</script>

<template>
  <div
    @click="navigateToCampaign"
    class="w-[280px] cursor-pointer sm:w-[450px] rounded-lg bg-white dark:bg-vDarkBlue pb-2"
  >
    <!-- Section A -->
    <div class="px-3 border-b border-b-darkBlue">
      <div class="flex justify-between py-3 items-end" />

      <!-- Campaign Header -->
      <div class="flex justify-between items-center mb-2">
        <p class="line-clamp-2 text-ellipsis text-black dark:text-white">{{ campaign.headline }}</p>
      </div>

      <!-- Campaign Image -->
      <div class="flex relative justify-center bg-purplelabel rounded-lg h-40">
        <img
          :src="campaign.images?.[0] || '/assets/images/created.svg'"
          class="object-fit w-full h-full"
          :class="{ 'w-full h-full': campaign.images?.[0] }"
          alt="Campaign Image"
        />
      </div>

      <!-- Campaign Description -->
      <p class="uppercase text-[10px] font-thin text-gray-400 my-2">Campaign Description</p>
      <p class="line-clamp-1 text-ellipsis text-[15px] mb-2 text-gray-600 dark:text-gray-300 font-light">
        {{ campaign.description }}
      </p>
    </div>

    <!-- Section B -->
    <div class="flex flex-col gap-3 px-3 py-3">
      <div class="flex flex-col md:flex-row justify-between items-center gap-2">
        <!-- Date Information -->
        <div class="flex gap-2 items-center">
          <div class="flex flex-col items-center max-w-min">
            <div class="h-2 w-2 rounded-full bg-grey1"></div>
            <div class="h-4 w-[0.05rem] rounded-full bg-grey1"></div>
            <div class="h-2 w-2 rounded-full bg-grey1"></div>
          </div>
          <div class="text-sm text-[#CDC2FF] text-nowrap">
            <p class="p-1">
              Start Date:
              <span class="font-light text-xs pl-3.5">{{ formatDate(campaign.startDate) }}</span>
            </p>
            <p class="p-1">
              End Date:
              <span class="font-light text-xs pl-5">{{ formatDate(campaign.endDate) }}</span>
            </p>
          </div>
        </div>

        <!-- Social Platform Icons -->
        <div class="flex gap-1 overflow-hidden">
          <template v-for="platform in socialPlatforms" :key="platform.name">
            <img
              :src="platform.icon"
              :alt="platform.name"
              class="object-contain"
            />
          </template>
        </div>
      </div>

      <!-- Progress Bar -->
      <ProgressBar :percentage="progress" />
    </div>
  </div>
</template>
