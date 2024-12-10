<script setup lang="ts">
import { Gift, Banknote, Instagram, ArrowLeft, CircleCheckBig } from 'lucide-vue-next';
import { useToast } from "../../../../components/ui/toast/use-toast";
import type { APIResponse, CollabHubCampaign,ResponseMessage, IPlatformProfile } from '@/types';
import { get_creator_platform_profiles } from "@/api/creator/platform/platform.creator";
definePageMeta({
  layout: 'dashboard',
  colorMode:"dark"
})
const route = useRoute();
const userStore = useUserStore();
const loading = ref(false)
const API_URL = useRuntimeConfig().public.API_URL;
const {toast}  = useToast();
const details = ref<CollabHubCampaign>()
const platforms = ref<IPlatformProfile[]>([]);
const empty = ref(false)
const { campaignId } = route.params;
const picked = ref("")

async function get_platform_profiles() {

    const accessToken = userStore.accessToken || "";
    const apiUrl = API_URL
  try {
   
    loading.value = true;
    const res = await get_creator_platform_profiles({
      accessToken,
      apiUrl
    })
    platforms.value = res;
    if (platforms.value.length === 0) {
      empty.value = true;
    }
    loading.value = false;
  } catch (error: any) {
    loading.value = false;
    toast({ title: "Can't retrieve platform profiles at this time"})
  }
}

const singleCollabHub = async () => {
  
  const accessToken = userStore.accessToken || "";


  try {
    loading.value = true
    const res= await $fetch<APIResponse<'campaign', CollabHubCampaign >>(`${API_URL}/campaign/collaboration-hub/get-one/${campaignId}`);
    loading.value = false;
    details.value = res.data.campaign

  } catch (error: any) {
    loading.value = false;
    
    toast({ title: error.data?.message || "Something went wrong" });
  }
};

const OptIn = async()=>{


try{
  const res = await $fetch<ResponseMessage>(`${API_URL}/campaign/collaboration-hub/opt-in`, {
    method: "post",

    body: { campaignId: campaignId, platformProfileId: picked.value },
    headers: { Authorization: `Bearer ${userStore.accessToken}` },
  });
}catch(error:any){
  toast({title: error.data?.message})
}
}


watchEffect(async()=> {await singleCollabHub(), await get_platform_profiles()})
</script>

<template>
    <div class="flex flex-col gap-8 px-4   py-12" >
        
        <nuxt-link class="flex gap-2" to="/creator/dashboard/collaborationHub">
            <ArrowLeft />
            <p class="font-bold text-xl">Campaigns</p>
        </nuxt-link>

        <div v-if="loading">
            <CreatorCollabHubDetailsLoading />
        </div>
        <div v-else class="bg-transparent p-4 rounded-md">
            <div class="flex flex-col mt-2 items-center gap-4 px-3 ">
                <img src="/assets/collabHubSample.png" class="w-[900px] h-[400px]">
            
                <div class="flex flex-col gap-2 border-b px-2">

                    <p>    {{details}}</p>
                    <h2 class="font-bold text-xl">{{details?.headline}}</h2>
                    <p v-if="details?.compensation.isGift" class="flex gap-2 items-center"> <Gift color="#000000" class=" bg-[#E9E6F3] h-8 border rounded-full w-8 p-2 " /> Gifted Campaign </p>
                    <p v-if="details?.compensation.isMonetary" class="flex gap-2 items-center"> <Banknote color="#000000" class=" bg-[#E9E6F3] h-8 border rounded-full w-8 p-2 " /> Paid Campaign </p>
                    <p class="text-sm">{{details?.description}}</p>


                </div>     
                
                <div class="flex justify-start flex-col w-full py-8">
                    <h1 class="font-bold">Aplication Close Date</h1>
                    <p>{{details?.applicationCloseDate}}</p>
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
                                    <td class="px-4 border-t py-2">{{details?.qualification.ageRange.min}}</td>
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
                                    <td class="px-4 py-2 border-t">
                                        {{details?.qualification.audienceSize.min}} - {{details?.qualification.audienceSize.max}}
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
                        <p>you must meet the following requirements to participate in this campaign. you must meet the following requirements to participate in this campaignyou must meet the following requirements to participate in this campaign youquirements to participate in this campaignyou must meet the following requirements to participate in this campaign </p>
                    </div>
                </div>



                <div class="md:w-1/2 flex flex-col gap-6" >
                    <div class="flex flex-col gap-2 shadow-md rounded-lg bg-white dark:bg-vDarkBlue p-4 border">
                        <h1 class="font-semibold">Compensation</h1>

                        <button class="bg-[#DEF4FF] rounded-[20px] px-4 py-2 flex gap-2 max-w-fit" >
                            <CircleCheckBig color="#54ABE8" />
                            <p class="text-[#54ABE8]">Paid Campaign: 
                            {{details?.compensation.currency}}{{ details?.compensation.price }}     
                            </p>
                        </button>

                        <h2>Creators will also receive {{details?.compensation.gift}}</h2>
                        
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
            <div class="w-full border-t p-4 flex items-center justify-center" >
              

                <Dialog>
                    <DialogTrigger>
                        <button class="bg-[#5331E8] rounded-[40px] px-8 py-2 text-white">
                            Opt in
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Choose platform profile</DialogTitle>
                        <DialogDescription>
                            <div v-for="platform in platforms" :key="platform.id" >
                                <input type="radio" :id="platform.id" :value="platform.id" v-model="picked">
                                {{ platform.platformUsername }}
                                {{ platform.workPlatform }}
                            </div>
                       
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                       <button @click="OptIn()" >
                            Select platform
                       </button>
                    </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    </div>

</template>