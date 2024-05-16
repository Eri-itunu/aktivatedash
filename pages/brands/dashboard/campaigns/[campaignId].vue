<script setup lang="ts">
import type { ICampaign, ICampaignRequest, CampaignMetrics } from "types";
import {
  getCampaign,
  getSingleCampaignRequest,
  getSingleCampaignMetrics
} from "../../../../api/brand/campaign/campaign.brand";

definePageMeta({
  layout: "brands",
  colorMode: "dark",
});

    const route = useRoute();
    const router = useRouter();
    const campaign = ref<ICampaign>()
    const requests = ref<ICampaignRequest[]>([])
    const metrics = ref<CampaignMetrics[]>([])
    const createBrandCampaignStore = useCreateBrandCampaignStore();
    const toast = useToast()
    const userStore = useUserStore()
    const API_URL = useRuntimeConfig().public.API_URL
    const loading = ref(true)
    const brief = ref<string>("")
   

    const SingleCampaignMetrics = async ()=>{
        const { campaignId } = route.params;
        const accessToken = userStore.accessToken || "";

        try{
            const res = await getSingleCampaignMetrics({
                apiUrl: API_URL,
                campaignId,
                accessToken,
            });

            metrics.value = res
            loading.value = false
            console.log(metrics)
        }
        catch(error:any){
            loading.value = false
            console.log(error)
            toast.add( {title: error.data?.message || "Something went wrong"} )
        }
    }

    const SingleCampaign = async()=> {

        const { campaignId } = route.params;
        const accessToken = userStore.accessToken || "";
        loading.value=true
        try {
            const platform = await getSingleCampaignRequest({
                apiUrl: API_URL,
                campaignId,
                accessToken,
            });
            requests.value = platform;
            console.log(requests.value)
            loading.value = false;

        } catch(error: any){
            loading.value = false
            console.log(error)
            toast.add( {title: error.data?.message || "Something went wrong"} )
        }
    }

    const loadCampaign = async() => {
        const { campaignId } = route.params;
        const accessToken = userStore.accessToken || ""
        try {
            const camp= await getCampaign({
                apiUrl: API_URL,
                campaignId,
                accessToken,
            })
            
            campaign.value = camp

            
            SingleCampaign()
            SingleCampaignMetrics()
        } catch (error: any) {
            router.back()
            toast.add({ title: "error getting campaign"})
            console.log(error)
        }
    }

    const openBrief = (link:string) =>{
        navigateTo( link, {
            open: {
                target: '_blank',
                windowFeatures: {
                width: 500,
                height: 500
                }
            },
            external: true
            })

    }
    onMounted(async() => await loadCampaign())
</script>

<template>
    <div class="overflow-hidden max-w-[100%] p-0">
        <nuxt-link class="pl-10" to='/brands/dashboard/campaigns'>
            Back
        </nuxt-link>

        <div class="flex flex-col md:flex-row gap-2 max-w-full">

            <div class="flex max-w-[100%] p-auto flex-col basis-3/4 gap-5">
                <div class="flex px-12 bg-vDarkBlue mb-10 py-12  rounded-lg flex-col md:flex-row gap-5">
                    <div class="flex flex-col gap-5  text-white w-full">

                        <div class="flex justify-between border-b-2 py-3 border-darkBlue">
                            <div>
                                <p class="text-purplelabel text-xs">BUDGET</p>
                                <span class="text-2xl font-bold">NGN {{ campaign?.budget.toLocaleString() }}</span>
                                
                            </div>
                            <div>
                                <p class="text-purplelabel text-xs">Cost</p>
                                <span class="text-2xl font-bold">NGN {{ campaign?.cost.toLocaleString() }}</span>
                            </div>
                        </div>

                        <h4 class="text-3xl text-purplelabel break-words">{{ campaign?.headline }}</h4>
                        

                        <button v-if="campaign?.brief" @click="openBrief(campaign?.brief)">
                            Open Brief
                        </button>
                       

                        

                        <div class="flex relative justify-center  bg-purplelabel rounded-lg">
                            
                                <img src="/assets/images/created.svg" alt="">
                            </div>

                        <p class="text-wrap">
                            {{ campaign?.description }}
                        </p>



                        <div class="flex gap-1 items-center">
                        <!-- icon type thing -->
                        <div class="flex flex-col items-center max-w-min">
                            <div class="h-2 w-2 rounded-full bg-grey1"></div>
                            <div class="h-4 w-[0.05rem] rounded-full bg-grey1"></div>
                            <div class="h-2 w-2 rounded-full bg-grey1"></div>
                        </div>
                        <!-- end icon thing-->
                        <div class="text-sm text-[#CDC2FF] text-nowrap">
                            <p> Start Date: <span class="font-light text-xs">{{ campaign?.start_date?.toString().split("T")[0] }}</span></p>
                            <p> End Date: <span class="font-light text-xs">{{ campaign?.end_date?.toString().split("T")[0] }}</span></p>
                        </div>
                        </div>



                        <div class="flex gap-5">
                            <div class="flex flex-col gap-1">
                                <p class="text-purplelabel ">Content Type</p>
                                <div >

                                </div>
                                Photos,Videos
                            </div>

                            <div class="flex flex-col gap-1">
                                <p class="text-purplelabel ">Platform Type</p>
                                <div class="flex gap-1 overflow-hidden">

                                    <img v-if="campaign?.deliverables?.platform.includes('instagram')" class="object-contain" src="/assets/icons/collab/instagram.svg" alt="">
                                    <img v-if="campaign?.deliverables?.platform.includes('linkedin')" class="object-contain" src="/assets/icons/collab/linkedin.svg" alt="">
                                    <img v-if="campaign?.deliverables?.platform.includes('facebook')" class="object-contain" src="/assets/icons/collab/facebook.svg" alt="">
                                    <img v-if="campaign?.deliverables?.platform.includes('tiktok')" class="object-contain" src="/assets/icons/collab/tiktok.svg" alt="">
                                    <img v-if="campaign?.deliverables?.platform.includes('twitter')"  class="object-contain" src="/assets/icons/collab/twitter.svg" alt="">
                                    <img v-if="campaign?.deliverables?.platform.includes('whatsapp')"  class="object-contain" src="/assets/icons/collab/whatsapp.svg" alt="">
                                    <img v-if="campaign?.deliverables?.platform.includes('snapchat')"  class="object-contain" src="/assets/icons/collab/snapchat.svg" alt="">
                                    <img v-if="campaign?.deliverables?.platform.includes('youtube')" class="object-contain" src="/assets/icons/collab/youtube.svg" alt=""> 
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4>Requirements</h4>
                            <li>{{ campaign?.deliverables?.requirements }}</li>
                        </div>

                        <div class="flex flex-col gap-3">
                            <h1 class="uppercase font-bold">Metrics</h1>
                            <div class="flex justify-between">
                                <div class="flex flex-col basis-1/3 text-left gap-2">
                                    <h4 class="text-xs text-gray-500">TOTAL VIEWS</h4>
                                    <p>{{metrics.totalViews ?? "---"}}</p>
                                </div>
                                <div class="flex flex-col basis-1/3 text-left gap-2">
                                    <h4 class="text-xs text-gray-500">TOTAL REACH</h4>
                                    <p>{{metrics.totalReach ?? "---"}}</p>
                                </div>
                                <div class="flex flex-col basis-1/3 text-left gap-2">
                                    <h4 class="text-xs text-gray-500">TOTAL IMPRESSIONS </h4>
                                    <p>{{ metrics.totalImpressions ??"---"}}</p>
                                </div>
                            </div>

                            <div class="flex justify-between">
                                <div class="flex flex-col basis-1/3 text-left gap-2">
                                    <h4 class="text-xs text-wrap break-words text-gray-500">TOTAL INTERACTIONS</h4>
                                    <p>{{metrics.totalInteractions ?? "---"}}</p>
                                </div>
                                <div class="flex flex-col basis-1/3 text-left gap-2">
                                    <h4 class="text-xs text-gray-500">TOTAL SHARES</h4>
                                    <p>{{metrics.totalShares ?? "---"}}</p>
                                </div>
                                <div class="flex flex-col basis-1/3 text-left gap-2">
                                    <h4 class="text-xs text-gray-500">TOTAL LIKES</h4>
                                    <p>{{metrics.totalLikes ?? "---"}}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                
            </div>
            <div class="basis-1/4 md:px-4 flex flex-col gap-5 ">
                <div class="flex flex-row md:flex-col gap-4" v-if="loading">
                    <CreatorLoadingCard/>
                    <CreatorLoadingCard/>
                    <CreatorLoadingCard/>
                </div>

                <div v-else  v-for="request in requests" :key="request.id">
                    <BrandsCampaignRequestCard
                    :request=request
                    />
                </div>


            </div>
        </div>

        <div>
            <div class="mx-4 mt-10">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table
                    class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                    <thead
                    class="text-xs text-gray-700 uppercase bg-darkBlue dark:bg-darkBlue dark:text-purplebg"
                    >
                    <tr>
                        <th scope="col" class="px-6 py-3">Content Creator</th>

                        <th scope="col" class="px-6 py-3">Number of Posts</th>
                        <th scope="col" class="px-6 py-3">Views </th>
                        <th scope="col" class="px-6 py-3">Likes</th>
                        <th scope="col" class="px-6 py-3">Dislikes</th>

                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr  class="bg-white border-b dark:bg-[#090618] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-darkBlue">
                                <th scope="row" class="pl-6 py-4 font-medium text-gray-900 text-wrap  dark:text-white">
                                    <p class="max-w-[100px] break-words">
                                        
                                    </p>
                                </th>
                                
                                <td class="pl-6 py-4">
                                    
                                </td>
                                <td class="pl-6 py-4">
                                   
                                </td>
                                <td class="pl-6 py-4">
                                   
                                </td>
                              

                        
                        <td class="pl-6 py-4">
                       

                        </td>

                       
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
</template>
