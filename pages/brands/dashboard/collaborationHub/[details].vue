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

const sampleData = ref<ContentSubmissions[]>([])
const {toast}  = useToast();
const config = useRuntimeConfig();
const API_URL = config.public.API_URL ;
const requestHub = ref<Collaboration[]>([])
const userStore = useUserStore();
const route = useRoute();
const selectedTab = ref("Brief");
const campaignDetails = ref<CollabHubCampaign>()
const { details } = route.params;
const loading = ref(false)
const tabs = ref([
  { id: 1, tabs: "Brief" },
  { id: 2, tabs: "Applications" },
  { id: 3, tabs: "Content" },
  { id: 4, tabs: "Post & Analytics" },
]);

const singleCollabHub = async () => {
  

  try {
    loading.value = true
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

const creatorDecision = async(id:string, decision:boolean)=>{
 
 loading.value = true
 try {
   const res= await $fetch<PaginatedAPIResponse<'requests', Collaboration >>(`${API_URL}/campaign/collaboration-hub/shortlist-request`,
     {
     headers: { Authorization: `Bearer ${userStore.accessToken}`},
     method: 'post',
     body: {
       requestId: id,
       decision: decision,
       reason: ''
     }
   });
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
  <div class=" max-w-[100%] h-full flex flex-col gap-4 md:px-4">
    <nuxt-link class="mb-2 flex" to="/brands/dashboard/collaborationHub">
      <ArrowLeft />
      <h1 class="opacity-[56%]" >My campaigns</h1>
    </nuxt-link>
    <h1 class="font-bold text-3xl dark:text-white text-black">
      {{ campaignDetails?.headline }} 
    </h1>

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
     <div v-if="selectedTab === 'Brief'" class="flex flex-col gap-2 max-w-full">
      <BrandsCollaborationHubBrief :details=" campaignDetails!" :loading="loading" />
    </div>

    <!--Applications Section-->
    <div v-if="selectedTab === 'Applications'  " class="w-full h-full">
      <div
        class="w-full h-full flex flex-col gap-4 items-center justify-center"
      >
       <div v-if="requestHub.length === 0" >

          <p class="text-center mt-10">
            No applications received yet
          </p>
       </div>
       <div v-else v-for="(requests, rowIndex) in requestHub" class="w-full">
        <!-- {{ requests }} -->
         <!-- <BrandsCreatorsDecisionCard :creatorId="requests?.creatorProfileId" :requestId="requests?.id"/>       -->

         <div  class="w-full" >
          <div class="flex justify-between border-b w-full items-center py-2" >
            <p>Shortlist your top 6 by adding them to favourite before approving</p>
            <button class="flex gap-3 rounded-[100px] border p-2" > Favourites <Heart /> </button>
          </div>
          <div class="w-full flex justify-between border-b border-t p-8" >
            <h1 class="px-6" >Creators</h1>
            <h1>Engagement Rate</h1>
            <h1 class="px-6"  >Followers</h1>
          </div>
          <div  :key="requests.id" class="w-full border-b"  >
                <div class="w-full py-6 px-8 justify-between" >
                  <div class="flex justify-between  w-full" >
                    <div class="flex gap-3 items-center">
                      <!-- Button to remove from shortlist -->
                      <button @click="shortlistCreator(requests.id, false, rowIndex)" v-if="requests.isShorlisted">
                        <Heart color="red" />
                      
                      </button>

                      <!-- Button to add to shortlist -->
                      <button class="" @click="shortlistCreator(requests.id, true, rowIndex)" v-else>
                        <Heart color="black" />
                        
                      </button>

                      <p>{{ requests.platformProfile.fullName }}</p>
                    </div>
                    <p class="px-6 py-4">{{ requests.platformProfile.engagementRate }}%</p>
                    <!-- <td class="px-6 py-4">{{ creator.likes.toLocaleString() }}</td> -->
                    <p class="px-6 py-4">{{ requests.platformProfile.reputationFollowerCount.toLocaleString() }}</p>
                  </div>

                  <div class="flex gap-8">
                    
                    <button class="rounded-[100px] px-8 border border-purple1 text-purple1 py-2" >
                      Approve
                    </button>

                    <button  class="rounded-[100px] text-[#EE273E] border-[#EE273E] px-8 border py-2" >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
          

         </div>
       </div>
     
      </div>
    </div>

    <!-- <div v-else-if="selectedTab === 'Applications'" class="w-full h-full flex items-center justify-center" >
      <Lock />
    </div> -->

    <!--Content-->
    <div v-if="selectedTab === 'Content'" class="py-12">
      <!-- :content="sampleData" -->
     <div v-if="sampleData.length > 0" v-for="content in sampleData" :key="content.id">
      <BrandsCollaborationHubContent :content="sampleData" />
     </div>
     <div v-else>
        <p class="text-center">No content upload for approval yet</p>
     </div>
    </div>

    <!--Post and Analytics-->
    <div v-if="selectedTab === 'Post & Analytics'" class="py-12">
      <BrandsCollaborationHubPA />
    </div>
   </div>
  </div>
</template>
