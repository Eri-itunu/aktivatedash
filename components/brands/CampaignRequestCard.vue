<script setup lang="ts">
  import type { ICampaignRequest, ResponseMessage } from 'types';
  import { useToast } from '../ui/toast/use-toast'

  const props = defineProps<{ request: ICampaignRequest}>();
  const { toast } = useToast()
  const config = useRuntimeConfig()

  const API_URL = config.public.API_URL

  const loading = ref(false)

  const decisionState = ref<string>(props.request.creatorDecision );

  const startDate = computed ( () => new Date(props.request.campaign.startDate).toDateString())
  const endDate = computed(() => new Date(props.request.campaign.endDate).toDateString())
  const socials = [props.request.rateCard?.platformProfile.workPlatform]

  const userStore = useUserStore()


  const decide = async(decision: string) => {
    try {
      loading.value = true;
      const res = await $fetch<ResponseMessage>(`${API_URL}/campaign/creator-decide`, {
        method: 'post',
        body: { requestId: props.request.id, decision, reason:"none" },
        headers: { Authorization: `Bearer ${userStore.accessToken}`}
      })
      loading.value = false;
      toast({ title: res.message })
      decisionState.value = decision;
    } catch (err: any) {
        loading.value = false
        if(err.data.message) {
            toast({ title: err.data.message})
        }
    }
}


</script>



<template>
  <div class="min-w-[258px]   flex flex-col justify-between border  border-grey1 rounded-lg bg-vDarkBlue text-white py-4 ">
    
    <div class="flex justify-between flex-col gap-2  px-2">

      <div>

        <p class="uppercase font-bold text-xs text-left text-gray2">Username</p>
        <p class="uppercase">{{request.rateCard && request.rateCard.platformProfile.platformUsername }}</p>
      </div>



        <div class="flex flex-col ">
          <p class="uppercase font-bold text-xs text-left text-gray2 mb-2">Platform </p>

          <div class="flex justify-start" v-if="request.rateCard">
            <img v-if="request.rateCard.platformProfile.workPlatform.includes('instagram')" class="object-contain h-6 " src="/assets/icons/collab/instagram.svg" alt="">
            <img v-if="request.rateCard.platformProfile.workPlatform.includes('linkedin')" class="object-contain h-6" src="/assets/icons/collab/linkedin.svg" alt="">
            <img v-if="request.rateCard.platformProfile.workPlatform.includes('facebook')" class="object-contain h-6" src="/assets/icons/collab/facebook.svg" alt="">
            <img v-if="request.rateCard.platformProfile.workPlatform.includes('tiktok')" class="object-contain h-6" src="/assets/icons/collab/tiktok.svg" alt="">
            <img v-if="request.rateCard.platformProfile.workPlatform.includes('twitter')"  class="object-contain h-6" src="/assets/icons/collab/twitter.svg" alt="">
            <img v-if="request.rateCard.platformProfile.workPlatform.includes('whatsapp')"  class="object-contain h-6" src="/assets/icons/collab/whatsapp.svg" alt="">
            <img v-if="request.rateCard.platformProfile.workPlatform.includes('snapchat')"  class="object-contain h-6" src="/assets/icons/collab/snapchat.svg" alt="">
            <img v-if="request.rateCard.platformProfile.workPlatform.includes('youtube')" class="object-contain h-6" src="/assets/icons/collab/youtube.svg" alt="">

          </div>
        </div>
       
        <div class="flex flex-col items-start">
          <p class="uppercase font-bold text-xs text-left text-gray2">Price</p>
          <p class="uppercase  ">{{request.currency}}   {{ request.price.toLocaleString() }}</p>
        </div>

      
      <div>
        <p v-if="decisionState === 'reject' " class="rounded-full border-[1px] border-[#FF0000] text-red-600 bg-transparent h-fit py-1 px-4 w-min">
            Rejected
        </p>
         <p v-if="decisionState === 'accept' " class=" rounded-full text-center w-2/3 bg-purple1 h-fit py-1 ">
            Accepted
        </p>
      </div>
      <div v-if="decisionState === 'pending' " class="flex gap-2">
        <p class="rounded-full text-center w-1/3 text-[#FFF9D4] border-2 border-[#FFF9D4]">Pending</p>
      </div>
    </div>  
    
   
    

    <!--  -->


  </div>
</template>