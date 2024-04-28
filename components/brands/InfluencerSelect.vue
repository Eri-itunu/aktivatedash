<script setup lang="ts"> 
const toast = useToast();

const createBrandCampaignStore = useCreateBrandCampaignStore();

const { startDate, endDate, platformProfiles, loading_PlatformProfiles } = storeToRefs(createBrandCampaignStore);
const page = ref(1)


const getPlatformProfiles = async() => {
    try {
        await createBrandCampaignStore.getPlatformProfiles(page.value)
    } catch (error: any) {
        toast.add({ title: error.message})
    }
}

watchEffect(async() => { await getPlatformProfiles() })
</script>

<template>
    <div class="flex gap-2 flex-wrap">
        <Spinner v-if="loading_PlatformProfiles" :loading="loading_PlatformProfiles" />
        <div v-else  v-for="platformProfile in platformProfiles" :key="platformProfile.id" class="w-[20rem] mb-4">
            <PlatformProfileCard :platformProfile="platformProfile" />
        </div>
        
    </div>
</template>