<script setup lang="ts">
    import type { IUserProfile , ICreatorProfile } from 'types';

    const props = defineProps<{profile: IUserProfile }>();
    const {platformProfiles } = props.profile
    const createBrandCampaignStore = useCreateBrandCampaignStore();
    const total = platformProfiles.reduce((n, {reputationFollowerCount}) => n + reputationFollowerCount, 0)
    const engagementRate = platformProfiles.reduce((n, {engagementRate}) => n + engagementRate, 0)
    const averageEngagement = engagementRate 
    

    const { rateObject, platformType } = storeToRefs(createBrandCampaignStore);
</script>

<template>
    <div class="rounded-lg border-[0.5px] bg-[#F5F5F5] dark:bg-vDarkBlue  border-[#CDC2FF] p-4 flex gap-2 text-black dark:text-white flex-col justify-between">
        <div class="flex items-center justify-center gap-1 mb-2 ">
            <div class="bg-purplelabel items-center flex justify-around h-10 w-10 rounded-full border-2 border-white overflow-hidden">
                <img v-if="profile.imgUrl !='' " class="object-contain" :src="profile.imgUrl" alt="">
                <p class="text-sm text-center text-black font-bold">
                    {{profile.firstName?.charAt(0)}}
                    {{profile.lastName?.charAt(0)}}

                </p>
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
                    {{ total.toLocaleString() }}
                </div>
                <div>
                    <p class="text-xs">AVG. ENGAGEMENT RATE</p>
                    
                    <p class=" text-center">
                        {{ averageEngagement }}%
                    </p>
                </div>
            </div>

        </div>

        <div class="flex items-center justify-start gap-2">
            <div v-for="social in profile.platformProfiles" :key="social.id">
                <img v-if="social.workPlatform?.includes('instagram') && platformType.includes(social.workPlatform) " class="object-contain" src="/icons/collab/instagram.svg" alt="">
                <img v-if="social.workPlatform?.includes('linkedin')&& platformType.includes(social.workPlatform)" class="object-contain" src="/icons/collab/linkedin.svg" alt="">
                <img v-if="social.workPlatform?.includes('facebook')&& platformType.includes(social.workPlatform)" class="object-contain" src="/icons/collab/facebook.svg" alt="">
                <img v-if="social.workPlatform?.includes('tiktok')&& platformType.includes(social.workPlatform)" class="object-contain" src="/icons/collab/tiktok.svg" alt="">
                <img v-if="social.workPlatform?.includes('twitter')&& platformType.includes(social.workPlatform)"  class="object-contain" src="/icons/collab/twitter.svg" alt="">
                <img v-if="social.workPlatform?.includes('whatsapp')&& platformType.includes(social.workPlatform)"  class="object-contain" src="/icons/collab/whatsapp.svg" alt="">
                <img v-if="social.workPlatform?.includes('snapchat'&& platformType.includes(social.workPlatform))"  class="object-contain" src="/icons/collab/snapchat.svg" alt="">
                <img v-if="social.workPlatform?.includes('youtube')&& platformType.includes(social.workPlatform)" class="object-contain" src="/icons/collab/youtube.svg" alt=""> 
            </div>
        </div>

        <div>
            <button @click="$router.push(`/brands/dashboard/campaigns/create-campaign/campaign-influencer/${profile.id}`)" class="w-full text-white bg-purple1 rounded-md p-2">
                View More
            </button>
        </div>
    </div>

</template>