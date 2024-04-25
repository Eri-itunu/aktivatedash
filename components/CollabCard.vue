<script setup lang="ts">
  import type { ICampaign } from 'types';
 
  const props = defineProps<{ collab: ICampaign}>();
  const startDate = new Date(props.collab.start_date).toDateString()
  const endDate = new Date(props.collab.end_date).toDateString()

  const socials = computed(() => props.collab.deliverables.platform)
</script>



<template>
  <div
    class="min-w-[258px] h-[295px] flex flex-col justify-between border border-grey1 rounded-lg bg-vDarkBlue text-white py-2">
    <!--  -->
    <div class="flex gap-2 justify-between items-center pb-2 px-3  border-b border-b-darkBlue">
      <div class="flex items-center gap-3">
        <img src="../assets/images/Avatar.svg" class="h-8" alt="">
        <p class="text-ellipsis line-clamp-1"> {{ collab.headline }}</p>
      </div>
      <p class="underline text-grey1 text-xs text-nowrap"> view details</p>
    </div>
    <!--  -->
    <div class="flex flex-col gap-5 px-3 py-2">
      <p class="text-sm text-ellipsis line-clamp-2">{{ collab.description }}.</p>
      <div class="flex items-center gap-2">
        <!-- icon type thing -->
        <div class="flex flex-col items-center max-w-min">
          <div class="h-2 w-2 rounded-full bg-white"></div>
          <div class="h-3 w-[0.05rem] rounded-full bg-white"></div>
          <div class="h-2 w-2 rounded-full bg-white"></div>
        </div>
        <!--  -->
        <div class="text-sm text-[#CDC2FF]">
          <p> Start Date: <span class="font-light">{{ startDate }}</span></p>
          <p> End Date: <span class="font-light">{{ endDate }}</span></p>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="flex gap-1 border-y border-y-darkBlue border-dashed p-2">
      <!-- <img v-for="social in getSocials" :key="social.name" class="object-contain" :src="social.src" alt="">

 -->
      <img v-if="socials.includes('instagram')" class="object-contain" src="/assets/icons/collab/instagram.svg" alt="">
      <img v-if="socials.includes('linkedin')" class="object-contain" src="/assets/icons/collab/linkedin.svg" alt="">
      <img v-if="socials.includes('facebook')" class="object-contain" src="/assets/icons/collab/facebook.svg" alt="">
      <img v-if="socials.includes('tiktok')" class="object-contain" src="/assets/icons/collab/tiktok.svg" alt="">
      <img v-if="socials.includes('twitter')"  class="object-contain" src="/assets/icons/collab/twitter.svg" alt="">
      <img v-if="socials.includes('whatsapp')"  class="object-contain" src="/assets/icons/collab/whatsapp.svg" alt="">
      <img v-if="socials.includes('snapchat')"  class="object-contain" src="/assets/icons/collab/snapchat.svg" alt="">
      <img v-if="socials.includes('youtube')" class="object-contain" src="/assets/icons/collab/youtube.svg" alt="">
    </div>
    <!--  -->
    <div class="flex justify-between items-center px-2">
      <div class="flex flex-col">
        <p class="uppercase font-light text-xs text-gray2">total budget</p>
        <p class="uppercase font-extrabold text-2xl">{{collab.compensation.currency}} {{ collab.compensation.price.toLocaleString() }}</p>
      </div>
      <button class="rounded-full bg-purple1 h-fit py-1 px-4 min-w-4">
        Opt in
      </button>
    </div>
    <!--  -->


  </div>
</template>