<script setup lang="ts"> 
const toast = useToast();

const createBrandCampaignStore = useCreateBrandCampaignStore();

const { startDate, endDate, platformProfiles, loading_PlatformProfiles } = storeToRefs(createBrandCampaignStore);
const page = ref(1)
const lastPage = ref(0)


const getPlatformProfiles = async(page?: number) => {
    try {
        const { last_page} = await createBrandCampaignStore.getPlatformProfiles(page)
        lastPage.value = last_page
    } catch (error: any) {
        toast.add({ title: error.message})
    }
}

watchEffect(async() => { await getPlatformProfiles(page.value) })
</script>

<template>
    <div class="flex justify-center gap-2 flex-wrap">
        <Spinner :loading="loading_PlatformProfiles" />
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