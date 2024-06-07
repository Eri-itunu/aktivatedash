<script setup lang="ts">
    import type { ICampaign, ICampaignRequest, APIResponse, ContentSubmissions } from "types";
    definePageMeta({
        layout: 'dashboard',
        colorMode:'dark'
    })

    const showToast = ref(false)
    const toast = useToast();
    const userStore = useUserStore();
    const API_URL = useRuntimeConfig().public.API_URL;
    const route = useRoute();
    const router = useRouter();
    const { comments } = route.params;

    const singleSubmissionRequest = async () => {
  
        const accessToken = userStore.accessToken || "";
        const apiUrl = API_URL
        try {
            const res = await $fetch<APIResponse<'submissions', ContentSubmissions>>(`${apiUrl}/submission/get-one/${comments}`, {
                headers: { Authorization: `Bearer ${accessToken}`}
            });
            
            }catch (error: any) {
                throw new Error(error.data?.message || "Something went wrong")
            }
        }; 
watchEffect(async()=>{ await singleSubmissionRequest()})  
</script>

<template>
    <div>
        <button @click="router.back()" class="flex gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z" fill="currentColor"/>
            </svg>
            Go back
        </button>
        <div class=" rounded-lg bg-[#090618]">
            <div>
                Hello
            </div>
        </div>
    </div>
</template>