<script setup lang="ts">
import type { ICampaign, ICampaignRequest, APIResponse } from "types";
import {
  getCampaign,
  getSingleCampaignRequest,
} from "../../../../api/creator/campaign/campaign.creator";

definePageMeta({
  layout: "dashboard",
  colorMode: "dark",
});
const showToast = ref(false)
const toast = useToast();
const userStore = useUserStore();
const API_URL = useRuntimeConfig().public.API_URL;
const route = useRoute();
const router = useRouter();

const campaign = ref<ICampaign>();
const requests = ref<ICampaignRequest[]>([]);
const loading = ref(true);
const { campaignId } = route.params;

const singleCampaignReqs = async () => {
  const { campaignId } = route.params;
  const accessToken = userStore.accessToken || "";

  try {
    const platform = await getSingleCampaignRequest({
      apiUrl: API_URL,
      campaignId,
      accessToken,
    });
    requests.value = platform;

    loading.value = false;
  } catch (error: any) {
    loading.value = true;

    toast.add({ title: error.data?.message || "Something went wrong" });
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
              v-if="campaign?.image"
              :src="campaign?.image"
              class="object-fill w-full h-full rounded-lg"
              alt=""
            />
            <img v-else src="/assets/images/created.svg" class="object-fit" alt="" />
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
                  campaign?.start_date?.split("T")[0]
                }}</span>
              </p>
              <p>
                End Date:
                <span class="font-light text-xs">{{
                  campaign?.end_date?.split("T")[0]
                }}</span>
              </p>
            </div>
          </div>

          <div class="flex gap-5">
            <div class="flex flex-col gap-1">
              <p class="text-purplelabel capitalize">Content Type</p>
              <p
                class="capitalize"
                v-for="ctnType in campaign?.deliverables?.content_type"
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
  <transition name="toast">
    <Toast v-if="showToast" error="Error mehn"/>
  </transition>
</template>

<style >
.toast-enter-from{
  opacity: 0;
  transform: translateX(-60px);
}
.toast-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.toast-enter-active {
  transition: all 0.3s ease;
}
</style>
