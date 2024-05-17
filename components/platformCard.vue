<script setup lang="ts">

  import type {IPlatformProfile, ResponseMessage} from "types";
  const config = useRuntimeConfig()
  const API_URL = config.public.API_URL
  const price = ref<number>();
  const currency = ref('NGN')
  const userStore = useUserStore()
  const props = defineProps<{ platform: IPlatformProfile}>()
  const emit = defineEmits(['refresh'])

  const submitRate = async(ID) =>{

    const platformProfileId =ID

    const body = {
      platformProfileId: platformProfileId,
      price: price.value,
      currency: currency.value
    }

    console.log(body)

    try{
      const res = await $fetch<ResponseMessage>(`${API_URL}/platform/create-rate-card`, {
            method: 'put',
            // @ts-expect-error
            body,
            headers: { Authorization: `Bearer ${userStore.accessToken}`}
        })
        emit("refresh")
        addRate.value= false

    }
    catch(error:any){
      console.log(error)

    }

  }

  const addRate = ref(false)
</script>



<template>

<div class="flex flex-col gap-4">
  <div class="flex flex-row rounded-lg bg-vDarkBlue text-white ">
    <div class="flex items-center justify-center py-8 w-1/12 border-r-2 border-darkBlue ">

      <img v-if="platform.work_platform?.includes('instagram')" class="object-contain" src="/assets/icons/collab/instagram.svg" alt="">
      <img v-if="platform.work_platform?.includes('linkedin')" class="object-contain" src="/assets/icons/collab/linkedin.svg" alt="">
      <img v-if="platform.work_platform?.includes('facebook')" class="object-contain" src="/assets/icons/collab/facebook.svg" alt="">
      <img v-if="platform.work_platform?.includes('tiktok')" class="object-contain" src="/assets/icons/collab/tiktok.svg" alt="">
      <img v-if="platform.work_platform?.includes('twitter')"  class="object-contain" src="/assets/icons/collab/twitter.svg" alt="">
      <img v-if="platform.work_platform?.includes('whatsapp')"  class="object-contain" src="/assets/icons/collab/whatsapp.svg" alt="">
      <img v-if="platform.work_platform?.includes('snapchat')"  class="object-contain" src="/assets/icons/collab/snapchat.svg" alt="">
      <img v-if="platform.work_platform?.includes('youtube')" class="object-contain" src="/assets/icons/collab/youtube.svg" alt="">

    </div>
    <div class="w-11/12 flex flex-col  ">
      <div class="flex border-b-2 border-darkBlue">
        <div class="w-1/3 border-r-2 py-4 border-darkBlue">
        <div class="flex justify-between gap-2 items-center px-4">
          <div class="flex gap-2 items-center">
            <img src="~/assets/icons/aktivate-logo-small.svg" alt="">
            <div> Username</div>
          </div>
        </div>
        <!-- End Top part -->

        <!-- Middle -->
        <div class=" py-3  border-darkBlue px-4">
          <div class="flex justify-between gap-2 items-end w-full h-full">
            <p class="uppercase text-sm  text-nowrap leading-5">{{ platform.platform_username }}</p>

            <div class="hidden lg:block w-1/2 h-[3.8rem]">
            </div>
          </div>
        </div>
        <!-- End Middle -->

        <!-- Bottom -->
        <!-- <div class="flex justify-between gap-2 items-center pt-3 px-4">
          <div class="flex gap-2">
            <img src="~/assets/icons/up-green.svg" alt="">
            <p class=" text-sm md:text-lg text-green1"> + 11.45%</p>
          </div>
          <p class="hidden lg:block font-thin uppercase text-xs text-grey2">Compared to Last Month</p>
        </div> -->
      </div>
      <div class="w-1/3 border-r-2 py-4 border-darkBlue">
        <div class="flex justify-between gap-2 items-center px-4">
          <div class="flex gap-2 items-center">
            <img src="~/assets/icons/aktivate-logo-small.svg" alt="">
            <div> Followers</div>
          </div>

        </div>
        <!-- End Top part -->

        <!-- Middle -->
        <div class=" py-3   border-darkBlue px-4">
          <div class="flex justify-between gap-2 items-end w-full h-full">
            <p class="uppercase font-extrabold text-sm md:text-2xl text-nowrap leading-5">{{platform.reputation_follower_count.toLocaleString()}}</p>
            
            <div class="hidden lg:block w-1/2 h-[3.8rem]">

            </div>
          </div>
        </div>
        <!-- End Middle -->

        <!-- Bottom -->
        <!-- <div class="flex justify-between gap-2 items-center pt-3 px-4">
          <div class="flex gap-2">
            <img src="~/assets/icons/up-green.svg" alt="">
            <p class=" text-sm md:text-lg text-green1"> + 11.45%</p>
          </div>
          <p class="hidden lg:block font-thin uppercase text-xs text-grey2">Compared to Last Month</p>
        </div> -->
      </div>
      <div class="w-1/3 py-4">
        <div class="flex justify-between gap-2 items-center px-4">
          <div class="flex gap-2 items-center">
            <img src="~/assets/icons/aktivate-logo-small.svg" alt="">
            <div> Content Count</div>
          </div>

        </div>
        <!-- End Top part -->

        <!-- Middle -->
        <div class=" py-3  border-darkBlue px-4">
          <div class="flex justify-between gap-2 items-end w-full h-full">
            <p class="uppercase font-extrabold text-sm md:text-2xl text-nowrap leading-5"> {{ platform.reputation_content_count.toLocaleString() }}</p>
            
            <div class="hidden lg:block w-1/2 h-[3.8rem]">

            </div>
          </div>
        </div>
        <!-- End Middle -->

        <!-- Bottom -->
        <!-- <div class="flex justify-between gap-2 items-center pt-3 px-4">
          <div class="flex gap-2">
            <img src="~/assets/icons/down-red.svg" alt="">
            <p class="text-sm md:text-lg text-red1"> 21.45%</p>
          </div>
          <p class="hidden lg:block font-thin uppercase text-xs text-grey2">Compared to Last Month</p>
        </div> -->
      </div>
      </div>
      <div class="flex p-4 justify-center">

        <div v-if="platform.rate" class="flex justify-between gap-5 items-center" > 

          <div>
            <p class="text-sm text-grey2">Rate Per Post:</p>
            <p class="uppercase font-extrabold text-sm md:text-xl text-nowrap leading-5">{{platform.rate.currency}} {{platform.rate.price.toLocaleString()}}</p>
          </div>
          <button class="rounded-full bg-purple1 h-fit py-1 px-4 min-w-4"  @click="addRate = true"> Edit Rate Card</button>
        </div>
        
        
        <button class="rounded-full bg-purple1 h-fit py-1 px-4 min-w-4" v-else @click="addRate = true">+ Add Rate Card</button>
      </div>
    </div>
  </div>

  <UModal v-model="addRate" >
    <div >
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Add Rate Card 
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="addRate = false"/>
          </div>
        </template>

        <div class="text-purplelabel px-4">
            <p>Currency</p>
            <input placeholder = "NGN" readonly class=" border-[0.5px] p-2 rounded-md w-full bg-transparent" type="text" name="" id="">

            
            <p>Rate Per Post</p>
            <input v-model=price  class="border-[0.5px] p-2 rounded-md w-full bg-transparent" type="number" name="" id="">

            <div class="flex justify-center mt-5">
              <button @click="submitRate(platform.id)" class="border-[0.5px] border-purplelabel rounded-lg px-4 py-2">
                Confirm Rate
              </button>
            </div>

        </div>
        
      </UCard>
    </div>
  </UModal>
  
</div>
</template>