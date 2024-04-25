<script setup lang="ts">
import type { IPlatformProfile, PaginatedAPIResponse } from 'types';

// TODO- fix env and remove local url
const API_URL = process.env.API_URL || "http://localhost:3333/api/v2";
const userStore = useUserStore();
const toast = useToast();

const platformProfiles = ref<IPlatformProfile[]>([])
const loading = ref<boolean> (false);


const getPlatformProfiles = async() => {
    try {
      loading.value = true;
      const res = await $fetch<PaginatedAPIResponse<'platformProfiles', IPlatformProfile>>(`${API_URL}/profile/get-platform-profiles`, {
        headers: { Authorization: `Bearer ${userStore.accessToken}`}
      });
      loading.value = false;
      platformProfiles.value.push(...res.data.platformProfiles.data)

    } catch(error: any){
       if(error.data?.message) {
            toast.add({title: error.data?.messag})
        }
    }
}

watchEffect(async() => { await getPlatformProfiles() })
</script>

<template>
    <div class="flex gap-2 flex-wrap">
        <Spinner v-if="loading" :loading="loading" />
        <div v-else  v-for="platformProfile in platformProfiles" :key="platformProfile.id" class="w-[20rem] mb-4">
            <PlatformProfileCard :platformProfile="platformProfile" />
        </div>
    </div>
</template>