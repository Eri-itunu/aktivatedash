<script setup lang="ts" >
    definePageMeta({
    layout: "brands",
    });
    import {
        getCampaign,
        getSingleCampaignRequest,
        getSingleCampaignMetrics,
    } from "../../../../api/brand/campaign/campaign.brand";
    import html2pdf from "html2pdf.js";
    import { Pin, FileSpreadsheet, CloudUpload, ChevronFirst, ChevronLeft, ChevronRight } from 'lucide-vue-next';
    import type { ICampaign, ICampaignRequest, APIResponse, ContentSubmissions, IUserProfile } from "types";
    import { useToast } from '../../../../components/ui/toast/use-toast'


    const userStore = useUserStore();
    const accessToken = userStore.accessToken || "";
    const API_URL = useRuntimeConfig().public.API_URL;
    const { toast } = useToast();
    const route = useRoute();
    const {reportID} = route.params
    const selectedTab = ref('Campaign Summary');
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
        {id:1, name:"Adesioye Eriitunu", followers:"523102", engagement: "2.5%", platforms: ['instagram', 'facebook', 'tiktok']},
        {id:2, name:"Akinola Akinleye", followers:"30", engagement: "0.5%", platforms: ['instagram', 'facebook', 'tiktok']},
        {id:3, name:"Olumide Adeyemo", followers:"2120", engagement: "1.1%", platforms: ['instagram', 'facebook', 'tiktok']},
        {id:4, name:"Chiamaka unknown", followers:"7500000", engagement: "2.8%", platforms: ['instagram', 'facebook', 'tiktok']},
        {id:4, name:"Chiamaka unknown", followers:"7500000", engagement: "2.8%", platforms: ['instagram', 'facebook', 'tiktok']},
        {id:4, name:"Chiamaka unknown", followers:"7500000", engagement: "2.8%", platforms: ['instagram', 'facebook', 'tiktok']},
    ])

    const exporttoPDF = () =>{
        html2pdf(document.getElementById("element-to-convert"))
    }
    const printPage =()=>{
        window.print()
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
        } catch (error: any) {

            toast({ title: error.data?.message || "Something went wrong" });
        }
    };
    const getCampaigns = async (reportID) => {
   
        try {
            const res = await $fetch<APIResponse<'profiles', IUserProfile[] >>(`${API_URL}/campaign/brand/${reportID}/creators`, {
                headers: { Authorization: `Bearer ${accessToken}`}
            });
            console.log(res)
            topCreators.value = res.data.profiles


        } catch (error: any) {
            toast({ title: error.message });
        }
    };
    watchEffect(async () => {
    await getCampaigns(reportID);
    await SingleCampaign(reportID);
    });
</script>

<template>

    <div class=" print-body px-4 flex flex-col gap-4 h-screen  text-white">

        <div class="flex justify-between">
            <h1>{{campaign?.headline}}</h1>
            <div class=" print-export flex gap-4" >
                <button @click="exporttoPDF" class="rounded-lg gap-1 border-2 flex items-center border-[#CDC2FF] text-[#CDC2FF] px-2 py-1 text-sm  " > 
                    <FileSpreadsheet color="#CDC2FF" class="h-4" /> Export PDF 
                </button>
                <button class="rounded-lg gap-1 border-2 flex items-center border-[#CDC2FF] text-[#CDC2FF] px-2 py-1 text-sm " > <CloudUpload color="#CDC2FF" class="h-4" /> Export CSV</button>
            </div>
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
        <div  v-if="selectedTab === 'Campaign Summary' || print"  class="flex flex-col h-full gap-4">
            <BrandsReportSummary :creators="topCreators"  :campaign="campaign" />
        </div>

        <!-- Creators overview section -->
        <div v-if="selectedTab === 'Creators' || print " >
            <div class=" mx-4 mt-10">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table
                        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                        <thead
                        class="text-xs text-gray-700 uppercase bg-darkBlue dark:bg-darkBlue dark:text-purplebg"
                        >
                        <tr>
                            <th scope="col" class="px-6 py-3 text-center text-[#CDC2FF]">Creators</th>

                            <th scope="col" class="max-lg:hidden px-6 text-center py-3 text-[#CDC2FF]">Followers</th>
                            <th scope="col" class="max-lg:hidden px-6 text-center py-3 text-[#CDC2FF]">Engagement</th>
                            <th scope="col" class="max-lg:hidden px-6 text-center py-3 text-[#CDC2FF]">Platform</th>
                            
                        </tr>
                        </thead>
                        <tbody>

                        <tr
                            v-for="creator in creators"
                            :key="creator.id"
                            class="bg-white border-b dark:bg-[#090618] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-darkBlue"
                        >
                
                            <td class="text-center p-4" >
                                {{ creator.name }}
                            </td>
                            <td class="text-center p-4" >
                                {{ creator.followers }}
                            </td>
                            <td class="text-center p-4" >
                                {{ creator.engagement }}
                            </td>
                            <td class="text-center p-4" >
                                {{ creator.platforms }}
                            </td>
                        </tr>
                        </tbody>


                        <tfoot class="text-xs text-gray-700 uppercase bg-darkBlue dark:bg-darkBlue dark:text-purplebg">
                            <tr  >
                                
                                <th colspan="4" class="max-lg:hidden px-6 py-3  text-[#CDC2FF]">
                                    <div class="flex justify-center">
                                        <button>
                                            <ChevronLeft/>
                                        </button>
                                        <button>
                                            1
                                        </button>
                                        <button>
                                            <ChevronRight/>
                                        </button>

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
            <div class="grid grid-rows-2 md:grid-cols-3 grid-cols-2 gap-2">
                <div v-for="sample in samples" :key="sample.id" class="bg-[#090618] flex justify-between rounded-lg p-4" >
                    <div>
                        <h1>Perfect Gem Campaign</h1>
                        <p>Unknown creator</p>
                    </div>
                    <p>tiktok</p>
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