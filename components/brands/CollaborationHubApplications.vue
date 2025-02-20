<script setup lang="ts">
    import { Gift, Facebook, Instagram, ArrowLeft, Heart, Lock } from 'lucide-vue-next';
    import type {  Collaboration, PaginatedAPIResponse } from "@/types";
    import { useToast } from "@/components/ui/toast/use-toast";

    const loading = ref(false);
    const config = useRuntimeConfig();
    const API_URL = config.public.API_URL ;
    const userStore = useUserStore();
    const getBrandCampaignStore = useGetBrandCampaignStore();
    const {toast}  = useToast();
    const route = useRoute();
    const requestHub = ref<Collaboration[]>([])
    import { formatDate } from '@/utils';
    const props = defineProps<{
    isPaid: Boolean
    id: string
    }>();

    const handlePayment = async () => {
    try {
        const res = await getBrandCampaignStore.payForCampaign(props.id);
        navigateTo(res.url, { open: { target: "_blank", windowFeatures: { width: 500, height: 500 } } });
        setTimeout(getDetails, 10000);
    } catch (error: any) {
        toast({ title: error.message || "Payment failed" });
    }
    };

    const getDetails = async()=>{

        loading.value = true
        try {
            const res= await $fetch<PaginatedAPIResponse<'requests', Collaboration >>(`${API_URL}/campaign/collaboration-hub/${props.id}/requests`,
            {
            headers: { Authorization: `Bearer ${userStore.accessToken}`}
            });
            requestHub.value = res.data.requests.data
            console.log(requestHub.value)
            loading.value = false
            
        } catch (error: any) {
            console.error('Error fetching collaboration hub:', error);
            loading.value = false
            return null;
        }
    }

    const shortlistCreator = async(id:string, decision:boolean, rowIndex)=>{
        const index = requestHub.value.findIndex((req) => req.id === id);
        if (index !== -1) {
            requestHub.value[index].isShorlisted = decision;
        }
        loading.value = true
        try {
        const res= await $fetch<PaginatedAPIResponse<'requests', Collaboration >>(`${API_URL}/campaign/collaboration-hub/shortlist-request`,
            {
            headers: { Authorization: `Bearer ${userStore.accessToken}`},
            method: 'post',
            body: {
            requestId: id,
            decision: decision
            }
        });
       
        loading.value = false
        
        } catch (error: any) {
            const index = requestHub.value.findIndex((req) => req.id === id);
        if (index !== -1) {
            requestHub.value[index].isShorlisted = !decision;
        }
        loading.value = false
        return null;
    }

}

const creatorDecision = async(id:string, decision:string)=>{
 
 loading.value = true
 try {
 const res= await $fetch<PaginatedAPIResponse<'requests', Collaboration >>(`${API_URL}/campaign/collaboration-hub/decide-on-request`,
     {
     headers: { Authorization: `Bearer ${userStore.accessToken}`},
     method: 'post',
     body: {
     requestId: id,
     decision: decision,
     reason: ''
     }
 });
 const index = requestHub.value.findIndex((req) => req.id === id);
     if (index !== -1) {
         requestHub.value[index].campaignDecision = decision;
     }
 requestHub.value = res.data.requests.data
 loading.value = false
 
 } catch (error: any) {
 loading.value = false
 return null;
 }
}

onMounted(async () => await getDetails());
</script>

<template>
    <div class="h-full " >
        <div v-if="!isPaid" class="border inset-0 bg-white gap-1 dark:bg-vDarkBlue bg-opacity-70 flex-col flex items-center h-full justify-center pb-20 ">
            <Lock />
            <p class="font-semibold text-[18px]"  >Creators have applied</p>
            <p class="text-[#6D6B76]" >You'll be able to access full details after payment is made</p>

            <Dialog>
                <DialogTrigger>
                    <button class="text-white bg-purple1 mt-4 rounded-[26px] text-sm px-4 py-2" >
                        PAY NOW
                    </button>
                </DialogTrigger>

                <DialogContent> 
                    <DialogHeader>
                        <DialogTitle>Payment Summary</DialogTitle>
                    </DialogHeader>

                    <div class="flex flex-col text-sm" >
                        <div class="flex justify-between py-3 border-b">
                            <p>5 instagram reels</p>
                            <p  class="opacity-[85%]">NGN 480,000</p>
                        </div>
                        <div class="flex justify-between py-3 border-b">
                            <p>Platform fee</p>
                            <p class="opacity-[85%]">NGN 480,000</p>
                        </div>
                        <div class="flex justify-between py-3">
                            <p class="font-semibold">Total Amount</p>
                            <p class="text-purple1 font-semibold" >NGN 480,000</p>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <button @click="handlePayment" class="text-white w-1/2 bg-purple1 rounded-[8px] text-sm px-4 py-2" >
                            PAY NOW
                        </button>
                    </div>

                </DialogContent>
            </Dialog>
           
        </div>

        <div  class="w-full h-full flex flex-col gap-4 items-center justify-center">
            <!-- <div v-if="loading" class="w-[100%] h-[100%] fixed top-0 right-0 left-0 bottom-0 z-50 bg-[#000000]/ flex justify-center items-center">
                <LoadSpinner />
            </div> -->
        
            <div v-if="requestHub.length === 0 && !loading">
                <p class="text-center mt-10">No applications received yet</p>
            </div>
    

            <div v-else v-for="(requests, rowIndex) in requestHub" class="w-full h-full">
                <div class="w-full h-full">
                    <!-- Header Section -->
                    <div class="flex justify-between border-b w-full items-center py-2 px-4">
                        <p>Shortlist your top 6 by adding them to favourites before approving</p>
                        <button class="flex gap-3 rounded-[100px] border p-2">
                        Favourites <Heart />
                        </button>
                    </div>

                    <!-- Table Headers -->
                    <div class="w-full flex justify-between border-b py-1 px-4">
                        <h1 class="px-6">Creators</h1>
                        <h1>Engagement Rate</h1>
                        <h1 class="px-6">Followers</h1>
                    </div>

                    <!-- Creator Row -->
                    <div :key="requests.id" class="w-full border-b">
                        <div class="w-full py-6 px-8 justify-between">
                        <div class="flex justify-between w-full">
                            <div class="flex gap-3 items-center">
                            <!-- Shortlist Button -->
                            <button @click="shortlistCreator(requests.id, false, rowIndex)" v-if="requests.isShorlisted">
                                <Heart fill="red" strokeWidth={0} />
                            </button>
                            <button @click="shortlistCreator(requests.id, true, rowIndex)" v-else>
                                <Heart />
                            </button>
                            <p>{{ requests.platformProfile.fullName }}</p>
                            </div>

                            <p class="px-6 py-4">{{ requests.platformProfile.engagementRate }}%</p>
                            <p class="px-6 py-4">
                            {{ requests.platformProfile.reputationFollowerCount.toLocaleString() }}
                            </p>
                        </div>

                        <!-- Decision Buttons -->
                        <div class="flex gap-8" v-if="requests.campaignDecision === 'pending'">
                            <button 
                            @click="creatorDecision(requests.id, 'accept')" 
                            class="rounded-[100px] px-8 border border-purple1 text-purple1 py-2"
                            >
                            Approve
                            </button>

                            <button 
                            @click="creatorDecision(requests.id, 'reject')" 
                            class="rounded-[100px] text-[#EE273E] border-[#EE273E] px-8 border py-2"
                            >
                            Reject
                            </button>
                        </div>

                        <!-- Decision Status -->
                        <div v-if="requests.campaignDecision === 'accept'">
                            <span class="font-bold">Accepted</span>
                        </div>
                        <div v-if="requests.campaignDecision === 'reject'">
                            <span class="font-bold">Rejected</span>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        </div>
    </div>
</template>