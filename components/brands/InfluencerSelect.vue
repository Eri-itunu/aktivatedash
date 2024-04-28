<script setup lang="ts">
import type { IPlatformProfile } from 'types';

const toast = useToast();

const createBrandCampaignStore = useCreateBrandCampaignStore();

const loading = ref(false)
const page = ref(1)
const lastPage = ref(0)
const platformProfiles = ref<IPlatformProfile[]>([]);

const getPlatformProfiles = async(page?: number) => {
    try {
        loading.value = true
        const { meta: { last_page }, data } = await createBrandCampaignStore.getPlatformProfiles(page)
        lastPage.value = last_page
        platformProfiles.value.push(...data)
        loading.value = false
    } catch (error: any) {
        loading.value = false
        toast.add({ title: error.message})
    }
}

watchEffect(async() => { await getPlatformProfiles(page.value) })
</script>

<template>
    <div class="flex justify-center gap-2 flex-wrap">
        <Spinner :loading="loading" />
        <div v-for="platformProfile in platformProfiles" :key="platformProfile.id" class="w-[20rem] mb-2">
            <PlatformProfileCard :platformProfile="platformProfile" />
        </div>
        <div class="my-auto">
            <button v-if="page<lastPage" class="p-3 border border-purple1 text-purple1 h-min" @click="page++">
                Load more
            </button>
        </div>
    </div>
</template>