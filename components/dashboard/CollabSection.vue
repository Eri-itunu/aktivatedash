<script setup>
import { ref } from 'vue';

const scrollContainer = ref(null);
const isAtStart = ref(true);
const collabStore = useCollabStore();
const { pending, collabCampaigns } = storeToRefs(collabStore)


watchEffect(async() => await collabStore.getCollabHub())

const handleScroll = () => {
  console.log(container.scrollLeft, container.clientWidth, container.scrollWidth)
  const container = scrollContainer.value;
  isAtStart.value = container.scrollLeft === 0;
  // isAtEnd.value = container.scrollLeft + container.clientWidth === container.scrollWidth;
};


const scrollRight = () => {
  scrollContainer.value.scrollBy({
    left: 300, // Adjust as needed
    behavior: 'smooth'
  });
};

const scrollLeft = () => {
  scrollContainer.value.scrollBy({
    left: -300, // Adjust as needed
    behavior: 'smooth'
  });
};


</script>


<template>
<div>
  <div v-if="pending">
    loading....
    <Spinner :loading="pending" />
  </div>
  <!-- Collaboration Hub -->
  <div v-else class="">
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
    <div  ref="scrollContainer" class="flex gap-3 pb-2  my-scroll">
      <div class="w-[20rem]" v-for="collab in collabCampaigns" :key="collab.id" >
        <CollabCard :collab="collab" />
      </div>
    </div>
  </div>
  <!-- end Collaboration Hub -->
</div>
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