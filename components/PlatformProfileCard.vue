<script setup lang="ts">
    import type { IPlatformProfile  } from 'types';

const props = defineProps<{platformProfile: IPlatformProfile }>();

const { rate, profile, work_platform } = props.platformProfile
const createBrandCampaignStore = useCreateBrandCampaignStore();

const { rateObject } = storeToRefs(createBrandCampaignStore);
</script>

<template>
   <div class="min-w-[258px] h-[295px] flex flex-col justify-between border border-grey1 rounded-lg bg-vDarkBlue text-white py-2">
        <div class="flex justify-between items-center px-4 py-2 border-b-2 border-darkBlue">
            <div class="flex gap-2 items-center">
                <div class="flex justify-around h-9 w-9 rounded-full border-2 border-white overflow-hidden">
                    <img class="object-contain" :src="`https://robohash.org/${platformProfile.id}`" alt="">
                </div>
                <div>
                    <p>{{ profile?.first_name }} {{ profile?.last_name }}</p>
                    <p class="text-xs text-purplebg">{{ work_platform }}</p>
                </div>
            </div>
            <div>
                <input v-model="rateObject" type="checkbox" :value="[rate?.id, rate?.price].join(',')">
            </div>
        </div>

        <div>

        </div>

        <div class="border-t-2 p-2 border-darkBlue">
            <p>Rate</p>
            <p class="text-purplebg text-xl font-bold">{{ rate?.currency }} {{ rate?.price.toLocaleString() }} <span class="font-thin">per post</span></p>
        </div>
    </div>
</template>