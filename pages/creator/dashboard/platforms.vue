<script setup lang="ts">
  import type { APIResponse, IPlatformProfile } from 'types'; 


definePageMeta({
  layout: 'dashboard',
  colorMode: 'dark' 
})


const platforms = ref<IPlatformProfile[]>([])
const isOpen = ref(false)
const apiUrl = useRuntimeConfig().public.API_URL
const userStore = useUserStore();
const facebookSelect = ref(true);
const getBrandCampaignStore = useGetBrandCampaignStore()
const createBrandCampaignStore = useCreateBrandCampaignStore()
const toast = useToast();

async function facebook_login(){
      
      try{
        const res = await getBrandCampaignStore.facebook_login()
        console.log(res)
        navigateTo(res.url, {
          open: {
            target: '_blank',
            windowFeatures: {
              width: 500,
              height: 500
            }
          }
        })
      }
      catch(error:any){
        toast.add({ title: error.message})
      }
      
    }


async function get_platform_profiles(){

  try{
    const res = await $fetch<APIResponse<'platformProfiles', IPlatformProfile[]>>(`${apiUrl}/profile/get-my-platform-profiles`, {
        headers: { Authorization: `Bearer ${userStore.accessToken}`}
      });
      const info = res.data.platformProfiles
    platforms.value.push(...info)
    console.log(platforms)
   
  

  }
  catch(error:any){

  }
}

watchEffect(async() => { await get_platform_profiles() })

</script>

<template>
  <div class="flex justify-end mt-5 items-end mb-10">
    <button label="Open" @click="isOpen = true" class="bg-[#5331E8] text-white rounded-[100px] px-4 py-2 ">
      Link Social Media Accounts
    </button>
  </div>

  <div v-for="platform in platforms" :key="platform.id">
    

  </div>

  <UModal v-model="isOpen" prevent-close>
    <div v-if="facebookSelect">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Link Accounts
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false"/>
          </div>
        </template>
        <div class="flex flex-col gap-2 ">
          <h4>Link Manually</h4>
          <p>To link social media platforms and retrieve key metrics click on your app of choice, fill in your details and start getting feedback!</p>
          <div class="flex mt-4 gap-2 items-center">

            <NuxtLink @click="facebook_login" target="_blank">
              <img src="~assets/icons/facebook.svg" alt="">
            </NuxtLink>
            <div class="w-20 h-px bg-[#464160]"></div>
            <NuxtLink  target="_blank">
              <img @click="facebookSelect = false" src="~assets/icons/Insta.svg" alt="">
            </NuxtLink>
            <div class="w-20 h-px bg-[#464160]"></div>
            <button>
              <img src="~assets/icons/snapchat.svg" alt="">
            </button>
            <div class="w-20 h-px bg-[#464160]"></div>
            <button>
              <img src="~assets/icons/tiktok.svg" alt="">
            </button>
          </div>
        </div>
      </UCard>
    </div>
    <div v-else>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Select Account
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false"/>
          </div>
        </template>
        <div class="flex flex-col gap-2 ">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                      Wagwan
                    </div>
                </th>
                
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                      <input id="default-radio-3" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                

            </tr>

            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                      <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">


                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 2017
                </th>
                

            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                      <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                     
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Bad boys
                </th>
                

            </tr>
            
            
        </tbody>
    </table>
</div>
        </div>
      </UCard>
    </div>
  </UModal>

  <platformCard/>
</template>