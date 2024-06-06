<script setup lang="ts">
    import {getSingleCreator} from "/api/brand/getCreator.brand"
    import type {IPlatformProfile, NPlatformProfile} from "types"
    definePageMeta({
    layout: "brands",
    colorMode: "dark",
    });

    const route = useRoute();
    const router = useRouter();
    const API_URL = useRuntimeConfig().public.API_URL
    const userStore = useUserStore()
    const createBrandCampaignStore = useCreateBrandCampaignStore();
    const {
        platformType,
        rateObject
    } = storeToRefs(createBrandCampaignStore);
    const loading = ref(true)
    const profile = ref<NPlatformProfile>([])
    const workPlatforms = ref<IPlatformProfile[]>([])
    const selectedIndex = ref(0)
    const changePlatform = (index)=>{
        selectedIndex.value = index
    }
    // const newWorkPlatforms = ref<IPlatformProfile[]>([])

    const selectRate = (id,price) =>{
        value = [id,price].join(',')
        rateObject.append(value)
        console.log(rateObject)
    }
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
            workPlatforms.value = res.platformProfiles;
            console.log(workPlatforms)
            // const newWorkPlatforms = computed(()=> {
            //     return workPlatforms.length})
            console.log(workPlatforms.value.length)
            

        }
        catch(error:any){
            loading.value = false
            console.log(error)
        }
    }


    watchEffect(async() => await getCreator())
</script>

<template>
   <div class="px-4">  
        <button @click="router.back()" class="flex gap-2 mb-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z" fill="currentColor"/>
            </svg>
            Go back
        </button>  
        <div class="w-full rounded-lg border-[0.5px] py-4 border-[#464160] bg-vDarkBlue">

            
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

                <div class="flex gap-2">
                    <div  v-for="(p, index) in  workPlatforms">
                        <div @click="changePlatform(index)" class="flex gap-2  cursor-pointer":class="{'border-b-2 border-purple1 ': selectedIndex == index}">
                            <img v-if="p.work_platform.includes('tiktok')" src="/assets/icons/tiktokProfile.svg" alt="">
                            <img v-if="p.work_platform.includes('instagram')" src="/assets/icons/instagramProfile.svg" alt="">
                            <img v-if="p.work_platform.includes('facebook')" src="/assets/icons/facebook.svg" alt="" class="h-5">
                            {{p.work_platform}} 
                        </div>
                    </div>
                </div>


                <div class="w-full flex justify-between px-8 py-4 gap-5 rounded-lg border-[0.5px] border-white" >
                    <div class="flex flex-col items-center" >
                        <p class="font-bold text-2xl">{{workPlatforms[selectedIndex]?.reputation_follower_count}}</p>
                        <p>Followers</p>
                    </div>

                    <div class="flex flex-col items-center">
                        <p class="font-bold text-2xl">{{workPlatforms[selectedIndex]?.reputation_content_count}}</p>
                        <p>Content Count</p>
                    </div>
                

                    <div class="flex flex-col items-center">
                        <p class="font-bold text-2xl">{{workPlatforms[selectedIndex]?.reputation_subscriber_count}}</p>
                        <p>Subsciber Count</p>
                    </div>

                    <div class="flex flex-col items-center">
                        <p class="font-bold text-2xl">{{workPlatforms[selectedIndex]?.reputation_subscriber_count}}</p>
                        <p>Subsciber Count</p>
                    </div>
                </div>


            </div>

            <!-- Rates -->
            <div class="w-full px-2 md:px-8 mt-5 ">
                <div class="rounded-lg border-2 border-[#CDC2FF]">
                    <div class="flex  bg-[#1D192F] rounded-t-lg  py-4 border-b border-[#CDC2FF] justify-between">
                        <p class="basis-1/4 flex justify-center" >Post</p>
                        <p class="basis-1/4 flex justify-center">Carousel</p>
                        <p class="basis-1/4 flex justify-center">Story</p>
                        <p class="basis-1/4 flex justify-center">Reel</p>
                    </div> 
                    <div class="flex  items-center h-16 rounded-lg justify-between">
                        <div class="basis-1/4 flex h-full items-center rounded-bl-lg justify-center hover:bg-purplelabel hover:text-black">
                            <input v-model="rateObject" type="checkbox" :value="[workPlatforms[selectedIndex]?.rate.id ,workPlatforms[selectedIndex]?.rate.price].join(',')">
                            
                                N{{workPlatforms[selectedIndex]?.rate.price}}
                            
                        </div>
                       
                        <div class="basis-1/4 flex h-full items-center justify-center hover:bg-purplelabel hover:text-black">
                            N/A
                        </div>
                        <div class="basis-1/4 flex h-full items-center  justify-center hover:bg-purplelabel hover:text-black">
                            N/A
                        </div>
                        <div class="basis-1/4 flex h-full items-center border-rounded-br-lg  justify-center hover:bg-purplelabel hover:text-black">
                            N/A
                        </div>
                    </div>
                </div>
            </div>
        </div>

       
   </div>
</template>