<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  layout: "brands",
});

const dropdownSocials = ref(false);
const dropdownMedia = ref(false);
const createBrandCampaignStore = useCreateBrandCampaignStore();
const { rateObject } = storeToRefs(createBrandCampaignStore);
const toast = useToast()
function dropSocial() {
  dropdownSocials.value = !dropdownSocials.value;

}
function dropMedia() { 
  dropdownMedia.value = !dropdownMedia.value;
}

const selectInfluencer = () => {
  console.log('okay')
  console.log(rateObject.value)
  if (rateObject.value.length === 0){
    toast.add({title : "No Influencer Selected"})
    return
  }

  navigateTo('/brands/dashboard/campaigns/create-campaign/campaign-timeline')
}
</script>

<template>
  <div class="">
    <brandsCampaignStage v-bind:content="true" />

    <div class="bg-vDarkBlue p-4 mt-5 flex flex-col gap-4">
      <BrandsInfluencerSelect />
    </div>

    <div class="flex gap-2 pt-4">
      <nuxt-link
        class="basis-1/3 text-white border-purplebg border-[0.5px] flex items-center justify-center rounded"
        to="/brands/dashboard/campaigns/create-campaign"
      >
        <div>Back</div>
      </nuxt-link>
      <button
        class="basis-2/3 bg-[#5331E8] text-white flex items-center justify-center rounded p-3"
        @click="selectInfluencer"
      >
        Next
    </button>
    </div>
  </div>
</template>
