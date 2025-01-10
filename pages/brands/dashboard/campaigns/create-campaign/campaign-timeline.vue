<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "../../../../../components/ui/toast/use-toast";
import { Info } from 'lucide-vue-next';

definePageMeta({
  layout: "light",

});


const attrs = ref([
  {
    key: "today",
    highlight: {
      color: "green",
      fillMode: "solid",
    },
    dates: new Date(),
  },
]);

import { format } from "date-fns";
const date = new Date();

const timelineDueDate = ref(new Date(date.setDate(date.getDate() + 3)));
const timelineStartDate = ref(new Date(date.setDate(date.getDate() +7)));
const timelineEndDate = ref(new Date(date.setDate(date.getDate() + 14)));

const createBrandCampaignStore = useCreateBrandCampaignStore();
const { toast } = useToast();
const { startDate, endDate, submissionDueDate } = storeToRefs(
  createBrandCampaignStore
);
const todaysDate = ref(new Date());


const goToReview = () => {
  // Helper function to calculate the difference in days between two dates
  const getDifferenceInDays = (date1, date2) => {
    const msInDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
    return Math.floor((new Date(date2).getTime() - new Date(date1).getTime()) / msInDay);
  };

  if (
    timelineDueDate.value > timelineStartDate.value ||
    timelineDueDate.value > timelineEndDate.value
  ) {
    toast({ title: "Content approval date must come before start and end date" });
    return;
  } else if (timelineStartDate.value > timelineEndDate.value) {
    toast({ title: "Start date must come before end date" });
    return;
  } else if (timelineDueDate.value < todaysDate.value) {
    toast({ title: "Content approval date cannot be before today's date" });
    return;
  } else if (timelineStartDate.value < todaysDate.value) {
    toast({ title: "Invalid start date" });
    return;
  } else if (timelineEndDate.value < todaysDate.value) {
    toast({ title: "Invalid end date" });
    return;
  } else if (getDifferenceInDays(todaysDate.value, timelineDueDate.value) < 3) {
    toast({ title: "Content approval date must be at least 3 days from today" });
    return;
  } else if (getDifferenceInDays(timelineDueDate.value, timelineStartDate.value) < 3) {
    toast({ title: "Start date must be at least 3 days after the content approval due date" });
    return;
  } else if (getDifferenceInDays(timelineStartDate.value, timelineEndDate.value) < 3) {
    toast({ title: "End date must be at least 3 days after the campaign start date" });
    return;
  } else {
    startDate.value = timelineStartDate.value;
    endDate.value = timelineEndDate.value;
    submissionDueDate.value = timelineDueDate.value;
    navigateTo("/brands/dashboard/campaigns/create-campaign/campaign-review");
  }
};

</script>

<template>
  <div class="px-2 md:px-12">
    <brandsCampaignStage v-bind:content="true" v-bind:influencer="true" />
    <div
      class="bg-white dark:bg-vDarkBlue text-black dark:text-white flex items-center mt-5 flex-col gap-5 p-6 md:p-16"
    >

    <div class="rounded-lg text-black w-full dark:text-white" >
      <p class="flex rounded-lg bg-opacity-[10%] bg-purplebg py-4 px-2 w-full text-left  gap-2"> <Info /> Content approval date should be three days from current date to allow for reviews and approval</p>
    </div>
    <div class="w-full">
        <div class="basis-1/2 flex flex-col">
          <p class="text-nowrap">Content Approval Due Date </p>

          <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton
              class="w-full p-3 border-2 border-darkBlue"
              :label="format(timelineDueDate, 'd MMM, yyy')"
              icon="i-heroicons-calendar-days-20-solid"
            />

            <template #panel="{ close }">
              <DatePicker
                v-model="timelineDueDate"
                is-required
                @close="close"
              />
            </template>
          </UPopover>
        </div>
      </div> 
      <div class="flex w-full gap-5">
        <div class="basis-1/2 flex flex-col">
          <p>Campaign Start Date</p>

          <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton
              class="w-full p-3 border-2 border-darkBlue"
              icon="i-heroicons-calendar-days-20-solid"
              :label="format(timelineStartDate, 'd MMM, yyy')"
            />

            <template #panel="{ close }">
              <DatePicker v-model="timelineStartDate" is-required @close="close" />
            </template>
          </UPopover>
        </div>

        <div class="basis-1/2 flex flex-col">
          <p>Campaign End Date</p>

          <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton
              class="w-full p-3 border-2 border-darkBlue"
              :label="format(timelineEndDate, 'd MMM, yyy')"
              icon="i-heroicons-calendar-days-20-solid"
            />

            <template #panel="{ close }">
              <DatePicker v-model="timelineEndDate" is-required @close="close" />
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
        class="basis-1/3 text-black dark:text-white border-purplebg border-[0.5px] rounded flex items-center justify-center"
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
