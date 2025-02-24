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
const campaignList = ref<ContentSubmissions[]>([]);
const loading = ref(false);
const empty = ref(false);
const dropdownType = ref(false);
const dropdownCampaign = ref(false);
const dropCollab = ref(false);
const profileImgUrl = computed<string>(() => userStore.userProfile?.imgUrl || "");
const imgUrl = ref<string | undefined>(userStore.userProfile?.imgUrl);
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

// Computed counts
const pendingCount = computed(() =>
  contents.value.filter((content) => content.campaignDecision === "pending").length
);
const approvedCount = computed(() =>
  contents.value.filter((content) => content.campaignDecision === "accept").length
);
const rejectedCount = computed(() =>
  contents.value.filter((content) => content.campaignDecision === "reject").length
);
const acceptedCount = computed(() => campaignList.value.length);

// For the status buttons (using computed values)
const selectedStatus = ref("accepted");
const statuses = ref([
  { id: 1, status: "accepted", value: acceptedCount },
  { id: 2, status: "pending", value: pendingCount },
  { id: 3, status: "rejected", value: rejectedCount },
  { id: 4, status: "approved", value: approvedCount }
]);

const CollabHubCampaign = ref<Collaboration[]>([]);

// Helper functions for dropdowns
function addType(select: string) {
  type.value = select;
  dropdownType.value = !dropdownType.value;
}
function dropType() {
  dropdownType.value = !dropdownType.value;
}
function dropCampaignType() {
  dropdownCampaign.value = !dropdownCampaign.value;
}
function dropCampaign() {
  dropdownCampaign.value = !dropdownCampaign.value;
}
function addCampaign(id: string, name: string) {
  campaignId.value = id;
  campaignName.value = name;
  dropdownCampaign.value = !dropdownCampaign.value;
}
function selectCampaignType(name: string) {
  campaignType.value = name;
}
function dropCollabCampaign() {
  dropCollab.value = !dropCollab.value;
}

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
      apiUrl: API_URL,
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
    // Fetch first list
    const res = await getContentSubmissionList({
        apiUrl,
        accessToken
    });

    // Fetch collaboration hub submissions
    const cres = await $fetch<PaginatedAPIResponse<"submissions", ContentSubmissions>>(
        `${apiUrl}/submission/creator/my-submissions?campaign_type=collaboration-hub`,
        {
            headers: { Authorization: `Bearer ${accessToken}` }
        }
    );

    contents.value = [...(cres.data?.submissions?.data || []), ...res.data?.submissions.data];

} catch (error: any) {
    throw new Error(error.data?.message || "Something went wrong");
} finally {
    gotSubs.value = false;
}

};

// Get accepted campaigns
const getAcceptedCampaigns = async () => {
  loading.value = true;
  try {
    const res = await acceptedCampaigns({
      apiUrl,
      accessToken,
      notSubmitted: 1
    });
    campaignList.value = res;
  } catch (error: any) {
    throw new Error(error.data?.message || "Something went wrong");
  } finally {
    loading.value = false;
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
      `${apiUrl}/submission/submit-content`, // Ensure the URL is inside backticks
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` }, // Wrap Bearer token correctly
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
  } catch (error: any) {
    isOpen.value = false;
    toast({ title: error.data?.message || "Something went wrong" });
  }
};

// Submit content (for mobile) with campaign ID parameter
const submitContentMobile = async (ID: string) => {
  const body = {
    type: type.value,
    campaignId: ID,
    url: url.value,
    note: note.value
  };

  try {
    await $fetch<APIResponse<"submissions", ContentSubmissions>>(
      `${apiUrl}/submission/submit-content`,
      {
        method: "POST",
        headers: { Authorization:` Bearer ${accessToken}` },
        body
      }
    );
    // Reset fields
    url.value = "";
    note.value = "";
    campaignId.value = "";
    campaignName.value = "";
    type.value = "";
    toast({ title: "Content submitted for approval" });
  } catch (error: any) {
    isOpen.value = false;
    toast({ title: error.data?.message || "Something went wrong" });
  }
};

// Reactive API calls
watchEffect(async () => {
  await getList();
});
watchEffect(async () => {
  await getAcceptedCampaigns();
});
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
            New Content
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
                    <SelectItem value="Collaboration">
                      Collaboration hub
                    </SelectItem>
                    <SelectItem value="Private">
                      Private campaign
                    </SelectItem>
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
    <div v-if="gotSubs" class="mt-16 relative overflow-x-auto shadow-md rounded-lg">
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

    <div v-if="!gotSubs && contents.length === 0">
      No content submitted for approval yet
    </div>

    <div v-if="!gotSubs && contents.length > 0" class="mt-16 relative overflow-x-auto shadow-md rounded-lg">
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
          <tr
            v-for="content in contents"
            :key="content.id"
            class="bg-white border-b dark:bg-[#090618] dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ content.campaign.headline }}
            </th>
            <td class="hidden md:table-cell px-6 py-4">
              {{ content.type }}
            </td>
            <td class="hidden md:table-cell px-6 py-4">
              <div v-if="content.campaignDecision === 'reject'" class="max-w-fit rounded-full border-2 bg-red-300 text-red-500 px-2 border-red-500">
                rejected
              </div>
              <div v-if="content.campaignDecision === 'accept'" class="max-w-fit rounded-full border-2 bg-green-300 text-green-500 px-2 border-green-500">
                accepted
              </div>
              <div v-if="content.campaignDecision === 'pending'" class="max-w-fit rounded-full border-2 bg-yellow-300 text-yellow-500 px-2 border-yellow-500">
                pending
              </div>
            </td>
            <td class="px-6 py-4">
              <span
                title="click here"
                @click="$router.push(`/creator/dashboard/content/${content.id}`)"
                class="cursor-pointer text-blue-500 hover:underline"
              >View More</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- <div class="flex justify-center mt-2" >
      <Pagination v-slot="{ page }" :total="pageMeta?.total" :itemsPerPage="pageMeta?.perPage"  :sibling-count="1" show-edges :default-page="pageMeta?.currentPage">
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationFirst @click="toPage(1)" />
          <PaginationPrev @click="openedPage--" />

          <template v-for="(item, index) in items">
            <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
              <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'" @click="toPage(item.value)">
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <PaginationNext @click="openedPage++" />
          <PaginationLast @click="toPage(pageMeta?.lastPage ?? 0  )"/>
        </PaginationList>
      </Pagination>
    </div> -->
  </div>
</template>
