<script setup lang="ts">
import type { ResponseMessage } from "types";
import { useToast } from "../ui/toast/use-toast";
import { content } from "#tailwind-config";

const config = useRuntimeConfig();
const API_URL = config.public.API_URL;
const { toast } = useToast();
const userStore = useUserStore();
const picked = ref<string>("");
const postType = ref<string>("default");
const emit = defineEmits(["close"]);
const props = defineProps<{
  posts: Object;
  platformID: string | undefined;
  campaignID: string;
}>();

const linkPost = async (
  platformProfileId: string | undefined,
  contentId: string,
  postType: string
) => {

    if (!contentId) {
      // throw new Error("No post selected");
      toast( {title : "No post selected"});
      return
    }
  try { 
    const res = await $fetch<ResponseMessage>(
      `${API_URL}/platform/${props.campaignID}/link-post`,
      {
        method: "post",
        body: { contentId, platformProfileId: platformProfileId, postType },
        headers: { Authorization: `Bearer ${userStore.accessToken}` },
      }
    );
    emit("close")
    toast({ title: "Post link successful" });
   
  } catch (error: any) {
  
    toast({title: error.data.message || "There is something wrong with linking the post please check the post and try again"})
  }
};


</script>

<template>
  <div class="flex flex-col max-h-fit">
    <div class="basis-4/5 overflow-scroll">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs t uppercase bg-darkBlue text-purplebg"
        >
          <tr>
            <th scope="col" class="px-6 py-3">#</th>
            <th scope="col" class="px-6 py-3">Post Title</th>

            <th scope="col" class="max-lg:hidden px-6 py-3">Post Type</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="post in posts"
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
              {{ post.title }}
            </td>

            <td class="max-lg:hidden px-6 py-4">
              {{ post.type }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="basis-1/5 flex justify-end py-2">
      <button
        class="max-h-[40px] bg-purple1 rounded-[100px] px-4 py-2"
        @click="linkPost(platformID, picked, postType)"
      >
        Link post
      </button>
    </div>
  </div>
</template>
