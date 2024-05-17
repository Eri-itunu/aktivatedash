<script setup lang="ts">
  import type { APIResponse, IPlatformProfile, PhylloResponse, GetResponse } from 'types'; 
  import PhylloWorkPlatforms from "../../../enums/pyhlloWorkPlatforms"

definePageMeta({
  layout: 'dashboard',
  colorMode: 'dark' 
})


const platforms = ref<IPlatformProfile[]>([])
const access = ref<PhylloResponse>()
const isOpen = ref(false)
const apiUrl = useRuntimeConfig().public.API_URL
const env = useRuntimeConfig().PHYLLO
const userStore = useUserStore();
const facebookSelect = ref(true);
const success = ref(false)
const loading = ref(false)
const getBrandCampaignStore = useGetBrandCampaignStore()
const toast = useToast();
const workPlatform = ref<string>("")
const reset =()=>{
  isOpen.value = false
  facebookSelect.value = true
  
}


function refresh() {

  get_platform_profiles()
}
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


    const setLoading = ()=>{
      loading.value=false
    }
async function get_platform_profiles(){

  try{
    loading.value = true
    const res = await $fetch<APIResponse<'platformProfiles', IPlatformProfile[]>>(`${apiUrl}/platform/get-my-platform-profiles`, {
        // @ts-expect-error
        headers: { Authorization: `Bearer ${userStore.accessToken}`}
      });
      const info = res.data.platformProfiles
      
    
    platforms.value = info
    
    setTimeout(setLoading, 2000)

    
    
   
  }
  catch(error:any){
    console.log(error)
    loading.value=false
  }
}


const Phyllo = async(workPlatformId) => {


  const appName = "Aktivate"
  try{

    const res = await $fetch<APIResponse<'phyllo', PhylloResponse>>(`${apiUrl}/platform/get-phyllo-sdk`, {
        // @ts-expect-error
        headers: { Authorization: `Bearer ${userStore.accessToken}`}
      });
      const phyllo = res.data.phyllo
      console.log(phyllo)

      const identify = phyllo.phylloId
      const token = phyllo.sdkToken
      console.log(identify)

      const config = {
        environment: env,
        userId: identify,
        token: token,
        clientDisplayName: appName,
        workPlatformId:workPlatformId
      };

      

      // @ts-expect-error
      const phylloConnect = window.PhylloConnect.initialize(config);

      // callbacks
      
      phylloConnect.on(
        "accountConnected",
        (accountId, workplatformId, userId) => {
          // gives the successfully connected account ID and work platform ID for the given user ID
          console.log(
            `onAccountConnected: ${accountId}, ${workplatformId}, ${userId}`
          );
          workPlatform.value = workplatformId

          get_platform_profiles();
          success.value=true;
          isOpen.value = false;
        }
      );
      phylloConnect.on(
        "accountDisconnected",
        (accountId, workplatformId, userId) => {
          // gives the successfully disconnected account ID and work platform ID for the given user ID
          console.log(
            `onAccountDisconnected: ${accountId}, ${workplatformId}, ${userId}`
          );
        }
      );
      phylloConnect.on("tokenExpired", (userId) => {
        // gives the user ID for which the token has expired
        console.log(`onTokenExpired: ${userId}`); // the SDK closes automatically in case the token has expired, and you need to handle this by showing an appropriate UI and messaging to the users
      });
      phylloConnect.on("exit", (reason, userId) => {
        // indicates that the user with given user ID has closed the SDK and gives an appropriate reason for it
        console.log(`onExit: ${reason}, ${userId}`);
      });
      phylloConnect.on(
        "connectionFailure",
        (reason, workplatformId, userId) => {
          // optional, indicates that the user with given user ID has attempted connecting to the work platform but resulted in a failure and gives an appropriate reason for it
          console.log(
            `onConnectionFailure: ${reason}, ${workplatformId}, ${userId}`
          );
        }
      );

      phylloConnect.open();
    } catch (err) {
      console.log("eee")
      console.log(err);
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

  

  <UModal v-model="isOpen" prevent-close>
    <div >
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

            <NuxtLink @click="Phyllo(PhylloWorkPlatforms.FACEBOOK)" target="_blank">
              <img src="~assets/icons/facebook.svg" alt="">
            </NuxtLink>
            <div class="w-20 h-px bg-[#464160]"></div>
            <NuxtLink  target="_blank">
              <img @click="Phyllo(PhylloWorkPlatforms.INSTAGRAM)" src="~assets/icons/Insta.svg" alt="">
            </NuxtLink>
            <!-- <div class="w-20 h-px bg-[#464160]"></div>
            <button>
              <img src="~assets/icons/snapchat.svg" alt="">
            </button> -->
            <div class="w-20 h-px bg-[#464160]"></div>
            <button @click="Phyllo(PhylloWorkPlatforms.TIKTOK)">
              <img src="~assets/icons/tiktok.svg" alt="">
            </button>
          </div>
        </div>
      </UCard>
    </div>
    
  </UModal>
  <UModal v-model="success" >
    
    <div class="flex flex-col">
        <div class="flex relative justify-center  bg-purplelabel rounded-t-lg">
            <UButton color="black" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1 absolute top-0 right-0" @click=" success.value=false" />
            <img src="/assets/images/created.svg" alt="">
        </div>
        
        <div class="flex flex-col justify-center items-center px-16 pt-6 pb-20">
            <div>
                <p class="text-center text-2xl text-purplelabel font-bold">Account Linked</p>
                <p class="text-center">Kindly add your platform rate per post to the rate card beneath your platform card to begin accepting gigs  </p>
            </div>

           
        </div>
    </div>
  </UModal>


  <div class="flex flex-col gap-5">
    <div v-if="loading"> 
      <CreatorLoadingPlatformCard/>
    </div>
    <div v-else  v-for="platform in platforms" :key="platform.id">
      <PlatformCard :platform = "platform" @refresh="refresh"  />
    </div>
  </div>


  
  
  
  
</template>