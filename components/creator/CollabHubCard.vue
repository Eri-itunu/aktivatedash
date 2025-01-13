<script setup lang="ts" >
import { Gift, Banknote } from 'lucide-vue-next';
import type { CollabHubCampaign } from '@/types';
const props = defineProps<{
  details: CollabHubCampaign
}>();


const open =(id:string)=>{
    navigateTo(`/creator/dashboard/collaborationHub/${id}`)
}
</script>

<template>
    <div @click="open(details.id)" class=" cursor-pointer rounded-md flex flex-col border-[#DEDFE6] border-[0.5px]">
        <div class="basis-1/3 rounded-t-md overflow-hidden flex items-center">
            <img v-if="details.images[0]" class="h-[200px] w-full" :src=details.images[0] alt="">
            <img v-else src="/assets/collabHubSample.png" class="h-[200px] w-full" alt="">
        </div>

        <div class="basis-2/3 flex flex-col gap-1 ">
            <div class="flex flex-col gap-1 basis-3/4 p-4">
                <h3 class="text-[#5331E8]" >{{ details.headline }}</h3>
                <h4 class="font-bold tracking-tight leading-5">{{details.description}}</h4>

                <div class="flex gap-4" >
                    <button v-if="details.compensation.isMonetary" class="rounded dark:text-black bg-[#E9E6F3] py-1 flex gap-1 items-center font-light text-xs px-2">
                        <Banknote class="h-4"  /> Paid
                    </button>

                    <button v-if="details.compensation.isGift" class="rounded dark:text-black bg-[#E9E6F3] py-1 flex gap-1 items-center font-light text-xs px-2">
                        <Gift class="h-4" /> Gift
                    </button>
                </div>
            </div>

            <div class="flex basis-1/4 border-dashed border-t items-center py-2 justify-center gap-4" >
                <img v-if="details.deliverable.platforms.includes('facebook')" class="h-4" src="/assets/icons/facebook.svg" alt="facebook icon" >
                <img v-if="details.deliverable.platforms.includes('instagram')" class="h-4" src="/assets/icons/Insta.svg" alt="instagram icon" >
                <img v-if="details.deliverable.platforms.includes('tiktok')" class="h-4" src="/assets/icons/tiktok.svg" alt="tiktok icon" >
                <img v-if="details.deliverable.platforms.includes('youtube')" class="h-4" src="/assets/icons/youtubeProfile.svg" alt="youtube icon" >
            </div>
        </div>
    </div>
</template>