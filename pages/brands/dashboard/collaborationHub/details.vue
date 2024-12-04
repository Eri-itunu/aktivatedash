<script setup lang="ts">
import { FileStack } from "lucide-vue-next";
import type { ContentSubmissions } from "@/types";

definePageMeta({
  layout: "light",

});

const sampleData: ContentSubmissions = {
  id: "sub-12345",
  campaignId: "camp-67890",
  creatorId: "creator-54321",
  url: "https://example.com/content/submission1",
  type: "Video",
  headline: "Amazing Product Launch",
  submission_due_date: "2024-12-15T23:59:59Z",
  campaignDescison: [
    { decision: "pending", timeStamp: "2024-11-10T10:15:30Z" },
  ],
  creatorNote: [
    {
      note: "Uploaded the first draft for review.",
      timestamp: "2024-11-07T09:00:00Z",
    },
    {
      note: "Made changes based on feedback.",
      timestamp: "2024-11-09T14:30:00Z",
    },
  ],
  campaignNote: [
    {
      note: "Ensure the branding is consistent.",
      timestamp: "2024-11-07T10:00:00Z",
    },
    {
      note: "Request for higher quality visuals.",
      timestamp: "2024-11-09T13:00:00Z",
    },
  ],
  createdAt: "2024-11-05T08:00:00Z",
  updatedAt: "2024-11-10T10:15:30Z",
  campaignDecision: "pending",
  decisionHistory: [{ decision: "pending", timeStamp: "2024-11-10T10:15:30Z" }],
  creator: {
    id: "creator-54321",
    firstName: "John ",
    lastName: "Doe",
    email: "johndoe@example.com",
    imgUrl: undefined,
  },
  campaign: {
    id: "camp-67890",
    description: "A campaign to promote our new product launch.",
    startDate: "2024-11-01T00:00:00Z",
    endDate: "2024-12-20T23:59:59Z",
  },
};

//variable decalrations
const selectedTab = ref("Brief");
const tabs = ref([
  { id: 1, tabs: "Brief" },
  { id: 2, tabs: "Applications" },
  { id: 3, tabs: "Content" },
  { id: 4, tabs: "Post & Analytics" },
]);
</script>

<template>
  <div class="overflow-hidden max-w-[100%] flex flex-col gap-4 px-4">
    <nuxt-link class="mb-2 flex" to="/brands/dashboard/collaborationHub">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z"
          fill="currentColor"
        />
      </svg>
      <span>
        <h4>My camapigns</h4>
        <h1 class="font-bold text-3xl dark:text-white text-black">
          Easy, Breezy Beautiful Campaign
        </h1>
      </span>
    </nuxt-link>

    <!-- Tab switching section -->
    <section class="tab-section text-white flex w-full">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        :class="[
          ' basis-1/3 cursor-pointer text-center  p-4  flex max-w-fit text-sm',
          tab.tabs === selectedTab
            ? ' border-b-purple1 border-b-[2px] text-purple1'
            : 'border-b-[1px] border-b-[#D9D9D9]/50  text-[#D9D9D9]',
        ]"
        @click="selectedTab = tab.tabs"
      >
        {{ tab.tabs }}
      </div>
      <div class="border-b-[#D9D9D9]/50 border-b-[1px] w-full"></div>
    </section>

    <!--Brief section-->
    <div v-if="selectedTab === 'Brief'" class="flex flex-col gap-2 max-w-full">
      <BrandsCollaborationHubBrief />
    </div>

    <!--Applications Section-->
    <div v-if="selectedTab === 'Applications'" class="w-full h-full">
      <div
        class="w-full h-full flex flex-col gap-4 items-center justify-center"
      >
        <FileStack color="#5331e8" />
        <p class="text-center">
          No creators application approved. Once you approve creators, you’ll
          see their profile and shipping info here
        </p>
      </div>
    </div>

    <!--Content-->
    <div v-if="selectedTab === 'Content'" class="py-12">
      <BrandsContentCard :content="sampleData" />
    </div>

    <!--Post and Analytics-->
    <div v-if="selectedTab === 'Post & Analytics'" class="py-12">
      <BrandsCollaborationHubPA />
    </div>
  </div>
</template>
