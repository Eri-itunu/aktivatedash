<script setup lang="ts">
//imports
definePageMeta({
  layout: "light",

});
import axios from "axios";
import type {
  ICampaign,
  ICampaignRequest,
  APIResponse,
  IUserProfile,
} from "types";
import {
  getCampaign,
  getSingleCampaignRequest,

} from "@/api/brand/campaign/campaign.brand";

import { useToast } from "../../../../../components/ui/toast";



//variable decalrations

const route = useRoute();
const router = useRouter();
const campaign = ref<ICampaign>();
const requests = ref<ICampaignRequest[]>([]);

const { toast } = useToast();
const userStore = useUserStore();
const API_URL = useRuntimeConfig().public.API_URL;
const loading = ref(true);
const headline=ref("")
const description = ref("")
const requirements = ref("")
const contentType = ref([])
const headlineLength = computed(() => headline.value.length);
const descriptionLength = computed(() => description.value.length); 
const requirementsLength = computed(() => requirements.value.length); 
const isEmptyMedia = computed(() => contentType.value.length === 0);
const dropdownMedia = ref(false);
const { campaignId } = route.params;


function dropMedia() {
  dropdownMedia.value = !dropdownMedia.value;
}

const loadCampaign = async () => {
  const { campaignId } = route.params;
  const accessToken = userStore.accessToken || "";
  try {
    const res = await getCampaign({
      apiUrl: API_URL,
      campaignId,
      accessToken,
    });

    campaign.value = res;
    headline.value = campaign.value.headline
    description.value = campaign.value.description
    requirements.value = campaign?.value.deliverables?.requirements
    contentType.value = campaign.value.deliverables.contentType
    

 
  } catch (error: any) {
    router.back();
    toast({ title: "error getting campaign" });
  }
};

const editCampaign = async () => {
  const accessToken = userStore.accessToken || "";
  if (!accessToken) {
    toast({ title: "User not authenticated" });
    return;
  }

  const body = {
    headline: headline.value,
    description: description.value,
    requirements: requirements.value,
    contentType: contentType.value,
  };

  // Input Validation
  if (!headline.value || headline.value.length > 30) {
    toast({ title: "Headline is required and must not exceed 30 characters." });
    return;
  }

  if (!description.value || descriptionLength.value > 200) {
    toast({
      title: "Description is required and must not exceed 200 characters.",
    });
    return;
  }

  if (!requirements.value || requirementsLength.value > 200) {
    toast({
      title: "Requirements are required and must not exceed 200 characters.",
    });
    return;
  }

  if (contentType.value.length === 0) {
    toast({ title: "Please select at least one media type." });
    return;
  }

  // Loading state
  loading.value = true;

  try {
    const res = await axios.patch(
      `${API_URL}/campaign/brand/${campaignId}/edit`,
      body,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    // Handle success (optional)
    router.back()
    toast({ title: "Campaign updated successfully." });
  } catch (error: any) {
    toast({ title: error?.response?.data?.message || "Something went wrong" });
  } finally {
    loading.value = false;
  }
};



onMounted(async () => await loadCampaign());
</script>

<template>
  <div>


    <form class="flex flex-col gap-5" action="">
        <div class="bg-white dark:bg-[#090618] rounded-lg flex flex-col gap-4 p-8">
            <div>
                <p class="text-black dark:text-[#E1DCF7] mb-1">Campaign Headline</p>
                <textarea
                    v-model="headline"
                    class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                    placeholder="E.g: Launching a new product in Lagos..."
                    cols="30"
                ></textarea>
                <div class="flex justify-end">
                    <p class="text-black dark:text-white" >{{ headlineLength }}/30</p>
                </div>
            </div>

            <div>
                <p class="text-black dark:text-[#E1DCF7]">Campaign Description</p>
                <textarea
                    v-model="description"
                    class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                ></textarea>
                <div class="flex justify-end">
                    <p class="text-black dark:text-white">{{ descriptionLength }}/200</p>
                </div>
            </div>

            <div>
                <p class="text-black dark:text-[#E1DCF7]">Campaign Requirements</p>
                <textarea
                    v-model="requirements"
                    class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                ></textarea>
                <div class="flex justify-end">
                    <p class="text-black dark:text-white">{{ requirementsLength }}/200</p>
                </div>
            </div>

            <div>
                <div class="relative basis-1/2 inline-block bg-transparent text-left">
                    <button
                    @click="dropMedia"
                    type="button"
                    class="inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                    >
                    <div class="flex gap-2 flex-wrap">
                        <p v-if="isEmptyMedia">Select Content Type</p>
                        <div
                        v-else
                        v-for="content in contentType"
                        class="flex flex-row"
                        :key="content"
                        >
                        <div
                            class="rounded-[100px] px-2 py-[1.5px] text-white bg-[#231E37] flex"
                        >
                            {{ content }}
                        </div>
                        </div>
                    </div>

                    <svg
                        class="w-5 h-5 ml-2 -mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                        fill-rule="evenodd"
                        d="M10 12l-6-6h12l-6 6z"
                        clip-rule="evenodd"
                        />
                    </svg>
                    </button>

                    <div
                    v-if="dropdownMedia"
                    class="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg ring-1 bg-white dark:bg-[#100C21] p-2 ring-black ring-opacity-5 focus:outline-none"
                    >
                    <div class="flex gap-2">
                        <input
                        type="checkbox"
                        id="Photos"
                        value="photos"
                        v-model="contentType"
                        />
                        <label for="Photos">Photos</label>
                    </div>
                    <div class="flex gap-2">
                        <input
                        type="checkbox"
                        id="Videos"
                        value="videos"
                        v-model="contentType"
                        />
                        <label for="Videos">Videos</label>
                    </div>
                    </div>
                </div>
            </div>


        </div>

        <button @click.prevent="editCampaign"   class="w-full bg-[#5331E8] rounded p-3" >
            Submit changes
        </button>
    
    </form>
  </div>
</template>
