<script setup lang="ts" >

import type { ContentSubmissions, PaginatedAPIResponse,APIResponse,Collaboration, CollabHubCampaign } from "@/types";
import { useToast } from "@/components/ui/toast/use-toast";

const getBrandCampaignStore = useGetBrandCampaignStore();
const sampleData = ref<ContentSubmissions[]>([])
const {toast}  = useToast();
const config = useRuntimeConfig();
const API_URL = config.public.API_URL ;
const contents = ref()
const userStore = useUserStore();
const route = useRoute();
const props = defineProps<{
    id: string
}>();

const campaignDetails = ref<CollabHubCampaign>()

const loading = ref(false)

const getContent = async () => {
   loading.value = true;
   const apiUrl = API_URL;
   console.log("it is working")
   try {
       const res = await $fetch<
       PaginatedAPIResponse<"submissions", ContentSubmissions>
       >(`${apiUrl}/campaign/brand-get-campaign/${props.id}/posts`, {
       headers: { Authorization: `Bearer ${userStore.accessToken}` },
       });
       contents.value = res.data.submissions.data;
       loading.value = false;
       
   } catch (error: any) {
       toast({
       title:
           error.data?.messsage ||
           "Unable to retrieve content list. Try again later",
       });
   }
};

    onMounted(async () => await getContent());
</script>

<template>

<!-- <div class="bg-white dark:bg-vDarkBlue" >
   <div v-if="contents.length === 0"  class="text-center py-8">
       <p>No creators have uploaded content yet</p>
   </div>
   <div class="grid  md:grid-cols-4 grid-cols-2 gap-8 h-full bg-white dark:bg-vDarkBlue">
       <div v-for="sample in contents" :key="sample.id" class=" bg-white dark:bg-[#090618] flex justify-between rounded-lg" >
           <Dialog>
               <DialogTrigger class="w-full cursor-pointer">
                   <div class="hover:grayscale-0 grayscale w-full">
                       <img src="/assets/icons/creatorContent.svg" alt="" class="w-full "  >
                       <div class="p-4" >
                           <h1>new_user</h1>
                           
                       </div>

                   </div>
               </DialogTrigger>
               <DialogContent class="bg-white dark:bg-[#090618] max-w-[300px] text-black dark:text-white border-none" >
               <DialogHeader>
                   <DialogTitle>Post Details</DialogTitle>
                   <div class="w-full flex justify-center py-4" >
                       <button class="rounded-[20px] text-white bg-black max-w-fit p-2" >view live post</button>
                   </div>
                   <div class="text-center flex flex-col gap-4" >
                       <span class="flex border-b-[0.5px] border-b-[1D192F]  justify-between" > <p>Comments :</p> <p> {{ sample.commentCount }}</p> </span>
                       <span class="flex border-b-[0.5px] border-b-[1D192F]  justify-between"> <p>Likes:</p> <p> {{sample.likeCount}}</p></span>
                       <span class="flex border-b-[0.5px] border-b-[1D192F]  justify-between"> <p>Shares:</p> <p> {{sample.shareCount}}</p></span>
                       <span class="flex border-b-[0.5px] border-b-[1D192F]  justify-between"> <p>Views:</p> <p> {{ sample.viewCount }}</p></span>
                    
                       
                   </div>
                   
               </DialogHeader>

          
               </DialogContent>
           </Dialog>
          
       </div>
       
   </div>
</div> -->
</template>