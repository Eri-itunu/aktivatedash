<script setup lang="ts" >
//imports
import type {  CollabHubCampaign, APIResponse } from "types";
import {ArrowLeft} from "lucide-vue-next"
import { useToast } from "@/components/ui/toast/use-toast";

definePageMeta({
  layout: "dashboard",
  colorMode:"dark"
  
});

//varibale declarations
const {toast}  = useToast();
const API_URL = useRuntimeConfig().public.API_URL;
const route = useRoute();
const details = ref<CollabHubCampaign>()
const loading = ref(true);
const { hub } = route.params;



const singleCollabHub = async () => {

  try {
    loading.value = true
    const res= await $fetch<APIResponse<'campaign', CollabHubCampaign >>(`${API_URL}/campaign/collaboration-hub/get-one/${hub}`);
    loading.value = false;
    details.value = res.data.campaign

  } catch (error: any) {
    loading.value = false;
    
    toast({ title: error.data?.message || "Something went wrong" });
  }
};


watchEffect(async()=> {await singleCollabHub()})


</script>


<template>
    <div class="flex flex-col gap-8 px-4   py-12" >
        
        <nuxt-link class="flex gap-2 items-center" to="/creator/dashboard/campaigns">
            <ArrowLeft />
            <p class="font-bold text-xl">Campaigns</p>
        </nuxt-link>

        <div v-if="loading">
            <CreatorCollabHubDetailsLoading />
        </div>
        <div v-else class="flex " >
            <div  class="bg-transparent p-4 rounded-md basis-3/4">

                <h1 class="text-xl text-white text-center" >CAMPAIGN BRIEF</h1>
                <div class="flex flex-col mt-2 items-center gap-4 px-3 ">
                    <img v-if="details?.images[0]"  :src=details?.images[0] class="w-[900px] h-[400px]">
                    <img v-else src="/assets/collabHubSample.png" class="h-[400px] w-full" alt="">

                    <div class="flex flex-col gap-2 border-b px-2 w-full items-start">

                        <h1 class="text-2xl text-purple1" > {{ details?.brandInformation.companyName }} </h1>
                        <h2 class="font-bold text-xl">{{details?.headline}}</h2>
                    
                        <p class="text-sm">{{details?.description}}</p>


                    </div>     
                    
                    <div class="flex justify-start flex-col w-full py-8">
                        <h1 class="font-bold">Aplication Close Date</h1>
                        <p>{{details?.applicationCloseDate.split("T")[0]}}</p>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row gap-6 py-4 px-3 w3ee" >
                    <div class="md:w-1/2 flex flex-col gap-6" >
                        <div class="rounded-[8px] shadow-md bg-white dark:bg-vDarkBlue border p-4">
                            <h2 class="font-semibold">Requirements</h2>
                            <p>you must meet the following requirements to participate in this campaign</p>

                        

                            <div class=" overflow-x-auto border mt-5 shadow-md sm:rounded-lg">
                                <table
                                    class="w-full text-sm text-left rtl:text-right"
                                >
                                    
                                    <tbody>
                                        <tr>
                                        <th class=" text-left border-r px-4 py-2 border-t rounded-tl-lg">
                                            Age Range
                                        </th>
                                        <td v-if="details"  class="px-4 border-t py-2">{{details?.qualification.ageRange.min > 0 ? details?.qualification.ageRange.min : 'No Age range'}}</td>
                                        </tr>
                                        <tr>
                                        <th class=" text-left px-4 border-r border-t py-2">Niche</th>
                                        <td class="px-4 border-t py-2">{{details?.qualification.niche[0]}}</td>
                                        </tr>
                                        <tr>
                                        <th class=" text-left px-4 border-r border-t py-2">Platform</th>
                                        <td class="px-4 py-2 border-t">
                                            
                                            {{details?.deliverable.platforms[0] }}</td>
                                        </tr>
                                        <tr>
                                        <th class=" text-left px-4 border-r border-t py-2">Following</th>
                                        <td v-if="details" class="px-4 py-2 border-t">
                                            {{details?.qualification.audienceSize.min > 0 ? details?.qualification.audienceSize.min : 'Any amount'}} 

                                            {{details?.qualification.audienceSize.min > 0 ? '-' : ''}} 
                                            
                                            {{details?.qualification.audienceSize.max > 0 ?  details?.qualification.audienceSize.max : ''}}
                                        </td>
                                        </tr>
                                        <tr>
                                        <th class=" text-left px-4 py-2 border-r border-t rounded-bl-lg">
                                            Gender
                                        </th>
                                        <td class="px-4 py-2 border-t rounded-br-lg">{{details?.qualification.gender}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="rounded-[8px] shadow-md border p-4 bg-white dark:bg-vDarkBlue" >
                            <h1 class="font-semibold">About the brand</h1>
                            <p>{{details?.brandInformation.description}} </p>
                        </div>
                    </div>



                    <div class="md:w-1/2 flex flex-col gap-6" >
                        <div class="flex flex-col gap-2 shadow-md rounded-lg bg-white dark:bg-vDarkBlue p-4 border">
                            <h1 class="font-semibold">Compensation</h1>

                            <button v-if="details?.compensation.isMonetary" class="bg-[#DEF4FF] rounded-[20px] px-4 py-2 flex gap-2 max-w-fit" >
                                <CircleCheckBig color="#54ABE8" />
                                <p class="text-[#54ABE8]">Paid Campaign: 
                                {{details?.compensation.currency}}{{ details?.compensation.price }}     
                                </p>
                            </button>

                            <h2 v-if="details?.compensation.isGift">Creators will  receive {{details?.compensation.gift}}</h2>
                            
                        </div>


                        <div class="flex flex-col gap-2 shadow-md rounded-lg bg-white dark:bg-vDarkBlue p-4 border">
                            <h1 class="font-semibold">Deliverable</h1>

                            <div class="flex gap-2">
                                <span v-if=" details?.deliverable.platforms[0] === 'instagram' " class="bg-white dark:bg-dashbg rounded-[20px] px-4 py-2 flex gap-2 max-w-fit" >
                                <Instagram />
                            
                                </span>
                                <span class="bg-white dark:bg-dashbg rounded-[20px] px-4 py-2 flex gap-2 max-w-fit" >
                                
                                    <p class="">Story (video)</p>
                                </span>
                            </div>

                            <span>
                                <h1>Do's</h1>
                                <li>{{details?.deliverable.requirements.dos}}</li>
                        
                            </span>

                            <span>
                                <h1>Dont's</h1>
                                <li>{{details?.deliverable.requirements.donts}}</li>
                            </span>

                            <span>
                                <ul>Caption</ul>
                                <li v-for="caption in details?.deliverable.captions " >{{ caption }}</li>
                            </span>

                            <span>
                                <ul>Hashtag</ul>
                                <li v-for="hashtag in details?.deliverable.hashtags " >{{ hashtag }}</li>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="basis-1/4" >
                card
            </div>
        </div>
    </div>

</template>