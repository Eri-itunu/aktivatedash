<script setup lang="ts" >
    definePageMeta({
    layout: "brands",
    });
    import {
        getCampaign,
        getSingleCampaignMetrics,
    } from "../../../../api/brand/campaign/campaign.brand";
    import html2pdf from "html2pdf.js";
    import type { ICampaign, ICampaignRequest,BrandsDashMetrics, APIResponse, ContentSubmissions, IUserProfile } from "types";
    import { useToast } from '../../../../components/ui/toast/use-toast'
    import { getCampaignPosts } from "../../../../api/brand/campaign/campaign.brand";
    

    const props = defineProps<{
        campaign:ICampaign
        
    }>()
    const showSpinner = ref(true)
    const userStore = useUserStore();
    const accessToken = userStore.accessToken || "";
    const API_URL = useRuntimeConfig().public.API_URL;
    const { toast } = useToast();
    const route = useRoute();
    const {reportID} = route.params
    const selectedTab = ref('Campaign Summary');
    const CampaignResults = ref()
    const totalCampaignMetrics = ref()
    const tabs = ref([
        { id: 1, tabs: 'Campaign Summary',  },
        { id: 2, tabs: 'Creators', },
        { id: 3, tabs: 'Content',  },
    ]);
    const topCreators = ref<IUserProfile[]>([]);
    const campaign = ref<ICampaign>();
    const print = ref(false)
    const samples = ref([
        { id:1 },
        { id:2},
        { id:3},
        { id:4},
        { id:5},
        { id:6},
        { id:7},
        { id:8},
    ])
    const creators = ref([
        {id:1, name:"Adesioye Eriitunu", followers:"523102", engagement: "2.5%", platforms: ['instagram', 'facebook', 'tiktok'], eRate:"20000", impressions:"3M"},
        {id:2, name:"Akinola Akinleye", followers:"30", engagement: "0.5%", platforms: ['instagram', 'facebook', 'tiktok'], eRate:"20000", impressions:"3M"} ,
        {id:3, name:"Olumide Adeyemo", followers:"2120", engagement: "1.1%", platforms: ['instagram', 'facebook', 'tiktok'], eRate:"20000", impressions:"3M"} ,
        {id:4, name:"Chiamaka unknown", followers:"7500000", engagement: "2.8%", platforms: ['instagram', 'facebook', 'tiktok'], eRate:"20000", impressions:"3M"}, 
        {id:4, name:"Chiamaka unknown", followers:"7500000", engagement: "2.8%", platforms: ['instagram', 'facebook', 'tiktok'], eRate:"20000", impressions:"3M"} ,
        {id:4, name:"Chiamaka unknown", followers:"7500000", engagement: "2.8%", platforms: ['instagram', 'facebook', 'tiktok'], eRate:"20000", impressions:"3M"} ,
    ])

    const exporttoPDF = () =>{
        html2pdf(document.getElementById("element-to-convert"))
    }

    const SingleCampaign = async (reportID) => {
        const accessToken = userStore.accessToken || "";

        try {
            const platform = await getCampaign({
            apiUrl: API_URL,
            campaignId: reportID,
            accessToken,
            });
            campaign.value = platform;
            showSpinner.value=false
        } catch (error: any) {
            showSpinner.value=false
            toast({ title: error.data?.message || "Something went wrong" });
        }
    };

    const totalMaterics = async()=>{
        try{
            const res = await getSingleCampaignMetrics({
                apiUrl: API_URL,
                accessToken, 
                campaignId: reportID,
            })
            totalCampaignMetrics.value = res
            showSpinner.value=false
            
        }catch(error:any){
            showSpinner.value=false
            console.log(error)
        }
    }

    const getCampaignMetrics = async ()=>{
        try{
            const {
                data,
                meta: { lastPage },
            }= await getCampaignPosts({
                apiUrl: API_URL,
                accessToken, 
                campaignID: reportID,
            })
            CampaignResults.value = data
            // console.log(CampaignResults)
        }catch(error:any){
            console.log(error)
        }
    }
    const getCampaigns = async (reportID) => {
   
        try {
            const res = await $fetch<APIResponse<'profiles', IUserProfile[] >>(`${API_URL}/campaign/brand/${reportID}/creators`, {
                headers: { Authorization: `Bearer ${accessToken}`}
            });
            // console.log(res)
            topCreators.value = res.data.profiles


        } catch (error: any) {
            toast({ title: error.message });
        }
    };

    const external =(url)=>{
        navigateTo(url, {
        open: {
            target: "_blank",
            windowFeatures: {
            width: 500,
            height: 500,
            },
        },
        })
    }
    watchEffect(async () => {
    await getCampaigns(reportID);
    await SingleCampaign(reportID);
    await getCampaignMetrics()
    await totalMaterics()
    });
</script>

<template>

    <div v-if="showSpinner" class="w-[100%] h-[100%] fixed top-0 right-0 left-0 bottom-0 z-50 bg-[#000000]/ flex justify-center items-center">
        <LoadSpinner />
    </div>

    <div v-else class=" print-body px-4 flex flex-col gap-4 h-screen  text-white">

        <div class="flex justify-between">
            <h1 class=" text-2xl font-semibold  tracking-tighter" >{{campaign?.headline}} - Reporting</h1>

            <!--Export PDF and CSV-->
            <!-- <div class=" print-export flex gap-4" >
                <button @click="exporttoPDF" class="rounded-lg gap-1 border-2 flex items-center border-[#CDC2FF] text-[#CDC2FF] px-2 py-1 text-sm  " > 
                    <FileSpreadsheet color="#CDC2FF" class="h-4" /> Export PDF 
                </button>
                <button class="rounded-lg gap-1 border-2 flex items-center border-[#CDC2FF] text-[#CDC2FF] px-2 py-1 text-sm " > <CloudUpload color="#CDC2FF" class="h-4" /> Export CSV</button>
            </div> -->
        </div>

        <!-- Tab switching section -->
        <section class="tab-section text-white flex w-full ">
            <div
                v-for="tab in tabs"
                :key="tab.id"
                :class="[
                ' basis-1/3 cursor-pointer text-center  p-4  flex max-w-fit text-sm' ,
                tab.tabs === selectedTab ? ' border-b-purple1 border-b-[2px] text-purple1' : 'border-b-[1px] border-b-grey1 '
                ]"
                @click="selectedTab = tab.tabs"
            >
                {{ tab.tabs }}

            </div>
            <div class="  border-b-grey1 border-b-[1px] w-full" >

            </div>
        </section>

        
        <!-- Key results section -->
        <div  v-if="selectedTab === 'Campaign Summary' && campaign "  class="flex flex-col h-full gap-4">
            <BrandsReportSummary :creators="topCreators"  :campaign="campaign"  :totalCampaignMetrics="totalCampaignMetrics" />
        </div>

        <!-- Creators overview section -->
        <div v-if="selectedTab === 'Creators'  " >
            <div v-if="CampaignResults.length === 0"  class="text-center py-8">
                No creators have uploaded content yet
            </div>
            <div v-else class=" mx-4 mt-10">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table
                        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                        <thead
                        class="text-xs  tracking-tighter bg-darkBlue text-purplebg"
                        >
                        <tr>
                            <th scope="col" class="py-3  text-left px-6  text-[#CDC2FF]">Creators</th>

                            <th scope="col" class=" py-3  text-left px-6 text-[#CDC2FF]">Followers</th>
                            <th scope="col" class=" py-3  text-left px-6 text-[#CDC2FF]">Engagement</th>
                            <th scope="col" class=" py-3  text-left px-6 text-[#CDC2FF]">Engagement Rate</th>
                            <th scope="col" class=" py-3  text-left px-6 text-[#CDC2FF]">Impressions</th>
                            
                            
                        </tr>
                        </thead>
                        <tbody>

                        <tr
                            v-for="creator in CampaignResults"
                            :key="creator.id"
                            class=" border-b bg-[#090618] border-gray-700  hover:bg-darkBlue"
                        >
                
                            <td class="text-left p-6 tracking-tight" >
                                {{ creator.platformProfile.platformUsername }}
                            </td>
                            <td class="text-left p-6 tracking-tight" >
                                {{ creator.platformProfile.reputationFollowerCount }}
                            </td>
                            <td class="text-left p-6 tracking-tight" >
                                {{ (creator.commentCount + creator.likeCount + creator.shareCount)}}
                            </td>
                            <td class="text-left p-6 tracking-tight" >
                                {{ ((creator.commentCount + creator.likeCount + creator.shareCount) / creator.platformProfile.reputationFollowerCount).toFixed(2) }}%  
                            </td>
                            <td class="text-left p-6 tracking-tight" >
                                {{ creator.viewCount }}
                            </td>
                            
                        </tr>
                        </tbody>


                        <tfoot class="text-xs text-gray-700 uppercase bg-darkBlue dark:bg-darkBlue dark:text-purplebg">
                            <tr  >
                                
                                <th colspan="6" class="max-lg:hidden px-6 py-3  text-[#CDC2FF]">
                                    <div class="flex justify-center">
                                        

                                    </div>
                                </th>
                            
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>

        <!-- Content overview section -->
        <div v-if="selectedTab === 'Content'">
            <div v-if="CampaignResults.length === 0"  class="text-center py-8">
                <p>No creators have uploaded content yet</p>
            </div>
            <div class="grid  md:grid-cols-4 grid-cols-2 gap-8">
                <div v-for="sample in CampaignResults" :key="sample.id" class=" bg-[#090618] flex justify-between rounded-lg" >
                    <Dialog>
                        <DialogTrigger class="w-fit cursor-pointer">
                            <div class="hover:grayscale-0 grayscale w-fit">
                                <img src="/assets/icons/creatorContent.svg" alt="" class="w-full "  >
                                <div class="p-4" >
                                    <h1>{{sample.platformProfile.platformUsername}}</h1>
                                    
                                </div>

                            </div>
                        </DialogTrigger>
                        <DialogContent class="bg-[#090618] max-w-[300px] text-white border-none" >
                        <DialogHeader>
                            <DialogTitle>Post Details</DialogTitle>
                            <div class="w-full flex justify-center py-4" >
                                <button class="rounded-[20px] bg-black max-w-fit p-2" @click="external(sample.url)" >view live post</button>
                            </div>
                            <div class="text-center flex flex-col gap-4" >
                                <span class="flex border-b-[0.5px] border-b-[1D192F]  justify-between" > <p>Comments :</p> <p> {{ sample.commentCount }}</p> </span>
                                <span class="flex border-b-[0.5px] border-b-[1D192F]  justify-between"> <p>Likes:</p> <p> {{sample.likeCount}}</p></span>
                                <span class="flex border-b-[0.5px] border-b-[1D192F]  justify-between"> <p>Shares:</p> <p> {{sample.shareCount}}</p></span>
                                <span class="flex border-b-[0.5px] border-b-[1D192F]  justify-between"> <p>Views:</p> <p> {{ sample.viewCount }}</p></span>
                                <span class="flex border-b-[0.5px] border-b-[1D192F]  justify-between"> <p>Engagement rate:</p> {{ ((sample.commentCount + sample.likeCount + sample.shareCount) / sample.platformProfile.reputationFollowerCount).toFixed(2) }}%  </span>
                                
                            </div>
                            
                        </DialogHeader>

                   
                        </DialogContent>
                    </Dialog>
                   
                </div>
                
            </div>
        </div>
    </div>

 
</template>

<style>
    @media print{
        

        .print-body{
            color: black
        }

        .tab-section, .print-export{
            display: none
        }
    }
</style>