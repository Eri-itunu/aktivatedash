<script setup lang="ts">
    import {getSingleCreator} from "/api/brand/getCreator.brand"
    import type {IPlatformProfile} from "types"
    definePageMeta({
    layout: "brands",
    colorMode: "dark",
    });

    const route = useRoute();
    const router = useRouter();
    const API_URL = useRuntimeConfig().public.API_URL
    const userStore = useUserStore()
    const loading = ref(true)
    const profile = ref<IPlatformProfile>([])
    

    const getCreator =  async()=>{
        const { influencerId } = route.params;
        const accessToken = userStore.accessToken || "";

        try{
            const res = await getSingleCreator({
                apiUrl: API_URL,
                influencerId,
                accessToken,
            });
            loading.value = false 
            profile.value = res

        }
        catch(error:any){
            loading.value = false
            console.log(error)
        }
    }


    onMounted(async() => await getCreator())
</script>

<template>
   <div class="px-4">  
    <button class="flex gap-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z" fill="currentColor"/>
        </svg>
        Go back
    </button>  
    <div class="w-full rounded-lg border-[0.5px] border-[#464160] bg-vDarkBlue">

        
        <!-- Creator Info Portion -->
        <div class="border-b border-darkBlue flex flex-col items-center justify-center py-4 p-auto">
            <div  class="border-4 rounded-full justify-center flex items-center bg-purplelabel w-20 h-20 ">
            <p class="text-xl text-black font-bold"> {{ profile.first_name?.charAt(0) }}{{ profile.last_name?.charAt(0) }}</p>
            </div>
            <p class="font-bold">{{profile.first_name}} {{profile.last_name}}</p>
        </div>

        <!-- Platforms -->

        <div class="px-2 md:px-8 py-4 flex flex-col gap-5">
            <p class="font-bold">Platforms </p>

            <div>
                
            </div>

           <div class="flex gap-2 w-full border-b border-white ">
                <div  v-for="profile in profile.platformProfiles" :key=profile.id>

                    <div class="flex gap-1 border-b-4 border-purple1 " v-if="profile.work_platform.includes('tiktok')">
                        <img src="/assets/icons/tiktokProfile.svg" alt="">
                        tiktok
                    </div>
                    <div class="flex gap-1 border-b-4 border-purple1" v-if="profile.work_platform.includes('facebook')">
                        <img src="/assets/icons/facebook.svg" alt="" class="h-5">
                        <p>facebook</p>
                    </div>
                    <div class="flex gap-1 border-b-4 border-purple1" v-if="profile.work_platform.includes('instagram')">
                        <img src="/assets/icons/instagramProfile.svg" alt="">
                        <p>instagram</p>
                    </div>
                </div>
           </div>

           <div class="w-full flex justify-between p-4  rounded-lg border-[0.5px] border-white" >
                <div >
                    <!-- <p class="font-bold">{{profile.platformProfiles[0].reputation_follower_count}}</p> -->
                </div>
           </div>


        </div>


    </div>
   </div>
</template>