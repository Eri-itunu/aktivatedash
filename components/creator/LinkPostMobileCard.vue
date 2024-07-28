<script setup lang="ts" >
    import type { ICampaignRequest, ResponseMessage, InstagramPosts } from "types";
    import { getInstagramPosts, getPosts, getContentList, getSingleCampaignRequest } from "../../api/creator/campaign/campaign.creator";
    import { useToast } from "../ui/toast/use-toast";
    const { toast } = useToast();
    const props = defineProps<{ request: ICampaignRequest, ID:string }>();
    const config = useRuntimeConfig();
    const API_URL = config.public.API_URL;
    const userStore = useUserStore();
    const requests = ref<ICampaignRequest[]>([]);
    
    const getUserPosts = async (platformProfileId, campaignID) => {

        const accessToken = userStore.accessToken || "";
        try {
            const posts = await getContentList({
            apiUrl: API_URL,
            accessToken,
            platformProfileId,
            campaignID: props.ID
            });

        } catch(error: any) {

            toast({ title: error.message || "Something went wrong" });
        }
    };

    const linkPost = async (platformProfileId: string | undefined, contentId: string) => {
    
    try {
        if (!platformProfileId) {
        throw new Error("No post selected");
        }
        const res = await $fetch<ResponseMessage>(`${API_URL}/campaign/${props.ID}/link-post`, {
        method: "post",

        body: { contentId, platformProfileId: platformProfileId },
        headers: { Authorization: `Bearer ${userStore.accessToken}` },
        });

        toast({ title: "Post link successful" });
    } catch (error: any) {
        toast({ title: error.message || "Something went wrong" });
    }
    };

    const singleCampaignReqs = async () => {
        const accessToken = userStore.accessToken || "";

        try {
            const platform = await getSingleCampaignRequest({
            apiUrl: API_URL,
            campaignId: props.ID,
            accessToken,
            });
            requests.value = platform;

        } catch (error: any) {
            toast({ title: error.data?.message || "Something went wrong" });
        }
    };
</script>


<template>
    <div>

    </div>

</template>