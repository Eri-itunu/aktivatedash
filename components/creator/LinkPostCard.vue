<script setup lang="ts">
import type { ICampaignRequest, ResponseMessage, Media, Submission } from "types";
import { getInstagramPosts, getPosts, getContentList } from "../../api/creator/campaign/campaign.creator";
import { useToast } from "../ui/toast/use-toast";
const props = defineProps<{ request: Submission, ID:string }>();
const { toast } = useToast();
const config = useRuntimeConfig();
const API_URL = config.public.API_URL;
const loading = ref(false);
const picked = ref<string>("");
const decisionState = ref<string>(props.request.creatorDecision);
const isOpen = ref(false);
const userStore = useUserStore();
const selectPosts = ref<Media[]>([]);
const showSpinner = ref(false);
const postType = ref<string>("default");
const close =()=>{
  isOpen.value = false
}



const getUserPosts = async ( ) => {
  showSpinner.value = true
  const accessToken = userStore.accessToken || "";

  const platformId = props.request.platformProfileId 

  try {
    const posts = await getContentList({
      apiUrl: API_URL,
      accessToken,
      platformProfileId: platformId,
      campaignID: props.request.campaignId
    });
    selectPosts.value = posts;
    showSpinner.value = false
    isOpen.value = true;
  } catch(error: any) {
    showSpinner.value = false
    loading.value = true;
    toast({ title: error.message || "Something went wrong" });
  }
};

const linkPost = async (platformProfileId: string | undefined, contentId: string) => {
  
  try {
    if (!platformProfileId) {
      throw new Error("No post selected");
    }
    const res = await $fetch<ResponseMessage>(`${API_URL}/platform/${props.ID}/link-post`, {
      method: "post",

      body: { contentId, platformProfileId: platformProfileId, postType : "default" },
      headers: { Authorization: `Bearer ${userStore.accessToken}` },
    });
    isOpen.value = false;
    toast({ title: "Post link successful" });
  } catch (error: any) {
    toast({ title: error.message || "Something went wrong" });
  }
};
</script>

<template>
  

  <div v-if="showSpinner" class="w-[100%] h-[100%] fixed top-0 right-0 left-0 bottom-0 z-50 bg-[#000000]/ flex justify-center items-center">
    <LoadSpinner />
  </div>


  
  <div
    class="min-w-[258px] flex flex-col justify-between border border-grey1 rounded-lg bg-vDarkBlue text-white py-4"
  >
  <Dialog>
    <DialogTrigger>
        <button @click="getUserPosts" class="">
            Link post to campaign
        </button>
    </DialogTrigger>

    <DialogContent>
        <div v-if="showSpinner" >
            <LoadSpinner />
        </div>

        <div v-else class="py-2" >
            <table
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
                <thead
                class="text-xs t uppercase bg-darkBlue text-purplebg"
                >
                <tr>
                    <th scope="col" class="px-6 py-3">#</th>
                    <th scope="col" class="px-6 py-3">Post Title and Date</th>

                    <th scope="col" class="max-lg:hidden px-6 py-3">Post Type</th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="post in selectPosts"
                    :key="post.id"
                    class=" border-b dark:bg-[#090618] border-gray-700 hover:bg-darkBlue"
                >
                    <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                    <input type="radio" :id="post.id" :value="post.id" v-model="picked" />
                    </th>

                    <td
                    class="md:px-6 px-1 py-4 ellipses break-words flex flex-wrap max-w-[480px]"
                    >
                    {{ post.title ? post.title : "No Caption" }}
                    {{formatDate(post.published_at)}}
                    </td>

                    <td class="max-lg:hidden px-6 py-4">
                    {{ post.type }}
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="flex justify-end mt-2" >
                <button @click="linkPost(request.platformProfileId,picked  )" class="text-white bg-purple1 rounded text-sm px-2 py-1">
                    Link post
                </button>
            </div>
        </div>
    </DialogContent>

  </Dialog>
  </div>
</template>
