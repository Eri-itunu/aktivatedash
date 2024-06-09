<script setup lang="ts">
    import type { ICampaign, ICampaignRequest, APIResponse, ContentSubmissions } from "types";
    definePageMeta({
        layout: 'brands',
        colorMode:'dark'
    })

    const showToast = ref(false)
    const toast = useToast();
    const userStore = useUserStore();
    const API_URL = useRuntimeConfig().public.API_URL;
    const route = useRoute();
    const router = useRouter();
    const { comments } = route.params;
    const Content = ref<ContentSubmissions>()
    const comment = ref('')
    const accessToken = userStore.accessToken || "";
    const apiUrl = API_URL

    const openLink = (link: string) => {
        navigateTo(link, {
            open: {
            target: "_blank",
            windowFeatures: {
                width: 500,
                height: 500,
            },
            },
            external: true,
        });
    };

    const singleSubmissionRequest = async () => {  
        try {
            const res = await $fetch<APIResponse<'submission', ContentSubmissions>>(`${apiUrl}/submission/get-one/${comments}`, {
                headers: { Authorization: `Bearer ${accessToken}`}
            });

            Content.value = res.data.submission
            console.log(Content)
            
            }catch (error: any) {
                throw new Error(error.data?.message || "Something went wrong")
            }
        }; 

    const decide =  async(selection:string)=>{
        const body = {
            "submissionId" : Content.value.id,
            "note" : comment.value,
            "decision" : selection
        }
        console.log(body)

       try{
            const res = await $fetch<APIResponse<'submissions', ContentSubmissions>>(`${apiUrl}/submission/brand/update-submission`, {
                method:"POST",
                headers: { Authorization: `Bearer ${accessToken}`},
                body
            });

            router.back()
       }catch(error:any){
            console.log(error)
       }
    }
watchEffect(async()=>{ await singleSubmissionRequest()})  
</script>

<template>
    <div class="px-2 md:px-28 flex flex-col gap-5">
        <button @click="router.back()" class="flex gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z" fill="currentColor"/>
            </svg>
            Go back
        </button>
        <div class=" rounded-lg bg-[#090618]">
            <div class="p-8 border-b-[0.5px] border-b-darkBlue">
                <h1>{{Content?.creator?.first_name}}  {{Content?.creator?.last_name}}</h1>
            </div>

            <div class="px-8 py-4 flex flex-col gap-5">
               <div>
                    <h1>Content Link</h1>
                    <div class="w-full rounded border-[0.5px] border-darkBlue p-4">
                        <button @click="openLink(Content.url)">
                            {{ Content?.url }}
                        </button>
                    
                    </div>
               </div>

                
                <textarea class="bg-transparent  w-full rounded border-[0.5px] p-2  border-darkBlue h-full" name="" cols="30"
                rows="5" id=""
                placeholder="Give feedback..."
                v-model="comment"
                >

                </textarea>
               
            </div>

            <div class="flex gap-10 px-24 py-12 justify-center">
                <button @click="decide('accept')" class="bg-purple1 text-white basis-1/2 py-1 rounded">
                    Accept
                </button>

                <button @click="decide('reject')" class="bg-white text-black basis-1/2 rounded">
                    Reject
                </button>
            </div>
        </div>
    </div>
</template>