<script setup lang="ts">
    import { Gift, Facebook, Instagram, ArrowLeft, Heart, Lock } from 'lucide-vue-next';
    import type {  Collaboration, PaginatedAPIResponse } from "@/types";
    import { useToast } from "@/components/ui/toast/use-toast";

    const loading = ref(false);
    const config = useRuntimeConfig();
    const API_URL = config.public.API_URL ;
    const platformFee = config.public.PLATFORM_FEE
    // const cleanedFee = Number(platformFee.replace(/[_ ,]/g, ""))
    const userStore = useUserStore();
    const getBrandCampaignStore = useGetBrandCampaignStore();
    const {toast}  = useToast();
    const route = useRoute();
    const shortlist = ref(false)
    const shortlistValue = ref(0)
    const requestHub = ref<Collaboration[]>([])

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
        
        if(shortlist.value){
            shortlistValue.value=1
        }else{
            shortlistValue.value=0
        }
        loading.value = true
        try {
            const res= await $fetch<PaginatedAPIResponse<'requests', Collaboration >>(`${API_URL}/campaign/collaboration-hub/${props.id}/requests?is_shortlisted=${shortlistValue.value}`,
            {
            headers: { Authorization: `Bearer ${userStore.accessToken}`}
            });
            requestHub.value = res.data.requests.data
            console.log(requestHub.value)
            loading.value = false
            
        } catch (error: any) {
            toast({ title:  "Pay for campaign" });
            loading.value = false
            return null;
        }
    }

    const shortlistCreator = async(id:string, decision:boolean, rowIndex)=>{
        const index = requestHub.value.findIndex((req) => req.id === id);
        if (index !== -1) {
            requestHub.value[index].isShorlisted = decision;
        }
        
        try {
        const res= await $fetch<PaginatedAPIResponse<'requests', Collaboration >>(`${API_URL}/campaign/collaboration-hub/shortlist-request`,
            {
                 //@ts-ignore
            headers: { Authorization: `Bearer ${userStore.accessToken}`},
            method: 'post',
            body: {
            requestId: id,
            decision: decision
            }
        });
            toast({
                title: 'Shortlist creator',
                description: `creator ${decision? 'added' : 'removed'}`,
            });
       
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
 toast({title: error.data.message });
 return null;
 }
}
watch(shortlist, getDetails)
onMounted(async () => await getDetails());
</script>

<template>
    <div class="h-full " >
    
        <div v-if="!isPaid" class="border inset-0 text-center bg-white gap-1 dark:bg-vDarkBlue bg-opacity-70 flex-col flex items-center h-full justify-center py-20 ">
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
                            <p  class="opacity-[85%]">NGN {{ cost > 0 ? cost - Number(platformFee) : "0" }} </p>
                           
                        </div>
                        <div class="flex justify-between py-3 border-b">
                            <p>Platform fee</p>
                            <p class="opacity-[85%]">NGN {{ platformFee}}</p>
                        </div>
                        <div class="flex justify-between py-3">
                            <p class="font-semibold">Total Amount</p>
                            <p class="text-purple1 font-semibold" >NGN {{ cost }}</p>
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

        <div v-else class="w-full h-full flex flex-col gap-4 items-center justify-center">
           
        
            
    

            <div class="w-full h-full">
                <div class="w-full h-full">
                    <!-- Header Section -->
                    <div class="flex justify-between border-b w-full items-center py-2 px-4">
                        <p>Shortlist your top choices by adding them to Favorites before making final approvals.
                            You can only approve the number of creators you selected during campaign setup</p>
                            <button 
                                @click="shortlist = !shortlist" 
                                class="flex gap-1 rounded-[100px] text-sm border items-center p-2"
                                :class="{ 'border-red-900': shortlist, 'border-grey': !shortlist }"
                            >
                                Favourites 
                                <Heart v-if="!shortlist" class="h-4" />
                                <Heart v-if="shortlist" class="h-4" fill="red" strokeWidth="0" />
                            </button>
                    </div>

                   

                    <div  class="w-full overflow-x-auto">
                        <table class="min-w-full border-t rounded">
                            <thead class="">
                                <tr  v-if="requestHub.length > 0" class="border-t border-b">
                                    <th class="px-4 py-2 whitespace-nowrap">Shortlist</th>
                                    <th class="px-4 py-2 whitespace-nowrap">Name</th>
                                    <th class="px-4 py-2 whitespace-nowrap">Engagement Rate</th>
                                    <th class="px-4 py-2 whitespace-nowrap">Followers</th>
                                    <th class="px-4 py-2 whitespace-nowrap">Actions</th>
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
                                <div v-if="requestHub.length === 0 && !loading">
                                    <p v-if="shortlist" class="text-center mt-10">No applications available check non favourites </p>
                                    <p v-else class="text-center mt-10">No applications available check  favourites</p>
                                </div>
                                <tr v-if="!loading && requestHub.length > 0" v-for="(requests, rowIndex) in requestHub" :key="requests.id" class="border-b">
                                    <td class="px-4 py-2 text-center">
                                        <button v-if="requests.isShorlisted" @click="shortlistCreator(requests.id, false, rowIndex)">
                                            <Heart fill="red" strokeWidth="0" />
                                        </button>
                                        <button v-else @click="shortlistCreator(requests.id, true, rowIndex)">
                                            <Heart />
                                        </button>
                                    </td>
                                    <td class="px-4 py-2 whitespace-nowrap">{{ requests.platformProfile.fullName }}</td>
                                    <td class="px-4 py-2 text-center whitespace-nowrap">{{ requests.platformProfile.engagementRate }}%</td>
                                    <td class="px-4 py-2 text-center whitespace-nowrap">
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
    </div>
</template>