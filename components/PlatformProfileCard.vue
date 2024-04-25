<script setup lang="ts">
    import type { IPlatformProfile  } from 'types';

const props = defineProps<{platformProfile: IPlatformProfile }>();

const { rate, profile, work_platform } = props.platformProfile
</script>

<template>
   <div class="min-w-[258px] h-[295px] flex flex-col justify-between border border-grey1 rounded-lg bg-vDarkBlue text-white py-2">
        <div class="flex justify-between items-center px-4 py-2 border-b-2 border-darkBlue">
            <div class="flex gap-2 items-center">
                <img class="h-8" src="../../assets/images/Avatar.svg" alt="">
                <div>
                    <p>{{ profile?.first_name }} {{ profile?.last_name }}</p>
                    <p class="text-xs text-purplebg">{{ work_platform }}</p>
                </div>
            </div>
            <div>
                <input type="checkbox" :value="rate?.id">
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