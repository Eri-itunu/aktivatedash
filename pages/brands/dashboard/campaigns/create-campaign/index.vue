<script setup lang="ts">
import type { APIResponse } from "types";
import axios from "axios";
import { useToast } from "../../../../../components/ui/toast/use-toast";
definePageMeta({
  layout: "light",
});
const { toast } = useToast();
const config = useRuntimeConfig();
const API_URL = config.public.API_URL;
const userStore = useUserStore();
const loading = ref(false);
const createBrandCampaignStore = useCreateBrandCampaignStore();
const {
  headline,
  description,
  requirements,
  platformType,
  contentType,
  fileUrl,
  file,
} = storeToRefs(createBrandCampaignStore);
const accessToken = userStore.accessToken || "";
const isEmptyArray = computed(() => platformType.value.length === 0);
const isEmptyMedia = computed(() => contentType.value.length === 0);
const descriptionLength = computed(() => description.value.length);

// const requirementsLength = computed(() => {const fieldValue = requirements.value;
//  let wordCount;
//  fieldValue
//  ? (wordCount = fieldValue.match(/\S+/g)?.length)
//  : (wordCount = 0);
//  return wordCount})

const requirementsLength = computed(() => requirements.value.length);

const headlineLength = computed(() => headline.value.length);

const dropdownSocials = ref(false);
const dropdownMedia = ref(false);
const fileInput = ref();
const formData = new FormData();

const onChangeFile = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    file.value = files[0];
  }
};

const removeFile = (event: Event) => {
  event.preventDefault();
  file.value = null;
  fileInput.value = "";
  fileUrl.value = "";
};

const uploadFile = async () => {
  loading.value = true;
  try {
    const res = await axios.post<APIResponse<"url", string>>(
      `${API_URL}/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": `multipart/form-data`,
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
          }
        },
      }
    );

    fileUrl.value = res.data.data.url;
    loading.value = false;
  } catch (error: any) {
    toast({ title: "Error uploading file" });
    loading.value = false;
    throw new Error("Error uploading file");
  }
};

const selectInfluencers = async () => {
  // if(loading.value = true){
  //   return
  // }
  try {
    if (headline.value === "") {
      toast({ title: "Headline field empty " });
      return;
    }

    if (descriptionLength.value > 200) {
      toast({ title: "Description field exceeds limit of 200" });
      return;
    }

    if (requirementsLength.value > 200) {
      toast({ title: "Requirements field exceeds limit of 200" });
      return;
    }

    if (headlineLength.value > 30) {
      toast({ title: "Headline field exceeds limit of 30" });
      return;
    }

    if (requirements.value === "") {
      toast({ title: "Requirements field empty " });
      return;
    }

    if (description.value === "") {
      toast({ title: "Description field empty " });
      return;
    }

    if (platformType.value.length === 0) {
      toast({ title: "Platform type needs to be selected " });
      return;
    }

    if (contentType.value.length === 0) {
      toast({ title: "Media type needs to be selected " });
      return;
    }

    if (file.value) {
      formData.append("file", file.value);
      formData.append("type", "file");
      await uploadFile();
    }

    navigateTo(
      "/brands/dashboard/campaigns/create-campaign/campaign-influencer"
    );
  } catch (error: any) {
    toast({ title: `${error.message}` });
  }
};

function dropSocial() {
  dropdownSocials.value = !dropdownSocials.value;
}
function dropMedia() {
  dropdownMedia.value = !dropdownMedia.value;
}
</script>

<template>
  <div class="px-2 md:px-12 flex text-black dark:text-white flex-col py-4 gap-4">
    <brandsCampaignStage />

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

        <div class="flex gap-2">
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

          <div class="relative basis-1/2 inline-block bg-transparent text-left">
            <button
              @click="dropSocial"
              type="button"
              class="inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              <div class="flex gap-2 flex-wrap">
                <p v-if="isEmptyArray">Select Platform</p>
                <div
                  v-else
                  v-for="platform in platformType"
                  class="flex flex-row"
                  :key="platform"
                >
                  <div
                    class="rounded-[100px] px-2 py-[1.5px] text-white bg-[#231E37] flex"
                  >
                    {{ platform }}
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
              v-if="dropdownSocials"
              class="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg ring-1 bg-white dark:bg-[#100C21] p-2 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="flex gap-2">
                <input
                  type="checkbox"
                  id="facebook"
                  value="facebook"
                  v-model="platformType"
                />
                <label for="facebook">Facebook</label>
              </div>
              <div class="flex gap-2">
                <input
                  type="checkbox"
                  id="Instagram"
                  value="instagram"
                  v-model="platformType"
                />
                <label for="Instagram">Instagram</label>
              </div>
              <div class="flex gap-2">
                <input
                  type="checkbox"
                  id="Tiktok"
                  value="tiktok"
                  v-model="platformType"
                />
                <label for="Tiktok">Tiktok</label>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p class="text-black dark:text-[#E1DCF7]">Upload Campaign Brief (Optional)</p>

          <label for="upload">
            <div
              v-if="!file"
              class="w-full border-[1px] flex flex-col gap-2 border-[#464160] cursor-pointer border-dashed justify-center items-center p-24 rounded-lg text-black dark:text-white "
            >
              Upload File
            </div>
            <input
              @dragenter="onChangeFile"
              @change="onChangeFile"
              type="file"
              id="upload"
              style="display: none"
              accept=".doc, .docx, .pdf"
            />
          </label>

          <input
            class="file-input w-full border-[1px] z-[-1] flex flex-col gap-2 border-[#464160] border-dashed justify-center items-center p-24 rounded-lg file:hidden file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purplelabel file: text-grey1 hover:file:bg-violet-100"
            type="file"
            @change="onChangeFile"
            style="display: none"
            accept=".doc, .docx, .pdf"
            :ref="fileInput"
            v-if="!file"
          />
          <div
            class="w-full border-[1px] flex flex-col gap-2 border-[#464160] border-dashed justify-center items-center p-24 rounded-lg"
            type="file"
            @change="onChangeFile"
            accept=".doc, .docx, .pdf"
            v-else
          >
            <p>{{ file?.name }}</p>
            <button @click="removeFile" class="text-black dark:text-white">Remove File</button>
          </div>
        </div>
      </div>

      <!-- <nuxt-link :to="{path: '/brands/dashboard/campaigns/create-campaign/campaign-influencer', append: true }"> -->
      <button
        @click.prevent="selectInfluencers"
        class="w-full bg-[#5331E8] rounded p-3"
      >
        Next
      </button>
      <!-- </nuxt-link> -->
    </form>
  </div>
</template>

<style scoped></style>
