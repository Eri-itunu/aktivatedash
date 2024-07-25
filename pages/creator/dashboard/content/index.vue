<script setup lang="ts">
import type { ContentSubmissions, PaginatedAPIResponse, APIResponse } from "types";
import { useToast } from "../../../../components/ui/toast/use-toast";
import type { content } from "#tailwind-config";
definePageMeta({
  layout: "dashboard",
  colorMode: "dark",
});
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
function dropType() {
  dropdownType.value = !dropdownType.value;
}
function dropCampaign() {
  dropdownCampaign.value = !dropdownCampaign.value;
}

const type = ref<string>("");
const campaignId = ref<string>("");
const campaignName = ref<string>("");
const note = ref<string>("");
const url = ref<string>("");

function addType(select: string) {
  type.value = select;
  dropdownType.value = !dropdownType.value;
}

function addCampaign(id: string, name: string) {
  campaignId.value = id;
  campaignName.value = name;
  dropdownCampaign.value = !dropdownCampaign.value;
}

const getList = async () => {
  loading.value = true;
  const apiUrl = API_URL;
  try {
    const res = await $fetch<PaginatedAPIResponse<"submissions", ContentSubmissions>>(
      `${apiUrl}/submission/creator/my-submissions`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    contents.value = res.data.submissions.data;
    loading.value = false;
  } catch (error: any) {
    throw new Error(error.data?.message || "Something went wrong");
  }
};

const pendingCount = computed(() => {
      return contents.value.filter(content => content.campaign_decision === 'pending').length;
    });
const acceptedCount = computed(() => {
  return contents.value.filter(content => content.campaign_decision === 'accept').length;
});
const rejectedCount = computed(() => {
  return contents.value.filter(content => content.campaign_decision === 'reject').length;
});

const getAcceptedCampaigns = async () => {
  loading.value = true;
  const apiUrl = API_URL;
  try {
    const res = await $fetch<PaginatedAPIResponse<"campaigns", ContentSubmissions>>(
      `${apiUrl}/campaign/creator/get-accepted-campaigns`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    campaignList.value = res.data.campaigns.data;
    loading.value = false;
  } catch (error: any) {
    loading.value = false
    throw new Error(error.data?.message || "Something went wrong");
  }
};

const submitContent = async () => {
  const apiUrl = API_URL;
  const body = {
    type: type.value,
    campaignId: campaignId.value,
    url: url.value,
    note: note.value,
  };

  try {
    const res = await $fetch<APIResponse<"submissions", ContentSubmissions>>(
      `${apiUrl}/submission/submit-content
      `,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body,
      }
    );

    url.value = "";
    note.value = "";
    campaignId.value = "";
    campaignName.value = "";
    type.value = "";
    isOpen.value = false;
    toast({ title: "Content submitted for approval" });
  } catch (error: any) {
    isOpen.value = false;
    //   throw new Error(error.data?.message || "Something went wrong")
    toast({ title: error.data.message || "Something went wrong" });
  }
};

watchEffect(async () => {
  await getList();
});
watchEffect(async () => {
  await getAcceptedCampaigns();
});
</script>

<template>
  <div class=" hidden px-2 md:px-8 md:flex flex-col gap-4 mt-5">
    <div class="flex justify-start">
      <button @click="isOpen = true" class="rounded-xl px-4 py-1 text-black bg-[#CDC2FF]">
        New Content
      </button>
    </div>
    <Popup
      title="Content Upload"
      v-if="isOpen"
      :togglePopup="() => (isOpen = false)"
      :image="false"
      :header="true"
    >
      <div class="max-w-[350px] flex flex-col gap-5">
        <div>
          <p class="mb-1">Link</p>
          <input
            type="text"
            class="border-[0.1px] p-2 rounded-md w-full bg-transparent"
            v-model="url"
          />
        </div>

        <div>
          <p class="mb-1">Type</p>
          <div class="relative w-full inline-block bg-transparent text-left">
            <button
              @click="dropType"
              type="button"
              class="inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              <div class="flex gap-1 flex-wrap">
                <p v-if="type === ''">Select Type</p>
                <div v-else class="flex flex-row">
                  <div
                    class="rounded-[100px] px-2 py-[1.5px] text-white bg-[#231E37] flex w-full"
                  >
                    {{ type }}
                  </div>
                </div>
              </div>

              <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 12l-6-6h12l-6 6z" clip-rule="evenodd" />
              </svg>
            </button>

            <div
              v-if="dropdownType"
              class="origin-top-right absolute z-10 right-0 mt-2 w-full rounded-md shadow-lg ring-1 bg-[#100C21] ring-black ring-opacity-5 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
            >
              <div
                @click="addType('photo')"
                class="flex px-2 cursor-pointer hover:bg-black/30"
              >
                photo
              </div>
              <div
                @click="addType('video')"
                class="flex px-2 cursor-pointer hover:bg-black/30"
              >
                video
              </div>
            </div>
          </div>
        </div>

        <div>
          <p class="mb-1">Campaign</p>
          <div class="relative w-full inline-block bg-transparent text-left">
            <button
              @click="dropCampaign"
              type="button"
              class="inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              <div class="flex gap-1 flex-wrap">
                <p v-if="campaignName === ''">Select Campaign</p>
                <div v-else class="flex flex-row">
                  <div
                    class="rounded-[100px] px-2 py-[1.5px] text-white bg-[#231E37] flex w-full"
                  >
                    {{ campaignName }}
                  </div>
                </div>
              </div>

              <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 12l-6-6h12l-6 6z" clip-rule="evenodd" />
              </svg>
            </button>

            <div
              v-if="dropdownCampaign"
              class="origin-top-right absolute z-[10] right-0 mt-2 w-full rounded-md shadow-lg ring-1 bg-[#100C21] ring-black ring-opacity-5 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
            >
              <div v-for="content in campaignList" :key="content.id" class="flex gap-2">
                <div
                  @click="addCampaign(content.id, content.headline)"
                  class="cursor-pointer hover:bg-black/30 w-full"
                >
                  {{ content.headline }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p class="mb-1">Comment</p>
          <textarea
            class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
            cols="30"
            v-model="note"
          ></textarea>
        </div>
        <div>
          <button @click="submitContent" class="w-full bg-black text-white py-2">
            Save
          </button>
        </div>
      </div>
    </Popup>
    <div v-if="contents.length === 0 && loading === false">
        No content submitted for approval yet
    </div>
    <div v-else class="mt-16 relative overflow-x-auto shadow-md rounded-lg">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 rounded-lg dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-darkBlue dark:bg-darkBlue dark:text-purplebg"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Campaign Name</th>
            <th scope="col" class="max-lg:hidden px-6 py-3">Type</th>

            <th scope="col" class="max-lg:hidden px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td class="px-6 py-4">
              <USkeleton class="h-4 w-[120px]" />
            </td>
            <td class="max-lg:hidden px-6 py-4">
              <USkeleton class="h-4 w-[120px]" />
            </td>

            <td class="max-lg:hidden px-6 py-4">
              <USkeleton class="h-4 w-[120px]" />
            </td>
            <td class="px-6 py-4">
              <USkeleton class="h-4 w-[120px]" />
            </td>
          </tr>
          <tr
            v-for="content in contents"
            class="bg-white border-b dark:bg-[#090618] dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ content.campaign.headline }}
            </th>
            <td class="max-lg:hidden px-6 py-4">
              {{ content.type }}
            </td>

            <td class="max-lg:hidden px-6 py-4">
              <div
                v-if="content?.campaign_decision === 'reject'"
                class="max-w-fit rounded-[100px] border-2 bg-red-300 text-red-500 px-2 border-red-500"
              >
                rejected
              </div>

              <div
                v-if="content?.campaign_decision === 'accept'"
                class="max-w-fit rounded-[100px] border-2 bg-green-300 text-green-500 px-2 border-green-500"
              >
                accepted
              </div>

              <div
                v-if="content?.campaign_decision === 'pending'"
                class="max-w-fit rounded-[100px] border-2 bg-yellow-300 text-yellow-500 px-2 border-yellow-500"
              >
                pending
              </div>
            </td>
            <td class="px-6 py-4">
              <div>
                <span
                  title="click here"
                  @click="$router.push(`/creator/dashboard/content/${content.id}`)"
                  class="cursor-pointer"
                  >View More</span
                >

                <!-- <div class=" bg-white z-[50] w-full text-black p-2 items-center rounded-md   "> 
                                <div>
                                    Edit and resubmit 
                                </div>
                                <div>
                                    View Comments
                                </div>
                            </div> -->
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

   <div class='md:hidden text-black' >

    {{pendingCount}}
    {{acceptedCount}}
    {{rejectedCount}}
    <Sheet  >
    <SheetTrigger>Open</SheetTrigger>
    <SheetContent side="bottom" class="rounded-lg">
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
  </div>

  
</template>
