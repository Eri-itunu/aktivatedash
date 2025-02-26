<script setup lang="ts">
import type { Media, ICampaignRequest, APIResponse, ContentSubmissions,ResponseMessage,Submission } from "types";
import {
  getSingleCampaignRequest,
  getContentList
} from "../../../../api/creator/campaign/campaign.creator";
import { useToast } from "../../../../components/ui/toast/use-toast";
definePageMeta({
  layout: "dashboard",
  colorMode: "dark",
});
const showToast = ref(false);
const { toast } = useToast();
const userStore = useUserStore();
const accessToken = userStore.accessToken || "";
const API_URL = useRuntimeConfig().public.API_URL;
const route = useRoute();
const router = useRouter();
const { comments } = route.params;
const contents = ref<ContentSubmissions>();
const type = ref<string>("");
const note = ref<string>("");
const url = ref<string>("");
const isOpen = ref(false);
const dropdownType = ref(false);
const showSpinner = ref(false);
const requests = ref<Submission[]>([]);
const loading = ref(false)
const campaignId = ref('')
const selectPosts = ref<Media[]>([]);
function dropType() {
  dropdownType.value = !dropdownType.value;
}
function addType(select: string) {
  type.value = select;
  dropdownType.value = !dropdownType.value;
}

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
    //@ts-expect-error
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// const singleCampaignReqs = async () => {

//   const campaignId = comments
//   try {
//     showSpinner.value = true
//     const platform = await getSingleCampaignRequest({
//       apiUrl: API_URL,
//       campaignId,
//       accessToken,
//     });
//     requests.value = platform;
//     loading.value = false;
//     showSpinner.value = false
//   } catch (error: any) {
//     loading.value = true;
//     showSpinner.value = false
//     toast({ title: error.data?.message || "Something went wrong" });
//   }
// };

const singleSubmissionRequest = async () => {
  
  const apiUrl = API_URL;
  try {
    const res = await $fetch<APIResponse<"submission", ContentSubmissions>>(
      `${apiUrl}/submission/get-one/${comments}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    // const extra = await $fetch<APIResponse<"submission", ContentSubmissions>>(
    //   `${apiUrl}/submission/get-one/${comments}?campaign_type=collaboration-hub`,
    //   {
    //     headers: { Authorization: `Bearer ${accessToken}` },
    //   }
    // );
    
    contents.value = res.data.submission;
    campaignId.value = contents.value.campaignId
    const platform = await getSingleCampaignRequest({
      apiUrl: API_URL,
      campaignId: campaignId.value,
      accessToken,
    });
    requests.value = platform;


    
  } catch (error: any) {
    throw new Error(error.data?.message || "Something went wrong");
  }
};
const updateContent = async () => {
  const apiUrl = API_URL;
  const body = {
    type: type.value,
    url: url.value,
    note: note.value,
    submissionId: comments,
  };

  try {
    const res = await $fetch<APIResponse<"submissions", ContentSubmissions>>(
      `${apiUrl}/submission/creator/update-submission
        `,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body,
      }
    );

    url.value = "";
    note.value = "";
    type.value = "";
    isOpen.value = false;
    toast({ title: res.message || "Succesfully updated post" });
  } catch (error: any) {
    isOpen.value = false;
    //   throw new Error(error.data?.message || "Something went wrong")
    toast({ title: error.data.message || "Something went wrong" });
  }
};

const getUserPosts = async ( campaignID) => {
  showSpinner.value = true
  const accessToken = userStore.accessToken || "";
 // @ts-expect-error
  const platformId = props.request.platformProfileId || props.request.rateCard?.platformProfile.id

  try {
    const posts = await getContentList({
      apiUrl: API_URL,
      accessToken,
      platformProfileId: platformId,
      campaignID
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
    const res = await $fetch<ResponseMessage>(`${API_URL}/campaign/${comments}/link-post`, {
      method: "post",
      body: { contentId, platformProfileId: platformProfileId,postType: "video" },
      headers: { Authorization: `Bearer ${userStore.accessToken}` },
    });
    isOpen.value = false;
    toast({ title: "Post link successful" });
  } catch (error: any) {
    toast({ title: error.message || "Something went wrong" });
  }
};
watchEffect(async () => {
  await singleSubmissionRequest();
  // await singleCampaignReqs()
});
</script>

<template>
  <div
    v-if="showSpinner"
    class="w-[100%] h-[100%] fixed top-0 right-0 left-0 bottom-0 z-50 bg-[#000000]/ flex justify-center items-center"
  >
    <LoadSpinner />
  </div>
  <div class="flex flex-col-reverse md:flex-row" >
    <button @click="router.back()" class="flex gap-2">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z"
          fill="currentColor"
        />
      </svg>
      Go back
    </button>
    <div class=" mt-20 flex gap-2 justify-center px-12">
      <div class="flex flex-col gap-10 basis-3/4 items-start text-left">
        <h1 class="text-3xl font-bold">{{ contents?.campaign.headline }}</h1>

        <div class="flex gap-5">
          <div class="flex flex-col items-center gap-2">
            <h1 class="text-purplelabel">STATUS</h1>

            <div
              v-if="contents?.campaignDecision === 'reject'"
              class="max-w-fit rounded-[100px] border-2 bg-red-300 text-red-500 px-2 border-red-500"
            >
              rejected
            </div>

            <div
              v-if="contents?.campaignDecision === 'accept'"
              class="max-w-fit rounded-[100px] border-2 bg-green-300 text-green-500 px-2 border-green-500"
            >
              accepted
            </div>

            <div
              v-if="contents?.campaignDecision === 'pending'"
              class="max-w-fit rounded-[100px] border-2 bg-yellow-300 text-yellow-500 px-2 border-yellow-500"
            >
              pending
            </div>
          </div>

          <div class="flex flex-col items-center gap-2">
            <h1 class="text-purplelabel">DUE DATE</h1>
            <p>{{ formatDate(contents?.campaign.submissionDueDate) }}</p>
          </div>

          <div
            v-if="contents?.campaignDecision === 'reject'"
            class="flex flex-col items-center gap-2 justify-center"
          >
            <h1 class="text-purplelabel">ACTION</h1>
            <button @click="isOpen = true" class="bg-purple1 rounded-[100px] px-2">
              Update
            </button>
          </div>
        </div>

        <div>
          <h1 class="text-purplelabel">Comments</h1>
          <div v-for="comment in contents?.campaignNote">
            <li>{{ comment.note }} ({{ formatDate(comment.timestamp) }})</li>
          </div>
        </div>

        <Popup
          title="Content Upload"
          v-if="isOpen"
          :togglePopup="() => (isOpen = false)"
          :image="false"
          :header="true"
        >
          <div class="w-[350px] flex flex-col gap-5">
            <div>
              <p class="mb-1">Content Link</p>
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
                    <path
                      fill-rule="evenodd"
                      d="M10 12l-6-6h12l-6 6z"
                      clip-rule="evenodd"
                    />
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
              <p class="mb-1">Note (Optional)</p>
              <textarea
                class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                cols="30"
                v-model="note"
              ></textarea>
            </div>
            <div>
              <button @click="updateContent" class="w-full bg-black text-white py-2">
                Save
              </button>
            </div>
          </div>
        </Popup>
      </div>
      <div class="basis-1/4">
        <div  v-for="request in requests" :key="request.id">
       
          <CreatorLinkPostCard :request="request" :ID="campaignId" />
        </div>
      </div>

    </div>
  </div>

</template>
