<script setup>

import collabs from '../../mock/collabs';


import { ref, computed } from 'vue';

const scrollContainer = ref(null);
const isAtStart = ref(true);
// const isAtEnd = ref(false);

// const isAtEnd = computed(() => )

const handleScroll = () => {
  console.log(container.scrollLeft, container.clientWidth, container.scrollWidth)
  const container = scrollContainer.value;
  isAtStart.value = container.scrollLeft === 0;
  isAtEnd.value = container.scrollLeft + container.clientWidth === container.scrollWidth;
};


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
  <!-- Collaboration Hub -->
  <div>
    <div class="flex justify-between text-sm py-4 pr-3 text-grey1">
      <p> Collaboration Hub</p>
      <div class="flex gap-3">
        <nuxt-link to="/dashboard/collaboration-hub">
          <p class="underline">See all</p>
        </nuxt-link>

        <!-- Scoll card feature faded and bright buttons/images for left and rght arrows -->
        <div class="flex gap-2">
          <!-- Inactive left --><!-- 
          <img v-if="isAtStart.value"  class="object-contain" src="/assets/icons/arrow-circle-left.svg"  alt=""> -->
         
          <!-- Active left -->
          <img @click="scrollLeft" class="object-contain rotate-180" src="/assets/icons/arrow-circle-right.svg" alt="">
          <!-- Active right -->
          <img  @click="scrollRight" class="object-contain" src="/assets/icons/arrow-circle-right.svg" alt="">
        </div>
      </div>
    </div>
    <div  ref="scrollContainer" class="flex gap-3 pb-2 overflow-x-scroll">
      <CollabCard
        v-for="collab in collabs"
        :key="collab.id" :collab="collab"
      />
    </div>
  </div>
  <!-- end Collaboration Hub -->
</template>