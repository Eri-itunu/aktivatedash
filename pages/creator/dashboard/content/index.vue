<script setup lang="ts">
// Imports
import type {
  ContentSubmissions,
  Collaboration,
  APIResponse,
  PaginatedAPIResponse,
  PaginationMeta
} from "types";
import { ref, computed, watchEffect } from "vue";
import { useToast } from "../../../../components/ui/toast/use-toast";
import { ChevronRight, Folder, ChevronDown } from "lucide-vue-next";  
import { getContentSubmissionList, acceptedContent } from "@/api/creator/content.creator";
import { acceptedCampaigns } from "@/api/creator/content/content.creator";
import { getMyCollaborationHubCampaigns } from "@/api/creator/campaign/campaign.creator";
// Page metadata
definePageMeta({
  layout: "dashboard",
  colorMode: "dark"
});
// Variable declarations
const device = useDevice();
const { toast } = useToast();
const isOpen = ref(false);
const config = useRuntimeConfig();
const API_URL = config.public.API_URL;
const userStore = useUserStore();
const accessToken = userStore.accessToken || "";
const contents = ref<ContentSubmissions[]>([]);
const collaborationHubContent = ref<ContentSubmissions[]>([]);
const campaignList = ref<ContentSubmissions[]>([]);
const campaignContentType = ref('public')
const loading = ref(false);
const type = ref<string>("");
const campaignId = ref<string>("");
const campaignName = ref<string>("");
const collabHubName = ref("");
const note = ref<string>("");
const url = ref<string>("");
const apiUrl = API_URL;
const campaignType = ref("");
const openedPage =ref(1)
const pageMeta = ref<PaginationMeta>()


const CollabHubCampaign = ref<Collaboration[]>([]);
// Helper: Validate URL
const isValidURL = (url: string): boolean => {
  const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;
  return urlRegex.test(url);
};
// API calls
// Get collaboration hub campaigns
const getApplications = async (privatePage: number) => {
  loading.value = true;
  const filter = {
    limit: "7",
    page: privatePage.toString()
  };
  const qs = new URLSearchParams(filter);
  try {
    const { data, meta: { lastPage } } = await getMyCollaborationHubCampaigns({
      apiUrl: API_URL as string,
      accessToken,
      qs: qs.toString()
    });
    CollabHubCampaign.value = data;
  } catch (error: any) {
    toast({ title: error.data?.message || "Something went wrong" });
  } finally {
    loading.value = false;
  }
};
const gotSubs = ref(false)
// Get content submission lists and merge them
const getList = async () => {
  gotSubs.value = true;
  try {

    // Fetch collaboration hub submissions
    const cres = await $fetch<PaginatedAPIResponse<"submissions", ContentSubmissions>>(
        `${apiUrl}/submission/creator/my-submissions?campaign_type=collaboration-hub`,
        {
            headers: { Authorization: `Bearer ${accessToken}` }
        }
    );
    collaborationHubContent.value = cres.data?.submissions?.data || [];

} catch (error: any) {
    throw new Error(error.data?.message || "Something went wrong");
} finally {
    gotSubs.value = false;
}
};

// Submit content (for desktop)
const submitContent = async () => {
  const body = {
    type: type.value,
    campaignId: campaignId.value,
    url: url.value,
    note: note.value
  };
  if (!isValidURL(url.value)) {
    toast({ title: "Enter a valid url" });
    return;
  }
  try {
    await $fetch<APIResponse<"submissions", ContentSubmissions>>(
      `${apiUrl}/submission/submit-content`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body
      }
    );
    // Reset fields
    url.value = "";
    note.value = "";
    campaignId.value = "";
    campaignName.value = "";
    type.value = "";
    isOpen.value = false;
    toast({ title: "Content submitted for approval" });
    getList();
  } catch (error: any) {
    isOpen.value = false;
    toast({ title: error.data?.message || "Something went wrong" });
  }
};




// Reactive API calls
watchEffect(async () => {
  await getList();
});
// watchEffect(async () => {
//   await getAcceptedCampaigns();
// });
watchEffect(async () => {
  await getApplications(1);
});
</script>


<template>
  <div class="px-2 md:px-8 flex flex-col gap-4 mt-5">
    
    
  <div class="flex justify-start">
    <Dialog>
      <DialogTrigger>
        <button class="rounded-xl px-4 py-1 text-black bg-[#CDC2FF]">
          Submit Content Link
        </button>
      </DialogTrigger>
      <DialogContent>
        <div class="flex flex-col gap-5">
          <div>
            <p class="mb-1">Link</p>
            <input
              type="text"
              class="border p-2 rounded-md w-full bg-transparent"
              v-model="url"
            />
          </div>
          <div>
            <p class="mb-1">Campaign Type</p>
            <Select v-model="campaignType">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select a Campaign type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Campaign type</SelectLabel>
                  <SelectItem value="Collaboration">Collaboration hub</SelectItem>
                 
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <p class="mb-1">Post Type</p>
            <Select v-model="type">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select a Post type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Post type</SelectLabel>
                  <SelectItem value="photo">Photo</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div v-if="campaignType === 'Collaboration'">
            <p class="mb-1">Collaboration</p>
            <Select v-model="campaignId">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select a Campaign" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Campaign name</SelectLabel>
                  <SelectItem
                    v-for="content in CollabHubCampaign"
                    :key="content.id"
                    :value="content.campaign.id"
                  >
                    {{ content.campaign.headline }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div v-if="campaignType === 'Private'">
            <p class="mb-1">Campaign</p>
            <Select v-model="campaignId">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select a Campaign" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Campaign name</SelectLabel>
                  <SelectItem
                    v-for="content in campaignList"
                    :key="content.id"
                    :value="content.id"
                    @click="campaignId = content.id"
                  >
                    {{ content.headline }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <p class="mb-1">Comment</p>
            <textarea
              class="border p-2 rounded-md w-full bg-transparent"
              cols="30"
              v-model="note"
            ></textarea>
          </div>
          <div>
            <DialogTrigger @click="submitContent" class="w-full bg-black text-white py-2">
              Save
            </DialogTrigger>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>

  <div class="flex gap-4">
    <h1 class="dark:text-white text-black">List of Campaigns</h1>

  </div>

  <div v-if="gotSubs" class="relative overflow-x-auto shadow-md rounded-lg">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-darkBlue dark:bg-darkBlue">
        <tr>
          <th scope="col" class="px-6 py-3">Campaign Name</th>
          <th scope="col" class="hidden md:table-cell px-6 py-3">Type</th>
          <th scope="col" class="hidden md:table-cell px-6 py-3">Status</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="gotSubs">
          <tr v-for="i in 3" :key="i">
            <td class="px-6 py-4"><USkeleton class="h-4 w-32" /></td>
            <td class="hidden md:table-cell px-6 py-4"><USkeleton class="h-4 w-32" /></td>
            <td class="hidden md:table-cell px-6 py-4"><USkeleton class="h-4 w-32" /></td>
            <td class="px-6 py-4"><USkeleton class="h-4 w-32" /></td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>



  <div v-if="!gotSubs && collaborationHubContent.length === 0 && campaignContentType == 'public'">
    No content submitted for approval yet
  </div>

  <div v-if="!gotSubs && collaborationHubContent.length > 0 && campaignContentType == 'public'" class="mt-16 relative overflow-x-auto shadow-md rounded-lg">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-darkBlue dark:bg-darkBlue">
        <tr>
          <th scope="col" class="px-6 py-3">Campaign Name</th>
          <th scope="col" class="hidden md:table-cell px-6 py-3">Type</th>
          <th scope="col" class="hidden md:table-cell px-6 py-3">Status</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="content in collaborationHubContent" :key="content.id" class="bg-white border-b dark:bg-[#090618] dark:border-gray-700">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ content.campaign.headline }}
          </th>
          <td class="hidden md:table-cell px-6 py-4">{{ content.type }}</td>
          <td class="hidden md:table-cell px-6 py-4">
            <div :class="{
              'bg-red-300 text-red-500 border-red-500': content.campaignDecision === 'reject',
              'bg-green-300 text-green-500 border-green-500': content.campaignDecision === 'accept',
              'bg-yellow-300 text-yellow-500 border-yellow-500': content.campaignDecision === 'pending'
            }" class="max-w-fit rounded-full border-2 px-2">
              {{ content.campaignDecision }}
            </div>
          </td>
          <td class="px-6 py-4">
            <span title="click here" @click="$router.push(`/creator/dashboard/content/${content.id}`)"
              class="cursor-pointer text-blue-500 hover:underline">View More</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

</template>

