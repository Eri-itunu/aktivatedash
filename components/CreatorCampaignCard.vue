<script setup lang="ts">
  import type { ICampaignRequest, ResponseMessage } from 'types';

  const props = defineProps<{ request: ICampaignRequest}>();
  const toast = useToast()
  const config = useRuntimeConfig()

  const API_URL = config.public.API_URL || "http://localhost:3333/api/v2"

  const loading = ref(false)

  console.log(props.request);

  const startDate = computed ( () => new Date(props.request.campaign.start_date).toDateString())
  const endDate = computed(() => new Date(props.request.campaign.end_date).toDateString())
  const socials = [props.request.rateCard?.platformProfile.work_platform]

  const userStore = useUserStore()

  //TODO
  const collabStore = useCollabStore()
  const decide = async(decision: string) => {
    try {
      loading.value = true
      const res = await $fetch<ResponseMessage>(`${API_URL}/campaign/creator-decide`, {
        method: 'post',
        body: { requestId: props.request.id, decision, reason:"none" },
        headers: { Authorization: `Bearer ${userStore.accessToken}`}
      })
      loading.value = false;
      toast.add({ title: res.message })
      collabStore.setAnything()

    } catch (err: any) {
        loading.value = false
        if(err.data.message) {
            toast.add({ title: err.data.message})
        }
    }
}


</script>



<template>
  <div
    class="min-w-[258px] h-[295px] flex flex-col justify-between border border-grey1 rounded-lg bg-vDarkBlue text-white py-4 ">
    <!--  -->
    <div class="flex gap-2 justify-between items-center pb-2 px-3  border-b border-b-darkBlue">
      <div class="flex items-center gap-3">
        <div class="flex justify-around h-9 w-9 p-1 rounded-full border-2 border-white overflow-hidden ">
          <img class="object-contain min-w-min" :src="`https://robohash.org/`" alt="">
        </div>
        <p class="text-ellipsis line-clamp-1">{{ request.campaign.headline }} </p>
      </div>
      <!-- <p class="underline text-grey1 text-xs text-nowrap"> view details</p> -->
    </div>
    <!--  -->
    <div class="flex flex-col gap-5 px-3 py-2">
      <p class="text-sm text-ellipsis line-clamp-2">{{  request.campaign.description }} </p>
      <div class="flex items-center gap-2">
        <!-- icon type thing -->
        <div class="flex flex-col items-center max-w-min">
          <div class="h-2 w-2 rounded-full bg-white"></div>
          <div class="h-3 w-[0.05rem] rounded-full bg-white"></div>
          <div class="h-2 w-2 rounded-full bg-white"></div>
        </div>
        <!--  -->
        <div class="text-sm text-[#CDC2FF]">
          <p> Start Date: <span class="font-light"> {{ startDate }}</span></p>
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
    <div class="flex justify-between flex-col gap-2  px-2">
      <div class="flex flex-col items-start">
        <p class="uppercase font-light text-xs text-left text-gray2">price</p>
        <p class="uppercase font-extrabold text-2xl">{{ request.price }}</p>
      </div>
      <div v-if="request.creator_decision === 'pending' " class="flex gap-2">
        <button @click="decide('reject')" class="rounded-full border-[1px] border-[#FF0000] text-red-600 bg-transparent h-fit py-1 px-4 basis-1/2">
            Reject
        </button>
        <button @click="decide('accept')" class="rounded-full bg-purple1 h-fit py-1 px-4 basis-1/2">
            Accept
        </button>
      </div>
    </div>
    <!--  -->


  </div>
</template>