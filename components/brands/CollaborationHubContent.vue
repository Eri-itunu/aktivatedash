<script setup lang="ts">
    import { Files } from 'lucide-vue-next';
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
    <div class="h-full" >
        <div v-if="!isPaid" class=" bg-white gap-6 dark:bg-vDarkBlue bg-opacity-70 flex-col flex items-center h-full justify-start mt-20 ">

            <Files class="h-12 w-12" color="#A4C3FE" />
            <p class="text-[#6D6B76]">No creators application approved. Once you approve creators, you’ll see their profile </p>
        </div>

        <div v-else class="w-full h-full flex flex-col gap-4 items-center justify-center">
        
        <div v-if="requestHub.length === 0">
            <p class="text-center mt-10">No applications received yet</p>
        </div>
    

        <div v-else v-for="(requests, rowIndex) in requestHub" class="w-full h-full">
            hello
        </div>
        </div>
    </div>
</template>