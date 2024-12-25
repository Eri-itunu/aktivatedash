<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "../../../../../../components/ui/toast/use-toast";
definePageMeta({
  layout: "light",

});

const dropdownSocials = ref(false);
const dropdownMedia = ref(false);
const createBrandCampaignStore = useCreateBrandCampaignStore();
const { rateObject, creators, price, audience } = storeToRefs(
  createBrandCampaignStore
);
const { toast } = useToast();
const isOpen = ref(false);
const computedAudience = computed(() => {
  return audience.value?.toLocaleString();
});
function dropSocial() {
  dropdownSocials.value = !dropdownSocials.value;
}
function dropMedia() {
  dropdownMedia.value = !dropdownMedia.value;
}

const selectInfluencer = () => {
  if (rateObject.value.length === 0) {
    toast({ title: "No Influencer Selected" });
    return;
  }

  navigateTo("/brands/dashboard/campaigns/create-campaign/campaign-timeline");
};
</script>

<template>
  <div class="">
    <brandsCampaignStage v-bind:content="true" />

    <div class="bg-white dark:bg-vDarkBlue p-4 mt-5 flex flex-col gap-4">
      <!-- <div class="flex gap-2 text-white">
        <button class="flex items-center px-4 py-2 rounded-lg bg-[#100C21]">
          Engagement Rate
          <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 12l-6-6h12l-6 6z" clip-rule="evenodd" />
          </svg>
        </button>

        <button class="flex items-center px-4 py-2 rounded-lg bg-[#100C21]">
          Price
          <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 12l-6-6h12l-6 6z" clip-rule="evenodd" />
          </svg>
        </button>

        <button class="flex items-center px-4 py-2 rounded-lg bg-[#100C21]">
          Followers
          <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 12l-6-6h12l-6 6z" clip-rule="evenodd" />
          </svg>
        </button>
      </div> -->

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
