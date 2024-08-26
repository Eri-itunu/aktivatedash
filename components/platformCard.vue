<script setup lang="ts">
import type { IPlatformProfile } from "types";
import {
  createRateCard,
  updateRateCard,
  deleteRateCard,
} from "../api/creator/platform/platform.creator";
import { useToast } from "./ui/toast/use-toast";


const device = useDevice()
const config = useRuntimeConfig();
const API_URL = config.public.API_URL;
const currency = ref("NGN");
const userStore = useUserStore();
const openRates = ref(false);
const newRate = ref(false);
const value = ref(0);
const props = defineProps<{ platform: IPlatformProfile }>();
const instagram = ["reels", "posts", "story"];
const service = ref("");
const plat = ref(props.platform.workPlatform);
const price = ref<number>(0);
const bundle = ref("");
const tabs = ref([
  { id: 1, tab: plat,},
  { id: 2, tab: 'Rate',}
])
const emit = defineEmits(["refresh"]);
const { toast } = useToast();
const rate = () => {
  openRates.value = false;
  newRate.value = true;
};
const deletRate = async (id: string) => {
  try {
    const res = await deleteRateCard({
      accessToken: userStore.accessToken || "",
      apiUrl: API_URL,
      rateId: id,
    });
    openRates.value = false;
    toast({ title: "Rate successfully deleted" });
    emit("refresh");
  } catch (error: any) {
    toast({ title: error.message });
  }
};
const createRC = async (e: Event) => {
  e.preventDefault();

  const platformProfileId = props.platform.id;

  try {
    const res = await createRateCard({
      accessToken: userStore.accessToken || "",
      apiUrl: API_URL,
      body: {
        platformProfileId: platformProfileId,
        price: price.value,
        currency: "NGN",
        service: service.value,
        bundle: bundle.value,
      },
    });
        newRate.value = false
        price.value = 0,
        currency.value = "NGN",
        bundle.value = "",
    toast({ title: "Rate successfully added" });
    emit("refresh");
    addRate.value = false;
  } catch (error: any) {
    toast({ title: error.message });
  }
};
const thisRateId = ref("");
const editPopup = (thisRate: string, cost, desc, ty) => {
  thisRateId.value = thisRate;
  price.value = cost;
  service.value = ty;
  bundle.value = desc;
  openRates.value = false;
  editRate.value = true;
};
const editRate = ref(false);
const selectedTab = ref(plat)
const updateRate = async () => {
  try {
    const res = await updateRateCard({
      accessToken: userStore.accessToken || "",
      apiUrl: API_URL,
      rateId: thisRateId.value,
      body: {
        price: price.value,
        currency: "NGN",
        service: service.value,
        bundle: bundle.value,
      },
    });
    service.value = "";
    price.value = 0;
    bundle.value = "";
    editRate.value = false;
    toast({ title: "Rate successfully updated" });
    emit("refresh");
  } catch (error: any) {
    toast({ title: error.message });
  }
};

const addRate = ref(false);
</script>

<template>
   <div v-if="device.isMobile" class=" text-black px-4 " >
    <div class="bg-[#FAF8FF] rounded-lg py-2 flex flex-col gap-2"  >
        <div class="w-full grid grid-cols-2 rounded-t-lg" >
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="[
              ' px-3 py-1 flex text-center justify-center items-center text-xl ' ,
              tab.tab === selectedTab ? ' border-b-black  border-b-4' : 'border-b-[#E3E0F2] border-b-2'
            ]"
            @click="selectedTab = tab.tab"
          >
            {{ tab.tab }}
            
          </button>
        </div>

        <div v-if="selectedTab === 'Rate' " >
          <div v-if="platform.rate && platform.rate.length > 0" class="flex flex-col items-center">
            

            <div class="flex p-4 flex-col w-full" v-for="rate in platform.rate" >
              <div class="flex justify-between items-center" >
                <div>
                  <p>{{ rate.type }}</p>
                  <p>{{rate.description}}</p>
                </div>
                <p> NGN {{rate.price}}</p>
              </div>
            </div>
          </div>
          <div v-else class="flex flex-col py-4 items-center justify-center text-center" >
            <p>No rates added yet</p>
            <p>Kindly add your current rates</p>
          </div>
        </div>

        <div v-else class="p-4 flex flex-col gap-2" >

          <div class="flex justify-between">
            <p>Username</p>
            <p> {{ platform.platformUsername ?? "---" }}</p>
          </div>

          <div class="flex justify-between">
            <p>Followers</p>
            <p>{{ platform.reputationFollowerCount?.toLocaleString() ?? "---" }}</p>
          </div>

          <div class="flex justify-between">
            <p>Content count</p>
            <p>{{ platform.reputationContentCount?.toLocaleString() ?? "---" }}</p>
          </div>

          
        </div>
        <div @click="openRates=true" class="flex items-center w-full justify-center" >
          <button class="rounded-sm px-4 py-2 border-2 border-black">
            Add/Edit Rate Card
          </button>
        </div>
    </div>
  </div>

  <div v-if="!device.isMobile" class=" flex-col gap-4">
    <div class="flex flex-row rounded-lg bg-vDarkBlue text-white">
      <div
        class="flex items-center justify-center py-8 w-1/12 border-r-2 border-darkBlue"
      >
        <img
          v-if="platform.workPlatform?.includes('instagram')"
          class="object-contain"
          src="/assets/icons/collab/instagram.svg"
          alt=""
        />
        <img
          v-if="platform.workPlatform?.includes('linkedin')"
          class="object-contain"
          src="/assets/icons/collab/linkedin.svg"
          alt=""
        />
        <img
          v-if="platform.workPlatform?.includes('facebook')"
          class="object-contain"
          src="/assets/icons/collab/facebook.svg"
          alt=""
        />
        <img
          v-if="platform.workPlatform?.includes('tiktok')"
          class="object-contain"
          src="/assets/icons/collab/tiktok.svg"
          alt=""
        />
        <img
          v-if="platform.workPlatform?.includes('twitter')"
          class="object-contain"
          src="/assets/icons/collab/twitter.svg"
          alt=""
        />
        <img
          v-if="platform.workPlatform?.includes('whatsapp')"
          class="object-contain"
          src="/assets/icons/collab/whatsapp.svg"
          alt=""
        />
        <img
          v-if="platform.workPlatform?.includes('snapchat')"
          class="object-contain"
          src="/assets/icons/collab/snapchat.svg"
          alt=""
        />
        <img
          v-if="platform.workPlatform?.includes('youtube')"
          class="object-contain"
          src="/assets/icons/collab/youtube.svg"
          alt=""
        />
      </div>
      <div class="w-11/12 flex flex-col">
        <div class="flex border-b-2 border-darkBlue">
          <div class="w-1/3 border-r-2 py-4 border-darkBlue">
            <div class="flex justify-between gap-2 items-center px-4">
              <div class="flex gap-2 items-center">
                <div>Username</div>
              </div>
            </div>
            <!-- End Top part -->

            <!-- Middle -->
            <div class="py-3 border-darkBlue px-4">
              <div
                class="flex justify-between gap-2 items-end w-full h-full text-nowrap text-ellipsis`"
              >
                <p class="text-sm break-words overflow-hidden">
                  {{ platform.platformUsername ?? "---" }}
                </p>

                <div class="hidden lg:block w-1/2 h-[3.8rem]"></div>
              </div>
            </div>
            <!-- End Middle -->

            <!-- Bottom -->
            <!-- <div class="flex justify-between gap-2 items-center pt-3 px-4">
          <div class="flex gap-2">
            <img src="~/assets/icons/up-green.svg" alt="">
            <p class=" text-sm md:text-lg text-green1"> + 11.45%</p>
          </div>
          <p class="hidden lg:block font-thin uppercase text-xs text-grey2">Compared to Last Month</p>
        </div> -->
          </div>
          <div class="w-1/3 border-r-2 py-4 border-darkBlue">
            <div class="flex justify-between gap-2 items-center px-4">
              <div class="flex gap-2 items-center">
                <div>Followers</div>
              </div>
            </div>
            <!-- End Top part -->

            <!-- Middle -->
            <div class="py-3 border-darkBlue px-4">
              <div class="flex justify-between gap-2 items-end w-full h-full">
                <p
                  class="uppercase font-extrabold text-sm md:text-2xl text-nowrap leading-5"
                >
                  {{ platform.reputationFollowerCount?.toLocaleString() ?? "---" }}
                </p>

                <div class="hidden lg:block w-1/2 h-[3.8rem]"></div>
              </div>
            </div>
            <!-- End Middle -->

            <!-- Bottom -->
            <!-- <div class="flex justify-between gap-2 items-center pt-3 px-4">
          <div class="flex gap-2">
            <img src="~/assets/icons/up-green.svg" alt="">
            <p class=" text-sm md:text-lg text-green1"> + 11.45%</p>
          </div>
          <p class="hidden lg:block font-thin uppercase text-xs text-grey2">Compared to Last Month</p>
        </div> -->
          </div>
          <div class="w-1/3 py-4">
            <div class="flex justify-between gap-2 items-center px-4">
              <div class="flex gap-2 items-center">
                <div>Content Count</div>
              </div>
            </div>
            <!-- End Top part -->

            <!-- Middle -->
            <div class="py-3 border-darkBlue px-4">
              <div class="flex justify-between gap-2 items-end w-full h-full">
                <p
                  class="uppercase font-extrabold text-sm md:text-2xl text-nowrap leading-5"
                >
                  {{ platform.reputationContentCount?.toLocaleString() ?? "---" }}
                </p>

                <div class="hidden lg:block w-1/2 h-[3.8rem]"></div>
              </div>
            </div>
            <!-- End Middle -->

            <!-- Bottom -->
            <!-- <div class="flex justify-between gap-2 items-center pt-3 px-4">
          <div class="flex gap-2">
            <img src="~/assets/icons/down-red.svg" alt="">
            <p class="text-sm md:text-lg text-red1"> 21.45%</p>
          </div>
          <p class="hidden lg:block font-thin uppercase text-xs text-grey2">Compared to Last Month</p>
        </div> -->
          </div>
        </div>
        <div class="flex p-4 justify-center">
          <div v-if="platform.rate" class="flex justify-between gap-5 items-center">
            <div>
              <p class="text-sm text-grey2">Rate Per Post:</p>
              <p
                class="uppercase font-extrabold text-sm md:text-xl text-nowrap leading-5"
              >
                {{ platform.rate[0]?.currency ?? "" }}
                {{ platform.rate[0]?.price?.toLocaleString() ?? "---" }}
              </p>
            </div>
            <button
              class="rounded-full bg-purple1 h-fit py-1 px-4 min-w-4"
              @click="openRates = true"
            >
              Edit Rate Card
            </button>
          </div>

          <button
            class="rounded-full bg-purple1 h-fit py-1 px-4 min-w-4"
            v-else
            @click="addRate = true"
          >
            + Add Rate Card
          </button>
          <!-- <button @click="openRates = true">new</button> -->
        </div>
      </div>
    </div>
   
   
  </div>


  <Popup
      title="$  My Rates"
      v-if="openRates"
      :togglePopup="() => (openRates = false)"
      :image="false"
      :header="true"
    >
      <div class="md:w-[550px] flex flex-col gap-5 h-full">
        <div class="flex flex-col gap-2 py-8">
          <p>
            Manage your rates for different services. This information will be visible to
            potential brands.
          </p>
          <button

            v-if="platform.rate && platform.rate.length < 7"
            @click="rate()"
            class="bg-purple1 text-white max-w-fit py-2 px-4 rounded-lg"
          >
            + Add New Rate
          </button>
        </div>
        <div class="overflow-y-scroll">
          <div
            v-for="rate in platform.rate"
            class="border-t-2 border-darkBlue flex py-2 justify-between"
          >
            <div class="flex basis-1/3 flex-col gap-1">
              <p>Description</p>
              <p class="pl-4">{{ rate.description }}</p>
              <div class="flex justify-start gap-2">
                <button
                  @click="editPopup(rate.id, rate.price, rate.description, rate.type)"
                >
                  <img src="/assets/icons/edit.svg" alt="" />
                </button>
                <button @click="deletRate(rate.id)">
                  <img src="/assets/icons/delete.svg" alt="" />
                </button>
              </div>
            </div>

            <div class="border-l-2 basis-1/3 pl-4 border-darkBlue">
              <p>Rate</p>
              <p>N{{ rate.price.toLocaleString() }}</p>
            </div>

            <div class="border-l-2 basis-1/3 pl-4 border-darkBlue">
              <p>Type</p>
              <p>{{ rate.type }}</p>
            </div>
          </div>
        </div>
      </div>
  </Popup>

  <Popup
    title="$  Add Rates"
    v-if="newRate"
    :togglePopup="() => (newRate = false)"
    :image="false"
    :header="true"
  >
    <form @submit="createRC" class="md:w-[400px] flex flex-col gap-5">
      <div class="flex flex-col gap-2">
        <p class="text-purplelabel">Platform</p>
        <input
          type="text"
          class="border-[0.1px] p-2 rounded-md w-full bg-transparent"
          disabled
          v-model="plat"
        />
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-purplelabel">Service</p>
        <!-- should be a dropdown -->
        <input
          type="text"
          class="border-[0.1px] p-2 rounded-md w-full bg-transparent"
          v-model="service"
          required
          placeholder="reels"
        />
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-purplelabel">Rate</p>
        <input
          type="text"
          class="border-[0.1px] p-2 rounded-md w-full bg-transparent"
          v-model="price"
          required
        />
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-purplelabel">Bundle</p>
        <input
          type="text"
          class="border-[0.1px] p-2 rounded-md w-full bg-transparent"
          v-model="bundle"
          placeholder="2-3 posts"
        />
      </div>

      <div class="flex justify-center items-center gap-4">
        <button
          @click="newRate = false"
          class="bg-transparent border-2 border-purple1 text-white max-w-fit py-2 px-4 rounded-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          class="bg-purple1 text-white max-w-fit py-2 px-4 rounded-lg"
        >
          Save
        </button>
      </div>
    </form>
  </Popup>

  <Popup
    title="$  Edit Rates"
    v-if="editRate"
    :togglePopup="() => (editRate = false)"
    :image="false"
    :header="true"
  >
    <div class="md:w-[400px] flex flex-col gap-5">
      <div class="flex flex-col gap-2">
        <p class="text-purplelabel">Platform</p>
        <input
          type="text"
          class="border-[0.1px] p-2 rounded-md w-full bg-transparent"
          disabled
          v-model="plat"
        />
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-purplelabel">Service</p>
        <!-- should be a dropdown -->
        <input
          type="text"
          class="border-[0.1px] p-2 rounded-md w-full bg-transparent"
          v-model="service"
          required
          placeholder="reels"
        />
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-purplelabel">Rate</p>
        <input
          type="text"
          class="border-[0.1px] p-2 rounded-md w-full bg-transparent"
          v-model="price"
          required
        />
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-purplelabel">Bundle</p>
        <input
          type="text"
          class="border-[0.1px] p-2 rounded-md w-full bg-transparent"
          v-model="bundle"
          placeholder="2-3 posts"
        />
      </div>

      <div class="flex justify-center items-center gap-4">
        <button
          @click="editRate = false"
          class="bg-transparent border-2 border-purple1 text-white max-w-fit py-2 px-4 rounded-lg"
        >
          Cancel
        </button>

        <button
          @click="updateRate()"
          class="bg-purple1 text-white max-w-fit py-2 px-4 rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  </Popup>


 
</template>
