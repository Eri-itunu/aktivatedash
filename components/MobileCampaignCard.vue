<template>
    <div @click="$router.push(`/creator/dashboard/campaigns/${request?.id}`)" class="rounded-lg p-2 border-[0.5px] flex flex-col gap-4 border-[#D9D9D9]">

        <div>
            <img src="/assets/icons/collab/MobileCampaign.svg" class="w-full" alt="">
        </div>
        <div class="flex gap-2 justify-between items-center py-2">
            Campaign Headline
          <div  class="flex justify-start gap-1 ">
            <img v-if="socials?.includes('instagram')" class="object-contain h-4 " src="/assets/icons/InstsgramBlack.svg" alt="">
            <img v-if="socials?.includes('facebook')" class="object-contain h-4" src="/assets/icons/facebookBlack.svg" alt="">
            <img v-if="socials?.includes('tiktok')" class="object-contain h-4" src="/assets/icons/tiktokBlack.svg" alt="">
            <img v-if="socials?.includes('twitter')"  class="object-contain h-4" src="/assets/icons/collab/xWhite.svg" alt="">
          </div>
        </div>

        <h1 class="text-sm text-[#757575]">{{ headline }}</h1>
    </div>
</template>


<script setup lang="ts">
    defineProps({
        socials: Array,
        headline: String,
        request: Object

    })
</script>