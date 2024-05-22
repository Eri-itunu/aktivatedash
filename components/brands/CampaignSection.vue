<script setup lang="ts">

import { ref, computed } from 'vue';
import type { ICampaign } from "types";
const props = defineProps<{ campaigns: ICampaign, loading: Boolean}>()

const scrollContainer = ref(null);
const isAtStart = ref(true);

const scrollRight = () => {
  scrollContainer.value.scrollBy({
    left: 200, // Adjust as needed
    behavior: 'smooth'
  });
};

const scrollLeft = () => {
  scrollContainer.value.scrollBy({
    left: -200, // Adjust as needed
    behavior: 'smooth'
  });
};

const active = ref(true)


</script>


<template>
  <!-- Campaigns  -->
  <div class="">
    <div class="flex justify-between text-sm py-4 pr-3 text-grey1">
      <div class="flex gap-5 items-center">
        <p> Campaigns</p>
        <div>
          <button class="px-2 py-1 text-xs bg-[#3A3846] rounded-full">Active</button>
          <button class="px-2 py-1 text-xs rounded-full">Pending</button>
        </div>
      </div>
      <div class="flex gap-3">
        <nuxt-link to="/brands/dashboard/campaigns" >
          <p class="underline">See all</p>
        </nuxt-link>
        <div class="flex gap-2">
            <!-- Active left -->
            <img @click="scrollLeft" class="object-contain rotate-180" src="/assets/icons/arrow-circle-right.svg" alt="">
            <!-- Active right -->
            <img  @click="scrollRight" class="object-contain" src="/assets/icons/arrow-circle-right.svg" alt="">
        </div>
      </div>
    </div>
    <div v-if="active" ref="scrollContainer" class="flex gap-3 md:gap-3 my-scroll">
      <div v-if="loading">
        nothing here
      </div>
      <div v-else  class="flex gap-10">
        <div v-for="campaign in campaigns"  :key="campaign.id" class="w-[25rem] ">
          <BrandsCampaignCardM :campaign = "campaign"/>
        </div>
      </div>
    </div>
  </div>
  <!-- END Campaigns -->
</template>

<style scoped>
  .my-scroll {
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .my-scroll::-webkit-scrollbar {
    display: none
  }
</style>