<script setup lang="ts">
import type { ContentSubmissions, PaginatedAPIResponse, PaginationMeta } from "@/types";
import { useToast } from "@/components/ui/toast/use-toast";

const getBrandCampaignStore = useGetBrandCampaignStore();
const { toast } = useToast();
const config = useRuntimeConfig();
const API_URL = config.public.API_URL;
const userStore = useUserStore();
const route = useRoute();

const props = defineProps<{ id: string }>();
const contents = ref<ContentSubmissions[]>([]);
const pageMeta = ref<PaginationMeta | null>(null);
const loading = ref(false);

const openLink = (link: string | undefined) => {
        if(!link) {
            return
        }
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

const getContent = async () => {
  loading.value = true;
  try {
    console.log("Fetching data from:", `${API_URL}/campaign/brand-get-campaign/${props.id}/posts`);
    const res = await $fetch<PaginatedAPIResponse<"campaignPosts", ContentSubmissions>>(
      `${API_URL}/campaign/brand-get-campaign/${props.id}/posts`,
      {
        headers: { Authorization: `Bearer ${userStore.accessToken}` },
      }
    );
    contents.value = res.data.campaignPosts.data || [];
    pageMeta.value = res.data.campaignPosts.meta || null;
    console.log("Fetched contents:", contents.value);
  } catch (error: any) {
    console.error("API Error:", error);
    toast({
      title: error.data?.message || "Unable to retrieve content list. Try again later",
    });
  } finally {
    loading.value = false;
  }
};

watch(() => props.id, getContent, { immediate: true });
</script>

<template>
 
  <div class="bg-white dark:bg-vDarkBlue p-8">
    <div v-if="loading" class="text-center py-8">Loading...</div>
    <div v-else-if="!contents || contents.length === 0" class="text-center py-8">
      <p>No creators have uploaded content yet</p>
    </div>
    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-8 h-full bg-white dark:bg-vDarkBlue">

      
      <div
        v-for="(sample, index) in contents"
        :key="index"
        class="bg-white dark:bg-[#090618] flex justify-between rounded-lg"
      >
        <Dialog>
          <DialogTrigger class="w-full cursor-pointer">
            <div class="hover:grayscale-0 grayscale w-full">
              <img src="/assets/icons/creatorContent.svg" alt="" class="w-full" />
              <div class="p-4"></div>
            </div>
            <div>
                {{ sample.platformProfile.platformUsername }}
            </div>
          </DialogTrigger>
          <DialogContent class="bg-white dark:bg-[#090618] max-w-[300px] text-black dark:text-white border-none">
            <DialogHeader>
              <DialogTitle>Post Details</DialogTitle>
              <div class="w-full flex justify-center py-4">
                 <button @click="openLink(sample.url)" class="rounded-[20px] text-white bg-black max-w-fit p-2">
                    View live post
                </button>
              </div>
              <div class="text-center flex flex-col gap-4">
                <span class="flex border-b-[0.5px] border-b-[#1D192F] justify-between">
                  <p>Comments:</p>
                  <p>{{ sample.commentCount }}</p>
                </span>
                <span class="flex border-b-[0.5px] border-b-[#1D192F] justify-between">
                  <p>Likes:</p>
                  <p>{{ sample.likeCount }}</p>
                </span>
                <span class="flex border-b-[0.5px] border-b-[#1D192F] justify-between">
                  <p>Shares:</p>
                  <p>{{ sample.shareCount }}</p>
                </span>
                <span class="flex border-b-[0.5px] border-b-[#1D192F] justify-between">
                  <p>Views:</p>
                  <p>{{ sample.viewCount }}</p>
                </span>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  </div>
</template>
