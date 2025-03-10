<script setup lang="ts">
    import type { IPlatformProfile , ICreatorProfile } from 'types';

const props = defineProps<{platformProfile: IPlatformProfile }>();

const { rate, profile, work_platform, reputation_follower_count } = props.platformProfile
const createBrandCampaignStore = useCreateBrandCampaignStore();

const { rateObject } = storeToRefs(createBrandCampaignStore);
</script>

<template>
   <div class=" sm:w-[220px] md:w-[230px] lg:w-[270px] h-[295px] flex flex-col justify-between border border-grey1 rounded-lg bg-vDarkBlue text-white py-2">
        <div class="flex justify-between items-center px-4 py-2 border-b-2 border-darkBlue">
            <div class="flex gap-2 items-center">
                <div class="flex justify-around h-9 w-9 rounded-full border-2 border-white overflow-hidden">
                    <img class="object-contain" :src="`https://robohash.org/${platformProfile.id}`" alt="">
                </div>
                <div>
                    <p>{{ platformProfile?.first_name }} {{ platformProfile?.last_name }}</p>
                    <p class="text-xs text-purplebg">{{ work_platform }}</p>
                </div>
            </div>
            <div>
                <input v-model="rateObject" type="checkbox" :value="[platformProfile.platformProfiles[0].rate?.id, platformProfile.platformProfiles[0].rate?.price].join(',')">
            </div>
     </div>



        <div class="p-6 flex  gap-5">
            <div class="flex flex-col gap-10">
                <div class="flex flex-col">
                    <p class="text-purplelabel text-xs">Total Audience</p>
                    <p class="font-bold">{{platformProfile.platformProfiles[0].reputation_follower_count}} </p>
                </div>

            </div>

        </div>

        <div class="flex items-center justify-center gap-2">
            <div v-for="social in platformProfile.platformProfiles">
                <img v-if="social.work_platform?.includes('instagram')" class="object-contain" src="/icons/collab/instagram.svg" alt="">
                <img v-if="social.work_platform?.includes('linkedin')" class="object-contain" src="/icons/collab/linkedin.svg" alt="">
                <img v-if="social.work_platform?.includes('facebook')" class="object-contain" src="/icons/collab/facebook.svg" alt="">
                <img v-if="social.work_platform?.includes('tiktok')" class="object-contain" src="/icons/collab/tiktok.svg" alt="">
                <img v-if="social.work_platform?.includes('twitter')"  class="object-contain" src="/icons/collab/twitter.svg" alt="">
                <img v-if="social.work_platform?.includes('whatsapp')"  class="object-contain" src="/icons/collab/whatsapp.svg" alt="">
                <img v-if="social.work_platform?.includes('snapchat')"  class="object-contain" src="/icons/collab/snapchat.svg" alt="">
                <img v-if="social.work_platform?.includes('youtube')" class="object-contain" src="/icons/collab/youtube.svg" alt="">
            </div>
        </div>

        <div class="border-t-2 p-2 border-darkBlue">
            <p>Rate</p>
            <p class="text-purplebg text-xl font-bold">{{ platformProfile.platformProfiles[0].rate?.currency }} {{ platformProfile.platformProfiles[0].rate?.price.toLocaleString() }} <span class="font-thin">per post</span></p>
        </div>
    </div>
</template>
