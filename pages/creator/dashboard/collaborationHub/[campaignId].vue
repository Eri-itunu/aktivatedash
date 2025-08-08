<script setup lang="ts">
import { Gift, Banknote, Instagram, ArrowLeft, CircleCheckBig, Info } from 'lucide-vue-next';
import { useToast } from "../../../../components/ui/toast/use-toast";
import type { APIResponse, CollabHubCampaign,ResponseMessage, IPlatformProfile } from '@/types';
import { get_creator_platform_profiles } from "@/api/creator/platform/platform.creator";
import {formatDate} from "@/utils";
definePageMeta({
  layout: 'dashboard',
  colorMode:"dark"
})
const route = useRoute();
const userStore = useUserStore();
const loading = ref(false)
const API_URL = useRuntimeConfig().public.API_URL as string;
const {toast}  = useToast();
const details = ref<CollabHubCampaign>()
const platforms = ref<IPlatformProfile[]>([]);
const empty = ref(false)
const { campaignId } = route.params;
const picked = ref("")
const socialUrl = ref("")

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

    // toast({title: res.message})
    toast({
        title: 'You’ve successfully opted into the campaign!',
        description: 'You can track the status of your application in the Campaign - Public tab while you wait for the brand’s decision.',
    });

    }catch(error:any){
    toast({title: error.data?.message})
    }
}




watchEffect(async()=> {await singleCollabHub(), await get_platform_profiles()})
</script>

<template>
    <div class="flex flex-col gap-8 px-1 md:px-4   py-12" >

        <nuxt-link class="flex gap-2" to="/creator/dashboard/collaborationHub">
            <ArrowLeft />
            <p class="font-bold text-xl">Campaigns</p>
        </nuxt-link>

        <div v-if="loading">
            <CreatorCollabHubDetailsLoading />
        </div>
        <div v-else class="bg-transparent md:p-4 rounded-md">
            <div class="flex flex-col mt-2 items-center gap-4 md:px-3 ">
                <img v-if="details?.images[0]"  :src=details?.images[0] class="aspect-video rounded-[16px]">
                <img v-else src="/assets/collabHubSample.png" class="aspect-video rounded-[16px]" alt="">

                <div class="flex flex-col gap-2 border-b px-2 w-full items-start">

                    <h1 class="text-2xl text-purple1" > {{ details?.brandInformation.companyName }} </h1>
                    <h2 class="font-bold text-xl">{{details?.headline}}</h2>
                    <!-- <p v-if="details?.compensation.isGift" class="flex gap-2 items-center"> <Gift color="#000000" class=" bg-[#E9E6F3] h-8 border rounded-full w-8 p-2 " /> Gifted Campaign </p>
                    <p v-if="details?.compensation.isMonetary" class="flex gap-2 items-center"> <Banknote color="#000000" class=" bg-[#E9E6F3] h-8 border rounded-full w-8 p-2 " /> Paid Campaign </p> -->
                     <p class="opacity-[56%] text-sm">{{details?.description}}</p>


                </div>

                <div class="flex justify-start flex-col w-full py-8">
                    <h1 class="font-bold">Application Close Date</h1>
                    <p class="opacity-[56%]">{{formatDate(details?.applicationCloseDate.split("T")[0])}}</p>
                </div>
            </div>

            <div class="flex flex-col md:flex-row gap-6 py-4 px-3 w3ee" >
                <div class="md:w-1/2 flex flex-col gap-6" >
                    <div class="rounded-[8px] shadow-md bg-white dark:bg-vDarkBlue border p-4">
                        <h2 class="font-semibold">Requirements</h2>
                        <p class="opacity-[56%]">You must meet the following requirements to participate in this campaign</p>




                        <div class=" overflow-x-auto border mt-5 shadow-md sm:rounded-lg">
                            <table
                                class="w-full text-sm text-left rtl:text-right"
                            >

                                <tbody>
                                    <tr>
                                    <th class=" text-left border-r px-4 py-2 border-t rounded-tl-lg">
                                        Minimum Age
                                    </th>
                                    <td v-if="details"class="px-4 border-t py-2">{{details?.qualification?.ageRange?.min > 0 ? details?.qualification.ageRange.min : 'No Age range'}}</td>
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
                                    <tr>
                                    <th class=" text-left px-4 py-2 border-r border-t rounded-bl-lg">
                                        Location
                                    </th>
                                    <td class="px-4 py-2 border-t rounded-br-lg">{{details?.locations[0].state}}{{details?.locations[0].country}} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="rounded-[8px] shadow-md border p-4 bg-white dark:bg-vDarkBlue" >
                        <h1 class="font-semibold">About the brand</h1>
                        <p class="opacity-[56%]">{{details?.brandInformation.description}} </p>
                        <a
                        v-if="details?.brandInformation?.links?.[0]"
                        :href="details.brandInformation.links[0].startsWith('http') ? details.brandInformation.links[0] : 'https://' + details.brandInformation.links[0]"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                            {{ details.brandInformation.links[0] }}
                        </a>

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

                        <div class="flex gap-2 items-center">


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
                            <li class="opacity-[56%]" >{{details?.deliverable.requirements.dos}}</li>

                        </span>

                        <span>
                            <h1>Dont's</h1>
                            <li class="opacity-[56%]" >{{details?.deliverable.requirements.donts}}</li>
                        </span>

                        <span>
                            <ul>Caption</ul>
                            <li class="opacity-[56%]" v-for="caption in details?.deliverable.captions " >{{ caption }}</li>
                        </span>

                        <span>
                            <ul>Hashtag</ul>
                            <li class="opacity-[56%]" v-for="hashtag in details?.deliverable.hashtags " >{{ hashtag }}</li>
                        </span>

                        <span>
                            <h1>Due Date</h1>
                            <li class="opacity-[56%] text-sm">Submit this content before {{formatDate(details?.submissionDueDate)}} for approval</li>
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
                    <DialogContent class="dark:bg-dashbg">
                        <DialogHeader>
                            <DialogTitle>
                                <div class="w-full text-center dark:text-purplelabel">
                                    Select your account
                                </div>
                            </DialogTitle>
                            <DialogDescription>
                                <div v-if="platforms.length > 0" class="text-center dark:text-purplelabel">
                                    Choose the account you'd like to use for this campaign.
                                </div>
                            </DialogDescription>
                        </DialogHeader>

                        <div class="rounded border  p-4 flex flex-col gap-4">

                            <div class="rounded flex dark:bg-purplebg p-2 items-start gap-3 dark:text-vDarkBlue text-sm" >
                                <Info class="h-4 w-4"/>
                                <div>
                                    <h2 class="font-semibold">Campaign requirements</h2>
                                    <ol>
                                        <li class="font-light"> {{details?.deliverable.platforms[0] }} account</li>
                                    </ol>
                                </div>
                            </div>
                            <!-- <div>
                                    <h1 class="text-sm font-bold">Provide Social Media URL</h1>
                                    <input 
                                    v-model="socialUrl"
                                    class="bg-transparent rounded p-2 w-full border"
                                    placeholder="e.g https://instagram.com/davido" type="text" name="socialUrl" id="socialUrl">
                                
                            </div> -->

                            <div v-for="platform in platforms"
                                :key="platform.id"
                                class="border p-2 rounded dark:bg-vDarkBlue gap-2 flex cursor-pointer"
                                :class="{'border-white border-[0.5px]': picked === platform.id}"
                                @click="picked = platform.id"
                               
                            >
                                
                                <img v-if="platform.workPlatform === 'tiktok'" src="/icons/tiktok.svg" class="h-6 w-6" alt="">
                                <img  v-if="platform.workPlatform === 'facebook'" src="/icons/facebook.svg" class="h-6 w-6" alt="">
                                <img  v-if="platform.workPlatform === 'instagram'" src="/icons/Insta.svg" class="h-6 w-6" alt="">
                                <div class="flex flex-col gap-3 w-full">
                                    <div class="flex gap-1 w-full justify-between items-start">
                                        <span class="">
                                            <p class="font-semibold text-sm ">@{{ platform.platformUsername }}</p>
                                            <p class="font-light text-xs">{{ platform.workPlatform }}</p>
                                        </span>
                                        <input type="radio" :id="platform.id" :value="platform.id" v-model="picked">
                                    </div>
                                    <div class="text-xs flex gap-2">
                                        <span>
                                            <p>Followers</p>
                                            <p>{{ platform.reputationFollowerCount }}</p>
                                            
                                        </span>
                                        <span>
                                            <p>Engagement Rate</p>
                                            <p>{{ platform.engagementRate }}%</p>
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>


                    <DialogTrigger class="w-full flex justify-end">
                       <button class="bg-purple1 rounded px-4 py-1 text-sm" v-if="platforms.length > 0" @click="OptIn()" >
                            Submit
                       </button>

                       <p v-else class="text-red-500">
                        You have no platform profiles to select from. Link one to opt in.
                       </p>
                    </DialogTrigger>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    </div>

</template>
