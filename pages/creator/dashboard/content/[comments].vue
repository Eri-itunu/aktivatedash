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
    const contents = ref<ContentSubmissions>();

    const singleSubmissionRequest = async () => {
  
        const accessToken = userStore.accessToken || "";
        const apiUrl = API_URL
        try {
            const res = await $fetch<APIResponse<'submission', ContentSubmissions>>(`${apiUrl}/submission/get-one/${comments}`, {
                headers: { Authorization: `Bearer ${accessToken}`}
            });

            contents.value = res.data.submission
            
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
        <div class="max-w-[1000px] mt-20">
            <div class="px-16 flex flex-col gap-10">

                <h1 class="text-3xl font-bold">{{ contents?.campaign.headline}}</h1>

                <div class="flex justify-between">
                    <div>
                        <h1 class="text-purplelabel">STATUS</h1>
                        <p>{{contents?.campaign_decision}}</p>
                    </div>


                    <div>
                        <h1 class="text-purplelabel">DUE DATE</h1>
                        <p>{{contents?.campaign.submission_due_date.split("T")[0]}}</p>
                    </div>
                </div>

                <div>
                    <h1 class="text-purplelabel">Comments</h1>
                    <div v-for="comment in contents?.campaign_note">
                        <li>{{ comment.note }} ({{ comment.timestamp.split("T")[0] }})</li>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>