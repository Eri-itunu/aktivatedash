<script setup lang="ts">
    definePageMeta({
        layout: "brands",
    });
    import { Pin, FileSpreadsheet, CloudUpload, ChevronFirst, ChevronLeft, ChevronRight } from 'lucide-vue-next';
    import type { ICampaign, ResponseMessage } from "types";
    import { useToast } from '../../../../components/ui/toast/use-toast'
    const config = useRuntimeConfig();
    const API_URL = config.public.API_URL;
    const { toast } = useToast();
    const getBrandCampaignStore = useGetBrandCampaignStore();
    const campaigns = ref<ICampaign[]>([]);
    const isPublished = ref(false);
    const loading = ref(true);

    const page = ref<number>(1);
    const lastPage = ref<number>(1);

    const getCampaigns = async (page?: number) => {
    const filter = {
        limit: "7",
        page: page?.toString() || "1",
    };
    const qs = new URLSearchParams(filter);
    try {
        const {
        data,
        meta: { last_page },
        } = await getBrandCampaignStore.getBrandCampaigns(qs.toString());

        campaigns.value = []
        campaigns.value.push(...data);
        lastPage.value = last_page;
        loading.value = false;
    } catch (error: any) {
        toast({ title: error.message });
    }
    };

    watchEffect(async () => {
    await getCampaigns(page.value);
    });

</script>

<template>
    <div class="px-4 text-white" >
        <h1 class="font-semibold text-2xl" >My campaigns</h1>
        <div id="print-content" class=" mx-4 mt-10">
            <div class="relative overflow-x-auto shadow-md rounded-lg">
                <table
                    class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                    <thead
                    class="text-xs text-gray-700 uppercase bg-darkBlue dark:bg-darkBlue dark:text-purplebg"
                    >
                    <tr>
                        <th scope="col" class="px-6 py-3 text-center text-[#CDC2FF]">Campaign Name</th>
                        <th scope="col" class="px-6 py-3 text-center text-[#CDC2FF]"> Published</th>
                        <th scope="col" class=" px-6 text-center py-3 text-[#CDC2FF]">Platform</th> 
                    </tr>
                    </thead>
                    <tbody>

                    <tr
                        @click="$router.push(`/brands/dashboard/report/${campaign?.id}`)" 
                        v-for="campaign in campaigns"
                        :key="campaign.id"
                        class=" border-b bg-[#090618] border-gray-700  dark:hover:bg-darkBlue"
                    >
            
                        <td class="text-center p-4" >
                            {{ campaign.headline }}
                        </td>
                        <td class="text-center p-4" >
                            {{ campaign.is_published }}
                        </td>
                        <td class="text-center p-4" >
                           {{ campaign.deliverables?.platform}}
                           <img src="/assets/icons/collab/tiktokWhite.svg" alt="">
                        </td>
                    </tr>
                    </tbody>


                    <tfoot class="text-xs text-gray-700 uppercase bg-darkBlue dark:bg-darkBlue dark:text-purplebg">
                        <tr  >
                            
                            <th colspan="4" class="max-lg:hidden px-6 py-3  text-[#CDC2FF]">
                                <div class="flex justify-center gap-4 text-white">
                                    <button class="rounded-lg border-white border-2"  >
                                        <ChevronLeft/>
                                    </button>
                                    <button>
                                       {{page}}
                                    </button>
                                    <button class="rounded-lg border-white border-2" >
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
</template>