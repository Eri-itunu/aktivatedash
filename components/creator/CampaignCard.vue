<script setup lang="ts">
import type { ICampaign } from "types";
import { calcProgress } from "../../utils";
const props = defineProps<{ campaign: ICampaign }>();

const progress = calcProgress(props.campaign.startDate, props.campaign.endDate);
</script>

<template>
  <div @click="$router.push(`/creator/dashboard/campaigns/${campaign.id}`)"
    class="w-[280px] cursor-pointer sm:w-[450px] rounded-lg bg-vDarkBlue text-white pb-2">
    <!--  Section A-->
    <div class="px-3 border-b border-b-darkBlue">
      <div class="flex justify-between py-2 items-end">
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
      <div class="flex justify-between items-center mb-2">
        <p class="line-clamp-2 text-ellipsis">{{ campaign.headline }}</p>
        <UBadge size="xs" :label="campaign.isPaid ? 'Paid' : 'Not Paid'"
          :color="campaign.isPaid ? 'emerald' : 'orange'" variant="subtle" />
      </div>
      <div class="flex relative justify-center bg-purplelabel rounded-lg h-40">
        <img v-if="campaign.images && campaign.images[0] != null" :src="campaign.images[0]" class="object-fit w-full h-full" alt="" />
        <img v-else src="/assets/images/created.svg" class="object-fit" alt="" />
      </div>
      <!-- end image part -->
      <p class="uppercase text-xs font-thin text-grey2 my-2">Campaign Description</p>
      <p class="line-clamp-2 text-ellipsis mb-2">{{ campaign.description }}</p>
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
              <p>
                Start Date:
                <span class="font-light text-xs pl-3.5">{{
                  campaign.startDate.split("T")[0]
                  }}</span>
              </p>
              <p>
                End Date:
                <span class="font-light text-xs pl-5">{{
                  campaign.endDate.split("T")[0]
                  }}</span>
              </p>
            </div>
          </div>
          <!-- End Date part  -->

          <!-- icons part -->
          <div class="flex gap-1 overflow-hidden">
            <img v-if="campaign?.deliverables?.platform.includes('facebook')" class="object-contain"
              src="/assets/icons/collab/facebook.svg" alt="" />
            <img v-if="campaign?.deliverables?.platform.includes('instagram')" class="object-contain"
              src="/assets/icons/collab/instagram.svg" alt="" />
            <img v-if="campaign?.deliverables?.platform.includes('tiktok')" class="object-contain"
              src="/assets/icons/collab/tiktok.svg" alt="" />
            <img v-if="campaign?.deliverables?.platform.includes('x')" class="object-contain"
              src="/assets/icons/collab/twitter.svg" alt="" />
            <img v-if="campaign?.deliverables?.platform.includes('whatsapp')" class="object-contain"
              src="/assets/icons/collab/whatsapp.svg" alt="" />
            <img v-if="campaign?.deliverables?.platform.includes('snapchat')" class="object-contain"
              src="/assets/icons/collab/snapchat.svg" alt="" />
            <img v-if="campaign?.deliverables?.platform.includes('linkedin')" class="object-contain"
              src="/assets/icons/collab/linkedin.svg" alt="" />
            <img v-if="campaign?.deliverables?.platform.includes('youtube')" class="object-contain"
              src="/assets/icons/collab/youtube.svg" alt="" />
          </div>
          <!-- end icons part -->
        </div>
      </div>

      <!-- progress bar -->
      <ProgressBar :percentage="progress" />
      <!-- end progress bar -->
    </div>
    <!--  end Section B-->

    <!--  -->

    <!--  -->
  </div>
</template>
