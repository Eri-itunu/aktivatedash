<script setup lang="ts">
  import type { ICampaignRequest, ResponseMessage } from 'types';


  const props = defineProps<{ request: ICampaignRequest}>();
  const toast = useToast()
  const config = useRuntimeConfig()

  const API_URL = config.public.API_URL 

  const loading = ref(false)

  const decisionState = ref<string>(props.request.creator_decision );

  const startDate = computed ( () => new Date(props.request.campaign.start_date).toDateString())
  const endDate = computed(() => new Date(props.request.campaign.end_date).toDateString())
  const socials = [props.request.rateCard?.platformProfile.work_platform]

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
      toast.add({ title: res.message })
      decisionState.value = decision;
    } catch (err: any) {
        loading.value = false
        if(err.data.message) {
            toast.add({ title: err.data.message})
        }
    }
}


</script>



<template>
  <div class="min-w-[258px]   flex flex-col justify-between border  border-grey1 rounded-lg bg-vDarkBlue text-white py-4 ">
    
    <div class="flex justify-between flex-col gap-2  px-2">
      <div class="flex flex-col items-start">
        <p class="uppercase font-light text-xs text-left text-gray2">Price</p>
        <p class="uppercase font-bold text-xl">{{ request.price }}</p>
      </div>

      <div>
        <p class="uppercase font-bold">{{ request.rateCard?.platformProfile.work_platform }}</p>
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
       
        
      </div>
    </div>  
    
   
    

    <!--  -->


  </div>
</template>