<script setup lang="ts">
import { Heart, Lock, ArrowLeft } from "lucide-vue-next";
import type { ContentSubmissions, PaginatedAPIResponse,APIResponse,Collaboration, CollabHubCampaign } from "@/types";
import { useToast } from "../../../../components/ui/toast/use-toast";

definePageMeta({
  layout: "light",

});

// const sampleData: ContentSubmissions = {
//   id: "sub-12345",
//   campaignId: "camp-67890",
//   creatorId: "creator-54321",
//   url: "https://example.com/content/submission1",
//   type: "Video",
//   headline: "Amazing Product Launch",
//   submission_due_date: "2024-12-15T23:59:59Z",
//   campaignDescison: [
//     { decision: "pending", timeStamp: "2024-11-10T10:15:30Z" },
//   ],
//   creatorNote: [
//     {
//       note: "Uploaded the first draft for review.",
//       timestamp: "2024-11-07T09:00:00Z",
//     },
//     {
//       note: "Made changes based on feedback.",
//       timestamp: "2024-11-09T14:30:00Z",
//     },
//   ],
//   campaignNote: [
//     {
//       note: "Ensure the branding is consistent.",
//       timestamp: "2024-11-07T10:00:00Z",
//     },
//     {
//       note: "Request for higher quality visuals.",
//       timestamp: "2024-11-09T13:00:00Z",
//     },
//   ],
//   createdAt: "2024-11-05T08:00:00Z",
//   updatedAt: "2024-11-10T10:15:30Z",
//   campaignDecision: "pending",
//   decisionHistory: [{ decision: "pending", timeStamp: "2024-11-10T10:15:30Z" }],
//   creator: {
//     id: "creator-54321",
//     firstName: "John ",
//     lastName: "Doe",
//     email: "johndoe@example.com",
//     imgUrl: undefined,
//   },
//   campaign: {
//     id: "camp-67890",
//     description: "A campaign to promote our new product launch.",
//     startDate: "2024-11-01T00:00:00Z",
//     endDate: "2024-12-20T23:59:59Z",
//   },
// };

//variable decalrations

const getBrandCampaignStore = useGetBrandCampaignStore();
const sampleData = ref<ContentSubmissions[]>([])
const {toast}  = useToast();
const config = useRuntimeConfig();
const API_URL = config.public.API_URL ;
const requestHub = ref<Collaboration[]>([])
const userStore = useUserStore();
const route = useRoute();
const selectedTab = ref("Brief");
const campaignDetails = ref<CollabHubCampaign>()
const details = route.params.details as string;
const loading = ref(false)
const tabs = ref([
  { id: 1, tabs: "Brief" },
  { id: 2, tabs: "Applications" },
  { id: 3, tabs: "Content" },
  { id: 4, tabs: "Post & Analytics" },
]);

const handlePayment = async (id: string) => {
  try {
    const res = await getBrandCampaignStore.payForCampaign(id);
    navigateTo(res.url, { open: { target: "_blank", windowFeatures: { width: 500, height: 500 } } });
    setTimeout(getDetails, 10000);
  } catch (error: any) {
    toast({ title: error.message || "Payment failed" });
  }
};

const singleCollabHub = async () => {
  loading.value = true
  try {
   
    const res= await $fetch<APIResponse<'campaign', CollabHubCampaign >>(`${API_URL}/campaign/collaboration-hub/get-one/${details}`);    
    campaignDetails.value = res.data.campaign
    loading.value = false;

  } catch (error: any) {
    loading.value = false;
    
    toast({ title: error.data?.message || "Something went wrong" });
  }
};

const shortlistCreator = async(id:string, decision:boolean, rowIndex)=>{
 
  loading.value = true
  try {
    const res= await $fetch<PaginatedAPIResponse<'requests', Collaboration >>(`${API_URL}/campaign/collaboration-hub/shortlist-request`,
      {
      headers: { Authorization: `Bearer ${userStore.accessToken}`},
      method: 'post',
      body: {
        requestId: id,
        decision: decision
      }
    });
    const index = requestHub.value.findIndex((req) => req.id === id);
    if (index !== -1) {
      requestHub.value[index].isShorlisted = decision;
    }
    loading.value = false
    
  } catch (error: any) {
    loading.value = false
    return null;
  }
}

const creatorDecision = async(id:string, decision:string)=>{
 
 loading.value = true
 try {
   const res= await $fetch<PaginatedAPIResponse<'requests', Collaboration >>(`${API_URL}/campaign/collaboration-hub/decide-on-request`,
     {
     headers: { Authorization: `Bearer ${userStore.accessToken}`},
     method: 'post',
     body: {
       requestId: id,
       decision: decision,
       reason: ''
     }
   });
   const index = requestHub.value.findIndex((req) => req.id === id);
    if (index !== -1) {
      requestHub.value[index].campaignDecision = decision;
    }
   requestHub.value = res.data.requests.data
   loading.value = false
   
 } catch (error: any) {
   loading.value = false
   return null;
 }
}



const getDetails = async()=>{
  const { details } = route.params;
  loading.value = true
  try {
    const res= await $fetch<PaginatedAPIResponse<'requests', Collaboration >>(`${API_URL}/campaign/collaboration-hub/${details}/requests`,
      {
      headers: { Authorization: `Bearer ${userStore.accessToken}`}
    });
    requestHub.value = res.data.requests.data
    loading.value = false
    
  } catch (error: any) {
    console.error('Error fetching collaboration hub:', error);
    loading.value = false
    return null;
  }
}
watchEffect(async() => { await getDetails(), await singleCollabHub() })
</script>

<template>
  <div class="  flex flex-col gap-4 h-full ">
    <div class="p-6" >
      <nuxt-link class="mb-2 flex" to="/brands/dashboard/collaborationHub">
        <ArrowLeft />
        <h1 class="opacity-[56%]" >My campaigns</h1>
      </nuxt-link>
      <h1 class="font-bold text-3xl dark:text-white text-black mt-6">
        {{ campaignDetails?.headline }} 
      </h1>
    </div>

    <div class="h-full " >
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

    <div class="w-full h-full">
      <!--Brief section-->
      <div v-if="selectedTab === 'Brief' " class="flex flex-col gap-2 max-w-full ">
        <BrandsCollaborationHubBrief :id="details" />
      </div>

      <!--Applications Section-->
      <div v-if="selectedTab === 'Applications'  && campaignDetails" class=" h-full w-full ">
       <BrandsCollaborationHubApplications :id="details" :isPaid="campaignDetails.isPaid" :cost="campaignDetails.cost" />
      </div>



      <!--Content-->
      <div v-if="selectedTab === 'Content' && campaignDetails" class="py-12 h-full">
        <BrandsCollaborationHubContent :id="details" :isPaid="campaignDetails.isPaid" />
      </div>

      <!--Post and Analytics-->
      <div v-if="selectedTab === 'Post & Analytics' && campaignDetails" class="py-12   px-4">
        <BrandsCollaborationHubPA :id="details" />
      </div>
    </div>
    </div>
  </div>
</template>
