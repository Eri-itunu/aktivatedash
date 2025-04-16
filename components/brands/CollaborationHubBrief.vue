<script setup lang="ts">
import { Gift, Facebook, Instagram, ArrowLeft, CircleCheckBig } from 'lucide-vue-next';
import type { ContentSubmissions, PaginatedAPIResponse,APIResponse,Collaboration, CollabHubCampaign } from "@/types";
import { useToast } from "@/components/ui/toast/use-toast";


const {toast}  = useToast();
const config = useRuntimeConfig();
const API_URL = config.public.API_URL ;
const route = useRoute();
const details = ref<CollabHubCampaign>();
const loading = ref(false)
import { formatDate } from '@/utils';
const props = defineProps<{   
    id: string
}>();

const singleCollabHub = async () => {
  loading.value = true
  try {
   
    const res= await $fetch<APIResponse<'campaign', CollabHubCampaign >>(`${API_URL}/campaign/collaboration-hub/get-one/${props.id}`);    
        details.value = res.data.campaign
    loading.value = false;

  } catch (error: any) {
    loading.value = false;
    
    toast({ title: error.data?.message || "Something went wrong" });
  }
};

onMounted(() => {
  singleCollabHub()
})
</script>


<template>
    <div class="flex flex-col gap-8 md:px-4 bg-white dark:bg-vDarkBlue py-12 relative" >
      
        
        <div v-if="loading">
            <CreatorCollabHubDetailsLoading />
        </div>
        <div v-else class=" px-4 rounded-md">
            <div class="flex flex-col md:flex-row items-start gap-4 px-3 w-full ">
                <img v-if="details?.images[0]"  :src=details?.images[0] class="w-full md:w-1/2 h-[200px] rounded">
                <img v-else src="/assets/collabHubSample.png" class="aspect-video w-full" alt="">
            
                <div class="flex flex-col gap-2 px-2 w-full md:w-1/2 items-start justify-start ">

                    <span>
                        <h1 class="font-semibold" >Campaign details</h1>
                        <p class="text-sm opacity-[56%]">{{details?.description}}</p>
                    </span>

                    <span>
                        <h1 class="font-semibold" >Name</h1>
                        <h1 class="text-sm opacity-[56%]" > {{ details?.brandInformation.companyName }} </h1>
                    </span>
                    
                    <span>
                        <h1>Website</h1>
                        <h1  class="text-sm opacity-[56%]" >{{ details?.brandInformation.links[0] }}</h1>
                    </span>
                    
       
                   <span>
                    <h1 class="font-semibold">Aplication Close Date</h1>
                    <p class="opacity-[56%] text-sm" >{{formatDate(details?.applicationCloseDate.split("T")[0])}}</p>
                   </span>
            

                </div>     
                   
            </div>

            <div class="flex flex-col md:flex-row gap-6 py-4 px-3 w3ee" >
                <div class="md:w-1/2 flex flex-col gap-6" >
                    <div class="rounded-[8px] shadow-md bg-white dark:bg-vDarkBlue border p-6">
                        <h2 class="font-semibold">Requirements</h2>
                        <p class="opacity-[56%]" >you must meet the following requirements to participate in this campaign</p>

                       

                        <div class=" overflow-x-auto border mt-5 shadow-md sm:rounded-lg">
                            <table
                                class="w-full text-sm text-left rtl:text-right"
                            >
                                
                                <tbody>
                                    <!-- <tr>
                                    <th class=" text-left border-r px-4 py-2 border-t rounded-tl-lg">
                                        Age Range
                                    </th>
                                    <td class="px-4 border-t py-2">{{details?.qualification.ageRange.min}} </td>
                                    </tr> -->
                                    <tr>
                                    <th class=" text-left px-4 border-r border-t py-2">Niche</th>
                                    <td class="px-4 text-[#6D6B76] border-t py-2">{{details?.qualification.niche[0]}}</td>
                                    </tr>
                                    <tr>
                                    <th class=" text-left px-4 border-r border-t py-2">Platform</th>
                                    <td class="px-4 text-[#6D6B76] py-2 border-t">
                                        
                                        {{details?.deliverable.platforms[0] }}</td>
                                    </tr>
                                    <tr>
                                    <th class=" text-left px-4 border-r border-t py-2">Following</th>
                                    <td  v-if="details?.qualification.audienceSize" class="px-4 py-2 text-[#6D6B76] border-t">
                                        {{details?.qualification?.audienceSize.min > 0 ? details?.qualification.audienceSize.min : 'Any' }}  {{details?.qualification?.audienceSize.max > 0 ? '-' + details?.qualification.audienceSize.max : '' }}
                                    </td>
                                    </tr>
                                    <tr>
                                    <th class=" text-left px-4 py-2  border-r border-t rounded-bl-lg">
                                        Gender
                                    </th>
                                     <td class="px-4 py-2 text-[#6D6B76] border-t rounded-br-lg">{{details?.qualification.gender === '' ? 'Any' :  details?.qualification.gender }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="rounded-[8px] shadow-md border flex gap-4 flex-col p-6 bg-white dark:bg-vDarkBlue" >
                        <h1 class="font-semibold">About the brand</h1>
                        <p class="opacity-[56%]" >{{details?.brandInformation.description}} </p>
                    </div>
                </div>



                <div class="md:w-1/2 flex flex-col gap-6" >
                    <div class="flex flex-col gap-2 shadow-md rounded-lg bg-white dark:bg-vDarkBlue p-6 border">
                        <h1 class="font-semibold">Compensation</h1>

                        <button v-if="details?.compensation.isMonetary" class="bg-[#DEF4FF] rounded-[20px] px-4 py-2 flex gap-2 max-w-fit" >
                            <CircleCheckBig color="#54ABE8" />
                            <p class="text-black">Paid Campaign: 
                            {{details?.compensation.currency.toLocaleString()}}{{ details?.compensation.price }}     
                            </p>
                        </button>

                        <h2 v-if="details?.compensation.isGift">Creators will  receive {{details?.compensation.gift}}</h2>
                        
                    </div>


                    <div class="flex flex-col gap-2 shadow-md rounded-lg bg-white dark:bg-vDarkBlue p-6 border">
                        <h1 class="font-semibold">Deliverable</h1>

                        <div class="flex gap-2 items-center">

                            <p>
                                {{ details?.deliverable?.numOfPosts }}
                            </p>
                            <span v-if=" details?.deliverable.platforms[0] === 'instagram' " class="bg-white dark:bg-dashbg rounded-[20px] px-4 py-2 flex gap-2 max-w-fit" >
                                <Instagram  color="#d959a4" />
                            </span>

                            <span v-if=" details?.deliverable.platforms[0] === 'facebook' " class="bg-white dark:bg-dashbg rounded-[20px] px-4 py-2 flex gap-2 max-w-fit" >
                                <Facebook color="blue"/>
                            </span>

                            <span v-if=" details?.deliverable.platforms[0] === 'tiktok' " class="bg-white dark:bg-dashbg rounded-[20px] px-4 py-2 flex gap-2 max-w-fit" >
                                <img src="/icons/tiktok.svg" class="h-6" alt="">
                            </span>
                            <span class="bg-white dark:bg-dashbg rounded-[20px] px-4 py-2 flex gap-2 max-w-fit" >
                             
                                <p class=""> {{ details?.contentType[0] }} </p>
                            </span>
                        </div>

                        <span>
                            <h1>Do's</h1>
                            <li class="text-[#6D6B76]">{{details?.deliverable.requirements.dos}}</li>
                      
                        </span>

                        <span>
                            <h1>Dont's</h1>
                            <li class="text-[#6D6B76]" >{{details?.deliverable.requirements.donts}}</li>
                        </span>

                        <span>
                            <ul>Caption</ul>
                            <li class="text-[#6D6B76]" v-for="caption in details?.deliverable.captions " >{{ caption }}</li>
                        </span>

                        <span>
                            <ul>Hashtag</ul>
                            <li class="text-[#6D6B76]"v-for="hashtag in details?.deliverable.hashtags " >{{ hashtag }}</li>
                        </span>
                    </div>
                </div>
            </div>
            <div class="w-full border-t p-4 flex items-center justify-center" >
              

            
            </div>
        </div>
    </div>
</template>