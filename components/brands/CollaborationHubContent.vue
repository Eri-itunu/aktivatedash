<script setup lang="ts">
    import { Files, FileText, Check,X } from 'lucide-vue-next';
    import type {  Collaboration, PaginatedAPIResponse, ContentSubmissions } from "@/types";
    import { useToast } from "@/components/ui/toast/use-toast";

    const loading = ref(false);
    const config = useRuntimeConfig();
    const API_URL = config.public.API_URL ;
    const userStore = useUserStore();
    const getBrandCampaignStore = useGetBrandCampaignStore();
    const {toast}  = useToast();
    const route = useRoute();
    const requestHub = ref<Collaboration[]>([])
    const contents = ref<ContentSubmissions[]>([]);
    const empty = ref(false);
    const approvedContent = ref<ContentSubmissions[]>([]);
    const rejectedContent = ref<ContentSubmissions[]>([]);
    const pendingContent = ref<ContentSubmissions[]>([]);
    import { formatDate } from '@/utils';
    const status = ref('pending')
    const props = defineProps<{
    isPaid: Boolean
    id: string
    }>();

    const getContent = async () => {
        loading.value = true;
        const apiUrl = API_URL;
        try {
            const res = await $fetch<
            PaginatedAPIResponse<"submissions", ContentSubmissions>
            >(`${apiUrl}/submission/brand/my-submissions?campaign_id=${props.id}&campaign_type=collaboration-hub`, {
            headers: { Authorization: `Bearer ${userStore.accessToken}` },
            });
            contents.value = res.data.submissions.data;
            loading.value = false;
            approvedContent.value = contents.value.filter(
            (element) => element.campaignDecision === "accept"
            );
            rejectedContent.value = contents.value.filter(
            (element) => element.campaignDecision === "reject"
            );
            pendingContent.value = contents.value.filter(
            (element) => element.campaignDecision === "pending"
            );
        } catch (error: any) {
            toast({
            title:
                error.data?.messsage ||
                "Unable to retrieve content list. Try again later",
            });
        }
    };

    const handlePayment = async () => {
        try {
            const res = await getBrandCampaignStore.payForCampaign(props.id);
            navigateTo(res.url, { open: { target: "_blank", windowFeatures: { width: 500, height: 500 } } });
            setTimeout(getContent, 10000);
        } catch (error: any) {
            toast({ title: error.message || "Payment failed" });
        }
    };



onMounted(async () => await getContent());
</script>

<template>
    <div class="h-full px-8" >
        <div v-if="!isPaid" class=" gap-6  bg-opacity-70 flex-col flex items-center h-full justify-start mt-20 ">

            <Files class="h-12 w-12" color="#A4C3FE" />
            <p class="text-[#6D6B76]">No creators application approved. Once you approve creators, you’ll see their profile </p>
        </div>

        <div v-if="loading" class="flex gap-4 flex-col">
            <SkeletonsContentCard v-for="n in [0,1,2]" :key="n" />
        </div>
        <div v-if="isPaid" class="w-full h-full flex flex-col gap-4 items-center justify-center">
        
            <div v-if="contents.length === 0">
                <p class="text-center mt-10">No content submited for approval yet</p>
            </div>
        

            <div v-else  class="w-full h-full flex flex-col gap-4">
                <Select v-model="status" >
                    <SelectTrigger class="w-[180px]">
                        <SelectValue  />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem  value="pending">
                            <p class="flex gap-1 items-center">  Pending</p>
                            </SelectItem>
                            <SelectItem value="approved" class="flex gap-1" >
                                <p class="flex gap-1 items-center">  Approved </p> 
                            </SelectItem>
                            <SelectItem value="rejected">
                                <p class="flex gap-1 items-center"> Rejected </p>
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                
                <div v-if="status === 'approved'"  >
                    <div v-if="approvedContent.length === 0">
                        <p>No content available.</p>
                    </div>
                    <div v-else>
                        <BrandsContentCard 
                        v-for="(content, index) in approvedContent"  
                        :key="index" 
                        :content="content"
                        @selected="getContent" 
                        
                        />
                    </div>
                </div>

                <div v-if="status === 'pending'">
                    <div v-if="pendingContent.length === 0">
                        <p>No content available.</p>
                    </div>
                    <div v-else>
                        <BrandsContentCard
                        v-for="(content, index) in pendingContent"
                        :key="index"
                        :content="content"
                        @selected="getContent"
                        />
                    </div>
                </div>

                <div v-if="status === 'rejected'">
                    <div v-if="rejectedContent.length === 0">
                        <p>No content available.</p>
                    </div>
                    <div v-else>
                        <BrandsContentCard
                        v-for="(content, index) in rejectedContent"
                        :key="index"
                        :content="content"
                        @selected="getContent"
                        />
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>