<script setup lang="ts">
    import type { ICampaign, IUserProfile } from 'types';
    const props = defineProps<{ creators: IUserProfile[], campaign: ICampaign, totalCampaignMetrics}>()
    import { Pin } from 'lucide-vue-next';

    

    const formatDate = (dateString) => {
    if (!dateString) return "Invalid Date"; // Handle empty or invalid inputs
    const options = { year: "numeric", month: "long", day: "numeric" };
    //@ts-expect-error
    return new Date(dateString).toLocaleDateString("en-US", options); // Explicitly set locale
  };
</script>

<template>
    <section  class="flex basis-1/5 flex-col gap-8 bg-white dark:bg-[#090618] rounded-lg px-4 pt-4 pb-8 " >
        <p class="flex  items-center" > <Pin class="h-5" />  Key Results</p>

        <div class="flex md:h-5 flex-col md:flex-row items-center justify-center md:space-x-6 lg:space-x-9 text-sm">
            <div>
                <p class="text-black text-center">{{ totalCampaignMetrics?.totalViews || 0 }}</p>
                <p class="text-black">Total Impressions</p>
            </div>
            <Separator class="hidden md:block" orientation="vertical" />
            <div>
                <p class="text-black text-center">{{totalCampaignMetrics?.totalComments || 0}}</p>
                <p class="text-black">Total Comments</p>
            </div>
            <Separator class="hidden md:block" orientation="vertical" />
            <div>
                <p class="text-[#CDC2FF] text-center"> {{ campaign.currency }} {{ campaign.budget }}</p>
                <p>Budget</p>
            </div>
            <Separator class="hidden md:block" orientation="vertical" />
            <div>
                <p class="text-[#CDC2FF] text-center">{{totalCampaignMetrics?.totalLikes ?? "0"}}</p>
                <p>Total Likes</p>
            </div>
            <!-- <Separator orientation="vertical" />
            <div>
                <p class="text-[#CDC2FF] text-center">   {{ ((totalCampaignMetrics.totalComments + totalCampaignMetrics.totalLikes + totalCampaignMetrics.totalViews) ) }}  </p>
                <p>Engegement </p>
            </div> -->
            

        </div>
    </section>

    <section class=" print-summary flex flex-col md:flex-row basis-3/5 gap-2 " >
        <!-- <div class="bg-[#090618] basis-1/2 h-full rounded-lg p-8">
            <h2 class="font-semibold text-xl" > Top Creators</h2>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 p-2"  >
                <div v-for="creator in creators" class="flex flex-col items-center gap-1" >
                    <img 
                    :src="creator.imgUrl" 
                    alt=""
                    class="h-24 w-24 rounded-full"
                    >
                    <p class=" text-center break-words" >{{ creator?.firstName }} {{ creator?.lastName }}  </p>
                </div>
            </div>
        </div> -->

        <div class="bg-white dark:bg-[#090618] flex flex-col gap-4 w-full h-full rounded-lg p-8">
            <h2 class="font-semibold text-xl" >Campaign Details</h2>

            <div class="flex justify-between">
                <h3 class="text-sm text-black dark:text-[#E1DCF7] " >Campaign Start:</h3>
                <p> {{formatDate(campaign?.startDate.split("T")[0])}} </p>
            </div>
            <div class="flex justify-between">
                <h3 class="text-sm text-black dark:text-[#E1DCF7] " >Campaign End:</h3>
                <p> {{formatDate(campaign?.endDate.split("T")[0])}} </p>
            </div>
            <div class="flex justify-between">
                <h3 class="text-sm text-black dark:text-[#E1DCF7]" >Platforms:</h3>
                <p> {{ campaign?.deliverables?.platform[0]}} </p>
            </div>

            <div>
                <h3 class="text-black dark:text-[#E1DCF7] font-semibold text-xl" >Campaign Description:</h3>
                <p> {{campaign?.description}} </p>
             </div>
        </div>
    </section>
</template>

<style>
    @media print {
        .print-summary{
            display:none
        }
    }
</style>