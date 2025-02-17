<script setup lang="ts">
//imports
import type { ContentSubmissions, Collaboration, APIResponse } from "types";
import { useToast } from "../../../../components/ui/toast/use-toast";
import { ChevronRight, Folder, ChevronDown } from 'lucide-vue-next';
import { getContentSubmissionList, acceptedContent } from "@/api/creator/content.creator";
import { acceptedCampaigns } from "@/api/creator/content/content.creator";
import { getMyCollaborationHubCampaigns } from "@/api/creator/campaign/campaign.creator";

definePageMeta({
  layout: "dashboard",
  colorMode: "dark",
});

//variable decalrations
const device = useDevice()
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
const collabHubName = ref("")
const note = ref<string>("");
const url = ref<string>("");
const apiUrl = API_URL;
const campaignType = ref("")
const pendingCount = computed(() => {
  return contents.value.filter(content => content.campaignDecision === 'pending').length;
});
const approvedCount = computed(() => {
  return contents.value.filter(content => content.campaignDecision === 'accept').length;
});
const rejectedCount = computed(() => {
  return contents.value.filter(content => content.campaignDecision === 'reject').length;
});
const acceptedCount = computed(() =>{
  return campaignList.value.length

})
const isValidURL = (url: string): boolean => {
        const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;
        return urlRegex.test(url);
    };
const selectedStatus = ref('accepted');
const statuses = ref([
  { id: 1, status: 'accepted', value:acceptedCount },
  { id: 2, status: 'pending', value:pendingCount},
  { id: 3, status: 'rejected', value:rejectedCount },
  { id: 4, status: 'approved', value:approvedCount }
    
]);

const CollabHubCampaign = ref<Collaboration[]>([])

//helper functions
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

function selectCampaignType(name:string) {
  campaignType.value = name;
}

function dropCollabCampaign() {
  dropCollab.value = !dropCollab.value;
}


//api calls


const getApplications =async(privatePage: number)=>{
  loading.value = true
  const filter = {
    limit: "7",
    page: privatePage?.toString() || "",
  };
  const qs = new URLSearchParams(filter);
  try {
    loading.value = true;
    const accessToken = userStore.accessToken || "";

    const {
      data,
      meta: { lastPage },
    } = await getMyCollaborationHubCampaigns({
      apiUrl: API_URL,
      accessToken,
      qs: qs.toString(),
    });

    CollabHubCampaign.value = data;

    loading.value = false;
  
   

   
  } catch (error: any) {
    loading.value = false;
    toast({ title: error.data?.message || "Something went wrong" });
  }

}

const getList = async () => {
  loading.value = true;
  
  try {
    // const res = await $fetch<PaginatedAPIResponse<"submissions", ContentSubmissions>>(
    //   `${apiUrl}/submission/creator/my-submissions`,
    //   {
    //     headers: { Authorization: `Bearer ${accessToken}` },
    //   }
    // );

    const res = await getContentSubmissionList({
      apiUrl,
      accessToken
    })
    contents.value = res.data;
    loading.value = false;
  } catch (error: any) {
    throw new Error(error.data?.message || "Something went wrong");
  }
};


const getAcceptedCampaigns = async () => {
  loading.value = true;
  try {
    // const res = await $fetch<PaginatedAPIResponse<"campaigns", ContentSubmissions>>(
    //   `${apiUrl}/campaign/creator/get-accepted-campaigns`,
    //   {
    //     headers: { Authorization: `Bearer ${accessToken}` },
    //   }
    // );

    const res = await acceptedCampaigns({
      apiUrl,
      accessToken,
      notSubmitted: 1
    })
    campaignList.value = res
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

  if(!isValidURL(url.value)){
    toast({ title: "Enter a valid url" });
  }

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

const submitContentMobile = async (ID) => {
  const apiUrl = API_URL;
  const body = {
    type: type.value,
    campaignId: ID,
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

watchEffect(async ()=>{
  await getApplications(1);
})
</script>

<template>
   <!-- loading spinner -->
   <div v-if="loading"  class=" md:hidden w-[100%] h-[100%] fixed top-0 right-0 left-0 bottom-0 z-50 bg-[#000000]/ flex justify-center items-center">
    <LoadSpinner />
  </div>

  <!--Mobile design-->
   <div v-else-if="device.isMobile" class=' text-black ' >

 
      <div class=" border-b border-b-[#EAEAEB] sticky top-0 overflow-x-scroll w-full text-nowrap flex gap-2 py-4 px-4">
        <button
          v-for="status in statuses"
          :key="status.id"
          :class="[
            'rounded-full border-[#DAD9DE] px-3 py-1 flex items-center ' ,
            status.status === selectedStatus ? ' border-none bg-purplelabel' : 'border'
          ]"
          @click="selectedStatus = status.status"
        >
          {{ status.status }}
          {{status.value}}
        </button>
      </div>


    <div v-if="selectedStatus==='accepted'" class=' py-4 flex  flex-col gap-2'>
      <Sheet v-if="acceptedCount > 0" >
        <div v-for="campaign in campaignList" class="w-full" >
          <SheetTrigger class="w-full" >
          <div  class="border-b w-full border-b-[#EAEAEB] flex items-center p-4 justify-between" >
            <div class="flex gap-2 items-center" >
              <div
              v-if="profileImgUrl === ''"
              class="border-[0.5px] rounded-full justify-center  flex items-center bg-purplelabel w-12 h-12"
            >
                <p class="text-sm text-black font-bold">
                  {{ userStore.userProfile?.firstName?.charAt(0) }}
                  {{ userStore.userProfile?.lastName?.charAt(0) }}

                </p>

              
              </div>
              <img
                v-else
                :src="imgUrl"
                class="border-[0.5px] border-purple1 rounded-full items-center p-0.5 w-12 h-12 object-fit"
                alt=""
              />
              {{campaign.headline}}
            </div>
            
            <ChevronRight />
          </div>
          </SheetTrigger>
          <SheetContent side="bottom" class="bg-white rounded-t-lg text-black" >
            <SheetHeader>
              <SheetTitle><h1 class="text-black">Submit content link</h1></SheetTitle>
              
            </SheetHeader>

              <div   class="w-full flex flex-col gap-2">
                <label for="Content Link">Content Link</label>
                <input type="text" v-model="url" class="rounded-[6px] bg-transparent border-[1px] p-3 w-full" placeholder="Enter content link" required>

                <p>Content type</p>
                
                <DropdownMenu class="w-full" >
                  <DropdownMenuTrigger as-child>
                    <Button variant="outline" class="bg-transparent">
                      Select Type
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent class="w-full bg-transparent text-black">
                    <DropdownMenuLabel>Type</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup v-model="type">
                      <DropdownMenuRadioItem value="photo">
                        Photo
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="video">
                        Video
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                <label for="Note">Note (optional)</label>
                <textarea name="Note" v-model="note" id="Note" class="rounded-[6px] border-[1px] p-3 w-full bg-transparent"  required></textarea>
                <SheetClose class="w-full">
                  <button @click="submitContentMobile(campaign?.id)" class="rounded-lg bg-purple1 text-white w-full py-2">
                    Submit Content
                  </button>
                </SheetClose>
              </div>

          </SheetContent>
        </div>
        
      </Sheet>
      <div v-else class="flex flex-col items-center pt-24 text-center justify-center">
        <Folder />
        <p>Campaigns you've accepted will appear here</p>
      </div>
    </div>

    <div v-if="selectedStatus === 'pending'" class="py-4" >
      <div v-if="pendingCount >0" v-for="content in contents">
        <div class="border-b border-b-[#EAEAEB] flex justify-between items-center p-4"  v-if="content.campaignDecision === 'pending'">
          <div >
            <p>Camapign Headline:</p>
            <p>{{content.campaign.headline}}</p>
          </div>
          <p class="rounded-lg bg-orange-400 p-2 text-white" >Waiting on approval</p>
        </div>
      </div>
      <div v-else class="flex flex-col  items-center px-4 pt-24 text-center justify-center">
        <Folder />
        <p>Campaigns waiting for brand review will appear here</p>
      </div>
    </div>

    <div v-if="selectedStatus === 'approved'" class="py-4 " >
      <div v-if="approvedCount>0" v-for="content in contents">
        <div class="border-b border-b-[#EAEAEB] flex justify-between items-center p-4"  v-if="content.campaignDecision === 'accept'">
          <p class="break-words" > {{ content.campaign.headline }} </p>
         <CreatorLinkPostMobileCard :ID = content.campaignId   />
        </div>
      </div>
      <div v-else class="flex flex-col text-center px-4 mt-24 items-center justify-center">
        <Folder />
        <p>Campaigns that have been approved by a brand  will appear here</p>
      </div>
    </div>

    <div v-if="selectedStatus === 'rejected'" class="py-4" >
      <div v-if="rejectedCount" v-for="content in contents">
        <div @click="$router.push(`content/${content.id}`)" class="border-b border-b-[#EAEAEB] flex items-center justify-between p-4 "  v-if="content.campaignDecision === 'reject'">
         Submission rejected
         <ChevronRight/>
        </div>
      </div>
      <div v-else class="flex flex-col  items-center mt-24 px-4 text-center justify-center">
        <Folder />
        <p>Campaigns submissions declined by a brand  will appear here</p>
      </div>
    </div>

  </div>


  <!--Desktop version-->
  <div v-else class=" px-2 md:px-8 flex flex-col gap-4 mt-5">
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
                class="border-[0.1px] p-2 rounded-md w-full bg-transparent"
                v-model="url"
              />
            </div>

            <div>
              <p class="mb-1">Campaign Type</p>
              <Select v-model="campaignType" >
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
              <Select v-model="type" >
                  <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select a Post type" />
                  </SelectTrigger>
                  <SelectContent>
                  <SelectGroup>
                      <SelectLabel>Post type</SelectLabel>
                      <SelectItem value="photo">
                          Photo
                        </SelectItem>
                        <SelectItem value="video">
                          Video
                        </SelectItem>
                  </SelectGroup>
                  </SelectContent>
              </Select>
              
            </div>

      
            
            <div v-if="campaignType === 'Collaboration' " >
              <p class="mb-1">Collaboration </p>
              <Select v-model="campaignId" >
                  <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select a Campaign" />
                  </SelectTrigger>
                  <SelectContent>
                  <SelectGroup>
                    <SelectLabel> campaign name </SelectLabel>
                    <SelectItem v-for="content in CollabHubCampaign" :key="content.id" :value="content.campaign.id"
                   >
                      {{ content.campaign.headline }}
                    </SelectItem>
                       
                  </SelectGroup>
                  </SelectContent>
              </Select>
             
            </div>

            <div v-if="campaignType === 'Private' " >
              <p class="mb-1">Campaign</p>
              <Select  v-model="campaignId" >
                  <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select a Campaign " />
                  </SelectTrigger>
                  <SelectContent>
                  <SelectGroup>
                    <SelectLabel> campaign name </SelectLabel>
                    <SelectItem v-for="content in campaignList" :key="content.id" :value="content.id" @click="campaignId= content.id"  >
                      {{ content.headline }}
                    </SelectItem>
                       
                  </SelectGroup>
                  </SelectContent>
              </Select>
              
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
              <DialogTrigger @click="submitContent" class="w-full bg-black text-white py-2">
                Save
              </DialogTrigger>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <!-- <button @click="isOpen = true" class="rounded-xl px-4 py-1 text-black bg-[#CDC2FF]">
        New Content
      </button> -->
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
                v-if="content?.campaignDecision === 'reject'"
                class="max-w-fit rounded-[100px] border-2 bg-red-300 text-red-500 px-2 border-red-500"
              >
                rejected
              </div>

              <div
                v-if="content?.campaignDecision === 'accept'"
                class="max-w-fit rounded-[100px] border-2 bg-green-300 text-green-500 px-2 border-green-500"
              >
                accepted
              </div>

              <div
                v-if="content?.campaignDecision === 'pending'"
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

                
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>


 
</template>
