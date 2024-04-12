<script setup>

import { ref, computed } from 'vue';

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

</script>


<template>
  <!-- Campaigns  -->
  <div class="">
    <div class="flex justify-between text-sm py-4 pr-3 text-grey1">
      <div class="flex gap-5 items-center">
        <p> Campaigns</p>
        <div>
          <button class="px-2 py-1 text-xs bg-[#3A3846] rounded-full">Active</button>
          <button class="px-2 py-1 text-xs rounded-full">Requests</button>
        </div>
      </div>
      <div class="flex gap-3">
        <nuxt-link to="/dashboard/campaigns" >
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
    <div ref="scrollContainer" class="flex md:gap-3 overflow-x-scroll">
      <CampaignCard />
      <CampaignCard />
      <CampaignCard />
      <CampaignCard />
      <CampaignCard />
    </div>
  </div>
  <!-- END Campaigns -->
</template>