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
    <div @click="open(details.id)" class=" cursor-pointer rounded-md flex flex-col h-full  dark:bg-vDarkBlue">
        <div class="basis-2/3 rounded-t-md overflow-hidden flex items-center">
            <img v-if="details.images[0]" class="h-[200px] w-full" :src=details.images[0] alt="">
            <img v-else src="/assets/collabHubSample.png" class="h-[200px] w-full" alt="">
        </div>

        <div class="basis-1/3 flex flex-col gap-1 ">
            <div class="flex flex-col gap-1 basis-3/4 p-4">
                <h3 class="text-purplelabel font-semibold" >{{ details.headline }}</h3>
                <h4 class="font-thin tracking-tight text-xs leading-5 truncate h-[25px]">{{details.description}}</h4>

                <div class="flex gap-4" >
                    <button v-if="details.compensation.isMonetary" class="rounded dark:text-white bg-dashbg py-1 flex gap-1 items-center font-light text-xs px-2">
                        <Banknote class="h-4" color="white" /> Paid
                    </button>

                    <button v-if="details.compensation.isGift" class="rounded dark:text-white bg-dashbg  py-1 flex gap-1 items-center font-light text-xs px-2">
                        <Gift class="h-4" color="white" /> Gift
                    </button>
                </div>
            </div>

            <div class="flex basis-1/4 border-dashed border-t items-center py-2 justify-center gap-4" >
                <img v-if="details.deliverable.platforms.includes('facebook')" class="h-6 w-6" src="/icons/facebook.svg" alt="facebook icon" >
                <img v-if="details.deliverable.platforms.includes('instagram')" class="h-6 w-6" src="/icons/Insta.svg" alt="instagram icon" >
                <img v-if="details.deliverable.platforms.includes('tiktok')" class="h-6 w-6" src="/icons/tiktok.svg" alt="tiktok icon" >

            </div>
        </div>
    </div>
</template>
