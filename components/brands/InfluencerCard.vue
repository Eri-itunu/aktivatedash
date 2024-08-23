<script setup lang="ts">
    import type { IUserProfile , ICreatorProfile } from 'types';

    const props = defineProps<{profile: IUserProfile }>();
    const { } = props.profile
    const createBrandCampaignStore = useCreateBrandCampaignStore();

    const { rateObject } = storeToRefs(createBrandCampaignStore);
</script>

<template>
    <div class="rounded-lg border-[0.5px] border-[#CDC2FF] p-4 flex gap-2 text-white flex-col justify-between">
        <div class="flex items-center justify-center gap-1 mb-2 ">
            <div class="flex justify-around h-9 w-9 rounded-full border-2 border-white overflow-hidden">
                <img class="object-contain" :src="`https://robohash.org/2`" alt="">
            </div>
            <div class="flex flex-col">
                <p>{{profile.firstName}} </p>
                <p>{{profile.lastName}}</p>
            </div>
        </div>

        <div class="flex flex-col gap-2">
            <div class="flex justify-between word-break">
                <div>
                    <p class="text-xs">TOTAL AUDEINCE</p>
                    
                </div>
                <div>
                    <p class="text-xs">ENGAGEMENT RATE</p>
                    <p>N/A</p>
                </div>
            </div>

            <div class="flex justify-between">
                <div>
                    <p class="text-xs">LOCATION</p>
                    <p>N/A</p>
                </div>
                <div>
                    <p class="text-xs">TOP DEMOGRAPHIC</p>
                    <p>N/A</p>
                </div>
            </div>
        </div>

        <div class="flex items-center justify-start gap-2">
            <div v-for="social in profile.platformProfiles" :key="social.id">
                <img v-if="social.workPlatform?.includes('instagram')" class="object-contain" src="/assets/icons/collab/instagram.svg" alt="">
                <img v-if="social.workPlatform?.includes('linkedin')" class="object-contain" src="/assets/icons/collab/linkedin.svg" alt="">
                <img v-if="social.workPlatform?.includes('facebook')" class="object-contain" src="/assets/icons/collab/facebook.svg" alt="">
                <img v-if="social.workPlatform?.includes('tiktok')" class="object-contain" src="/assets/icons/collab/tiktok.svg" alt="">
                <img v-if="social.workPlatform?.includes('twitter')"  class="object-contain" src="/assets/icons/collab/twitter.svg" alt="">
                <img v-if="social.workPlatform?.includes('whatsapp')"  class="object-contain" src="/assets/icons/collab/whatsapp.svg" alt="">
                <img v-if="social.workPlatform?.includes('snapchat')"  class="object-contain" src="/assets/icons/collab/snapchat.svg" alt="">
                <img v-if="social.workPlatform?.includes('youtube')" class="object-contain" src="/assets/icons/collab/youtube.svg" alt=""> 
            </div>
        </div>

        <div>
            <button @click="$router.push(`/brands/dashboard/campaigns/create-campaign/campaign-influencer/${profile.id}`)" class="w-full text-white bg-purple1 rounded-md p-2">
                View More
            </button>
        </div>
    </div>

</template>