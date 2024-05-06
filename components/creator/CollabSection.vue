<script setup lang="ts">

import { ref } from 'vue';
import { getCollaborationHub } from "../../api/creator/campaign/campaign.creator";
import type { ICampaign } from 'types';

const config = useRuntimeConfig()
const API_URL = config.public.API_URL || "http://localhost:3333/api/v2";

const userStore = useUserStore();

const scrollContainer = ref();
const isAtStart = ref(true);

const collabCampaigns = ref<ICampaign[]>([]);
const pending = ref(false);

const loadCollaborationHub = async() => {
  const filter = {
    limit: "5",
    page: "1",
    platformType: "",
    contentType: "",
    currency: "NGN",
    price: "",
  }
  const qs = new URLSearchParams(filter)
  try {
    pending.value = true
    const { data } = await getCollaborationHub({
      apiUrl: API_URL,
      accessToken: userStore.accessToken as string,
      qs: qs.toString()
    })
    pending.value = false
    collabCampaigns.value.push(...data)
  } catch(err) {
    pending.value = false
    console.error(err)
  }
}

const handleScroll = () => {
  const container = scrollContainer.value;
  console.log(container.scrollLeft, container.clientWidth, container.scrollWidth)
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

watchEffect(async() => await loadCollaborationHub() )

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
        <CreatorCollabCard :collab="collab" />
      </div>
      <div v-if="collabCampaigns.length===0" class="w-full" >
        <p class="w-full text-center">No Campaigns in Collaboration Hub</p>
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