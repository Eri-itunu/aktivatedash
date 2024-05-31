<script setup lang="ts">
    import type { IPlatformProfile , ICreatorProfile } from 'types';

    const props = defineProps<{platformProfile: IPlatformProfile }>();
    const { rate, profile, work_platform, reputation_follower_count } = props.platformProfile
    const createBrandCampaignStore = useCreateBrandCampaignStore();

    const { rateObject } = storeToRefs(createBrandCampaignStore);
</script>

<template>
    <div class="rounded-lg border-[0.5px] border-[#CDC2FF] p-4 flex flex-col justify-between">
        <div class="flex items-center justify-center gap-1 mb-2 ">
            <div class="flex justify-around h-9 w-9 rounded-full border-2 border-white overflow-hidden">
                <img class="object-contain" :src="`https://robohash.org/2`" alt="">
            </div>
            <p>{{platformProfile.first_name}} {{platformProfile.last_name}}</p>
        </div>

        <div>
            <div class="flex justify-between word-break">
                <div>
                    <p class="text-xs">TOTAL AUDEINCE</p>

                </div>
                <div>
                    <p class="text-xs">ENGAGEMENT RATE</p>
                    <p>100,000</p>
                </div>
            </div>

            <div class="flex justify-between">
                <div>
                    <p class="text-xs">LOCATION</p>
                    <p>100,000</p>
                </div>
                <div>
                    <p class="text-xs">TOP DEMOGRAPHIC</p>
                    <p>100,000</p>
                </div>
            </div>
        </div>

        <div class="flex items-center gap-2">
            <!-- <img v-if="platform.work_platform?.includes('instagram')" class="object-contain" src="/assets/icons/collab/instagram.svg" alt="">
            <img v-if="platform.work_platform?.includes('linkedin')" class="object-contain" src="/assets/icons/collab/linkedin.svg" alt="">
            <img v-if="platform.work_platform?.includes('facebook')" class="object-contain" src="/assets/icons/collab/facebook.svg" alt="">
            <img v-if="platform.work_platform?.includes('tiktok')" class="object-contain" src="/assets/icons/collab/tiktok.svg" alt="">
            <img v-if="platform.work_platform?.includes('twitter')"  class="object-contain" src="/assets/icons/collab/twitter.svg" alt="">
            <img v-if="platform.work_platform?.includes('whatsapp')"  class="object-contain" src="/assets/icons/collab/whatsapp.svg" alt="">
            <img v-if="platform.work_platform?.includes('snapchat')"  class="object-contain" src="/assets/icons/collab/snapchat.svg" alt="">
            <img v-if="platform.work_platform?.includes('youtube')" class="object-contain" src="/assets/icons/collab/youtube.svg" alt=""> -->
        </div>

        <div>
            <button class="w-full text-white bg-purple1 rounded-md p-2">
                View
            </button>
        </div>
    </div>

</template>