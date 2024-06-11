<script setup lang="ts">
definePageMeta({
  layout: "brands",
  colorMode: "dark",
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
const toast = useToast();
const setLoading = () => {
  showLoadSpinner.value = false;
  isOpen.value = true;
};

const submitCampaign = async () => {
  try {
    showLoadSpinner.value = true;
    const res = await createBrandCampaignStore.submitCreateCampaign();
    console.log(res);
    setTimeout(setLoading, 5000);
  } catch (error: any) {
    showLoadSpinner.value = false;
    toast.add({ title: error.message });
    console.log(error);
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
      class="flex md:px-24 bg-vDarkBlue md:mb-2 py-12 rounded-lg flex-col md:flex-row gap-5"
    >
      <div class="flex px-4 md:px-0 flex-col gap-5 text-white w-full">
        <div class="flex justify-between border-b-2 py-3 border-darkBlue">
          <div class=" ">Draft</div>
          <div>
            <p class="text-purplelabel text-xs">BUDGET</p>
            <span class="text-2xl font-bold">N {{ budget.toLocaleString() }}</span>
          </div>
        </div>

        <h4 class="text-3xl text-purplelabel">{{ headline }}</h4>

        <div class="flex object-fit relative justify-center bg-purplelabel rounded-lg h-44">
          <img
            v-if="createBrandCampaignStore?.image"
            :src="createBrandCampaignStore?.image"
            class="object-fit w-full h-full rounded-lg"
            alt=""
          />
          <div v-else>
            <img
              v-if="userStore.userProfile?.img_url"
              :src="userStore.userProfile?.img_url"
              class="object-fill h-full w-full"
              alt=""
            />
            <img v-else src="/assets/images/created.svg" class="object-fit" alt="" />
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
          <div class="text-sm text-[#CDC2FF] text-nowrap">
            <p>
              Start Date:
              <span class="font-light text-xs">{{ startDate.toDateString() }}</span>
            </p>
            <p>
              End Date:
              <span class="font-light text-xs">{{ endDate.toDateString() }}</span>
            </p>
          </div>
        </div>

        <div class="flex gap-5">
          <div class="flex flex-col gap-1">
            <p class="text-purplelabel">Content Type</p>
            {{ contentType.join(", ") }}
          </div>

          <div class="flex flex-col gap-1">
            <p class="text-purplelabel">Platform Type</p>
            <div class="flex gap-1 overflow-hidden">
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
          </div>
        </div>

        <div>
          <h4>Requirements</h4>
          <li>{{ requirements }}</li>
        </div>

        <UModal v-model="isOpen" prevent-close>
          <div class="flex flex-col">
            <div class="flex relative justify-center bg-purplelabel rounded-t-lg">
              <UButton
                color="black"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                class="-my-1 absolute top-0 right-0"
                @click="navigateTo('/brands/dashboard')"
              />
              <img src="../../../../../assets/images/created.svg" alt="" />
            </div>

            <div class="flex flex-col justify-center items-center px-16 pt-6 pb-20">
              <div>
                <p class="text-center text-2xl text-purplelabel font-bold">
                  Campaign Created
                </p>
                <p class="text-center">
                  Your campaign has been created! Publish and pay for the campaign on the
                  campaigns page.
                </p>
              </div>

              <nuxt-link
                class="w-full p-3 rounded flex justify-center text-center items-center bg-[#5331E8]"
                to="/brands/dashboard/campaigns"
              >
                <p class="text-center">View Campaigns</p>
              </nuxt-link>
            </div>
          </div>
        </UModal>
      </div>
    </div>

    <div class="flex gap-2">
      <button class="basis-1/3 text-white border-purplebg border-[0.5px] rounded">
        <nuxt-link to="/brands/dashboard/campaigns/create-campaign/campaign-timeline">
          Back
        </nuxt-link>
      </button>

      <button
        @click="submitCampaign"
        class="basis-2/3 text-white bg-[#5331E8] rounded p-3"
      >
        Create Campaign
      </button>
    </div>
  </div>
</template>
