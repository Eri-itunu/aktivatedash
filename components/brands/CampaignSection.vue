<script setup lang="ts">

import { ref, computed } from 'vue';
import type { ICampaign } from "types";
const props = defineProps<{ campaigns: ICampaign[], loading: Boolean, empty:Boolean}>()

const scrollContainer = ref();
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
    <div class="flex justify-between text-sm py-4 pr-3 ">
      <div class="flex gap-5 items-center">
        <p class="text-xl font-bold" >Your Campaigns</p>
       
      </div>
      <div class="flex gap-3">
        <nuxt-link to="/brands/dashboard/campaigns">
          <p class="underline">See all</p>
        </nuxt-link>
        <div class="flex gap-2">
          <!-- Active left -->
          <img
            @click="scrollLeft"
            class="object-contain rotate-180"
            src="/icons/arrow-circle-right.svg"
            alt=""
          />
          <!-- Active right -->
          <img
            @click="scrollRight"
            class="object-contain"
            src="/icons/arrow-circle-right.svg"
            alt=""
          />
        </div>
      </div>
    </div>
    <div v-if="empty" class="">
      <p>You currently have no created campaigns</p>
    </div>
    <div v-if="loading" class="flex gap-3 my-scroll">
      <CreatorLoadinCampaignCard />
      <CreatorLoadinCampaignCard />
    </div>
    <div v-else ref="scrollContainer" class="flex gap-3 w-full overflow-x-scroll">
      <div  v-for="campaign in campaigns" :key="campaign.id">
        <BrandsCampaignCardM :campaign="campaign"  />
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