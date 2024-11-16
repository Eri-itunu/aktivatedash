<script setup lang="ts" >
    import type { ICampaignRequest, ResponseMessage, InstagramPosts } from "types";
    import { getInstagramPosts, getPosts, getContentList, getSingleCampaignRequest } from "../../api/creator/campaign/campaign.creator";
    import { useToast } from "../ui/toast/use-toast";
    const { toast } = useToast();
    const props = defineProps<{  ID:string }>();
    const config = useRuntimeConfig();
    const API_URL = config.public.API_URL;
    const userStore = useUserStore();
    const requests = ref<ICampaignRequest[]>([]);
    const selectPosts = ref<any[]>([]);
    const loading = ref(false)
    const getAccounts = ref(false)
    const getContent = ref(false)

    const getUserPosts = async (platformProfileId) => {
        loading.value = true
        const accessToken = userStore.accessToken || "";
        try {
            const posts = await getContentList({
            apiUrl: API_URL,
            accessToken,
            platformProfileId,
            campaignID: props.ID
            });
            selectPosts.value = posts
            loading.value=false
            getAccounts.value=false
            getContent.value = true

        } catch(error: any) {
            loading.value=false
            toast({ title: error.message || "Something went wrong" });
        }
    };


    const singleCampaignReqs = async () => {
        const accessToken = userStore.accessToken || "";
        loading.value = true
        try {
            const platform = await getSingleCampaignRequest({
            apiUrl: API_URL,
            campaignId: props.ID,
            accessToken,
            });
            requests.value = platform;
            loading.value = false
            getAccounts.value = true
        } catch (error: any) {
            loading.value = false
            toast({ title: error.data?.message || "Something went wrong" });
        }
    };
</script>


<template>
    <div >
        <Dialog>
            <DialogTrigger as-child>
            <Button  @click="singleCampaignReqs" >
                Link Post 
            </Button>
            </DialogTrigger>
            <DialogContent class="bg-white text-black rounded-lg max-w-[350px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]"">
            <DialogHeader class="p-6 pb-0" >
                <DialogTitle> Link Post </DialogTitle>
                
            </DialogHeader>
            <div class="grid gap-4 py-4 overflow-y-auto px-6" >
                <div v-if="loading">
                    <LoadSpinner />
                </div>
                <div v-else-if="getAccounts" v-for="request in requests"  >
                    <div class="bg-[#D9D9D9]/50 p-2 items-center rounded-lg flex justify-between"    v-if="request.creatorDecision === 'accept' " >
                        <div>
                            <p class="break-words" >{{request.rateCard?.platformProfile?.workPlatform}}</p>
                            <p class="break-words text-sm" >{{request.rateCard?.platformProfile?.platformUsername}}</p>
                        </div>

                        <Button @click="getUserPosts(request.rateCard?.platformProfileId)" >
                            link post
                        </Button>
                    </div>
                </div>

                <div v-else-if="getContent"  >
                    <div v-for="select in selectPosts" >
                        <div v-if="select.length === 0" class="">
                            <p>No posts to be linked</p>
                        </div>
                    </div>
                </div>
            </div>
       
            </DialogContent>
        </Dialog>
    </div>

</template>