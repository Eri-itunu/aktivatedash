<script setup lang="ts">

  import type { ICampaign } from "types";
  const props = defineProps<{ campaign: ICampaign}>()


</script>

<template>
  <div @click="$router.push(`/brands/dashboard/campaigns/${campaign.id}`)"  class="min-w-[27rem] cursor-pointer md:max-w-[520px]  rounded-lg bg-vDarkBlue text-white pb-2">
    <!--  Section A-->
    <div class="px-3  border-b border-b-darkBlue">
      <div class="flex justify-between py-3 items-end">
        
        <!-- <ul class="flex flex-row justify-end list-none">
          <li class="mr-[-1em] z-[1]">
            <img class="rounded-[50%] border-2 border-[background: #464160]" src="../../assets/images/Avatar4.png" alt="">
          </li>
          <li class="mr-[-1em] z-[1]">
            <img class="rounded-[50%] border-2 border-[background: #464160]" src="../../assets/images/Avatar3.png" alt="">
          </li>
          <li class="mr-[-1em] z-[1]">
            <img class="rounded-[50%] border-2 border-[background: #464160]" src="../../assets/images/Avatar2.png" alt="">
          </li>
          
        </ul> -->
        <!-- <p class="underline text-grey1 text-xs"> view report</p> -->
      </div>
      <!-- image part -->
      <p class=" line-clamp-2 text-ellipsis mb-2">{{ campaign.headline }}</p>
      <div class="flex relative justify-center  bg-purplelabel rounded-lg">
        <img src="/assets/images/created.svg" class="" alt="">
      </div>
      <!-- end image part -->
      <p class="uppercase text-xs font-thin text-grey2 my-2"> Campaign Description</p>
      <p class=" line-clamp-2 text-ellipsis mb-2">{{ campaign.description }}</p>
      
    </div>
    <!-- end Section A -->

    <!-- Section B -->
    <div class="flex flex-col gap-3 px-3 py-3">
      <div class="">
        <div class="flex flex-col md:flex-row justify-between items-center gap-2">
          <!-- Date part -->
          <div class="flex gap-1 items-center">
            <!-- icon type thing -->
            <div class="flex flex-col items-center max-w-min">
              <div class="h-2 w-2 rounded-full bg-grey1"></div>
              <div class="h-4 w-[0.05rem] rounded-full bg-grey1"></div>
              <div class="h-2 w-2 rounded-full bg-grey1"></div>
            </div>
            <!-- end icon thing-->
            <div class="text-sm text-[#CDC2FF] text-nowrap">
              <p> Start Date: <span class="font-light text-xs pl-3.5">{{campaign.start_date.split("T")[0]}}</span></p>
              <p> End Date: <span class="font-light text-xs pl-5">{{campaign.end_date.split("T")[0]}}</span></p>
            </div>
          </div>
          <!-- End Date part  -->

          <!-- icons part -->
          <!-- <div class="flex gap-1 overflow-hidden">
            <img class="object-contain" src="/assets/icons/collab/facebook.svg" alt="">
            <img class="object-contain" src="/assets/icons/collab/instagram.svg" alt="">
            <img class="object-contain" src="/assets/icons/collab/tiktok.svg" alt="">
            <img class="object-contain" src="/assets/icons/collab/twitter.svg" alt="">
            <img class="object-contain" src="/assets/icons/collab/whatsapp.svg" alt="">
            <img class="object-contain" src="/assets/icons/collab/snapchat.svg" alt="">
            <img class="object-contain" src="/assets/icons/collab/linkedin.svg" alt="">
            <img class="object-contain" src="/assets/icons/collab/youtube.svg" alt="">
          </div> -->
          <!-- end icons part -->
        </div>
      </div>
 
      <!-- progress bar -->
      <ProgressBar :percentage="80" />
      <!-- end progress bar -->

    </div>
    <!--  end Section B-->

    <!--  -->
    <div class="px-3 py-3 grid grid-cols-3 gap-4 text-nowrap text-ellipsis">
      <div class="flex flex-col">
        <p class="uppercase font-thin text-xs text-grey2">views</p>
        <p class="uppercase font-bold text-sm md:text-lg">100,355,764</p>
      </div>
      <div class="flex flex-col">
        <p class="uppercase font-thin text-xs text-grey2">impressions</p>
        <p class="uppercase font-bold text-xs md:text-lg">5,853,127</p>
      </div>
      <div class="flex flex-col">
        <p class="uppercase font-thin text-xs text-grey2">engagements</p>
        <p class="uppercase font-bold text-xs md:text-lg">20%</p>
      </div>
      <div class="flex flex-col">
        <p class="uppercase font-thin text-xs break-word  text-grey2">top age demographic</p>
        <p class="uppercase font-bold text-xs md:text-lg">21 - 34 (54% F)</p>
      </div>
      <div class="flex flex-col">
        <p class="uppercase font-thin text-xs text-grey2">top location</p>
        <p class="uppercase font-bold text-xs md:text-lg">Lagos</p>
      </div>
      <div class="flex flex-col">
        <p class="uppercase font-thin text-xs text-grey2">total audience</p>
        <p class="uppercase font-bold text-wrap text-xs md:text-lg">100,355,764</p>
      </div>
    </div>
    <!--  -->


  </div>
</template>