<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "../../../../../components/ui/toast/use-toast";

definePageMeta({
  layout: "brands",
});

import { format } from "date-fns";

const createBrandCampaignStore = useCreateBrandCampaignStore();
const { toast } = useToast();
const { startDate, endDate, submissionDueDate } = storeToRefs(createBrandCampaignStore);

const goToReview = () => {
  if (
    submissionDueDate.value > startDate.value ||
    submissionDueDate.value > endDate.value
  ) {
    toast({ title: "Submission due date must come before start and end date" });
    return;
  } else if (startDate.value > endDate.value) {
    toast({ title: "Start date must come before end date" });
    return;
  } else {
    navigateTo("/brands/dashboard/campaigns/create-campaign/campaign-review");
  }
};
</script>

<template>
  <div class="px-2 md:px-12">
    <brandsCampaignStage v-bind:content="true" v-bind:influencer="true" />
    <div
      class="bg-vDarkBlue text-white flex items-center mt-5 flex-col gap-5 p-6 md:p-16"
    >
      <div class="flex w-full gap-5">
        <div class="basis-1/2 flex flex-col">
          <p>Campaign Start Date</p>

          <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton
              class="w-full p-3 border-2 border-darkBlue"
              icon="i-heroicons-calendar-days-20-solid"
              :label="format(startDate, 'd MMM, yyy')"
            />

            <template #panel="{ close }">
              <DatePicker v-model="startDate" is-required @close="close" />
            </template>
          </UPopover>
        </div>

        <div class="basis-1/2 flex flex-col">
          <p>Campaign End Date</p>

          <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton
              class="w-full p-3 border-2 border-darkBlue"
              :label="format(endDate, 'd MMM, yyy')"
              icon="i-heroicons-calendar-days-20-solid"
            />

            <template #panel="{ close }">
              <DatePicker v-model="endDate" is-required @close="close" />
            </template>
          </UPopover>
        </div>
      </div>

      <div class="w-full">
        <div class="basis-1/2 flex flex-col">
          <p class="text-nowrap">Content Approval Due Date</p>

          <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton
              class="w-full p-3 border-2 border-darkBlue"
              :label="format(submissionDueDate, 'd MMM, yyy')"
              icon="i-heroicons-calendar-days-20-solid"
            />

            <template #panel="{ close }">
              <DatePicker v-model="submissionDueDate" is-required @close="close" />
            </template>
          </UPopover>
        </div>
      </div>

      <div class="flex w-full gap-5">
        <!-- <div class="flex basis-1/2 flex-col">
                    <p>Number of posts per influencer</p>
                    <input class="border-2 p-2 bg-transparent border-darkBlue" placeholder="1" type="number" >
                </div> -->
      </div>
    </div>

    <div class="flex gap-2 pt-4">
      <nuxt-link
        class="basis-1/3 text-white border-purplebg border-[0.5px] rounded flex items-center justify-center"
        to="/brands/dashboard/campaigns/create-campaign/campaign-influencer"
      >
        Back
      </nuxt-link>

      <button
        @click="goToReview()"
        class="basis-2/3 text-white bg-[#5331E8] rounded p-3 flex justify-center items-center"
      >
        <div>Next</div>
      </button>
    </div>
  </div>
</template>
