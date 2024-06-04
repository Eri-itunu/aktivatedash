<script setup lang="ts">
import type { ICampaignRequest, ResponseMessage, InstagramPosts } from "types";
import { getInstagramPosts, getPosts, getContentList } from "../../api/creator/campaign/campaign.creator";

const props = defineProps<{ request: ICampaignRequest, ID:string }>();
const toast = useToast();
const config = useRuntimeConfig();
const API_URL = config.public.API_URL;
const loading = ref(false);
const picked = ref<string>("");
const decisionState = ref<string>(props.request.creator_decision);

const startDate = computed(() =>
  new Date(props.request.campaign.start_date).toDateString()
);
const endDate = computed(() => new Date(props.request.campaign.end_date).toDateString());
const socials = [props.request.rateCard?.platformProfile.work_platform];
const isOpen = ref(false);
const userStore = useUserStore();
const selectPosts = ref<any[]>([]);
const isAccept = ref(true)
const decide = async (decision: string) => {
  try {
    loading.value = true;
    const res = await $fetch<ResponseMessage>(`${API_URL}/campaign/creator-decide`, {
      method: "post",
            // @ts-expect-error
      body: { requestId: props.request.id, decision, reason: "none" },
      headers: { Authorization: `Bearer ${userStore.accessToken}` },
    });
    loading.value = false;

    toast.add({ title: res.message });
    decisionState.value = decision;
  } catch (err: any) {
    loading.value = false;
    if (err.data.message) {
      toast.add({ title: err.data.message });
    }
  }
};


const getUserPosts = async (platformProfileId) => {
  const accessToken = userStore.accessToken || "";

  try {
    const posts = await getContentList({
      apiUrl: API_URL,
      accessToken,
      platformProfileId,
    });
    selectPosts.value = posts;
    console.log(selectPosts);
    isOpen.value = true;
  } catch (error: any) {
    loading.value = true;
    console.log(error);
    toast.add({ title: error.data?.message || "Something went wrong" });
  }
};

const linkPost = async (platformProfileId: string | undefined, contentId: string) => {
  try {
    if (!platformProfileId) {
      throw new Error("No post selected");
    }
    const res = await $fetch<ResponseMessage>(`${API_URL}/campaign/${props.ID}/link-post`, {
      method: "post",
      // @ts-expect-error
      body: { contentId, platformProfileId: platformProfileId },
      headers: { Authorization: `Bearer ${userStore.accessToken}` },
    });
    isOpen.value = false;
    toast.add({ title: "Post link successful" });
  } catch (error: any) {
    toast.add({ title: error.message || "Something went wrong" });
  }
};
</script>

<template>
  <div v-if="isOpen" >
    <CreatorLinkPostPopUp :posts = "selectPosts" :platformID = "request.rateCard?.platformProfile.id" :campaignID = "ID"  />
  </div>
  
  <div
    class="min-w-[258px] flex flex-col justify-between border border-grey1 rounded-lg bg-vDarkBlue text-white py-4"
  >
    <div class="flex justify-between flex-col gap-2 px-2">
      <div class="flex justify-between">
        <div class="flex flex-col">
          <p class="uppercase font-light text-xs text-left text-gray2">Platform</p>
          <div class="flex justify-start">
            <img
              v-if="request.rateCard?.platformProfile.work_platform.includes('instagram')"
              class="object-contain h-6"
              src="/assets/icons/collab/instagram.svg"
              alt=""
            />
            <img
              v-if="request.rateCard?.platformProfile.work_platform.includes('linkedin')"
              class="object-contain h-6"
              src="/assets/icons/collab/linkedin.svg"
              alt=""
            />
            <img
              v-if="request.rateCard?.platformProfile.work_platform.includes('facebook')"
              class="object-contain h-6"
              src="/assets/icons/collab/facebook.svg"
              alt=""
            />
            <img
              v-if="request.rateCard?.platformProfile.work_platform.includes('tiktok')"
              class="object-contain h-6"
              src="/assets/icons/collab/tiktok.svg"
              alt=""
            />
            <img
              v-if="request.rateCard?.platformProfile.work_platform.includes('twitter')"
              class="object-contain h-6"
              src="/assets/icons/collab/twitter.svg"
              alt=""
            />
            <img
              v-if="request.rateCard?.platformProfile.work_platform.includes('whatsapp')"
              class="object-contain h-6"
              src="/assets/icons/collab/whatsapp.svg"
              alt=""
            />
            <img
              v-if="request.rateCard?.platformProfile.work_platform.includes('snapchat')"
              class="object-contain h-6"
              src="/assets/icons/collab/snapchat.svg"
              alt=""
            />
            <img
              v-if="request.rateCard?.platformProfile.work_platform.includes('youtube')"
              class="object-contain h-6"
              src="/assets/icons/collab/youtube.svg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <p class="uppercase font-light text-xs text-left text-gray2">price</p>
        <p class="uppercase font-extrabold text-2xl">
          {{ request.price.toLocaleString() }}
        </p>
      </div>
      <div>
        <p
          v-if="decisionState === 'reject'"
          class="rounded-full border-[1px] border-[#FF0000] text-red-600 bg-transparent h-fit py-1 px-4 w-min"
        >
          Rejected
        </p>
        <button
          @click="getUserPosts(request.rateCard?.platformProfile.id)"
          v-if="decisionState === 'accept'"
          class="rounded-full cursor-pointer text-center w-2/3 bg-purple1 h-fit py-1"
        >
          Link Post To Campaign
        </button>
      </div>
      <div v-if="decisionState === 'pending'" class="flex gap-2">
        <button
          @click="decide('reject')"
          class="rounded-full border-[1px] border-[#FF0000] text-red-600 bg-transparent h-fit py-1 px-4 basis-1/2"
        >
          Reject
        </button>
        <button
          @click="isAccept = true"
          class="rounded-full bg-purple1 h-fit py-1 px-4 basis-1/2"
        >
          Accept
        </button>
      </div>
    </div>

    <Popup title = "Accept Terms" v-if="isAccept" :togglePopup="()=> isAccept = false">
        <div>
           <p> <input type="checkbox"> I accept general terms and conditions of use </p>

           <div class="flex gap-5 items-center justify-center">
              <button class="px-8 p-2 text-white bg-transparent rounded-lg border-2 border-[#5331E8]">
                Cancel
              </button>
              <button 
              
              class="px-8 p-2 text-white bg-[#5331E8] rounded-lg" 
              >
                Submit
              </button>
           </div>
        </div>
    </Popup>

    <!--  -->
  </div>
</template>
