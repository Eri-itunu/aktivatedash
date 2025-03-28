<script setup lang="ts">
  definePageMeta({ layout: 'light' });

  import { useToast } from '@/components/ui/toast/use-toast';
  import { ArrowLeft, CircleCheckBig, CircleAlert } from 'lucide-vue-next';
  import { useCollabHubStore } from '@/stores/collabHubStore';
  import { formatDate } from '@/utils';
  const { toast } = useToast();
  const createCollaboration = useCollabHubStore();
  const loading = ref(false);

// const campaign = async () => {
//   loading.value = true;
//   try {
//     const res = await createCollaboration.createCampaign();
    
//     loading.value= false
//     setTimeout(() => {
//     navigateTo('/brands/dashboard/collaborationHub');
//   }, 1000);
//   } catch (error: any) {
//     loading.value= false
//     toast({ title: error });
//   } 
// };

const campaign = async () => {
  loading.value = true; // Start loading state
  try {
    const res = await createCollaboration.createCampaign();
    console.log(res)
    if (!res.error) {
      // Successful response
      navigateTo('/brands/dashboard/collaborationHub');
      toast({ title: "Campaign successfully created" });

    } else {
      // Handle server-side validation error or other error message
      toast({ title: res.message || "An unexpected error occurred" });
    }
  } catch (error: any) {
    // Handle unexpected errors like network failure or exceptions
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    toast({ title: errorMessage });
  } finally {
    loading.value = false; // Reset loading state
  }
};
</script>

<template>
  <div class="text-black dark:text-white p-8 flex flex-col gap-8 min-h-screen bg-[#F5F5F5] dark:bg-dashbg">
    
    <BrandsCHubStage :campaign="true" :requirements="true" :deliverables="true" :compensation="true" />
    <nuxt-link to="/brands/dashboard/collaborationHub/campaign/compensation" class="flex gap-1 items-center">
      <ArrowLeft /> Back
    </nuxt-link>
    <div class="flex flex-col gap-8 p-3">
      <div class="flex flex-col items-center gap-4">
      
        <img :src="createCollaboration.fileUrl" alt="Campaign Image" class="max-h-[500px] w-full rounded-[16px] " />
        <!-- <img 
          :src="createCollaboration.fileUrl" 
          alt="Campaign Image" 
          class="h-[500px] w-full rounded-[16px] object-cover" 
        /> -->
        
        <div class="flex flex-col w-full items-start gap-2 pb-4 mb-6 border-b">
          <h1 class="text-purple1">{{ createCollaboration.companyName }}</h1>
          <h1 class="font-bold text-2xl">{{ createCollaboration.campaignName }}</h1>
          <p class="opacity-[56%] truncate w-full">{{ createCollaboration.campaignDescription }}</p>
          
          
        </div>
        <div class="w-full flex items-start flex-col">
          <h2 class="font-bold text-sm">Campaign Close Date</h2>
          <p class="opacity-[56%]" v-if="createCollaboration.closeDate" >{{ formatDate(createCollaboration.closeDate) }}</p>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-6" >
                <div class="md:w-1/2 flex flex-col gap-6" >
                    <div class="rounded-[8px] shadow-md bg-white dark:bg-vDarkBlue border p-4">
                        <h2>Requirements</h2>
                        <p class="opacity-[56%]">you must meet the following requirements to participate in this campaign</p>

                    

                        <div class=" overflow-x-auto border mt-5 shadow-md sm:rounded-lg">
                            <table
                                class="w-full text-sm text-left rtl:text-right"
                            >
                                
                                <tbody>
                                   
                                    <tr>
                                    <th class=" text-left px-4 border-r border-t py-2">Niche</th>
                                    <td class="px-4 border-t opacity-[56%] py-2">{{createCollaboration.niche}}</td>
                                    </tr>
                                    <tr>
                                    <th class=" text-left px-4 border-r border-t py-2">Platform</th>
                                    <td class="px-4 py-2 opacity-[56%] border-t">{{createCollaboration.platform}}</td>
                                    </tr>
                                    
                                    <tr>
                                    <th class=" text-left px-4 py-2 border-r border-t rounded-bl-lg">
                                        Gender
                                    </th>
                                    <td class="px-4 py-2 opacity-[56%] border-t rounded-br-lg">{{createCollaboration.gender}}</td>
                                    </tr>
                                    <tr>
                                    <th class=" text-left px-4 py-2 border-r border-t rounded-bl-lg">
                                       Audience Size
                                    </th>
                                    <td class="px-4 py-2 opacity-[56%] border-t rounded-br-lg">{{createCollaboration.audienceRange}} - {{createCollaboration}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="rounded-[8px] shadow-md border p-4 bg-white dark:bg-vDarkBlue" >
                        <h1>About the brand</h1>
                        <p class="opacity-[56%]">{{createCollaboration.brandInformation}} </p>
                        <a 
                          :href="createCollaboration.companyLinks" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          class="text-[#8F74F7] underline"
                        >
                          {{ createCollaboration.companyLinks }}
                        </a>
                    </div>
                </div>
          

            <div class="md:w-1/2 flex flex-col gap-6" >
                    <div class="flex flex-col gap-2 rounded-lg shadow-md bg-white dark:bg-vDarkBlue p-4 border">
                        <h1>Compensation</h1>

                        <button class="bg-[#DEF4FF] rounded-[20px] px-4 py-2 flex gap-2 max-w-fit" >
                            <CircleCheckBig color="#54ABE8" />
                            <p v-if="createCollaboration.amount && createCollaboration.amount > 0"  class="text-[#54ABE8]">Paid Campaign: NGN 
                                {{createCollaboration.amount.toLocaleString()}}
                            </p>
                            <p v-if="createCollaboration.isGift" class="text-black" >
                                Creators will recieve {{createCollaboration.giftItem}}
                            </p>
                        </button>

                     
                        
                    </div>


                    <div class="flex flex-col gap-2 rounded-lg shadow-md bg-white dark:bg-vDarkBlue p-4 border">
                        <h1>Deliverables</h1>

                     

                        <span>
                            <h1>Do's</h1>
                            <li class="opacity-[56%]">{{createCollaboration.creatorDo}}</li>
                            
                        </span>

                        <span>
                            <h1>Dont's</h1>
                            <li class="opacity-[56%] text-sm">{{createCollaboration.creatorDont}}</li>
                           
                        </span>

                        <span>
                            <h1>Caption</h1>
                            <p class="opacity-[56%] text-sm">{{createCollaboration.captions}}</p>
                        </span>

                        <span>
                            <h1>Hashtag</h1>
                            <p class="opacity-[56%] text-sm">{{createCollaboration.hashtags}}</p>
                        </span>

                        <span>
                            <h1>Content Approval</h1>
                            <span class="flex gap-2 items-center">
                              <CircleAlert color="red" class="h-4 w-4" />
                               <p class="opacity-[56%] text-sm"> Content must be submitted for review before being posted</p>
                            </span>
                        </span>

                        <span>
                            <h1>Due Date</h1>
                            <li class="opacity-[56%] text-sm">Submit this content before {{formatDate(createCollaboration.contentApproval)}} for approval</li>
                        </span>
                    </div>

            </div>
        </div>
      <!-- Other UI elements -->

     
    </div>

    <div class="flex w-full items-center justify-between">
      <nuxt-link to="/brands/dashboard/collaborationHub/campaign/compensation" class="rounded-[28px] border-[0.5px] px-6 py-2 border-[#8F74F7] text-[#8F74F7]" >
          Back
      </nuxt-link>
      <button @click="campaign" :disabled="loading" class="rounded-[28px] px-6 py-2 bg-[#5331E8] text-white">
        {{ loading ? 'Creating...' : 'Create Campaign' }}
      </button>
    </div>
  </div>
</template>
