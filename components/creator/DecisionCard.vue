<script setup lang="ts">
import type { ICampaignRequest, ResponseMessage, InstagramPosts } from "types";
import { getInstagramPosts, getPosts, getContentList } from "../../api/creator/campaign/campaign.creator";
import { useToast } from "../ui/toast/use-toast";
const props = defineProps<{ request: ICampaignRequest, ID:string }>();
const { toast } = useToast();
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
const isAccept = ref(false)
const isAccepted = ref(false)
const isDeclined = ref(false)
const isRejected = ref(false)
const showSpinner = ref(false)
const decide = async (decision: string) => {
  try {
    loading.value = true;
    const res = await $fetch<ResponseMessage>(`${API_URL}/campaign/creator-decide`, {
      method: "post",

      body: { requestId: props.request.id, decision, reason: "none" },
      headers: { Authorization: `Bearer ${userStore.accessToken}` },
    });
    loading.value = false;
    if(decision === 'accept'){
      isAccept.value=false
      isAccepted.value=true
    } else if(decision === 'reject'){
      isDeclined.value = false
      isRejected.value = true
    }
    toast({ title: res.message });
    decisionState.value = decision;
  } catch (err: any) {
      isAccept.value=false
      isDeclined.value = false
    if (err.data.message) {
      toast({ title: err.data.message });
    }
  }
};
</script>
<template>
 
    <div
      class="w-full flex flex-col justify-between border border-[#D0D5DD] rounded-lg  text-black py-4"
    >
      <div class="flex  flex-col gap-2 ">
  
          <!-- Platform and price sections -->
  
          <div class="flex justify-between py-4 items-center px-8 border-[#D0D5DD] border-b-[0.5px]" >
              <div class="flex gap-2">
                  <div class="flex justify-start">
                      <img
                      v-if="request.rateCard?.platformProfile.work_platform.includes('instagram')"
                      class="object-contain h-6"
                      src="/assets/icons/collab/instagramWhite.svg"
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
                    src="/assets/icons/collab/tiktokWhite.svg"
                    alt=""
                    />
                    <img
                    v-if="request.rateCard?.platformProfile.work_platform.includes('twitter')"
                    class="object-contain h-6"
                    src="/assets/icons/collab/xWhite.svg"
                    alt=""
                    />
                
                </div>
                <p>{{ request.rateCard?.platformProfile.work_platform }}</p>
            </div>

            <div >
                <p class=" font-bold text-xl text-[#475367]">
                NGN {{ request.price.toLocaleString() }}
                </p>
            </div>
        </div>

      <!-- Accepting rejecting section -->
      <div class="px-8" >
        <p
          v-if="decisionState === 'reject'"
          class="rounded-full border-[1px] border-[#FF0000] text-center text-white bg-[#EB7664] h-fit py-1 px-4 w-full"
        >
          Rejected
        </p>
        <button
        v-if="decisionState === 'accept'"
          class="rounded-full cursor-pointer text-center w-full text-white bg-purple1 h-fit py-1"
        >
            Accepted
          
        </button>
      </div>
      <!-- put in teh div below v-if="decisionState === 'pending'" -->
      <div v-if="decisionState === 'pending'"  class="flex gap-4 px-8">
        <button
          
         
          class="rounded-lg border-[1px] border-purple1 text-purple1 bg-transparent h-fit py-1 px-4 basis-1/2"
        >
        <Dialog>
                <DialogTrigger>Reject</DialogTrigger>
                <DialogContent class="max-w-96 px-8 rounded-lg bg-white text-black" >
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to reject this campaign?</DialogTitle>
                        
                    </DialogHeader>

                    <DialogFooter>
                        <button  @click="decide('reject')">
                            yes
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </button>

        <button
         
          class="rounded-lg border-[1px] border-purple1 text-purple1 bg-transparent h-fit py-1 px-4 basis-1/2"
        >
            <Dialog>
                <DialogTrigger>Accept</DialogTrigger>
                <DialogContent class="max-w-96 px-8 rounded-lg bg-white text-black" >
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to accept this campaign?</DialogTitle>
                        
                    </DialogHeader>

                    <DialogFooter>
                        <button  @click="decide('accept')">
                            yes
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </button>
      </div>
    </div>

  </div>
</template>
