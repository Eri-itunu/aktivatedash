
<script setup lang="ts" >


    import html2pdf from "html2pdf.js";
    import type { ICampaign, ICampaignRequest, APIResponse, ContentSubmissions, IUserProfile } from "types";
    import { useToast } from "../../components/ui/toast";


    const props = defineProps<{
        campaign:ICampaign
        creators:IUserProfile
    }>()


    const userStore = useUserStore();
    const accessToken = userStore.accessToken || "";
    const API_URL = useRuntimeConfig().public.API_URL;
    const { toast } = useToast();
    const route = useRoute();
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

   
   
</script>

<template>

    <div class=" print-body px-4 flex flex-col gap-4 h-screen  text-white">

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
        <div  v-if="selectedTab === 'Campaign Summary' && campaign"  class="flex flex-col h-full gap-4">
            <BrandsReportSummary :creators="creators"  :campaign="campaign" />
        </div>

        <!-- Creators overview section -->
        <div v-if="selectedTab === 'Creators' || print " >
            <div class=" mx-4 mt-10">
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
                            <th scope="col" class=" py-3  text-left px-6 text-[#CDC2FF]">Platform</th>
                            
                        </tr>
                        </thead>
                        <tbody>

                        <tr
                            v-for="creator in creators"
                            :key="creator.id"
                            class=" border-b bg-[#090618] border-gray-700  hover:bg-darkBlue"
                        >
                
                            <td class="text-left p-6 tracking-tight" >
                                {{ creator.name }}
                            </td>
                            <td class="text-left p-6 tracking-tight" >
                                {{ creator.followers }}
                            </td>
                            <td class="text-left p-6 tracking-tight" >
                                {{ creator.engagement }}
                            </td>
                            <td class="text-left p-6 tracking-tight" >
                                {{ creator.eRate }}
                            </td>
                            <td class="text-left p-6 tracking-tight" >
                                {{ creator.impressions }}
                            </td>
                            <td class="text-left p-6 tracking-tight" >
                                {{ creator.platforms }}
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
            <div class="grid  md:grid-cols-4 grid-cols-2 gap-8">
                <div v-for="sample in samples" :key="sample.id" class=" bg-[#090618] flex justify-between rounded-lg" >
                    <Dialog>
                        <DialogTrigger class="w-fit cursor-pointer">
                            <div class="hover:grayscale-0 grayscale w-fit">
                                <img src="/assets/icons/creatorContent.svg" alt="" class="w-full "  >
                                <div class="p-4" >
                                    <h1>Perfect Gem Campaign</h1>
                                    <p>Unknown creator</p>
                                </div>

                            </div>
                        </DialogTrigger>
                        <DialogContent class="bg-[#090618] text-white border-none" >
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>

                        <DialogFooter>
                            Save changes
                        </DialogFooter>
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