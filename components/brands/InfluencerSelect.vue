<script setup lang="ts">
import type { IPlatformProfile } from 'types';
import {getSingleProfile} from "../../api/brand/campaign/campaign.brand"
const toast = useToast();

const createBrandCampaignStore = useCreateBrandCampaignStore();

const loading = ref(false)
const page = ref(1)
const lastPage = ref(0)
const userStore = useUserStore()
const accessToken = userStore.accessToken || "";
const platformProfiles = ref<IPlatformProfile[]>([]);
    const API_URL = useRuntimeConfig().public.API_URL

const getPlatformProfiles = async(page?: number) => {
    try {
        loading.value = true
        const res = await createBrandCampaignStore.getPlatformProfiles(page)
        // lastPage.value = last_page
        platformProfiles.value.push(...res)
        loading.value = false
        console.log(platformProfiles.value)
    } catch (error: any) {
        loading.value = false
        toast.add({ title: error.message})
    }
}

// const getSingle = async()=>{

//     try{
//         const res = await getSingleProfile({
//             apiUrl: API_URL,
//             accessToken
//         })
//         console.log(res)
//     }catch (error: any) {
//         console.log(error)
//         toast.add({ title: error.message})
//     }
// }



watchEffect(async() => { await getPlatformProfiles(page.value) })
// watchEffect(async() => { await getSingle() })
</script>

<template>

   
    <div class="flex  gap-5 flex-row justify-center flex-wrap">
        <Spinner :loading="loading" />
        <div v-for="platformProfile in platformProfiles" :key="platformProfile.id" class="">
            <CreatorPlatformProfileCard :platformProfile="platformProfile" />
            <!-- <BrandsInfluencerCard :platformProfile="platformProfile"  /> -->
        </div>
      
    </div>
    <div class="my-auto flex items-center justify-center">
        <button v-if="page<lastPage" class="p-3 border border-purple1 text-purple1 h-min" @click="page++">
            Load more
        </button>
    </div>
</template>