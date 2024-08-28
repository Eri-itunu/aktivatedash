<script setup lang="ts">
//imports
import type { APIResponse, IPlatformProfile, PhylloResponse, GetResponse } from "types";
import PhylloWorkPlatforms from "../../../enums/pyhlloWorkPlatforms";
import { useToast } from "../../../components/ui/toast/use-toast";
import { get_creator_platform_profiles, getPhyllo } from "@/api/creator/platform/platform.creator";import { accountConnectedDiscordNotif } from "../../../utils";

definePageMeta({
  layout: "dashboard",
  colorMode: "dark",
});


//variable declaration
const platforms = ref<IPlatformProfile[]>([]);
const access = ref<PhylloResponse>();
const isOpen = ref(false);
const apiUrl = useRuntimeConfig().public.API_URL;
const env = useRuntimeConfig().PHYLLO;
const userStore = useUserStore();
const facebookSelect = ref(true);
const success = ref(false);
const loading = ref(false);
const getBrandCampaignStore = useGetBrandCampaignStore();
const { toast } = useToast();
const workPlatform = ref<string>("");
const empty = ref(false);
const showSpinner = ref(false);
const accessToken = userStore.accessToken


//utility functions
const reset = () => {
  isOpen.value = false;
  facebookSelect.value = true;
};
const setLoading = () => {
  loading.value = false;
};

const loadingState = (workPlatformId) => {
  showSpinner.value = true;
  isOpen.value = false;
  //@ts-expect-error
  setTimeout(Phyllo(workPlatformId), 1000);
};

//not in use anymore
// function refresh() {
//   get_platform_profiles();
// }
// async function facebook_login() {
//   try {
//     const res = await getBrandCampaignStore.facebook_login();

//     navigateTo(res.url, {
//       open: {
//         target: "_blank",
//         windowFeatures: {
//           width: 500,
//           height: 500,
//         },
//       },
//     });
//   } catch (error: any) {
//     toast({ title: error.message });
//   }
// }


//api calls
async function get_platform_profiles() {
  try {
    if(!accessToken){
      return
    }
    loading.value = true;
    const res = await get_creator_platform_profiles({
      accessToken,
      apiUrl
    })
    platforms.value = res;
    setTimeout(setLoading, 2000);
    if (platforms.value.length === 0) {
      empty.value = true;
    }
  } catch (error: any) {
    loading.value = false;
    toast({ title: "Can't retrieve platform profiles at this time"})
  }
}

const refresh = async() => await get_platform_profiles()



const Phyllo = async (workPlatformId) => {
  if(!accessToken){
    return
  }
  const appName = "Aktivate";
  try {
    const res = await getPhyllo({
      apiUrl,
      accessToken
    })
    const phyllo = res
    const identify = phyllo.phylloId;
    const token = phyllo.sdkToken;

    const config = {
      environment: "production",
      userId: identify,
      token: token,
      clientDisplayName: appName,
      workPlatformId: workPlatformId,
    };

    // @ts-expect-error
    const phylloConnect = window.PhylloConnect.initialize(config);

    // callbacks

    phylloConnect.on(
      "accountConnected",
      async (accountId: string, workplatformId: string, userId: string) => {
        // gives the successfully connected account ID and work platform ID for the given user ID

        workPlatform.value = workplatformId;

        get_platform_profiles();
        success.value = true;
        showSpinner.value = false;
        isOpen.value = false;

        // discord notification
        // await accountConnectedDiscordNotif({ accountId, workplatformId, userId });
      }
    );
    phylloConnect.on("accountDisconnected", (accountId, workplatformId, userId) => {
      // gives the successfully disconnected account ID and work platform ID for the given user ID

      showSpinner.value = false;
    });
    phylloConnect.on("tokenExpired", (userId) => {
      // gives the user ID for which the token has expired
      showSpinner.value = false;
    });
    phylloConnect.on("exit", (reason, userId) => {
      // indicates that the user with given user ID has closed the SDK and gives an appropriate reason for it

      showSpinner.value = false;
    });
    phylloConnect.on("connectionFailure", (reason, workplatformId, userId) => {
      // optional, indicates that the user with given user ID has attempted connecting to the work platform but resulted in a failure and gives an appropriate reason for it

      showSpinner.value = false;
    });

    phylloConnect.open();


    
  } catch (error: any) {
    toast({
      title: "Unable to link an account at this time",
      description: "Please try again later",
    });
    showSpinner.value = false;
  }
};


watchEffect(async () => {
  await get_platform_profiles();
});
</script>

<template>

  <div class="p-4">
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        This might take a while. We’ll notify you once your accounts have been linked and
        you can add your rate card.
      </AlertDescription>
    </Alert>
    <!-- <div class="w-full text-black text-center px-4 bg-[#FAF8FF] border-2 rounded-lg " >
      <p>This might take a while. We’ll notify you once your accounts have been linked and you can add your rate card.</p>
    </div> -->
  </div>
  <div class="px-8 flex justify-end mt-5 items-end mb-10">
    <button
      label="Open"
      @click="isOpen = true"
      class="bg-[#5331E8] text-white rounded-[100px] px-4 py-2"
    >
      Link Social Media Accounts
    </button>
  </div>
  <div
    v-if="showSpinner"
    class="w-[100%] h-[100%] fixed top-0 right-0 left-0 bottom-0 z-50 bg-[#000000]/ flex justify-center items-center"
  >
    <LoadSpinner />
  </div>

  <Popup
    title=" Link Accounts"
    v-if="isOpen"
    :togglePopup="() => (isOpen = false)"
    :header="true"
  >
    <div class="md:w-[400px]">
      <div class="flex flex-col gap-2">
        <p>
          To link social media platforms and retrieve key metrics click on your app of
          choice, fill in your details and start getting feedback!
        </p>
        <div class="flex mt-4 gap-2 items-center justify-between">
          <button @click="loadingState(PhylloWorkPlatforms.FACEBOOK)" target="_blank">
            <img src="~assets/icons/facebook.svg" alt="" />
          </button>
          <div class="w-20 h-px bg-[#464160]"></div>
          <button @click="loadingState(PhylloWorkPlatforms.INSTAGRAM)">
            <img src="~assets/icons/Insta.svg" alt="" />
          </button>
          <!-- <div class="w-20 h-px bg-[#464160]"></div>
            <button>
              <img src="~assets/icons/snapchat.svg" alt="">
            </button> -->
          <div class="w-20 h-px bg-[#464160]"></div>
          <button @click="loadingState(PhylloWorkPlatforms.TIKTOK)">
            <img src="~assets/icons/tiktok.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  </Popup>
  <Popup v-if="success" :togglePopup="() => (success = false)" :image="true">
    <div class="md:w-[600px] flex flex-col">
      <div class="flex flex-col justify-center items-center px-16 pt-6 pb-20">
        <div>
          <p class="text-center text-2xl text-purplelabel font-bold">Account Linked</p>
          <p class="text-center">
            Kindly add your platform rate per post to the rate card beneath your platform
            card to begin accepting gigs
          </p>
        </div>
      </div>
    </div>
  </Popup>

  <!-- loading spinner -->
  <div
    v-if="loading"
    class="md:hidden w-[100%] h-[100%] fixed top-0 right-0 left-0 bottom-0 z-50 bg-[#000000]/ flex justify-center items-center"
  >
    <LoadSpinner />
  </div>

  <div class="flex flex-col gap-5">
    <div class="hidden md:flex" v-if="loading">
      <CreatorLoadingPlatformCard />
    </div>

    <div v-else class="flex flex-col gap-5 mb-5">
      <div v-if="empty" class="flex gap-5 mt-24 flex-col justify-center items-center">
        <p class="text-xl text-center">
          No platforms linked click the button below to link social media accounts
        </p>
        <button
          label="Open"
          @click="isOpen = true"
          class="bg-[#5331E8] text-white rounded-[100px] px-4 py-2"
        >
          Link Social Media Accounts
        </button>
      </div>
      <div v-else v-for="platform in platforms" :key="platform.id">
        <PlatformCard :platform="platform" @refresh="refresh" />
      </div>
    </div>
  </div>
</template>
