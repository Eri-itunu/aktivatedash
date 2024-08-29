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
    const last_Page = ref<number>(1);

    const getCampaigns = async (page?: number) => {
    const filter = {
        limit: "7",
        page: page?.toString() || "1",
    };
    const qs = new URLSearchParams(filter);
    try {
        const {
        data,
        meta: { lastPage },
        } = await getBrandCampaignStore.getBrandCampaigns(qs.toString());

        campaigns.value = []
        campaigns.value.push(...data);
        last_Page.value = lastPage;
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
    <div class="px-4 text-white flex justify-center mt-10 flex-col" >
        <h1 class=" pl-4 tracking-tighter text-xl" >My campaigns</h1>
        <div id="print-content" class=" mx-4 mt-5">
            <div class="relative overflow-x-auto shadow-md rounded-lg">
                <table
                    class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                    <thead
                    class="text-xs text-gray-700 uppercase bg-darkBlue dark:bg-darkBlue dark:text-purplebg"
                    >
                    <tr>
                        <th scope="col" class="px-6 py-3 text-center text-[#CDC2FF]">Campaign Name</th>
                        <th scope="col" class="px-6 py-3 text-center text-[#CDC2FF]"> Creators Added</th>
                        <th scope="col" class=" px-6 text-center py-3 text-[#CDC2FF]">Platform</th> 
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-if="loading">
                            <td class="px-6 py-4">
                            <USkeleton class="h-4 w-[250px]" />
                            </td>
                            <td class="px-6 py-4">
                            <USkeleton class="h-4 w-[250px]" />
                            </td>
                            <td class="max-lg:hidden px-6 py-4">
                            <USkeleton class="h-4 w-[250px]" />
                            </td>
                            
                        </tr>

                    <tr
                        @click="$router.push(`/brands/dashboard/report/${campaign?.id}`)" 
                        v-for="campaign in campaigns"
                        :key="campaign.id"
                        class=" border-b bg-[#090618] border-gray-700 cursor-pointer  dark:hover:bg-darkBlue"
                    >
            
                        <td class="text-center p-4" >
                            {{ campaign.headline }}
                        </td>
                        <td class="text-center p-4" >
                            {{ campaign.requests?.length }}
                        
                        </td>
                        <td class="text-center flex gap-2 py-4  items-center justify-center" >
                          
                          <div v-for="platform in campaign.deliverables?.platform" >
                            <p>{{ platform }}</p>
                          </div>
                        </td>
                    </tr>
                    </tbody>


                  
                </table>
            </div>
        </div>
    </div>
</template>