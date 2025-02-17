<script setup lang="ts"> 
import { useToast } from "@/components/ui/toast/use-toast";
    const {toast}  = useToast();
    const getBrandCampaignStore = useGetBrandCampaignStore();
    const handlePayment = async (id: string) => {
        try {
            const res = await getBrandCampaignStore.payForCampaign(id);
            navigateTo(res.url, { open: { target: "_blank", windowFeatures: { width: 500, height: 500 } } });
        } catch (error: any) {
            toast({ title: error.message || "Payment failed" });
        }
    };
</script>

<template>
    <div class="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-10">
        <div class="bg-white p-6 rounded-lg shadow-lg text-black">
            <p class="mb-4">You need to complete your payment to continue.</p>
            <button class="px-4 py-2 bg-purple-600 text-white rounded-lg" >
                Pay Now
            </button>
        </div>
    </div>
</template>