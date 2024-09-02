<script setup lang="ts">

//imports
import type { ICampaign, ICampaignRequest, APIResponse } from "types";
import {
  getCampaign,
  getSingleCampaignRequest,
} from "../../../../api/creator/campaign/campaign.creator";
import { ChevronLeft } from 'lucide-vue-next';
import { useToast } from "../../../../components/ui/toast/use-toast";

definePageMeta({
  layout: "dashboard",
  
});

//varibale declarations
const device = useDevice()
const showToast = ref(false);
const {toast}  = useToast();
const userStore = useUserStore();
const API_URL = useRuntimeConfig().public.API_URL;
const route = useRoute();
const router = useRouter();
const showSpinner = ref(false)
const campaign = ref<ICampaign>();
const requests = ref<ICampaignRequest[]>([]);
const loading = ref(true);
const { campaignId } = route.params;



const singleCampaignReqs = async () => {
  const { campaignId } = route.params;
  const accessToken = userStore.accessToken || "";


  try {
    showSpinner.value = true
    const platform = await getSingleCampaignRequest({
      apiUrl: API_URL,
      campaignId,
      accessToken,
    });
    requests.value = platform;
    loading.value = false;
    showSpinner.value = false
  } catch (error: any) {
    loading.value = true;
    showSpinner.value = false
    toast({ title: error.data?.message || "Something went wrong" });
  }
};

const loadCampaign = async () => {
  const { campaignId } = route.params;
  const accessToken = userStore.accessToken || "";
  try {
    const camp = await getCampaign({
      apiUrl: API_URL,
      campaignId,
      accessToken,
    });
    campaign.value = camp;
    await singleCampaignReqs();
  } catch (error: any) {
    router.back();
  }
};

const openBrief = (link: string) => {
  navigateTo(link, {
    open: {
      target: "_blank",
      windowFeatures: {
        width: 500,
        height: 500,
      },
    },
    external: true,
  });
};
onMounted(async () => await loadCampaign());
</script>

<template>
  <div  v-if="!device.isMobile " class="">
    <nuxt-link class="mb-2 flex" to="/creator/dashboard/campaigns">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z"
          fill="currentColor"
        />
      </svg>
      <p>Back</p>
    </nuxt-link>

  <div class="flex flex-col md:flex-row gap-2">
    <div class="flex px-2 md:px-8 basis-2/3 flex-col gap-2 md:gap-4">
      <div
        class="flex px-12 bg-vDarkBlue h-full py-12 rounded-lg flex-col md:flex-row gap-5"
      >
        <div class="flex flex-col gap-5 text-white w-full">
          <div class="flex justify-between border-b-2 py-3 border-darkBlue">
            <div>
              <p class="text-purplelabel text-xs">Headline</p>
              <h4 class="text-3xl text-purplelabel">{{ campaign?.headline }}</h4>
            </div>
          </div>

          <!-- <div class="h-[200px]">
            <img
              src="/assets/images/pexels-ethan-sees-2741674 2.svg"
              class="w-full h-full object-cover rounded-lg"
              alt=""
            />
          </div> -->

          <div class="flex relative justify-center bg-purplelabel rounded-lg h-44">
            <img
              v-if=" campaign?.images && campaign?.images[0] != null"
              :src="campaign?.images[0]"
              class="object-fill w-full h-full rounded-lg"
              alt=""
            />
            <img v-else  src="/assets/images/created.svg" class="object-fit" alt="" />
          </div>

          <button v-if="campaign?.brief" @click="openBrief(campaign?.brief)">
            Open Brief
          </button>

          <p class="text-wrap">
            {{ campaign?.description }}
          </p>

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
                <span class="font-light text-xs">{{
                  campaign?.startDate?.split("T")[0]
                  
                }}</span>
              </p>
              <p>
                End Date:
                <span class="font-light text-xs">{{
                  campaign?.endDate?.split("T")[0]
                
                }}</span>
              </p>
            </div>
          </div>

          <div class="flex gap-5">
            <div class="flex flex-col gap-1">
              <p class="text-purplelabel capitalize">Content Type</p>
              <p
                class="capitalize"
                v-for="ctnType in campaign?.deliverables?.contentType"
                :key="ctnType"
              >
                {{ ctnType }}
              </p>
            </div>

            <div class="flex flex-col gap-1">
              <p class="text-purplelabel">Platform Type</p>
              <div class="flex gap-1 overflow-hidden">
                <img
                  v-if="campaign?.deliverables?.platform.includes('instagram')"
                  class="object-contain"
                  src="/assets/icons/collab/instagram.svg"
                  alt=""
                />
                <img
                  v-if="campaign?.deliverables?.platform.includes('linkedin')"
                  class="object-contain"
                  src="/assets/icons/collab/linkedin.svg"
                  alt=""
                />
                <img
                  v-if="campaign?.deliverables?.platform.includes('facebook')"
                  class="object-contain"
                  src="/assets/icons/collab/facebook.svg"
                  alt=""
                />
                <img
                  v-if="campaign?.deliverables?.platform.includes('tiktok')"
                  class="object-contain"
                  src="/assets/icons/collab/tiktok.svg"
                  alt=""
                />
                <img
                  v-if="campaign?.deliverables?.platform.includes('x')"
                  class="object-contain"
                  src="/assets/icons/collab/twitter.svg"
                  alt=""
                />
                <img
                  v-if="campaign?.deliverables?.platform.includes('whatsapp')"
                  class="object-contain"
                  src="/assets/icons/collab/whatsapp.svg"
                  alt=""
                />
                <img
                  v-if="campaign?.deliverables?.platform.includes('snapchat')"
                  class="object-contain"
                  src="/assets/icons/collab/snapchat.svg"
                  alt=""
                />
                <img
                  v-if="campaign?.deliverables?.platform.includes('youtube')"
                  class="object-contain"
                  src="/assets/icons/collab/youtube.svg"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div>
            <h4>Requirements</h4>
            <li>{{ campaign?.deliverables?.requirements }}</li>
          </div>
        </div>
      </div>

      <div class="flex gap-2 px-2 md:px-0 md:pt-4">
        <!-- <button class="basis-1/3 text-white border-purplebg border-[0.5px] rounded">
          <nuxt-link to="/brands/dashboard/campaigns/"> Back </nuxt-link>
        </button> -->
      </div>
    </div>

    <div class="basis-1/3 flex flex-col gap-2">
      <div class="flex flex-col gap-4" v-if="loading">
        <CreatorLoadingCard />
        <CreatorLoadingCard />
        <CreatorLoadingCard />
      </div>

        <div v-else v-for="request in requests" :key="request.id">
          <CreatorCampaignRequestCard :request="request" :ID="campaignId" />
        </div>
      </div>
    </div>
  </div>

  <!-- loading spinner -->
  <div v-if="showSpinner"  class=" md:hidden w-[100%] h-[100%] fixed top-0 right-0 left-0 bottom-0 z-50 bg-[#000000]/ flex justify-center items-center">
    <LoadSpinner />
  </div>

  <div v-if="device.isMobile && !showSpinner"  class="md:hidden bg-white text-black px-4 py-4">
    <div class="w-full relative">
      <img src="/assets/icons/CampaignMain.svg" class="w-full " alt="">
      <div  @click="router.back()"  class="absolute top-4 left-4 rounded-full  bg-[#FFFFFF]">
        <ChevronLeft class="h-6 w-6" />
      </div>
     
    </div>

    <!-- headline and date section -->
    <section class="border-b-[0.5px] border-grey-border py-4 flex flex-col gap-4" >
      <h1 class="font-bold" >{{ campaign?.headline }}</h1>
      <div class="flex justify-between" >
        <div>
          <h2 class="text-[#72777A] font-semibold">START DATE</h2> 
          <p>{{ campaign?.startDate?.split("T")[0]}}</p>
        </div>
        <div>
          <h2 class="text-[#72777A] font-semibold">END DATE</h2>
          <p>{{  campaign?.endDate?.split("T")[0] }}</p>
        </div>
      </div>
    </section>

    <!-- content type section -->
    <section class="border-b-[0.5px] border-grey-border py-4">
      <h2 class="text-[#72777A] font-semibold">CONTENT TYPE</h2>
      <div class='flex  gap-2 pt-2' >
        <div
          class="text-[#211848] rounded-lg py-1 px-2 bg-purplelabel w-fit"
          v-for="ctnType in campaign?.deliverables?.contentType"
          :key="ctnType"
        >
          {{ ctnType }}
        </div>
      </div>
    </section>

    <!-- platform  section -->

    <section class="border-b-[0.5px] border-grey-border py-4">
      <h2 class="text-[#72777A] font-semibold" >PLATFORM </h2>
      <div class="flex gap-4 items-center overflow-hidden">
        <img
          v-if="campaign?.deliverables?.platform.includes('instagram')"
          class="object-contain"
          src="/assets/icons/InstsgramBlack.svg"
          alt=""
        />
       
        <img
          v-if="campaign?.deliverables?.platform.includes('facebook')"
          class="object-contain"
          src="/assets/icons/facebookBlack.svg"
          alt=""
        />
        <img
          v-if="campaign?.deliverables?.platform.includes('tiktok')"
          class="object-contain"
          src="/assets/icons/tiktokBlack.svg"
          alt=""
        />
        <img
          v-if="campaign?.deliverables?.platform.includes('x')"
          class="object-contain"
           src="/assets/icons/collab/xWhite.svg"
          alt=""
        />
       
      </div>
    </section>
    
    <!-- Campaign requirements section -->

    <section class="border-b-[0.5px] border-grey-border py-4 text-[#72777A]">
      <h2 class="font-semibold">REQUIREMENTS </h2>
      <p class="text-wrap break-words" >{{ campaign?.deliverables?.requirements }}</p>
    </section>

    <!-- Campaign decision section -->

    <section class="border-b-[0.5px] border-grey-border py-4 ">
      <h2 class="font-bold" >Campaign Price </h2>
      <div class="flex flex-col pt-4 gap-4">
        <div  v-for="request in requests" :key="request.id">
          <CreatorDecisionCard :request="request" :ID="campaignId" />
        </div>
      </div>
    </section>


  </div>
 
</template>


