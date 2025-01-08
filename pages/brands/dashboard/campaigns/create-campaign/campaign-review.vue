<script setup lang="ts">
import { useToast } from "../../../../../components/ui/toast/use-toast";
definePageMeta({
  layout: "light",

});

const isOpen = ref(false);
const showLoadSpinner = ref(false);
const createBrandCampaignStore = useCreateBrandCampaignStore();
const userStore = useUserStore();
const {
  headline,
  startDate,
  endDate,
  description,
  requirements,
  budget,
  contentType,
  platformType,
} = storeToRefs(createBrandCampaignStore);
const { toast } = useToast();
const setLoading = () => {
  showLoadSpinner.value = false;
  isOpen.value = true;
};
const close = () => {
  isOpen.value = false;
};
const viewCampaigns = () => {
  navigateTo("/brands/dashboard/campaigns");
  setTimeout(close, 3000);
};


const formatDate = (dateString) => {
    if (!dateString) return "Invalid Date"; // Handle empty or invalid inputs
    const options = { year: "numeric", month: "long", day: "numeric" };
    //@ts-expect-error
    return new Date(dateString).toLocaleDateString("en-US", options); // Explicitly set locale
  };

const submitCampaign = async () => {
  try {
    showLoadSpinner.value = true;
    const res = await createBrandCampaignStore.submitCreateCampaign();
    viewCampaigns();
  } catch (error: any) {
    showLoadSpinner.value = false;
    toast({ title: error.message });
  }
};
</script>

<template>
  <div class="flex px-2 md:px-8 flex-col gap-5">
    <brandsCampaignStage
      v-bind:content="true"
      v-bind:influencer="true"
      v-bind:budget="true"
    />
    <div
      v-if="showLoadSpinner"
      class="w-[100%] h-[100%] fixed top-0 right-0 left-0 bottom-0 z-50 bg-[#000000]/[0.5] flex justify-center items-center"
    >
      <LoadSpinner />
    </div>
    <div
      class="flex md:px-24 bg-white dark:bg-vDarkBlue md:mb-2 py-12 rounded-lg flex-col md:flex-row gap-5"
    >
      <div class="flex px-4 md:px-0 flex-col gap-5 text-white w-full">
        <div class="flex justify-between border-b-2 py-3 border-darkBlue">
          <div class="text-black dark:text-white ">Draft</div>
          <div>
            <p class="text-black dark:text-purplelabel text-xs">BUDGET</p>
            <span class="text-2xl font-bold text-black dark:text-purplelabel "
              >N {{ budget.toLocaleString() }}</span
            >
          </div>
        </div>

        <h4 class="text-3xl text-black dark:text-purplelabel">{{ headline }}</h4>

        <div
          class="flex object-fit relative justify-center bg-purplelabel rounded-lg h-52 w-full"
        >
          <img
            v-if="createBrandCampaignStore?.image"
            :src="createBrandCampaignStore?.image"
            class="object-fit w-full h-full rounded-lg"
            alt=""
          />
          <div v-else>
            <img
              v-if="userStore.userProfile?.imgUrl"
              :src="userStore.userProfile?.imgUrl"
              class="h-full w-full object-fill rounded-lg"
              alt=""
            />
            <img
              v-else
              src="/assets/images/created.svg"
              class="object-fit"
              alt=""
            />
          </div>
        </div>

        <p class="text-wrap">
          {{ description }}
        </p>

        <div class="flex gap-1 items-center">
          <!-- icon type thing -->
          <div class="flex flex-col items-center max-w-min">
            <div class="h-2 w-2 rounded-full bg-grey1"></div>
            <div class="h-4 w-[0.05rem] rounded-full bg-grey1"></div>
            <div class="h-2 w-2 rounded-full bg-grey1"></div>
          </div>
          <!-- end icon thing-->
          <div class="text-sm text-black dark:text-[#CDC2FF] text-nowrap">
            <p>
              Start Date:
              <span class="font-light text-xs">{{
                formatDate(startDate)
              }}</span>
            </p>
            <p>
              End Date:
              <span class="font-light text-xs">{{
               formatDate(endDate)
              }}</span>
            </p>
          </div>
        </div>

        <div class="flex gap-5">
          <div class="flex flex-col gap-1">
            <p class="text-black dark:text-purplelabel">Content Type</p>
            <p class="text-black dark:text-white">{{ contentType.join(", ") }}</p>  
          </div>

          <div class="flex flex-col gap-1">
            <p class="text-black dark:text-purplelabel">Platform Type</p>
            <div class="dark:flex gap-1 overflow-hidden hidden">
              <img
                v-if="platformType.includes('instagram')"
                class="object-contain"
                src="../../../../../assets/icons/collab/instagram.svg"
                alt=""
              />
              <img
                v-if="platformType.includes('linkedin')"
                class="object-contain"
                src="../../../../../assets/icons/collab/linkedin.svg"
                alt=""
              />
              <img
                v-if="platformType.includes('facebook')"
                class="object-contain"
                src="../../../../../assets/icons/collab/facebook.svg"
                alt=""
              />
              <img
                v-if="platformType.includes('tiktok')"
                class="object-contain"
                src="../../../../../assets/icons/collab/tiktok.svg"
                alt=""
              />
              <img
                v-if="platformType.includes('twitter')"
                class="object-contain"
                src="../../../../../assets/icons/collab/twitter.svg"
                alt=""
              />
              <img
                v-if="platformType.includes('whatsapp')"
                class="object-contain"
                src="../../../../../assets/icons/collab/whatsapp.svg"
                alt=""
              />
              <img
                v-if="platformType.includes('snapchat')"
                class="object-contain"
                src="../../../../../assets/icons/collab/snapchat.svg"
                alt=""
              />
              <img
                v-if="platformType.includes('youtube')"
                class="object-contain"
                src="../../../../../assets/icons/collab/youtube.svg"
                alt=""
              />
            </div>
            <ul class="dark:hidden" v-for="icon in platformType" >
              <li class="text-black">
                {{ icon }}
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h4 class="text-black dark:text-white">Requirements</h4>
          <li class="text-black dark:text-white">{{ requirements }}</li>
        </div>

        <Popup
          title="Campaign created"
          v-if="isOpen"
          :togglePopup="() => (isOpen = false)"
        >
          <div class="md:w-[400px] md:h-[200px] flex flex-col gap-5">
            <div
              class="flex flex-col justify-center items-center px-16 pt-6 gap-4"
            >
              <div>
                <p class="text-center text-2xl text-purplelabel font-bold">
                  Campaign Created
                </p>
                <p class="text-center">
                  Your campaign has been created! Publish and pay for the
                  campaign on the campaigns page.
                </p>
              </div>

              <button
                @click="viewCampaigns"
                class="w-full p-3 rounded flex justify-center text-center items-center bg-[#5331E8]"
              >
                <p class="text-center">View Campaigns</p>
              </button>
            </div>
          </div>
        </Popup>
      </div>
    </div>

    <div class="flex gap-2">
      <nuxt-link to="/brands/dashboard/campaigns/create-campaign/campaign-timeline"
        class="basis-1/3 text-black dark:text-white border-purplebg border-[0.5px] rounded flex items-center justify-center"
      >
        Back
      </nuxt-link>

      <button
        @click="submitCampaign"
        class="basis-2/3 text-black dark:text-white bg-[#5331E8] rounded p-3"
      >
        Create Campaign
      </button>
    </div>
  </div>
</template>
