<script setup lang="ts">
    import { Gift, Facebook, Instagram, ArrowLeft, Heart, Lock } from 'lucide-vue-next';
    import type {  Collaboration, PaginatedAPIResponse } from "@/types";
    import { useToast } from "@/components/ui/toast/use-toast";

    const loading = ref(false);
    const config = useRuntimeConfig();
    const API_URL = config.public.API_URL ;
    const platformFee = config.public.PLATFORM_FEE
    const cleanedFee = Number(platformFee.replace(/[_ ,]/g, ""))
    const userStore = useUserStore();
    const getBrandCampaignStore = useGetBrandCampaignStore();
    const {toast}  = useToast();
    const route = useRoute();
    const requestHub = ref<Collaboration[]>([])
    import { formatDate } from '@/utils';
    const props = defineProps<{
    cost:number
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
                            <p>Creator fee</p>
                            <p  class="opacity-[85%]">NGN {{ cost }}</p>
                        </div>
                        <div class="flex justify-between py-3 border-b">
                            <p>Platform fee</p>
                            <p class="opacity-[85%]">NGN {{cleanedFee}}</p>
                        </div>
                        <div class="flex justify-between py-3">
                            <p class="font-semibold">Total Amount</p>
                            <p class="text-purple1 font-semibold" >NGN {{cleanedFee + cost }}</p>
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
           
        
            <div v-if="requestHub.length === 0 && !loading">
                <p class="text-center mt-10">No applications received yet</p>
            </div>
    

            <div v-else  class="w-full h-full">
                <div class="w-full h-full">
                    <!-- Header Section -->
                    <div class="flex justify-between border-b w-full items-center py-2 px-4">
                        <p>Shortlist your top 6 by adding them to favourites before approving</p>
                        <button class="flex gap-1 rounded-[100px] text-sm border items-center p-2">
                        Favourites <Heart class="h-4" />
                        </button>
                    </div>

                    <table class="w-full  border-t ">
                        <thead>
                        <tr class="border-t border-b">
                            <th class="px-4 py-2">Shortlist</th>
                            <th class="px-4 py-2">Name</th>
                            <th class="px-4 py-2">Engagement Rate</th>
                            <th class="px-4 py-2">Followers</th>
                            <th class="px-4 py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-if="loading" v-for="n in 3" :key="n" class="border-b">
                                <td class="px-4 py-2 text-center">
                                    <div class="animate-pulse bg-gray-300 rounded-full h-6 w-6 mx-auto"></div>
                                </td>
                                <td class="px-4 py-2">
                                    <div class="animate-pulse bg-gray-300 h-4 w-32 rounded"></div>
                                </td>
                                <td class="px-4 py-2 text-center">
                                    <div class="animate-pulse bg-gray-300 h-4 w-12 rounded mx-auto"></div>
                                </td>
                                <td class="px-4 py-2 text-center">
                                    <div class="animate-pulse bg-gray-300 h-4 w-16 rounded mx-auto"></div>
                                </td>
                                <td class="px-4 py-2 text-center">
                                    <div class="animate-pulse bg-gray-300 h-6 w-20 rounded mx-auto"></div>
                                </td>
                            </tr>
                            <tr v-if="!loading" v-for="(requests, rowIndex) in requestHub" :key="requests.id" class="border-b">
                                <td class="px-4 py-2 text-center">
                                <button @click="shortlistCreator(requests.id, true, rowIndex)">
                                    <Heart v-if="requests.isShorlisted" fill="red" strokeWidth="0" />
                                    <Heart v-else />
                                </button>
                                </td>
                                <td class="px-4 py-2">{{ requests.platformProfile.fullName }}</td>
                                <td class="px-4 py-2 text-center">{{ requests.platformProfile.engagementRate }}%</td>
                                <td class="px-4 py-2 text-center">
                                {{ requests.platformProfile.reputationFollowerCount.toLocaleString() }}
                                </td>
                                <td class="px-4 py-2 text-center">
                                <div v-if="requests.campaignDecision === 'pending'" class="flex gap-2 flex-col justify-center">
                                    <button @click="creatorDecision(requests.id, 'accept')" class="rounded-full px-4 border border-purple1 text-xs text-purple1 py-1">
                                    Approve
                                    </button>
                                    <button @click="creatorDecision(requests.id, 'reject')" class="rounded-full px-4 border text-[#EE273E] border-[#EE273E] text-xs py-1">
                                    Reject
                                    </button>
                                </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

            </div>
        </div>
        </div>
    </div>
</template>