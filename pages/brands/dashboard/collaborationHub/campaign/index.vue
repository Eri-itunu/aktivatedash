<script setup lang="ts">
definePageMeta({
  layout: "light",
  middleware: "public",
});

import { ArrowLeft, Plus, X } from "lucide-vue-next";
import { format } from "date-fns";
import axios from "axios";
import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();
const createCollaboration = useCollabHubStore();
const userStore = useUserStore();
const config = useRuntimeConfig();
const API_URL = config.public.API_URL;

const loading = ref(false);
const loadingImage = ref(false);
const errors = ref<string[]>([]);

/* ------------------------------
   Helpers
------------------------------ */
const isValidURL = (url: string): boolean => {
  const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;
  return urlRegex.test(url);
};

const getDifferenceInDays = (date1: Date, date2: Date) => {
  const msInDay = 86_400_000; // 24 * 60 * 60 * 1000
  return Math.floor(
    (new Date(date2).getTime() - new Date(date1).getTime()) / msInDay
  );
};

/* ------------------------------
   File Handling
------------------------------ */
const onChangeFile = async (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (!files?.length) return;

  loadingImage.value = true;
  createCollaboration.imageUrl = files[0];

  const formData = new FormData();
  formData.append("file", createCollaboration.imageUrl);
  formData.append("type", "file");

  await uploadFile(formData);
  loadingImage.value = false;
};

const removeFile = () => {
  createCollaboration.imageUrl = null;
  createCollaboration.fileUrl = "";
};

const uploadFile = async (formData: FormData) => {
  loading.value = true;
  try {
    const res = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${userStore.accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    createCollaboration.fileUrl = res.data.data.url;
    toast({ title: "Image uploaded successfully" });
  } catch (error: any) {
    console.error(error);
    toast({
      title: error?.response?.data.message || "Error uploading image",
    });
  } finally {
    loading.value = false;
  }
};

/* ------------------------------
   Date Handling
------------------------------ */
const { startDate, endDate, contentApproval, closeDate } =
  storeToRefs(createCollaboration);

const validateDates = () => {
  const sevenDaysFromToday = new Date();
  sevenDaysFromToday.setDate(sevenDaysFromToday.getDate() + 7);

  if (createCollaboration.closeDate < sevenDaysFromToday) {
    toast({ title: "Close date must be at least 7 days from today." });
    return false;
  }
  if (
    createCollaboration.contentApproval < createCollaboration.closeDate ||
    getDifferenceInDays(
      createCollaboration.closeDate,
      createCollaboration.contentApproval
    ) <= 7
  ) {
    toast({
      title: "Content approval date must be at least 7 days after close date.",
    });
    return false;
  }
  if (
    createCollaboration.startDate < createCollaboration.contentApproval ||
    getDifferenceInDays(
      createCollaboration.contentApproval,
      createCollaboration.startDate
    ) <= 7
  ) {
    toast({
      title: "Start date must be at least 7 days after content approval date.",
    });
    return false;
  }
  if (
    createCollaboration.endDate < createCollaboration.startDate ||
    getDifferenceInDays(
      createCollaboration.startDate,
      createCollaboration.endDate
    ) <= 7
  ) {
    toast({ title: "End date must be at least 7 days after start date." });
    return false;
  }
  return true;
};

/* ------------------------------
   Form Validation
------------------------------ */
const validateForm = () => {
  errors.value = [];

  if (!createCollaboration.campaignName)
    errors.value.push("Campaign name is required.");
  if (!createCollaboration.fileUrl)
    errors.value.push("Please upload a cover image.");
  if (!createCollaboration.campaignDescription)
    errors.value.push("Campaign description is required.");
  if (!createCollaboration.numOfCreators || createCollaboration.numOfCreators < 1)
    errors.value.push("Number of creators must be at least 1.");
  if (!createCollaboration.companyName)
    errors.value.push("Company name is required.");
  if (!createCollaboration.companyLinks)
    errors.value.push("A Website or social link is required.");
  if (
    createCollaboration.companyLinks &&
    !isValidURL(createCollaboration.companyLinks)
  )
    errors.value.push("A valid website or social link is required.");
  if (!createCollaboration.brandInformation)
    errors.value.push("Brand information is required");

  if (errors.value.length) {
    errors.value.forEach((err) => toast({ title: err }));
    return false;
  }
  return true;
};

/* ------------------------------
   Submit Handler
------------------------------ */
const validateFormAndNavigate = () => {
  if (!validateForm() || !validateDates()) return;

  closeDate.value = createCollaboration.closeDate;
  contentApproval.value = createCollaboration.contentApproval;
  startDate.value = createCollaboration.startDate;
  endDate.value = createCollaboration.endDate;

  navigateTo("campaign/requirements");
};
</script>


<template>
  <div class=" text-black dark:text-white px-2 md:p-8 flex flex-col gap-8  bg-[#F5F5F5] dark:bg-dashbg " >
      <nuxt-link to="/brands/dashboard/collaborationHub" >
          <ArrowLeft />
      </nuxt-link> 

      <BrandsCHubStage :campaign="false" />

      <div class="rounded-[8px] bg-white dark:bg-[#090618]" >
          <header class="p-6 flex flex-col gap-4">
              <h1 class="text-3xl" >Campaign details</h1>
              <p class="opacity-[56%]" >This is what creators will see before they apply to the campaign</p>
               <!-- <button @click="createCollaboration.resetCampaign">
                resetCampaign
               </button> -->
          </header>

          <form @submit.prevent="" class="px-6  pb-5 w-full flex flex-col gap-8">
              <div class=" w-full md:w-2/3 " >
                  <h2 class="font-semibold mb-2">What's the name of your campaign</h2>
                  <input v-model="createCollaboration.campaignName" name="campaign" type="text"  placeholder="e.g. new product launch" 
                  class="w-full border rounded-[8px] p-2 bg-transparent"  />
                 
                 
              </div>

              <div>
                  <h2 class="text-black font-semibold mb-2 dark:text-white">Upload cover image</h2>
                  <p class="opacity-[56%] mb-1">Your cover image sets the tone and draws the right target creator</p>
                  <BrandsImageUploader v-model:imageUrl="createCollaboration.fileUrl" />
              </div>

              <div class=" w-full" >
                  <h2 class="font-semibold mb-2" >Campaign description</h2>
                  <p class="mb-2 opacity-[56%]" >Be specific and detailed in what makes this campaign unique</p>
                  <textarea
                      v-model="createCollaboration.campaignDescription"
                      class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                      name=""
                      id=""
                      cols="30"
                      rows="5"
                      placeholder="e.g. this campaign is about..."
                  ></textarea>
                  
              </div>
             

              <div class="w-2/3" >
                  <p class="font-semibold mb-3">How many creators do you want to hire?</p>
                  <NumberField class="md:w-1/3" v-model="createCollaboration.numOfCreators"  id="age" :default-value="18" :min="1">
                      <Label for="age">Number of creators</Label>
                      <NumberFieldContent >
                      <NumberFieldDecrement />
                      <NumberFieldInput />
                      <NumberFieldIncrement />
                      </NumberFieldContent>
                  </NumberField>
                 
              </div>


              <div class="flex flex-col gap-4">
                  <h1 class="text-3xl">Campaign timeline</h1>
                 
              
                  <div class="grid grid-cols-1  md:grid-cols-2 gap-10" >
                      <div class="" >
                          <h2 class=" font-semibold mb-1 " >Application close date</h2>
                          <p class="opacity-[56%] text-sm mb-6" >Set the final date for accepting applications</p>
                          <UPopover :popper="{ placement: 'bottom-start' }">
                              <UButton
                              class="w-full p-3 border-2 "
                              icon="i-heroicons-calendar-days-20-solid"
                              :label="format(closeDate, 'd MMM, yyy')"
                              />

                              <template #panel="{ close }">
                              <DatePicker v-model="closeDate" is-required @close="close" />
                              </template>
                          </UPopover>
                      </div>
                      <div class=" " >
                          <h2 class=" font-semibold mb-1">Content approval</h2>
                          <p class="mb-1 opacity-[56%] text-sm">Set the approval close date as the creators submission deadline allowing time for review and edit</p>
                          <UPopover :popper="{ placement: 'bottom-start' }">
                              <UButton
                              class="w-full p-3 border-2 "
                              icon="i-heroicons-calendar-days-20-solid"
                              :label="format(contentApproval, 'd MMM, yyy')"
                              />

                              <template #panel="{ close }">
                              <DatePicker v-model="contentApproval" is-required @close="close" />
                              </template>
                          </UPopover>
                      </div>
                      <div class=" " >
                          <h2 class=" font-semibold mb-1">Campaign start date</h2>
                          <p class="mb-1 opacity-[56%] text-sm" >Set the launch date for your campaign, marking when influencer posts will go live.</p>
                          <UPopover :popper="{ placement: 'bottom-start' }">
                              <UButton
                              class="w-full p-3 border-2 "
                              icon="i-heroicons-calendar-days-20-solid"
                              :label="format(startDate, 'd MMM, yyy')"
                              />

                              <template #panel="{ close }">
                              <DatePicker v-model="startDate" is-required @close="close" />
                              </template>
                          </UPopover>
                      </div>
                      <div class=" " >
                          <h2 class=" font-semibold mb-1" >Campaign end date</h2>
                          <p class="mb-1 opacity-[56%] text-sm" >Set the campaign's final day to wrap up all influencer activity and track the results.</p>
                          <UPopover :popper="{ placement: 'bottom-start' }">
                              <UButton
                              class="w-full p-3 border-2 "
                              icon="i-heroicons-calendar-days-20-solid"
                              :label="format(endDate, 'd MMM, yyy')"
                              />

                              <template #panel="{ close }">
                              <DatePicker v-model="endDate" is-required @close="close" />
                              </template>
                          </UPopover>
                      </div>
                  </div>
              </div>

              <div class="flex flex-col gap-4">
                  <div>
                      <h1 class="text-3xl mb-1">Brand information</h1>
                      <p class="opacity-[56%]" >Add in details about your brand that are important for creators to know </p>
                  </div>

                  <div class="flex flex-col md:flex-row justify-between gap-6">
                      <div class="basis-1/2">
                          <h2  class="font-semibold mb-1" >Company name</h2>
                          <input  type="text" class="w-full border rounded-[8px] p-2 bg-transparent"
                          placeholder="Add company name"
                          v-model="createCollaboration.companyName"
                          >
                      </div>

                      <div class="basis-1/2">
                          <h2 class="font-semibold mb-1" >Website or Social link</h2>
                          <div class="flex flex-col justify-end gap-2">
                              <input v-model="createCollaboration.companyLinks" type="text" class="w-full border rounded-[8px] p-2 bg-transparent" 
                              placeholder="Add company website or social link" />
                              
                          </div>
                      </div>

                  </div>

                  <div class=" w-full " >
                      <h2  class="font-semibold mb-1" >Brand info</h2>
                      <p  class=" mb-2 opacity-[56%]" >be specific and detailed in describing what makes your brand unique</p>
                      <textarea
                          v-model="createCollaboration.brandInformation"
                          class="border-[0.5px] p-2 rounded-md w-full bg-transparent"
                          name=""
                          id=""
                          cols="30"
                          rows="5"
                          placeholder="e.g. my company is the best at..."
                      ></textarea>
                  </div>
              </div>





          </form>


          <footer class="w-full flex justify-between border-t-[0.5px] border-t-[#464160] p-4" >
              <nuxt-link to="/brands/dashboard/collaborationHub" class="rounded-[28px] border-[0.5px] px-6 py-2 border-[#8F74F7] text-[#8F74F7]" >
                  Back
              </nuxt-link>

            
              <button  @click="validateFormAndNavigate" class="rounded-[28px]  px-6 py-2 bg-[#5331E8] text-white" >
                  Next
              </button >
          </footer>
      </div>

  </div>
</template>